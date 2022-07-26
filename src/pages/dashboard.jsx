import { getSession, signOut } from "next-auth/react";
import prisma from "../lib/prisma";
import Logo from "../components/Logo";
import Input from "../components/Input";
import BookContainer from "../components/BookContainer";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

export default function dashboard({ user }) {
  const [booksInfo, setBooksInfo] = useState([]);

  const inputToDashboard = dataFromInput => {
    console.log(dataFromInput);
    setBooksInfo(dataFromInput);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-4 flex justify-between">
        <Logo />
        <div
          onClick={() => {
            signOut({
              callbackUrl: "/",
            });
          }}
          className="mr-6 py-2 px-4 bg-[rgba(255,255,255,0.92)] rounded-sm cursor-pointer hover:translate-y-[-0.09rem] transition-all duration-300 "
        >
          <a className="text-[rgba(0,0,0,0.8  )] font-semibold flex items-center">
            <span className="mr-2">
              <FiLogOut />
            </span>
            Logout
          </a>
        </div>
      </div>
      <h1 className="text-white text-center font-bold text-2xl">
        Hi{" "}
        <span className="bg-gradient-to-r from-[#A8EB12] to-[#2CD261] text-gradient">
          {user.name}
        </span>{" "}
        ! Welcome to your dashboard.
      </h1>
      <Input passingData={inputToDashboard} />
      <BookContainer info={booksInfo} />
    </div>
  );
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return {
    props: {
      session,
      user,
    },
  };
};
