import axiosInstance from "@/library/axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Text,
  Textarea,
  useToast,
  Select,
} from "@chakra-ui/react";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function TambahBidangPekerjaan({ ...props }) {
  const {
    onClose,
    isOpen,
    name,
    image,
    // summary,
    detail,
    postingStatus,
    setJobDivisionsState,
    jobDivisionsState,
    id,
  } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [divisionImage, setDivisionImage] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [divisionImageDisplay, setDivisionImageDisplay] = useState(
    image || "/imageResource/TambahProduk.svg"
  );

  const [jobInputs, setJobInputs] = useState({
    postingStatus: postingStatus || "",
    namaBidangPekerjaan: name || "",
    id: id || new Date().getTime(),
    // summary: summary || "",
    detail: detail || "",
    image: image || "",
  });

  const toast = useToast();

  useEffect(() => {
    if (name) {
      setIsEdit(true);
    }
  }, []);

  const handleChangeInputs = (prop: any) => (event: any) => {
    setJobInputs({ ...jobInputs, [prop]: event.target.value });
  };

  function handleImageChange(event: any) {
    setDivisionImageDisplay(URL.createObjectURL(event.target.files[0]));
    setJobInputs({ ...jobInputs, image: event.target.files[0].name });
    setDivisionImage(event.target.files[0]);
    setIsImageChanged(true);
  }

  function resetError() {
    setInputError(false);
  }

  function onCancel() {
    setJobInputs({
      postingStatus: postingStatus || "",
      namaBidangPekerjaan: name || "",
      id: id || new Date().getTime(),
      // summary: summary || "",
      detail: detail || "",
      image: image || "",
    });
    onClose();
  }

  async function onClickSubmit() {
    try {
      if (!jobInputs.namaBidangPekerjaan) {
        toast({
          title: "Alert!",
          description: "Tolong isi semua field penting",
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return setInputError(true);
      }

      for (const jobDivision of jobDivisionsState) {
        if (
          jobInputs.namaBidangPekerjaan == jobDivision.job_division_name &&
          jobInputs.id != jobDivision.job_divisions_id
        ) {
          toast({
            title: "Alert!",
            description: "Nama bidang telah terpakai",
            position: "top",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return setInputError(true);
        }
      }

      const newDivisionsImageData = new FormData();

      newDivisionsImageData.append("divisionImage", divisionImage);

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        params: jobInputs,
      };

      const resPostBidangPekerjaan = await axiosInstance.post(
        "/api/images/post.newJobDivisionImage",
        newDivisionsImageData,
        config
      );

      if (resPostBidangPekerjaan.data.status == "Success") {
        toast({
          title: "Success!",
          description: "Sukses buat bidang baru.",
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setJobDivisionsState(resPostBidangPekerjaan.data.newJobDivisionsUpdate);
        setDivisionImageDisplay("/imageResource/TambahProduk.svg");
        setJobInputs({
          postingStatus: postingStatus || "",
          namaBidangPekerjaan: name || "",
          id: id || new Date().getTime(),
          // summary: summary || "",
          detail: detail || "",
          image: image || "",
        });

        return onClose();
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function onClickSaveEdit() {
    try {
      if (!jobInputs.namaBidangPekerjaan) {
        toast({
          title: "Alert!",
          description: "Tolong isi semua field penting",
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return setInputError(true);
      }

      if (isImageChanged) {
        const imageBody = new FormData();

        imageBody.append("divisionImage", divisionImage);

        const config = {
          headers: { "Content-Type": "multipart/form-data" },
          params: jobInputs,
        };

        const resBidangPekerjaanImageEdit = await axiosInstance.patch(
          "/api/jobs/patch.jobDivisions",
          imageBody,
          config
        );

        const { dataUpdate } = resBidangPekerjaanImageEdit.data;
        setJobDivisionsState(dataUpdate);
        return toast({
          title: "Success!",
          description: "Sukses edit bidang.",
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      const resBidangPekerjaanEdit = await axiosInstance.patch(
        "/api/jobs/patch.jobDivisions",
        {},
        { params: jobInputs }
      );

      const { dataUpdate } = resBidangPekerjaanEdit.data;

      setJobDivisionsState(dataUpdate);

      toast({
        title: "Success!",
        description: "Sukses edit bidang.",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.log({ error });
      toast({
        title: "Error!",
        description: error.message,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  }

  return (
    <Modal
      size={"5xl"}
      isCentered={true}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent height={"60vh"}>
        <ModalHeader>{isEdit ? "Edit" : "Tambah"}Bidang Pekerjaan</ModalHeader>
        <ModalBody display={"flex"} alignItems={"stretch"}>
          <div className="w-1/2 flex flex-col justify-start pr-5">
            <Text fontWeight={700}>Nama Bidang Pekerjaan</Text>
            <Input
              onClick={resetError}
              isInvalid={inputError}
              value={jobInputs.namaBidangPekerjaan}
              onChange={handleChangeInputs("namaBidangPekerjaan")}
              size={"md"}
            />

            <Text fontWeight={700}>Detail</Text>
            <ReactQuill
              className="h-[60%]"
              theme="snow"
              value={jobInputs.detail}
              onChange={(event) => {
                setJobInputs({ ...jobInputs, detail: event });
              }}
            />

            <Select
              value={jobInputs.postingStatus}
              mt={"4vh"}
              placeholder="Select Status"
              onChange={handleChangeInputs("postingStatus")}
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISH">Publish</option>
            </Select>
          </div>

          <div className="w-1/2 flex flex-col pl-5">
            <Text fontWeight={700}>Image</Text>
            <Input
              disabled
              size={"sm"}
              mb={"2vh"}
              rounded={"lg"}
              value={jobInputs.image}
            />

            <label htmlFor="newImageInput">
              <div className="w-full h-[40vh] cursor-pointer relative">
                <Image
                  src={divisionImageDisplay}
                  alt=""
                  fill
                  className="rounded-lg"
                />
              </div>
            </label>

            <input
              type="file"
              id="newImageInput"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={isEdit ? onClickSaveEdit : onClickSubmit}
          >
            {isEdit ? "Save Edit" : "Submit"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
