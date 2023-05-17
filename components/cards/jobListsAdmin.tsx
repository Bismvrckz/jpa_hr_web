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

interface Props {
  job: any;
}

export const JobListCardAdmin: NextPage<Props> = ({ ...props }) => {
  const { job } = props;
  const {
    job_list_id,
    job_name,
    sort_desc,
    imageDir,
    job_divisions_id,
    min_salary,
    max_salary,
    postingStatus,
    level,
    batasPengiriman,
  } = job;

  return (
    <Card
      rounded={"xl"}
      direction={{ base: "column", sm: "row" }}
      flex="none"
      marginY="1vh"
      overflow="hidden"
      height={"30%"}
      variant="outline"
    >
      <div className="relative grow">
        <Image
          fill
          unoptimized
          loader={() => {
            return `${API_URL}${imageDir}`;
          }}
          src={`${API_URL}${imageDir}`}
          alt={job_name}
        />
      </div>

      <Stack w={"85%"}>
        <CardBody>
          <Heading size="md">{job_name}</Heading>

          <Text py="2">{sort_desc}</Text>
        </CardBody>

        <CardFooter>
          <Button
            variant="ghost"
            colorScheme="facebook"
            //   onClick={onOpen}
          >
            Edit
          </Button>

          <Button
            variant="ghost"
            colorScheme="red"
            marginX={"5"}
            // onClick={deleteJobDivisions}
          >
            Delete
          </Button>

          {/* <Popover colorScheme={"linkedin"}>
            <PopoverTrigger>
              <Button
                variant={"ghost"}
                // color/
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
          </Popover> */}
        </CardFooter>
      </Stack>
    </Card>
  );
};
