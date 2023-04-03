import Link from "next/link";

export default function Navbar({ ...props }) {
  const { className } = props;

  return (
    <div className={className + "relative flex justify-end"}>
      <div className="absolute bg-blue-400 w-full h-full" />
      <div className="z-10 flex items-center font-[900] bg-white">LOGO</div>
      <div className="flex-grow" />
      <div className="z-10 flex h-full bg-gray-100 w-[30%] items-center justify-evenly">
        <Link href={"/"}>Job List</Link>
        <Link href={"/"}>Profil Perusahaan</Link>
        <Link href={"/"}>Bidang Pekerjaan</Link>
      </div>
    </div>
  );
}
