// 'use server'
// import { generateText } from 'ai';
// import { createOpenAI } from '@ai-sdk/openai';

// const openai = createOpenAI({
//   // custom settings, e.g.
//   compatibility: 'strict',
//   apiKey:process.env.OPENAI_API_KEY // strict mode, enable when using the OpenAI API
// });
// export const AI=async (book_title,book_author,type)=>{
//   let pmt=`write a brief overview of novel ${book_title} by ${book_author} don't give the entire plot just a reader friendly overview`
//   if(type === 'tags'){
//     pmt=`give 5 tags for novel as a array don't give anything extra i am fetching it using api for novel ${book_title} by ${book_author}.Note Do not give anything extra`
//   }
//   const { text } = await generateText({
//   model: openai('gpt-4-turbo'),
//   prompt: pmt,
// });
// return text
// console.log(text)}