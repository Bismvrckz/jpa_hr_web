import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { Button, useDisclosure } from "@chakra-ui/react";
import { signOut, getSession } from "next-auth/react";
import Navbar from "../../components/navbar";
import PopupModal from "../../components/popupModel";
import { useEffect } from "react";

export default function Home(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { session } = props;
  // console.log({ session });

  // return (
  //   <div className="w-[100vw] h-[100vh] text-[3rem] flex flex-col items-center justify-center">
  //     <p>{session ? "Logged in" : "Logged Out"}</p>
  //     <Button
  //       colorScheme={"linkedin"}
  //       onClick={() => {
  //         signOut();
  //       }}
  //     >
  //       Log Out
  //     </Button>
  //     <Link href="/login">
  //       <p>Login</p>
  //     </Link>
  //     <Link href={"/admin"}>
  //       <p>Admin</p>
  //     </Link>
  //   </div>
  // );

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <div className="w-screen h-[200vh] flex flex-col">
      <Navbar className={"fixed w-full h-[5vh] bg-slate-400"} />
      <div className="bg-slate-400 w-full h-2/6"></div>
      <div className="bg-cyan-400 w-full h-1/6"></div>
      <div className="bg-orange-400 w-full h-1/6"></div>
      <div className="bg-slate-400 w-full h-1/6"></div>
      <div className="bg-cyan-400 w-full h-1/6"></div>
      {/* <div className="bg-orange-400 w-full h-1/5"></div> */}
      <PopupModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession({ req: context.req });

    return {
      props: {
        session,
      },
    };
  } catch (error) {
    return { props: {} };
  }
}
