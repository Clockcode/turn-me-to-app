import Link from "next/link";
export default function Navigation() {
  return (
    <nav className="flex w-full justify-center gap-8 py-4">
      <Link className="px-4 py-2 font-semibold text-lg border-2 rounded-md" href={"/"}>Home</Link>
      <Link className="px-4 py-2 font-semibold text-lg border-2 rounded-md" href={"/login"}>Sign up</Link>
    </nav>
  );
}
