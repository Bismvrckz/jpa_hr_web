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

export default function JobDivisionsCard({ ...props }) {
  const { name, descriptions, image } = props;

  return (
    <Card maxW={"sm"} borderRadius={0}>
      <CardHeader bg={"black"} h={"30vh"} position={"relative"}>
        <Image src={image} alt="Green double couch with wooden legs" fill />
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
          <Button variant="solid" colorScheme="blue" borderRadius={0}>
            Selengkapnya +
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
