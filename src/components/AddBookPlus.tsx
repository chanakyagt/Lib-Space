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
  const [openState, setOpenState] = useState(false);

  return (
    <Dialog open={openState} onOpenChange={setOpenState}>
      <DialogTrigger>
        {" "}
        <button className="fixed bottom-4 right-4 bg-black text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition-all duration-300 text-3xl ">
          +
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl h-[80vh] overflow-y-auto">
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
