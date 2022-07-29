import { MdOutlineMoneyOffCsred } from "react-icons/md";
import { MdSpeed } from "react-icons/md";
import { HiClock } from "react-icons/hi";
import Button from "./Button";
import { RoughNotation } from "react-rough-notation";
import { useInView } from "react-intersection-observer";

export default function Advantages() {
  const { ref, inView, entry } = useInView({
    threshold: 1.0,
  });

  return (
    <div className=" min-h-[80vh] md:min-h-screen relative  max-w-7xl mx-auto ">
      <div className="h-48 w-48 rounded-xl blur-3xl animate-bounce-slow absolute left-[1rem]  bottom-[20rem] bg-[rgba(166,235,18,0.25)] mb-10"></div>
      <div className="h-48 w-48 rounded-xl blur-3xl animate-bounce-slow absolute right-[8rem] md:right-7 md:bottom-[40rem] bottom-[28rem] bg-[rgba(44,210,97,0.25)]"></div>
      <div className="flex items-center flex-col relative z-10 ">
        <p className="text-white text-7xl md:text-6xl sm:text-5xl xs:text-center xs:leading-[3.8rem] font-extrabold  ">
          <RoughNotation
            type="underline"
            strokeWidth={2}
            animationDuration={2000}
            color="#2CD261"
            animate
            show={inView}
          >
            <span
              ref={ref}
              className="advantages bg-gradient-to-r from-[#A8EB12] to-[#2CD261] text-gradient p-1 "
            >
              Advantages
            </span>
          </RoughNotation>
          Of Breeze{" "}
        </p>
      </div>
      <div className="flex justify-around md:flex-col md:mt-16  mt-24 relative z-10 ">
        <div className="flex flex-col md:mb-20 items-center text-white text-7xl ">
          <MdOutlineMoneyOffCsred />
          <p className="text-4xl  mt-5 font-semibold">Free Of Charge</p>
          <p className="text-lg font-semibold tracking-wide text-[rgba(255,255,255,0.74)] mt-4 text-center">
            You don't need money <br /> to work with breeze
          </p>
        </div>
        <div className="flex flex-col md:mb-20 items-center text-white text-7xl">
          <MdSpeed />
          <p className="text-4xl  mt-5 font-semibold">Super Speed</p>
          <p className="text-lg font-semibold tracking-wide text-[rgba(255,255,255,0.74)] mt-4 text-center">
            Feel the Speed of the breeze
          </p>
        </div>
        <div className="flex flex-col md:mb-10 items-center text-white text-7xl">
          <HiClock />
          <p className="text-4xl  mt-5 font-semibold">Realtime UI</p>
          <p className="text-lg  font-semibold tracking-wide text-[rgba(255,255,255,0.74)] mt-4 text-center">
            Realtime UI update with a fun  <br /> user experience
          </p>
        </div>
        
      </div>
      <div className="flex justify-center md:pb-20 ">
        <Button />
      </div>
      
    </div>
  );
}
