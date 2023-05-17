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
import JobDivisionsCard from "../../components/cards/bidangPekerjaan";
import axiosInstance from "@/library/axios";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Footer from "../../components/footer";

export default function Home(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { jobDivisions } = props;

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
  };

  const slideImages = [
    {
      url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    },
    {
      url: "http://localhost:3000/imageResource/main.jpg",
    },
  ];

  const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                className="w-[100vw] h-[67vh] flex bg-no-repeat items-stretch justify-center"
                style={{
                  backgroundImage: `url(${slideImage.url})`,
                }}
              />
            </div>
          ))}
        </Slide>
      </div>
    );
  };

  function jobDivisionsMap() {
    const array: any[] = [];
    for (const jobDivision of jobDivisions) {
      array.push(
        <JobDivisionsCard
          key={jobDivision.job_divisions_id}
          name={jobDivision.job_division_name}
          image={jobDivision.imageDir}
          // descriptions={jobDivision.summary}
        />
      );
    }

    return array;
  }

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <div className="w-screen flex flex-col">
      <Navbar />

      <div className="bg-slate-400 w-full h-[100vh] relative">
        {Slideshow()}
      </div>

      <div className="bg-white w-full p-[5vw] h-[80vh]">
        <div className="flex bg-slate-100">
          <div className="grow pl-[5%] flex flex-col pt-[20vh]">
            <Text fontSize={"5xl"} fontWeight={500}>
              Who we are?
            </Text>
            <Text fontSize={"3xl"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              ipsam ea rem, pariatur expedita mollitia quis quidem vel
              voluptatibus facilis nulla? Veritatis illo deleniti laborum!
              Fugiat voluptatem aut molestias inventore.
            </Text>
          </div>
          <div className="w-[45%] flex items-center justify-center">
            <div className="relative w-[40vw] h-[40vw] m-[1vh]">
              <Image alt="" src={"/imageResource/whoWeAre.jpg"} fill />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-full p-[5vw] h-[80vh]">
        <div className="flex flex-row-reverse bg-slate-100">
          <div className="grow pl-[5%] flex flex-col pt-[20vh]">
            <Text fontSize={"5xl"} fontWeight={500}>
              Who we are?
            </Text>
            <Text fontSize={"3xl"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              ipsam ea rem, pariatur expedita mollitia quis quidem vel
              voluptatibus facilis nulla? Veritatis illo deleniti laborum!
              Fugiat voluptatem aut molestias inventore.
            </Text>
          </div>
          <div className="w-[45%] flex items-center justify-center">
            <div className="relative w-[40vw] h-[40vw] m-[1vh]">
              <Image alt="" src={"/imageResource/whoWeAre.jpg"} fill />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-400 w-full h-[100vh] flex flex-col">
        <div className="w-full flex items-center justify-center h-[10%]">
          <Text fontSize={"2xl"} fontWeight={500} color={"white"}>
            Job Divisions
          </Text>
        </div>

        <div className="flex w-full h-full items-center">
          <div className="w-[30%] bg-blue-500 h-[30vh] pl-3 text-white">
            <Text fontSize={"3rem"} fontWeight={"600"}>
              Lorem Ipsum
            </Text>
            <Text fontSize={"1.2rem"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus facere quibusdam voluptas libero nesciunt vel nulla
              deleniti recusandae excepturi inventore eum ut accusantium, neque,
              quisquam debitis dolores fuga labore ab?
            </Text>
          </div>
          <div className="flex items-center justify-evenly relative w-[70%]">
            {jobDivisionsMap()}
          </div>
        </div>

        <Footer />
      </div>
      <PopupModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession({ req: context.req });

    const axiosGetJobDivisions = await axiosInstance.get(
      "/api/jobs/get.jobDivisions",
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
    return {
      props: {
        error,
      },
    };
  }
}
