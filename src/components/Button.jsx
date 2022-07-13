import { HiArrowSmRight } from "react-icons/hi";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router"; 

export default function Button() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div
      className="group h-min w-fit relative mt-20 "
      onClick={() => (session ? router.push("/dashboard") : signIn("google"))}
    >
      <div className="absolute inset-0 scale-x-105 animate-pulse bg-gradient-to-r from-[rgba(166,235,18,0.7)] to-[rgba(44,210,97,0.7)]  blur-2xl transition-transform group-hover:scale-x-125" />
      <div className="flex justify-center relative z-10 ">
        <a className="text-white px-10 py-[0.85rem] bg-gradient-to-br from-[#A8EB12,35%] to-[#2CD261]  flex font-semibold  text-2xl rounded-md hover:translate-y-[-.25rem] transition-all duration-500">
          Get Started{" "}
          <span className="ml-2 flex justify-center items-center">
            <HiArrowSmRight className="text-3xl" />
          </span>
        </a>
      </div>
    </div>
  );
}
