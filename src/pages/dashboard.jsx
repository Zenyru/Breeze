import { getSession, signOut } from "next-auth/react";
import prisma from "../lib/prisma";
import Logo from "../components/Logo";
import Input from "../components/Input";
import BookContainer from "../components/BookContainer";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

export default function dashboard({ user, books }) {
  const [booksInfo, setBooksInfo] = useState([]);
  const [withoutDeletedBook, setWithoutDeletedBook] = useState([]);

  const inputToDashboard = dataFromInput => {
    setBooksInfo(dataFromInput);
  };

  return (
    <div className="min-h-screen xs:w-fit  bg-black">
      <div className="pt-4 flex justify-between">
        <Logo />
        {/* sign out  */}
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
      <h1 className="text-white text-center font-bold text-2xl lg:mt-8 xxs:mt-14">
        Hi{" "}
        <span className="bg-gradient-to-r from-[#A8EB12] to-[#2CD261] text-gradient">
          {user.name}
        </span>{" "}
        ! Welcome to your dashboard.
      </h1>
      {/* passing a function called inputToDashboard(which is there in above) to get the data about and an array called filtered without the deleted books as props  */}
      <Input
        initialBooks={books}
        passingData={inputToDashboard}
        filtered={withoutDeletedBook}
      />

      {/* passing the setWithoutDeletedBook as props  as settingFiltered and info which is basically the data about the new newly added books  by the user that is comming from the input.jsx as props */}
      <BookContainer settingFiltered={setWithoutDeletedBook} info={booksInfo} />
    </div>
  );
}

export const getServerSideProps = async ctx => {
  // getting the session from the server
  const session = await getSession(ctx);
  // checking if the user is logged in , if not returning them back to the home page
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

  const books = await prisma.books.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return {
    props: {
      session,
      user,
      books,
    },
  };
};
