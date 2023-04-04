import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { signOut, getSession } from "next-auth/react";
import Navbar from "../../components/navbar";
import PopupModal from "../../components/popupModel";
import { useEffect } from "react";
import Image from "next/image";
import JobDivisionsCard from "../../components/bidangPekerjaanCard";
import axiosInstance from "@/library/axios";

export default function Home(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { jobDivisions } = props;

  function jobDivisionsMap() {
    const array: any = [];
    for (const jobDivision of jobDivisions) {
      array.push(
        <JobDivisionsCard
          key={jobDivision.job_divisions_id}
          name={jobDivision.job_division_name}
          image={jobDivision.image}
          descriptions={jobDivision.description}
        />
      );
    }

    return array;
  }

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <div className="w-screen h-[200vh] flex flex-col">
      <Navbar className={"fixed w-full h-[6vh] bg-black"} />

      <div className="bg-slate-400 w-full h-2/6 relative">
        <Image src="/imageResource/main.jpg" alt="" fill />
      </div>

      <div className="bg-white w-full h-2/6 flex p-11">
        <div className="w-[50%] pl-[5%] flex flex-col pt-[20vh]">
          <Text fontSize={"5xl"} fontWeight={500}>
            Who we are?
          </Text>
          <Text fontSize={"3xl"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsam
            ea rem, pariatur expedita mollitia quis quidem vel voluptatibus
            facilis nulla? Veritatis illo deleniti laborum! Fugiat voluptatem
            aut molestias inventore.
          </Text>
        </div>
        <div className="relative w-[50%]">
          <Image alt="" src={"/imageResource/whoWeAre.jpg"} fill />
        </div>
      </div>

      <div className="bg-orange-400 w-full h-2/6 flex flex-col">
        <div className="w-full flex items-center justify-center h-[10%]">
          <Text fontSize={"2xl"} fontWeight={500}>
            Job Divisions
          </Text>
        </div>
        <div className="pt-2 flex items-center justify-evenly">
          {jobDivisionsMap()}
        </div>
      </div>

      {/* <div className="bg-slate-400 w-full h-1/6"></div> */}

      {/* <div className="bg-cyan-400 w-full h-1/6"></div> */}
      {/* <div className="bg-orange-400 w-full h-1/5"></div> */}
      <PopupModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession({ req: context.req });

    const axiosGetJobDivisions = await axiosInstance.get(
      "/api/jobs/getJobDivisions",
      {
        params: {
          job_divisions_id: "all",
        },
      }
    );
    const { resGetJobDivisions } = axiosGetJobDivisions.data;

    return {
      props: {
        session,
        jobDivisions: resGetJobDivisions,
      },
    };
  } catch (error) {
    return { props: {} };
  }
}
