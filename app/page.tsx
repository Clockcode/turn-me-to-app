import AnimatedText from "./components/animatedText";
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex font-sans items-center justify-center gap-16 sm:p-20 min-h-screen">
      <main className="flex flex-col items-center min-h-full">
        <header className="flex flex-col align-items-center gap-6 w-full">
          <h1 className="text-8xl text-center font-bold">Turn me to</h1>
            <AnimatedText />
        </header>
        <Link href={"/studioghibli"} className="rounded-md text-lg bg-blue-600 text-white font-white px-8 py-4 align-center font-medium">Turn me to Studio Ghibli</Link>
      </main>
    </div>
  );
}
