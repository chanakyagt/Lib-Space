import React from "react";
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
import BookForm from "./BookForm";
const AddBookPlus = () => {
  const [tags, setTags] = useState([]);
  const [generation, setGeneration] = useState<string>("");
  const [openState, setOpenState] = useState(false);
  const form = useForm<z.infer<typeof bookResolver>>({
    resolver: zodResolver(bookResolver),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      summary: "",
      availableQuantity: 0,
      tags: [],
    },
  });
  const onSubmit = (values: z.infer<typeof bookResolver>) => {
    console.log(values);
    addBookToDB({ ...values, tags });
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
    <Dialog open={openState} onOpenChange={setOpenState}>
      <DialogTrigger>
        {" "}
        <button className="fixed bottom-4 right-4 bg-black text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition-all duration-300 text-3xl ">
          +
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mx-5">Add a new book to libspace</DialogTitle>
          <DialogDescription>
            <BookForm></BookForm>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookPlus;
