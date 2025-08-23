"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NewtonsCradle } from "ldrs/react";
import "ldrs/react/NewtonsCradle.css";
import { base64Image } from "@/public/rick_ghibli";
import { base64ToFile } from "../lib/utils/utils";

type imageType = {
  preview: string;
  file: File;
};

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => {};
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      // aria-model="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // close when clicking background
    >
      <div
        className="relative m-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl w-[90vw] max-w-xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <button
            aria-label="Close"
            className="text-xl px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={onClose}
          >
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function TurnImage({ title, defaultPrompt }: { title: string, defaultPrompt: string }) {
  const [image, setImage] = useState<imageType | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [prompt, setprompt] = useState<string | null>(null);

  // useEffect(() => {
  //   setOutputImage(base64Image);
  //   setLoading(true);
  // }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (!image?.file) return;
    const formData = new FormData(e.currentTarget);
    formData.append("image", image.file);
    formData.append("prompt", defaultPrompt)
    const res = await fetch("/api/turn", { method: "POST", body: formData });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) console.error("request failed");
    setOutputImage(data.b64 ?? null);
  }

  async function handleRetry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (!outputImage || !prompt) {
      setIsModalOpen(false);
      console.error("output image or prompt doesn't exist");
    } else {
      const formData = new FormData(e.currentTarget);
      const file: File = base64ToFile(outputImage, "image");
      formData.append("image", file);
      formData.append("prompt", prompt);
      const res = await fetch("/api/turn", { method: "POST", body: formData });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) console.error("request failed");
      setOutputImage(data.b64 ?? null);
      setIsModalOpen(false);
      setprompt("");
    }
  }

  function handleInputUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e?.currentTarget.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (image?.preview) URL.revokeObjectURL(image?.preview);
    setImage({ preview, file });
  }

  function handleDownload(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!outputImage) {
      console.error("No image to download");
      return;
    }
    // Step 1: Create the data URL
    const dataUrl = `data:image/png;base64,${outputImage}`;
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
    <div className="flex flex-col lg:flex-row">
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50">
          <span className="text-xl font-bold">Loading...</span>
          <NewtonsCradle size="150" speed="1.4" color="coral" />
        </div>
      )}
      {outputImage && (
        <section className="flex flex-col w-4/5 max-w-120 m-auto h-auto items-center justify-center h-84 mt-4">
          <figure>
            <figcaption className="font-reenie text-4xl font-bold text-center py-4">
              You are turned to
            </figcaption>
            <img
              src={`data:image/png;base64,${outputImage}`}
              alt="restyled"
              className="h-[480px] w-[480px] object-contain border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            />
            <button
              className="primary-button w-full my-4"
              onClick={handleDownload}
            >
              Download image
            </button>
            {/* Retry logic */}
            {!loading && outputImage && image && (
              <button
                className="secondary-button w-full"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Retry again
              </button>
            )}
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
            className="flex flex-col items-center justify-center h-[480px] w-[480px] lg:mt-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {image?.preview ? (
              <div className="w-full h-full relative">
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
                  SVG, PNG, JPG (up to 50MB)
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
          className="primary-button w-full mt-4"
          type="submit"
        >
          {loading ? "Styling" : `Turn me to ${title}`}
        </button>
      </form>
      <Modal
        open={isModalOpen}
        title="Refine the prompt"
        onClose={async () => setIsModalOpen(false)}
      >
        <form className="flex flex-col gap-3 p-1" onSubmit={handleRetry}>
          <label htmlFor="prompt" className="my-2 text-lg">
            Type whatever you would like to change.
          </label>
          <textarea
            className="h-30 p-2"
            id="prompt"
            placeholder="Describe how you want to modify the image..."
            value={prompt ?? ""}
            onChange={e => setprompt(e.target.value)}
          ></textarea>
          <button type="submit" className="primary-button">
            Get a new photo
          </button>
        </form>
      </Modal>
    </div>
  );
}
