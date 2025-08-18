import Image from "next/image";
import { FileUpload } from "../components/fileUpload";
export default function Page() {
  return (
    <main className="min-h-screen">
      <header className="px-8 pt-12">
        <div className="flex items-center gap-4 justify-center">
          <div className="rounded-lg border-2 border-gray-200 w-15 h-15 relative">
            <Image
              src={"/images/ghibli.png"}
              alt={"studio ghibli"}
              loading="lazy"
              fill={true}
              className="object-cover rounded-md"
            />
          </div>
          <h1 className="text-4xl font-bold align-center">Studio Ghibli</h1>
        </div>
      </header>
      <FileUpload title="Studio Ghibli"/>
    </main>
  );
}
