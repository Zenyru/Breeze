import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import Logo from "../components/Logo";
import Input from "../components/Input";

export default function dashboard({ user }) {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-4">
        <Logo />
      </div>
      <h1 className="text-white text-center font-bold text-2xl">
        Hi{" "}
        <span className="bg-gradient-to-r from-[#A8EB12] to-[#2CD261] text-gradient">
          {user.name}
        </span>{" "}
        ! Welcome to your dashboard.
      </h1>

      <Input />
    </div>
  );
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      session,
      user,
    },
  };
};
