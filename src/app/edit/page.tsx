"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    | undefined
    | "generative-fill"
    | "blur"
    | "grayscale"
    | "pixelate"
    | "remove-bg"
  >();

  const [pendingPrompt, setPendingPrompt] = useState("");
  const [prompt, setPrompt] = useState("");
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

          <div className="flex flex-col gap-4">
            <Button
              onClick={() => {
                setTransformation("generative-fill");
                setPrompt(pendingPrompt);
              }}
            >
              Apply generative Fill
            </Button>
            <Label>Prompt</Label>
            <Input
              value={pendingPrompt}
              onChange={(e) => setPendingPrompt(e.currentTarget.value)}
            />
          </div>

          <Button onClick={() => setTransformation("blur")}>Apply blur</Button>
          <Button onClick={() => setTransformation("grayscale")}>
            Convert to gray
          </Button>
          <Button onClick={() => setTransformation("pixelate")}>
            pixelate
          </Button>
          <Button onClick={() => setTransformation("remove-bg")}>
            remove backrgound
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <CldImage src={publicId} width="300" height="200" alt="some image" />

          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="1800"
              height="1200"
              alt="some image"
              crop="pad"
              fillBackground={{
                prompt,
              }}
            />
          )}
          {transformation === "blur" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              alt="some image"
              effects={[{ blur: "800" }]}
            />
          )}
          {transformation === "grayscale" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              alt="some image"
              effects={[{ grayscale: true }]}
            />
          )}
          {transformation === "pixelate" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              alt="some image"
              effects={[{ pixelate: true }]}
            />
          )}
          {transformation === "remove-bg" && (
            <CldImage
              src={publicId}
              width="300"
              height="200"
              alt="some image"
              removeBackground
            />
          )}
        </div>
      </div>
    </section>
  );
}
