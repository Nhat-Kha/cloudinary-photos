"use client";

import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

export default function EditPage({
  searchParams: { publicId },
}: {
  searchParams: {
    publicId: string;
  };
}) {
  const [transformation, setTransformation] = useState<
    undefined | "generative-fill" | "blur" | "grayscale" | "pixelate"
  >();

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit {publicId} </h1>
        </div>
        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={() => setTransformation(undefined)}
          >
            Clear All
          </Button>

          <Button onClick={() => setTransformation("generative-fill")}>
            Apply generative Fill
          </Button>

          <Button onClick={() => setTransformation("blur")}>Apply blur</Button>
          <Button onClick={() => setTransformation("grayscale")}>
            Convert to gray
          </Button>
          <Button onClick={() => setTransformation("pixelate")}>
            pixelate
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <CldImage src={publicId} width="300" height="200" alt="some image" />

          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              alt="some image"
              crop="pad"
              fillBackground
            />
          )}
          {transformation === "blur" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              alt="some image"
              blur="800"
            />
          )}
          {transformation === "grayscale" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              alt="some image"
              grayscale
            />
          )}
          {transformation === "pixelate" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              alt="some image"
              pixelate
            />
          )}
          
        </div>
      </div>
    </section>
  );
}
