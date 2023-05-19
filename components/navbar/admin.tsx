import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IsLoggedState {
  user: object;
  expires: string;
  prevState: null;
}

export default function AdminNavbar({ ...props }) {
  const { className } = props;
  const [isLoggedIn, setIsLoggedIn] = useState<IsLoggedState | null>(null);

  async function getSessionAsync() {
    const session: any = await getSession();
    if (session) setIsLoggedIn(session);
  }

  useEffect(() => {
    getSessionAsync();
  }, []);

  return (
    <div
      className={
        className ||
        "fixed w-full h-[6vh] bg-white  flex justify-end z-50 shadow-[0_4px_15px_3px_rgba(0,0,0,0.33)]"
      }
    >
      {/* <div className="absolute w-full h-full" /> */}

      <div className="z-10 w-[15%] h-full py-1 pl-1">
        <div className="relative w-full h-full">
          {/* <Image alt="" fill src={"/imageResource/jatelindo-logo.png"} /> */}
          <p>Admin</p>
        </div>
      </div>

      <div className="flex-grow" />

      <div className="z-10 flex h-full  w-[30%] items-center justify-evenly">
        <Link href={"/"}>Home</Link>
        <Link href={"/admin/jobLists"}>List Lowongan</Link>
        <Link href={"/admin/divisionLists"}>List Bidang Pekerjaan</Link>
        {isLoggedIn ? (
          <p
            className="cursor-pointer"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </p>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </div>
    </div>
  );
}
