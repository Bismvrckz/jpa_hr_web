import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { signOut, getSession } from "next-auth/react";

export default function Home(props: any) {
  const { session } = props;

  return (
    <div className="w-[100vw] h-[100vh] text-[3rem] flex flex-col items-center justify-center">
      <p>{session ? "Logged in" : "Logged Out"}</p>
      <Button
        colorScheme={"linkedin"}
        onClick={() => {
          signOut();
        }}
      >
        Log Out
      </Button>
      <Link href="/login">
        <p>Login</p>
      </Link>
      <Link href={"/admin"}>
        <p>Admin</p>
      </Link>
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
