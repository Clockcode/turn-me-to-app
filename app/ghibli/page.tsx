"use server"

import Image from "next/image";
import { TurnImage } from "../components/turnImage";
import { getServerUser } from "../lib/firebase/serverApp";
import { redirect } from "next/navigation";
export default async function Page() {
  const currentUser = await getServerUser()
  if(!currentUser) redirect("/")

  return (
    <main className="min-h-screen">
      <header className="px-8 pt-12">
        <div className="flex items-center gap-4 justify-center">
          <div className="rounded-lg border-2 border-gray-200 w-20 h-20 lg:w-30 lg:h-30 relative">
            <Image
              src={"/images/ghibli.png"}
              alt={"studio ghibli"}
              loading="lazy"
              fill={true}
              className="object-cover rounded-md"
            />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold align-center">Studio Ghibli</h1>
        </div>
      </header>
      <TurnImage title="Studio Ghibli" defaultPrompt="Turn this photo to studio ghibli version. Make sure to stay consistent to the character's facial features and the positions of them in the reference image."/>
    </main>
  );
}
