import axiosInstance, { API_URL } from "@/library/axios";
import {
  PopoverCloseButton,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  PopoverArrow,
  PopoverBody,
  CardFooter,
  useToast,
  CardBody,
  Heading,
  Popover,
  Button,
  Stack,
  Card,
  Text,
  PopoverHeader,
} from "@chakra-ui/react";
import Image from "next/image";
import type { NextPage } from "next";
import TambahBidangPekerjaan from "../modals/bidangPekerjaan";

interface Props {
  name: any;
  image: any;
  // summary: any;
  detail: any;
  postingStatus: any;
  id: any;
  setJobDivisionsState: any;
}

const BidangPekerjaanCardAdmin: NextPage<Props> = ({ ...props }) => {
  const {
    name,
    image,
    // summary,
    detail,
    id,
    setJobDivisionsState,
    postingStatus,
  } = props;

  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();

  async function deleteJobDivisions() {
    try {
      const resDelete = await axiosInstance.delete(
        "/api/jobs/delete.jobDivisions",
        { params: { id } }
      );

      toast({
        title: "Success!",
        description: "Sukses hapus bidang pekerjaan",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setJobDivisionsState(resDelete.data.jobDivisionsUpdate);
    } catch (error) {
      console.log({ error });
    }
  }

  async function changeStatusFunction(event: any) {
    try {
      const resAxiosChangeStatus = await axiosInstance.patch(
        "/api/jobs/patch.postingStatus",
        {
          id,
          postingStatus: event.target.value,
        }
      );

      const { update } = resAxiosChangeStatus.data;
      setJobDivisionsState(update);
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      flex="none"
      marginY="1vh"
      overflow="hidden"
      height={"30%"}
      variant="outline"
    >
      <TambahBidangPekerjaan
        setJobDivisionsState={setJobDivisionsState}
        postingStatus={postingStatus}
        // summary={summary}
        onClose={onClose}
        detail={detail}
        isOpen={isOpen}
        image={image}
        name={name}
        id={id}
      />

      <div className="relative grow">
        <Image
          fill
          unoptimized
          loader={() => {
            return `${API_URL}${image}`;
          }}
          src={`${API_URL}${image}`}
          alt={name}
        />
      </div>

      <Stack w={"85%"}>
        <CardBody>
          <Heading size="md">{name}</Heading>

          {/* <Text py="2">{summary}</Text> */}
        </CardBody>

        <CardFooter>
          <Button variant="ghost" colorScheme="facebook" onClick={onOpen}>
            Edit
          </Button>

          <Button
            variant="ghost"
            colorScheme="red"
            marginX={"5"}
            onClick={deleteJobDivisions}
          >
            Delete
          </Button>

          <Popover colorScheme={"linkedin"}>
            <PopoverTrigger>
              <Button
                variant={"ghost"}
                colorScheme={
                  postingStatus == "PUBLISH"
                    ? "green"
                    : postingStatus == "DRAFT"
                    ? "red"
                    : "linkedin"
                }
              >
                Status: {postingStatus}
              </Button>
            </PopoverTrigger>
            <PopoverContent width={"20vh"}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Change Status</PopoverHeader>
              <PopoverBody
                justifyContent={"space-evenly"}
                display={"flex"}
                h={"100%"}
              >
                <Button
                  variant={"ghost"}
                  onClick={changeStatusFunction}
                  value={postingStatus == "PUBLISH" ? "DRAFT" : "PUBLISH"}
                  colorScheme={postingStatus == "PUBLISH" ? "red" : "green"}
                >
                  {postingStatus == "PUBLISH" ? "Draft" : "Publish"}
                </Button>
                <Button
                  value={"Archive"}
                  variant={"outline"}
                  onClick={changeStatusFunction}
                  colorScheme={"facebook"}
                >
                  Archive
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default BidangPekerjaanCardAdmin;
