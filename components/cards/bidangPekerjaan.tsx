import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function JobDivisionsCard({ ...props }) {
  const { name, descriptions, image, id } = props;

  const router = useRouter();

  return (
    <Card
      width={"30%"}
      borderRadius={0}
      className="shadow-[0_4px_15px_3px_rgba(0,0,0,0.33)]"
    >
      <CardHeader bg={"black"} h={"30vh"} position={"relative"}>
        <Image src={image} alt="" fill />
      </CardHeader>
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{name}</Heading>
          <Text>{descriptions}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            onClick={() => {
              router.replace(`/divisionLists/${id}`);
            }}
            variant="solid"
            colorScheme="blue"
            borderRadius={0}
          >
            Selengkapnya +
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
