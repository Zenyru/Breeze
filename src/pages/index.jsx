import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import { getSession } from "next-auth/react";
import Button from "../components/Button";

export default function Home() {
  return (
    <section className="homeSection min-h-screen bg-black">
      <Nav />
      <div className="homePage flex flex-col items-center relative max-w-7xl mx-auto">
        <div className="h-48 w-48 rounded-xl blur-3xl animate-bounce-slow absolute left-[-3rem] top-28 bg-[rgba(166,235,18,0.32)] mb-10"></div>
        <div className="h-48 w-48 rounded-xl blur-3xl animate-bounce-slow absolute right-10 top-[5rem] bg-[rgba(44,210,97,0.32)]"></div>

        <p className="text-white text-7xl mt-24 text-center font-extrabold relative z-10">
          The{" "}
          <span className="bg-gradient-to-r from-[#A8EB12,65%] to-[#2CD261] text-gradient ">
            Best
          </span>{" "}
          Way{" "}
          <span className="bg-gradient-to-r from-[#2CD261,40%] to-[#A8EB12] text-gradient ">
            To Keep Records
          </span>{" "}
          Of The Books You Read
        </p>
        <p className="text-[#969292] font-semibold text-2xl text-center mt-8 tracking-wider ">
          Breeze is your assistant to manage and keep records <br />
          of the books you read.Enjoy the breeze
        </p>
        <Button/>
      </div>
    </section>
  );
}

export const getServerSideProps = async ctx => {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
};
