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

export default function JobDivisionArchive({ ...props }) {
  const { isOpen, onClose, jobDivisionsState, setJobDivisionsState } = props;

  async function onClickUnarchiveButton(event: BaseSyntheticEvent) {
    try {
      // console.log(event.target.value);

      const resUnarchiveJobDivision = await axiosInstance.patch(
        "/api/jobs/patch.postingStatus",
        {
          id: event.target.value,
          postingStatus: "DRAFT",
        }
      );

      const { update } = resUnarchiveJobDivision.data;
      setJobDivisionsState(update);
    } catch (error) {
      console.log({ error });
    }
  }

  function jobDivisionArchiveMap() {
    return jobDivisionsState.map((jobDivision: any) => {
      if (jobDivision.postingStatus != "ARCHIVE") return;

      return (
        <Card
          flex={"none"}
          height={"10%"}
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={"3"}
          key={jobDivision.job_divisions_id}
        >
          <div>
            <CardHeader>{jobDivision.job_division_name}</CardHeader>
          </div>
          <div>
            <CardBody>
              <Tooltip hasArrow label="Click to unarchive">
                <Button
                  onClick={onClickUnarchiveButton}
                  value={jobDivision.job_divisions_id}
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
