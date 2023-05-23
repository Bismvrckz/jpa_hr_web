import axiosInstance from "@/library/axios";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tooltip,
} from "@chakra-ui/react";
import { BaseSyntheticEvent } from "react";

export default function JobArchiveModal({ ...props }) {
  const { isOpen, onClose, jobList, setJobList } = props;

  async function onClickUnarchiveButton(event: BaseSyntheticEvent) {
    try {
      const resUnarchiveJob = await axiosInstance.patch(
        "/api/jobs/patch.postingStatusJob",
        {
          id: event.target.value,
          postingStatus: "DRAFT",
        }
      );

      const { update } = resUnarchiveJob.data;
      setJobList(update);
    } catch (error) {
      console.log({ error });
    }
  }

  function jobDivisionArchiveMap() {
    return jobList.map((job: any) => {
      console.log(job.postingStatus);

      if (job.postingStatus != "ARCHIVE") return;

      return (
        <Card
          flex={"none"}
          height={"10%"}
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={"3"}
          key={job.job_divisions_id}
        >
          <div>
            <CardHeader>{job.job_division_name}</CardHeader>
          </div>
          <div>
            <CardBody>
              <Tooltip hasArrow label="Click to unarchive">
                <Button
                  onClick={onClickUnarchiveButton}
                  value={job.job_divisions_id}
                  colorScheme={"facebook"}
                >
                  Status: Archive
                </Button>
              </Tooltip>
            </CardBody>
          </div>
        </Card>
      );
    });
  }

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Archive Bidang</ModalHeader>
        <ModalBody alignItems={"center"} justifyContent={"center"} padding={3}>
          <div className="h-[50vh] bg-slate-400 rounded-md flex flex-col overflow-auto p-4">
            {jobDivisionArchiveMap()}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={"red"} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export async function getServerSideProps() {
  try {
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
}
