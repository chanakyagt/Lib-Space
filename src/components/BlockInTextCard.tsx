import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const HomeCard = () => {
  return (
    <div className="flex items-center justify-center  px-8 py-8 text-neutral-800">
      <BlockInTextCard
        tag="Your Goto Library Optimizing Tool"
        text={
          <>
            We know Libraries are more than just couple of books
          </>
        }
        examples={[
          "Hassle Free",
          "Streamlined!!!",
          "AI enabled ",
          
        ]}
      />
    </div>
  );
};

const BlockInTextCard = ({
  tag,
  text,
  examples,
}: {
  tag: string;
  text: ReactNode;
  examples: string[];
}) => {
  return (
    <div className="w-full max-w-xl space-y-2">
      <div>
      <h1 className='font-bold text-[6rem]'>Lib<span className='text-blue-600 italic'>Space</span></h1>
        <p className="mb-1.5 text-sm font-light uppercase italic">{tag}</p>
        <hr className="border-neutral-700" />
      </div>
      <p className="max-w-lg text-md font-bold leading-relaxed ">{text}</p>
      <div className="font-bold">
        <Typewrite examples={examples} />
        <hr className="border-neutral-300" />
      </div>
     <Link href='/products'>
     <button className="w-full rounded-full border border-neutral-950 py-2 text-sm font-medium transition-colors hover:bg-neutral-950 hover:text-neutral-100">
        Know More
      </button>
     </Link>
    </div>
  );
};

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 3;
const MAIN_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 3500;

const Typewrite = ({ examples }: { examples: string[] }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="mb-2.5 text-sm font-light uppercase">
      <span className="inline-block size-2 bg-neutral-950" />
      <span className="ml-3 italic">
        LibSpace is:{" "}
        {examples[exampleIndex].split("").map((l, i) => (
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${exampleIndex}-${i}`}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
              className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-blue-600"
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};