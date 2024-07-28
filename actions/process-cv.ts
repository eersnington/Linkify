// actions/process-cv.ts
'use server';

import { prisma } from '@/lib/db';
import { LinkedInProfile } from '@/types/linkedin';
import PDFParser from 'pdf2json';
import { Buffer } from 'buffer';
import { z } from 'zod';
import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

const LinkedInProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  photoUrl: z.string(),
  title: z.string(),
  description: z.string(),
  linkedInUrl: z.string(),
  certifications: z.array(z.string()),
  workExperiences: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      duration: z.string(),
    })
  ),
  recommendations: z.array(
    z.object({
      author: z.string(),
      text: z.string(),
    })
  ),
  education: z.array(
    z.object({
      institution: z.string(),
      degree: z.string(),
      year: z.string(),
    })
  ),
  skills: z.array(z.string()),
});

export async function processCV(
  formData: FormData
): Promise<{ success: boolean; data?: LinkedInProfile; error?: string }> {
  try {
    const file = formData.get('cv') as File;
    const email = formData.get('email') as string;

    if (!file || !email) {
      return { success: false, error: 'Missing file or email' };
    }

    // // Store the file in Supabase
    // const savedFile = await storeFileInSupabase(file, email);
    // if (!savedFile) {
    //   throw new Error('Failed to store the file');
    // }

    // Read the file content using pdf2json
    const fileContent = await readPDFContent(file);
    console.log('Parsed PDF Content:', fileContent);

    // Call Claude API for processing
    const aiResponse = await callClaudeAPI(fileContent, email);

    return { success: true, data: aiResponse };
  } catch (error) {
    console.error('Error processing CV:', error);
    return { success: false, error: 'Failed to process CV' };
  }
}

async function storeFileInSupabase(file: File, email: string) {
  const buffer = await file.arrayBuffer();
  const fileData = Buffer.from(buffer);

  try {
    const result = await prisma.cV.create({
      data: {
        email,
        filedata: fileData,
      },
    });

    return result;
  } catch (error) {
    console.error('Error storing file in Supabase:', error);
    return null;
  }
}

async function readPDFContent(file: File): Promise<string> {
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const pdfParser = new (PDFParser as any)(null, 1);

  return new Promise((resolve, reject) => {
    pdfParser.on('pdfParser_dataError', (errData: any) => {
      console.error('Error parsing PDF:', errData.parserError);
      reject(errData.parserError);
    });

    pdfParser.on('pdfParser_dataReady', () => {
      const rawText = pdfParser.getRawTextContent();
      resolve(rawText);
    });

    pdfParser.parseBuffer(fileBuffer);
  });
}

async function callClaudeAPI(
  fileContent: string,
  email: string
): Promise<LinkedInProfile> {
  const model = anthropic('claude-3-sonnet-20240229');

  try {
    const { object } = await generateObject({
      model,
      schema: LinkedInProfileSchema,
      prompt: `Parse the following CV text and generate a LinkedIn profile for the email ${email}:\n\n${fileContent}`,
    });

    return object as LinkedInProfile;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error('Failed to process CV with Claude API');
  }
}
