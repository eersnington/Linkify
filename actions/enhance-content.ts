// actions/enhance-content.ts
'use server';

import { LinkedInProfile } from '@prisma/client';
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
    return groqModel('llama-3.1-70b-versatile');
  } else {
    console.log('Using Anthropic model');
    return anthropicModel;
  }
}

export async function enhanceContent(
  profile: LinkedInProfile
): Promise<LinkedInProfile> {
  const model = getModel();

  try {
    const { object } = await generateObject({
      model,
      schema: AILinkedInProfileSchema,
      prompt: `Enhance the following LinkedIn profile data by improving the descriptions, titles, and ensuring a professional tone:\n\n${JSON.stringify(profile)}`,
    });

    const enhancedProfile = {
      id: profile.id,
      userEmail: profile.userEmail,
      ...object,
    };

    return enhancedProfile as LinkedInProfile;
  } catch (error) {
    console.error('Error enhancing content:', error);
    throw new Error('Failed to enhance content with AI');
  }
}
