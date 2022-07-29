import Button from "../components/Button";
import ColoredDivs from "../components/ColoredDivs";
import { AiOutlineDown } from "react-icons/ai";

export default function IntroSection() {
  return (
    <div className="homePage flex flex-col items-center h-[90vh] relative max-w-7xl mx-auto">
      {/* some colored divs used for decoration */}
      <ColoredDivs />

      <p className="text-white  text-7xl md:text-6xl sm:text-5xl xxs:mt-12  mt-24 text-center font-extrabold relative z-10">
        The{" "}
        <span className="bg-gradient-to-r from-[#A8EB12,65%] to-[#2CD261] text-gradient p-1 ">
          Best
        </span>{" "}
        Way{" "}
        <span className="bg-gradient-to-r from-[#2CD261,40%] to-[#A8EB12] text-gradient  p-1 ">
          To Keep Records
        </span>{" "}
        Of The Books You Read
      </p>
      <p className="text-[#969292] font-semibold text-2xl sm:text-lg text-center sm:mt-14 mt-8 tracking-wider ">
        Breeze is your assistant to manage and keep records <br />
        of the books you read.Enjoy the breeze
      </p>
      <Button />
      <div className="text-[#2cd261b4] text-xl xl:mt-16 xs:mt-10 xxs:mt-12  mt-32 animate-bounce-moderate ">
        <AiOutlineDown />
      </div>
    </div>
  );
}
