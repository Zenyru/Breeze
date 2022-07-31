import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";
import IntroSection from "../components/IntroSection";
import Advantages from "../components/Advantages";
import Footer from "../components/Footer";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <section className="homeSection min-h-screen dark mx-auto bg-black">
      <Nav />
      <IntroSection />
      <Advantages />
      <Footer />
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
