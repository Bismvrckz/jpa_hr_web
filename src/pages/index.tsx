import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] text-[3rem] flex items-center justify-center">
      <Link href="/jobcat">
        <p>hello init</p>
      </Link>
    </div>
  );
}
