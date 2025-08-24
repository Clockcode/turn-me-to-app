"use server";

import Image from "next/image";
import { TurnImage } from "../components/turnImage";
import { getServerUser } from "../lib/firebase/serverApp";
import { redirect } from "next/navigation";
export default async function Page() {
  const currentUser = await getServerUser();
  if (!currentUser) redirect("/");

  return (
    <main className="min-h-screen">
      <header className="px-8 pt-12">
        <div className="flex items-center gap-4 justify-center">
          <div className="rounded-lg border-2 border-gray-200 w-20 h-20 lg:w-30 lg:h-30 relative">
            <Image
              src={"/images/cardImages/ratatouille.png"}
              alt={"ratatouille"}
              loading="lazy"
              fill={true}
              className="object-cover rounded-md"
            />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold align-center">
            Ratatouille
          </h1>
        </div>
      </header>
      <TurnImage
        title="Ratatouille"
        defaultPrompt="Put this character in the photo in an animation movie, where the character does something interesting with Ratatouille rat in the warm interior of Gusteau’s restaurant kitchen, add supporting characters in the background if needed. Use the current clothes the character has. Use a color palette that feels warm and magical: golden kitchen lights, soft blue hues, and realistic lighting for depth."
      />
    </main>
  );
}
