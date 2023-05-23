import axiosInstance from "@/library/axios";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { JobListCardAdmin } from "../../../components/cards/jobListsAdmin";
import JobArchiveModal from "../../../components/modals/archiveJob";
import TambahJobAdmin from "../../../components/modals/jobList";
import AdminNavbar from "../../../components/navbar/admin";

export default function AdminJobLists(props: any) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { resGetJobLists } = props?.jobLists;
  const { resGetJobDivisions } = props?.jobDivisions;

  const [jobList, setJobList] = useState(resGetJobLists);

  function jobListsMapFunction() {
    const array: any[] = [];

    for (const job of jobList) {
      if (job.postingStatus == "ARCHIVE") continue;

      array.push(
        <JobListCardAdmin
          setJobList={setJobList}
          key={job.job_list_id}
          job={job}
        />
      );
    }

    return array;
    return jobList.map((job: any) => {
      return (
        <JobListCardAdmin
          setJobList={setJobList}
          key={job.job_list_id}
          job={job}
        />
      );
    });
  }

  function jobArchiveModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <div>
        <Button size={"lg"} colorScheme={"linkedin"} onClick={onOpen}>
          Archive
        </Button>
        <JobArchiveModal
          isOpen={isOpen}
          onClose={onClose}
          jobList={jobList}
          setJobList={setJobList}
        />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <AdminNavbar />
      <div className="h-full w-full pt-[6vh] bg-orange-400 flex">
        <div className="w-[15%] p-3 flex flex-col">
          <Button mb={3} onClick={onOpen}>
            Tambah Job +
          </Button>
          {jobArchiveModal()}
          <TambahJobAdmin
            isOpen={isOpen}
            onClose={onClose}
            setJobList={setJobList}
            jobDivisions={resGetJobDivisions}
          />
        </div>
        <div className="w-[85%] bg-slate-500 flex items-center justify-center">
          <div className="w-[90%] h-[90%] bg-slate-200 rounded-xl p-3 overflow-auto">
            {jobListsMapFunction()}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(params: any) {
  try {
    const resGetJobList = await axiosInstance.get("/api/jobs/get.jobLists", {
      params: {
        id: "all",
      },
    });

    const resGetJobDivision = await axiosInstance.get(
      "/api/jobs/get.jobDivisions",
      {
        params: {
          job_divisions_id: "all",
        },
      }
    );

    return {
      props: {
        jobLists: resGetJobList.data,
        jobDivisions: resGetJobDivision.data,
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
