// actions/process-cv.ts
'use server';

import { LinkedInProfile } from '@/types/linkedin';
import PDFParser from 'pdf2json';
import { Buffer } from 'buffer';
import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

import { createOpenAI } from '@ai-sdk/openai';
import { AILinkedInProfileSchema } from '@/lib/validations/linkedin-profile';

function getModel() {
  const groqAPIKey = process.env.GROQ_API_KEY;
  const anthropicAPIKey = process.env.ANTHROPIC_API_KEY;

  const anthropicModel = anthropic('claude-3-sonnet-20240229');

  if (groqAPIKey) {
    const groqModel = createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: groqAPIKey,
    });

    console.log('Using Groq model');
    return groqModel('llama3-groq-70b-8192-tool-use-preview');
  }

  if (anthropicAPIKey) {
    console.log('Using Anthropic model');
    return anthropicModel;
  }

  console.error('No API key provided');
  throw new Error('No AI API key provided');
}

export async function processCV(
  formData: FormData
): Promise<{ success: boolean; data?: LinkedInProfile; error?: string }> {
  try {
    const file = formData.get('cv') as File;
    const email = formData.get('email') as string;

    if (!file || !email) {
      return { success: false, error: 'Missing file or email' };
    }

    // Read the file content using pdf2json
    const fileContent = await readPDFContent(file);
    console.log('Parsed PDF Content:', fileContent);

    // Call Claude API for processing
    const aiResponse = await callClaudeAPI(fileContent, email);

    console.log(aiResponse);

    return { success: true, data: aiResponse };
  } catch (error) {
    console.error('Error processing CV:', error);
    return { success: false, error: 'Failed to process CV' };
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
  const model = getModel();

  try {
    const { object } = await generateObject({
      model,
      schema: AILinkedInProfileSchema,
      prompt: `As a professional resume analyzer, your primary objective is to fully comprehend the user's query of a CV resume and extract information in a structured format. Infer from the text provide a description, title, and everything. Don't miss out any details. Let the photo url be 'https://resumade.com/images/portraits/person.png'\n\n${fileContent}.`,
    });

    return object as LinkedInProfile;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error('Failed to process CV with Claude API');
  }
}
