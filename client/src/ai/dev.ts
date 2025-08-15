import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-document.ts';
import '@/ai/flows/answer-questions.ts';
import '@/ai/flows/suggest-questions.ts';