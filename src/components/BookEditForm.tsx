import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { bookResolver } from "../../zodResolvers/bookResolver";
  import { Button } from "@/components/ui/button";
  import { Textarea } from "@/components/ui/textarea";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { addBookToDB } from "../../actions/AddBookAction";
  import { useState } from "react";
  import { Badge } from "@/components/ui/badge";
  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
  
  import { Brain } from "lucide-react";
  import { AI } from "../../ai/FetchAISummary";
  import { generate } from "../../ai/AIStreamingSummary";
  import { readStreamableValue } from "ai/rsc";
import { EditBook, EditBookToaster } from '../../actions/EditBook';
import { updateBookHandler } from '../../hooks/useUpdateBookHandler';

   
const BookEditForm = ({book}) => {
    const [tags, setTags] = useState(book.tags);
    const [generation, setGeneration] = useState<string>("");
    const [openState, setOpenState] = useState(false);
    const {updateHandler}=updateBookHandler()
    const form = useForm<z.infer<typeof bookResolver>>({
      resolver: zodResolver(bookResolver),
      defaultValues: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        summary: book.summary,
        availableQuantity: book.availableQuantity,
        tags: [],
      },
    });
    const onSubmit = async(values: z.infer<typeof bookResolver>) => {
      console.log(values);
      await updateHandler({ ...values, tags ,id:book.id})
    //   addBookToDB({ ...values, tags });
      setOpenState(false);
    };
  
    const onKeyDownHandler = (event) => {
      if (event.key == " " && event.currentTarget.value.trim !== "") {
        event.preventDefault();
        const newTag = event.currentTarget.value.trim();
        setTags([...tags, newTag]);
        form.setValue("tags", [...tags, newTag]);
        event.currentTarget.value = "";
      }
    };
    const brainClickButton = async (type) => {
      const prompt_use = type;
      alert("ai button clicked");
      const book_title = form.getValues("title");
      const book_author = form.getValues("author");
      console.log(book_title);
      if (type === "tags") {
        const ai_response = await AI(book_title, book_author, prompt_use);
        console.log(ai_response);
        form.setValue(type, JSON.parse(ai_response));
        setTags(JSON.parse(ai_response));
      } else if (type === "summary") {
        const RealGen = async () => {
          const { output } = await generate(book_title, book_author);
  
          for await (const delta of readStreamableValue(output)) {
            setGeneration((currentGeneration) => {
              const updatedGeneration = `${currentGeneration}${delta}`;
              form.setValue(type, updatedGeneration);
              console.log(updatedGeneration);
              return updatedGeneration;
            });
          }
        };
        RealGen();
      }
    };
  return (
    <div className="w-full mx-auto p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input disabled 
                            placeholder="Enter the book title"
                            {...field}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700">
                          Author
                        </FormLabel>
                        <FormControl>
                          <Input disabled 
                            placeholder="Enter the author's name"
                            {...field}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField disabled 
                    control={form.control}
                    name="isbn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700">
                          ISBN
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the ISBN"
                            {...field}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Summary
                          </FormLabel>
                          <HoverCard>
                            <HoverCardTrigger className="cursor-pointer">
                              <Brain
                                onClick={() => brainClickButton("summary")}
                                className="h-5 w-5 text-gray-500 hover:text-gray-700"
                              />
                            </HoverCardTrigger>
                            <HoverCardContent className="p-2 bg-white border border-gray-200 rounded shadow-lg">
                              Fill Book Summary using AI
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <FormControl>
                          <Textarea
                            placeholder="Summary of the book"
                            {...field}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="block text-sm font-medium text-gray-700">
                            Tags
                          </FormLabel>
                          <HoverCard>
                            <HoverCardTrigger className="cursor-pointer">
                              <Brain
                                onClick={() => brainClickButton("tags")}
                                className="h-5 w-5 text-gray-500 hover:text-gray-700"
                              />
                            </HoverCardTrigger>
                            <HoverCardContent className="p-2 bg-white border border-gray-200 rounded shadow-lg">
                              Fill Book Tags using AI
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Enter tags and press space"
                            onKeyDown={onKeyDownHandler}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <FormField
                    control={form.control}
                    name="availableQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700">
                          Available Quantity
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter the available quantity"
                            {...field}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between">
                    <Button
                      type="submit"
                      className="mt-4 inline-flex text-black justify-center rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium  hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-black"
                      onClick={() => {
                        setOpenState(false);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      className="mt-4 inline-flex justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
  )
}

export default BookEditForm