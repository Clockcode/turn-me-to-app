"use client";

import GetStarted from "./components/getStarted";
import { useState, useEffect } from "react";
import Image from "next/image";
import { texts } from "./lib/utils/constants";
import { useAuth } from "./providers/AuthProvider";
import { FocusCards } from "./components/focus-cards";

export default function Home() {
  const [style, setStyle] = useState({
    title: "Studio Ghibli",
    src: "/images/ghibli.png",
    alt: "studio ghibli",
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

  const auth = useAuth();
  if (!auth) return <div>Loading...</div>;

  const { user, loading } = auth;

  return (
    <div className="flex font-sans justify-left md:justify-center pl-4 pr-2 min-h-screen">
      <main className="flex flex-col items-left w-full">
        <header className="flex flex-col w-full md:w-4/6 m-auto">
          <h1 className="font-reenie text-8xl text-left md:text-center font-bold">
            Turn me to
          </h1>
          <div className="flex flex-row w-full items-center justify-left md:justify-center gap-4 mb-8 py-4">
            <div className="rounded-lg border-2 border-gray-200 w-30 h-30 relative">
              <Image
                src={style.src}
                alt={style.alt}
                loading="lazy"
                fill={true}
                className="object-cover rounded-md"
              />
            </div>
            <span className="font-reenie align-center text-6xl text-left md:text-center h-20 font-bold">
              {style.title}
            </span>
          </div>
        </header>
        <div className="flex w-full md:justify-center mb-4">
          <GetStarted />
        </div>

        <FocusCards cards={texts} />
        </main>
    </div>
  );
}
