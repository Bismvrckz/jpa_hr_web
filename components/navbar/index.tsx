import Image from "next/image";
import Link from "next/link";

export default function Navbar({ ...props }) {
  const { className } = props;

  return (
    <div className={className + "relative flex justify-end z-50 p-1"}>
      <div className="absolute w-full h-full" />
      <div className="z-10 relative w-[15%]">
        <Image alt="" fill src={"/imageResource/jatelindo-logo.png"} />
      </div>
      <div className="flex-grow" />
      <div className="z-10 flex h-full bg-gray-100 w-[30%] items-center justify-evenly">
        <Link href={"/"}>Job List</Link>
        <Link href={"/"}>Profil Perusahaan</Link>
        <Link href={"/"}>Bidang Pekerjaan</Link>
      </div>
    </div>
  );
}
