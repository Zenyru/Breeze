import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex">
      <img className="w-6 ml-5" src="/images/logo.svg" alt="logo" />
      <Link href="/" >
      <a
        
        className="ml-3 cursor-pointer font-extrabold text-3xl text-white"
      >
        Breeze
      </a>
      </Link>
    </div>
  );
}
