export default function Footer() {
  return (
    <div className=" flex justify-center pb-4 border-[rgba(255,255,255,0.2)] border-t-[1px] ">
      <p className="font-semibold text-lg  text-center  text-white pt-4">
        Made By{" "}
        <a
          className="cursor-pointer bg-gradient-to-r from-[#2CD261] to-[#A8EB12] text-gradient"
          href="https://github.com/Zenyru"
          target="_blank"
        >
          Seniru
        </a>{" "}
        For{" "}
        <a
          className="cursor-pointer bg-gradient-to-r from-[#2CD261] to-[#A8EB12] text-gradient"
          href="https://hashnode.com/"
          target="_blank"
        >
          Hashnode
        </a>{" "}
        x{" "}
        <a
          className="cursor-pointer bg-gradient-to-r from-[#2CD261] to-[#A8EB12] text-gradient"
          href="https://planetscale.com/"
          target="_blank"
        >
          Planetscale
        </a>{" "}
        Hackathon
      </p>
    </div>
  );
}
