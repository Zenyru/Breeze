import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import { getSession } from "next-auth/react";
import Button from "../components/Button";
import ColoredDivs from "../components/ColoredDivs";

export default function Home() {
  return (
    <section className="homeSection min-h-screen bg-black">
    {/* Nav bar */}
      <Nav />
      <div className="homePage flex flex-col items-center relative max-w-7xl mx-auto">
      {/* some colored divs used for decoration */}
        <ColoredDivs />

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
        <Button />
      </div>
    </section>
  );
}

// getting the session from the server
export const getServerSideProps = async ctx => {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
};
