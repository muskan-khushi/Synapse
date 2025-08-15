'use server';

/**
 * @fileOverview An AI agent that suggests relevant questions about a document.
 *
 * - suggestQuestions - A function that suggests questions based on the document content.
 * - SuggestQuestionsInput - The input type for the suggestQuestions function.
 * - SuggestQuestionsOutput - The return type for the suggestQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestQuestionsInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the document to generate questions for.'),
});
export type SuggestQuestionsInput = z.infer<typeof SuggestQuestionsInputSchema>;

const SuggestQuestionsOutputSchema = z.object({
  questions: z
    .array(z.string())
    .describe('An array of suggested questions about the document.'),
});
export type SuggestQuestionsOutput = z.infer<typeof SuggestQuestionsOutputSchema>;

export async function suggestQuestions(input: SuggestQuestionsInput): Promise<SuggestQuestionsOutput> {
  return suggestQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestQuestionsPrompt',
  input: {schema: SuggestQuestionsInputSchema},
  output: {schema: SuggestQuestionsOutputSchema},
  prompt: `You are an AI assistant that suggests relevant questions a user can ask about a given document.

  Document Content: {{{documentContent}}}

  Please suggest 5 relevant questions that the user can ask to explore the document's content more effectively. Format the questions as a JSON array of strings.
  `,
});

const suggestQuestionsFlow = ai.defineFlow(
  {
    name: 'suggestQuestionsFlow',
    inputSchema: SuggestQuestionsInputSchema,
    outputSchema: SuggestQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
