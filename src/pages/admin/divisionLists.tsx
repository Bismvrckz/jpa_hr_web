import axiosInstance from "@/library/axios";
import { Button, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import TambahBidangPekerjaan from "../../../components/modals/bidangPekerjaan";
import BidangPekerjaanCardAdmin from "../../../components/cards/bidangPekerjaanAdmin";
import JobDivisionArchive from "../../../components/modals/archiveBidangPekerjaan";
import AdminNavbar from "../../../components/navbar/admin";

export default function AdminDivisionLists(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jobDivisionsState, setJobDivisionsState] = useState(
    props.jobDivisions
  );

  function JobDivisionArchiveModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <div>
        <Button size={"lg"} colorScheme={"linkedin"} onClick={onOpen}>
          Archive
        </Button>
        <JobDivisionArchive
          onClose={onClose}
          isOpen={isOpen}
          jobDivisionsState={jobDivisionsState}
          setJobDivisionsState={setJobDivisionsState}
        />
      </div>
    );
  }

  function adminJobDivisionsMap() {
    const array: any[] = [];

    for (const jobDivision of jobDivisionsState) {
      if (jobDivision.postingStatus == "ARCHIVE") continue;

      array.push(
        <BidangPekerjaanCardAdmin
          setJobDivisionsState={setJobDivisionsState}
          postingStatus={jobDivision.postingStatus}
          name={jobDivision.job_division_name}
          key={jobDivision.job_divisions_id}
          id={jobDivision.job_divisions_id}
          // summary={jobDivision.summary}
          image={jobDivision.imageDir}
          detail={jobDivision.detail}
        />
      );
    }

    return array;
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex items-center justify-start w-full h-full bg-slate-400 pt-[6vh]">
        <div className="grow h-full flex flex-col items-start p-5">
          <div className=" w-full h-[20%] flex flex-col justify-evenly items-stretch">
            <Button size={"lg"} onClick={onOpen}>
              Bidang Baru +
            </Button>
            {JobDivisionArchiveModal()}
            <Link href={"/"}>
              <Button size={"lg"}>Go back</Button>
            </Link>
            <TambahBidangPekerjaan
              isOpen={isOpen}
              onClose={onClose}
              jobDivisionsState={jobDivisionsState}
              setJobDivisionsState={setJobDivisionsState}
            />
          </div>
        </div>

        {/* {JobDivisionArchiveModal()} */}

        <div className="bg-orange-400 w-[90%] h-full flex items-center justify-center">
          <div className="bg-slate-300 w-[90%] h-[90%] rounded-lg flex flex-col overflow-auto px-[1vh]">
            {adminJobDivisionsMap()}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const resGetBidangPekerjaan = await axiosInstance.get(
      "/api/jobs/get.jobDivisions",
      {
        params: {
          job_divisions_id: "all",
        },
      }
    );

    const { resGetJobDivisions } = resGetBidangPekerjaan.data;

    return {
      props: {
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
