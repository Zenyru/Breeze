import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "../components/Logo";

export default function Nav() {
  const { data: session } = useSession();
  return (
    <nav className="h-20 bg-[rgba(255,255,255,.2)] flex justify-between items-center ">
      <Logo />
      <ul className="flex text-white font-bold items-center">
        {session ? (
          <Link href="/dashboard">
            <a className="mr-4 cursor-pointer bg-white rounded-md px-6 py-2 text-md text-black">
              {" "}
              Dashboard
            </a>
          </Link>
        ) : (
          <li
            className="mx-7 cursor-pointer bg-white rounded-md px-6 py-2 text-md text-black"
            onClick={() => {
              signIn("google", {
                callbackUrl: "/dashboard",
              });
            }}
          >
            Login
          </li>
        )}
      </ul>
    </nav>
  );
}
