"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type styleObject = {
  title: string;
  imgLink: string;
  alt: string;
};

export default function AnimatedText() {
  const texts: Array<styleObject> = [
    { title: "The Simpsons", imgLink: "/images/simpsons.png", alt: "simpsons" },
    {
      title: "Studio Ghibli",
      imgLink: "/images/ghibli.png",
      alt: "studio ghibli",
    },
    { title: "The Sopranos", imgLink: "/images/sopranos.png", alt: "sopranos" },
    {
      title: "The Game of Thrones",
      imgLink: "/images/got.png",
      alt: "game of thrones",
    },
    { title: "The Avatar", imgLink: "/images/avatar.png", alt: "avatar" },
    {
      title: "The Rick and Morty",
      imgLink: "/images/rickandmorty.png",
      alt: "rick and morty",
    },
  ];
  const [style, setStyle] = useState({
    title: "Anything",
    imgLink: "/images/simpsons.png",
    alt: "anything",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStyle((prevStyle) => {
        const currentIndex = texts.indexOf(prevStyle);
        const nextIndex =
          currentIndex + 1 < texts.length ? currentIndex + 1 : 0;
        return texts[nextIndex];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4">
      <div className="rounded-lg border-2 border-gray-200 w-30 h-30 relative">
        <Image src={style.imgLink} alt={style.alt} loading="lazy" fill={true} className="object-cover rounded-md" />
      </div>
      <span className="text-5xl text-center h-20 font-bold">
        {style.title}
      </span>
    </div>
  );
}
