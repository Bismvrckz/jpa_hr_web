import axios from "axios";
import React, { useEffect, useState } from "react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Tr,
  Th,
  Td,
  Text,
  Thead,
  Input,
  Table,
  Tbody,
  Button,
  ButtonGroup,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axiosInstance from "@/library/axios";

export default function Jobcat(props: any) {
  const [users, setUsers] = useState(props.users);
  const [nameInput, setNameInput] = useState("");
  const [edit, setEdit] = useState("");
  const [editValue, setEditValue] = useState("");

  function usersMap() {
    return users.map((user: any) => {
      return (
        <Tr key={user.id}>
          <Td>{user.id}</Td>
          <Td>
            {edit == user.id ? (
              <Input
                size="xs"
                width={"80%"}
                h={"100%"}
                value={editValue}
                onChange={(e) => {
                  setEditValue(e.target.value);
                }}
              />
            ) : (
              user.name
            )}
          </Td>
          <Td>
            {edit == user.id ? (
              <CheckIcon
                cursor={"pointer"}
                color="green"
                onClick={() => {
                  editName(user.id, editValue);
                }}
              />
            ) : (
              <EditIcon
                color="yellow"
                onClick={() => {
                  setEditValue(user.name);
                  setEdit(user.id);
                }}
                cursor="pointer"
              />
            )}
          </Td>
          <Td>
            {edit == user.id ? (
              <CloseIcon
                color={"red"}
                cursor="pointer"
                onClick={() => {
                  setEdit("");
                }}
              />
            ) : (
              <DeleteIcon
                color={"red"}
                cursor="pointer"
                onClick={() => {
                  deleteName(user.id);
                }}
              />
            )}
          </Td>
        </Tr>
      );
    });
  }

  async function insertNewName() {
    try {
      const newEntry = await axios.post("/api/users/postUsers", {
        nameInput,
      });

      setUsers([...users, newEntry.data.resCreateData]);
    } catch (error) {
      console.log({ error });
    } finally {
      setNameInput("");
    }
  }

  async function deleteName(userId: number) {
    try {
      await axios.delete("/api/users/deleteUsers", {
        params: { userId },
      });

      setUsers(
        users.filter((user: any) => {
          return user.id != userId;
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }

  async function editName(userId: number, userName: String) {
    try {
      const resEdit = await axios.patch("/api/users/editUsers", {
        userId,
        userName,
      });

      setUsers(resEdit.data.fullTable);
      setEditValue("");
      setEdit("");

      return resEdit;
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div className="flex flex-col items-center justify-start w-[100vw] h-[100vh] bg-gray-400 pt-10">
      <Text>Names</Text>
      <Button colorScheme="blue" onClick={insertNewName}>
        Insert New
      </Button>
      <Input
        size={"lg"}
        h={"5vh"}
        w="50vw"
        my={"2vh"}
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
      ></Input>
      <div className="overflow-auto h-[80%] flex items-start justify-start">
        <TableContainer w={"50vw"}>
          <Table size={"sm"} variant={"striped"} colorScheme={"blue"}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Names</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>{usersMap()}</Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const resGetUser = await axiosInstance.get("/api/users/getUsers");

    return {
      props: {
        users: resGetUser.data.resGetTable,
      },
    };
  } catch (error) {
    return { props: { error } };
  }
}
