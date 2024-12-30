'use server'
'use server';

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { google } from '@ai-sdk/google';

export async function generate(book_title:string,book_author: string) {
  const stream = createStreamableValue('');

  (async () => {
    const { textStream } = streamText({
      model: google('gemini-1.5-pro-latest'),
      prompt: `write a brief overview of novel ${book_title} by ${book_author} don't give the entire plot just a reader friendly overview`,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}