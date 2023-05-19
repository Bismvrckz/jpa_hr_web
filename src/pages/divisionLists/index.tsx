import axiosInstance from "@/library/axios";
import { Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";

export default function DivisionLists(props: any) {
  const { jobDivisions } = props;
  const router = useRouter();

  function jobListMap() {
    const { resGetJobDivisions } = jobDivisions;

    return resGetJobDivisions.map((jobDivision: any) => {
      return (
        <div
          key={jobDivision.job_divisions_id}
          className="w-full flex h-[20%] bg-slate-300 flex-none my-5 items-center justify-between px-5"
        >
          <Text w={"20%"} fontWeight={700}>
            {jobDivision.job_division_name}
          </Text>

          <div dangerouslySetInnerHTML={{ __html: jobDivision.detail }} />

          <Button
            colorScheme={"linkedin"}
            borderRadius={"0"}
            size="lg"
            fontSize={"sm"}
            onClick={() => {
              router.replace(`/divisionLists/${jobDivision.job_divisions_id}`);
            }}
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
    const resAxiosJobDivisions = await axiosInstance.get(
      "/api/jobs/get.jobDivisions",
      {
        params: {
          job_divisions_id: "all",
        },
      }
    );

    return {
      props: {
        jobDivisions: resAxiosJobDivisions.data,
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
