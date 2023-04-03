import Link from "next/link";
import Navbar from "../../../components/navbar";

export default function admin(props: any) {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-start bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <Navbar className="bg-white w-[100%] h-[5%]" />
      <Link href={"/"}>
        <p>Go back</p>
      </Link>
    </div>
  );
}
