import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";

export default function dashboard({ user }) {
  return (
    <div>
      <h1>Hey {user.name}</h1>
    </div>
  );
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);

  console.log(session.user.id);

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  console.log(user);

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
