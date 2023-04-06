import Image from "next/image";
import Link from "next/link";

export default function Navbar({ ...props }) {
  const { className } = props;

  return (
    <div
      className={
        className +
        "relative flex justify-end z-50 bg-gray-100 shadow-[0_4px_15px_3px_rgba(0,0,0,0.33)]"
      }
    >
      {/* <div className="absolute w-full h-full" /> */}

      <div className="z-10 w-[15%] h-full py-1 pl-1">
        <div className="relative w-full h-full">
          <Image alt="" fill src={"/imageResource/jatelindo-logo.png"} />
        </div>
      </div>

      <div className="flex-grow" />

      <div className="z-10 flex h-full  w-[30%] items-center justify-evenly">
        <Link href={"/"}>Job List</Link>
        <Link href={"/"}>Profil Perusahaan</Link>
        <Link href={"/"}>Bidang Pekerjaan</Link>
        <Link href={"/"}>Help</Link>
      </div>
    </div>
  );
}
