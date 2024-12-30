'use server'
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { google } from '@ai-sdk/google';

// const google = createGoogleGenerativeAI({
//   // custom settings
//   apiKey:process.env.GEMINI_APi_KEY
// });

export const AI=async (book_title,book_author,type)=>{
  let pmt=`write a brief overview of novel ${book_title} by ${book_author} don't give the entire plot just a reader friendly overview`
  if(type === 'tags'){
    pmt=`give 5 tags for novel as a array don't give anything extra i am fetching it using api for novel ${book_title} by ${book_author}.Note Do not give anything extra`
  }
  const { text } = await generateText({
  model:  google('gemini-1.5-pro-latest'),
  prompt: pmt,
});
return text
console.log(text)}