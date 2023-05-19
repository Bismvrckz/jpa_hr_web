import axiosInstance from "@/library/axios";
import { Text } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import JobDivisionsCard from "../../../components/cards/bidangPekerjaan";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";

export default function JobDivisionsDetail(props: any) {
  const { jobDivision, allJobDivision } = props;
  const [jobDetail, setJobDetail] = useState();

  //   const [jobDivisionsRecommendation, setJobDivisionsRecommendation] =
  //     useState();
  //   const [page, setPage] = useState(1);

  useEffect(() => {
    setJobDetail(jobDivision.detail);
  }, []);

  function jobDivisionsMap() {
    const array: any[] = [];
    for (const jobDivision of allJobDivision) {
      array.push(
        <JobDivisionsCard
          key={jobDivision.job_divisions_id}
          id={jobDivision.job_divisions_id}
          name={jobDivision.job_division_name}
          image={jobDivision.imageDir}
          // descriptions={jobDivision.summary}
        />
      );
    }

    return array;
  }

  function imageMap() {
    const imageDisplay = [];

    for (let i = 1; i <= 6; i++) {
      imageDisplay.push(
        <div
          key={i}
          className="bg-blue-500 w-1/3 h-1/2 flex items-center justify-center"
        >
          Gambar {i}
        </div>
      );
    }

    return imageDisplay;
  }

  return (
    <div className="w-screen h-[220vh] flex flex-col">
      <Navbar />

      <div className="relative mt-[6vh] w-screen h-96">
        <Image src={jobDivision.imageDir} alt="" fill />
      </div>

      <div className="flex flex-col px-20">
        <div className="flex flex-col bg-orange-500 rounded-t-lg h-[70vh] ">
          <Text fontWeight={800} fontSize={"2rem"}>
            Detail Bidang
          </Text>

          <Text mt={"10"} fontWeight={600} fontSize={"1.5rem"}>
            {jobDivision.job_division_name}
          </Text>

          <Text dangerouslySetInnerHTML={{ __html: `${jobDetail}` }} />
        </div>

        <div className="flex flex-col flex-wrap h-[50vh] ">{imageMap()}</div>

        <div className="bg-orange-400 w-full h-[50vh] flex flex-col">
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
                deleniti recusandae excepturi inventore eum ut accusantium,
                neque, quisquam debitis dolores fuga labore ab?
              </Text>
            </div>

            <div className="flex items-center justify-evenly relative w-[70%]">
              {jobDivisionsMap()}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const { job_divisions_id } = context.params;

    const resAxiosJobDivisions = await axiosInstance.get(
      "/api/jobs/get.jobDivisions",
      {
        params: {
          job_divisions_id,
        },
      }
    );

    const resAxiosAllJobDivisions = await axiosInstance.get(
      "/api/jobs/get.jobDivisions",
      {
        params: {
          limit: 3,
          avoid: job_divisions_id,
        },
      }
    );

    return {
      props: {
        jobDivision: resAxiosJobDivisions.data.resGetJobDivisions,
        allJobDivision: resAxiosAllJobDivisions.data.resGetJobDivisions,
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
