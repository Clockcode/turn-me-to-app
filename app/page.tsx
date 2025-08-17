import AnimatedText from "./ui/animatedText";
import Link from "next/link"

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <header className="flex flex-col align-items-center gap-6 w-full">
          <h1 className="text-8xl text-center font-bold">Turn me to</h1>
            <AnimatedText />
        </header>
        <Link href={"/studioghibli"} className="rounded-md text-lg bg-blue-600 font-white px-8 py-4 align-center font-medium">Turn me to Studio Ghibli</Link>
      </main>
    </div>
  );
}
