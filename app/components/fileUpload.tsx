"use client";

import { useState } from "react";
import Image from "next/image";
import { base64Image } from "../../public/exampleB64";

type imageType = {
  preview: string;
  file: File;
};

export function FileUpload({ title }: { title: string }) {
  const [image, setImage] = useState<imageType | null>(null);
  const [outB64, setOutB64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("inside submit");
    e.preventDefault();
    setLoading(true);
    if (!image?.file) return;
    const formData = new FormData(e.currentTarget);
    formData.append("image", image.file);
    const res = await fetch("/api/turn", { method: "POST", body: formData });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) console.error("request failed");
    setOutB64(data.b64 ?? null);
  }

  function handleInputUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.currentTarget.files?.[0];
    if (!file) return;
    console.log("file", file);
    const preview = URL.createObjectURL(file);
    console.log("preview", preview);
    if (image?.preview) URL.revokeObjectURL(image?.preview);
    setImage({ preview, file });

  }

  function handleDownload(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!outB64) {
      console.error("No image to download");
      return;
    }
    // Step 1: Create the data URL
    const dataUrl = `data:image/png;base64,${outB64}`;
    // Step 2: Create a temporary anchor element
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "image.png"; // You can change the filename if you want
    // Step 3: Append, click, and remove the anchor
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="flex flex-col">
      {outB64 && (
        <section className="flex flex-col w-4/5 max-w-120 m-auto h-auto items-center justify-center w-full h-84 mt-4">
          <figure>
            <figcaption className="font-reenie text-4xl font-bold text-center py-4">
              You are turned to
            </figcaption>
            <img
              src={`data:image/png;base64,${outB64}`}
              alt="restyled"
              className="w-full border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            />
            <button className="mt-8" onClick={handleDownload}>Download image</button>
          </figure>
        </section>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center text-center m-auto mt-12 w-4/5 max-w-120 relative"
      >
        <div className="flex items-center justify-center w-full min-h-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-84 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {image?.preview ? (
              <div className="h-84 w-full relative">
                <Image
                  src={image.preview}
                  fill={true}
                  objectFit="contain"
                  alt="preview upload"
                ></Image>
                <input
                  name="file"
                  type="file"
                  className="hidden"
                  onChange={handleInputUpload}
                  accept="image/*"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <input
              name="file"
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleInputUpload}
              accept="image/*"
            />
          </label>
        </div>

        <button
          disabled={loading}
          className="mt-8"
          type="submit"
        >
          {loading ? "Styling" : `Turn me to ${title}`}
        </button>
      </form>
    </div>
  );
}
