import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Nav() {
  const { data: session } = useSession();
  return (
    <nav className="h-20 bg-[rgba(255,255,255,.2)] flex justify-between items-center ">
      <div className="flex">
        <img className="w-6 ml-5" src="/images/logo.svg" alt="logo" />
        <a
          href="/"
          className="ml-3 cursor-pointer font-extrabold text-3xl text-white"
        >
          Breeze
        </a>
      </div>
      <ul className="flex text-white font-bold items-center">
        {session ? (
          <Link
            href="/dashboard"
          >
            <a className="mr-4 cursor-pointer bg-white rounded-md px-6 py-2 text-md text-black"> Dashboard</a>
          </Link>
        ) : (
          <li
            className="mx-7 cursor-pointer bg-white rounded-md px-6 py-2 text-md text-black"
            onClick={() => {
              signIn("google");
            }}
          >
            Login
          </li>
        )}
      </ul>
    </nav>
  );
}
