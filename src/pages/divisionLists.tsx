import axiosInstance from "@/library/axios";
import { Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function DivisionLists(props: any) {
  const { jobLists } = props;

  function jobListMap() {
    const { resGetJobLists } = jobLists;

    return resGetJobLists.map((job: any) => {
      return (
        <div
          key={job.id}
          className="w-full flex h-[20%] bg-slate-300 flex-none my-5 items-center justify-start px-5"
        >
          <Text w={"20%"} fontWeight={700}>
            {job.job_name}
          </Text>
          <Text className="grow">{job.description}</Text>
          <Button
            colorScheme={"linkedin"}
            borderRadius={"0"}
            size="lg"
            fontSize={"sm"}
          >
            Detail
          </Button>
        </div>
      );
    });
  }

  return (
    <div className="w-screen h-[150vh] flex flex-col">
      <Navbar />

      <div className="relative h-[30%] w-full mt-[6vh]">
        <Image src={"/imageResource/bidangPekerjaan.jpg"} alt="" fill />
      </div>

      <div className="bg-gray-100 grow flex flex-col px-[10vw]">
        <Text fontSize={"4xl"}>Lorem Ipsum</Text>
        <Text fontSize={"xl"}>Lorem Ipsum dolor sit amet.</Text>
        <div className="flex flex-col h-[70%] overflow-auto justify-evenly">
          {jobListMap()}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const jobLists = await axiosInstance.get("/api/jobs/getJobLists", {
      params: {
        id: "all",
      },
    });

    return {
      props: {
        jobLists: jobLists.data,
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
