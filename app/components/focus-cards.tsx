"use client";

import React, { useState } from "react";
import { cn } from "../lib/utils/utils";
import { redirect } from "next/navigation";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Card;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => redirect(`${card.url}`)}
      className={cn(
        "w-70 h-78 md:h-96 rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden transition-all duration-300 ease-out",
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-contain absolute inset-0 h-full"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  url: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
    // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto md:px-8 w-full"
    className="flex flex-row gap-4 flex-wrap max-w-8xl mx-auto justify-left"
    >
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
