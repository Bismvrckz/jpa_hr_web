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
  HStack,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function TambahJobAdmin({ ...props }) {
  const { isOpen, onClose, jobDivisions, setJobList, job } = props;

  const toast = useToast();

  const [imageInputField, setImageInputField] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [jobImage, setJobImage] = useState("");
  const [inputs, setInputs] = useState({
    job_list_id: new Date().getTime(),
    job_divisions_id: "",
    batasPengiriman: "",
    postingStatus: "",
    full_desc: "",
    sort_desc: "",
    min_salary: 0,
    max_salary: 0,
    imageDir: "",
    job_name: "",
    level: "",
  });

  useEffect(() => {
    if (job) {
      const {
        job_divisions_id,
        batasPengiriman,
        postingStatus,
        job_list_id,
        min_salary,
        max_salary,
        sort_desc,
        full_desc,
        job_name,
        imageDir,
        level,
      } = job;

      setIsEdit(true);
      setInputs({
        job_list_id: job_list_id,
        level: level,
        imageDir: imageDir,
        job_name: job_name,
        sort_desc: sort_desc,
        full_desc: full_desc,
        min_salary: parseInt(min_salary),
        max_salary: parseInt(max_salary),
        postingStatus: postingStatus,
        batasPengiriman: batasPengiriman,
        job_divisions_id: job_divisions_id,
      });
      setImageInputField(imageDir);
    }
  }, []);

  const handleInputChange = (prop: string) => (event: any) => {
    if (prop == "batasPengiriman")
      return setInputs({
        ...inputs,
        [prop]: `${event.target.value}:00:00.000Z`,
      });

    setInputs({ ...inputs, [prop]: event.target.value });
  };

  function handleChangeImage(event: any) {
    setJobImage(event.target.files[0]);
    setImageInputField(event.target.files[0].name);
  }

  async function onClickSubmit() {
    try {
      if (
        inputs.min_salary > inputs.max_salary ||
        inputs.max_salary < inputs.min_salary
      ) {
        return toast({
          title: "Error!",
          position: "top",
          status: "error",
          isClosable: true,
          description: "Invalid input, salary",
        });
      }

      const imageBody = new FormData();
      imageBody.append("jobImage", jobImage);

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        params: inputs,
      };

      const resPostJob = await axiosInstance.post(
        "/api/images/post.newJobImage",
        imageBody,
        config
      );

      setJobList(resPostJob.data.update);
      toast({
        status: "success",
        position: "top",
        isClosable: true,
        title: "Success",
        description: "Sukses tambah job",
      });
      return onClose();
    } catch (error: any) {
      if (error.response.data.error.name == "SequelizeUniqueConstraintError")
        return toast({
          status: "error",
          position: "top",
          isClosable: true,
          title: "Error",
          description: `Job Name sudah terpakai`,
        });
      console.log({ error });
    }
  }

  function jobDivisionsOptionMap() {
    return jobDivisions.map((divison: any) => {
      return (
        <option key={divison.job_divisions_id} value={divison.job_divisions_id}>
          {divison.job_division_name}
        </option>
      );
    });
  }

  function onCancel() {
    onClose();
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
        <ModalHeader>Job</ModalHeader>

        <ModalBody>
          <div className="flex h-[20%]">
            <div className="w-[50%] flex flex-col justify-between">
              <Text>Judul & Level Job</Text>
              <Input
                value={inputs.job_name}
                w={"90%"}
                onChange={handleInputChange("job_name")}
              />

              <Select
                placeholder="Pilih level"
                value={inputs.level}
                size={"sm"}
                w={"90%"}
                rounded={"md"}
                onChange={handleInputChange("level")}
              >
                <option value={"Fresh Graduate"}>Fresh Graduate</option>
                <option value={"Middle"}>Middle</option>
                <option value={"Senior"}>Senior</option>
                <option value={"Manager"}>Manager</option>
              </Select>
            </div>
            <div className="w-[50%] flex flex-col justify-between">
              <Text>Deskripsi Singkat</Text>
              <Textarea
                resize={"none"}
                value={inputs.sort_desc}
                onChange={handleInputChange("sort_desc")}
              />
            </div>
          </div>

          <div className="h-[40%]">
            <Text padding={"3"}>Deskripsi Lengkap</Text>
            <ReactQuill
              className="h-[60%]"
              theme="snow"
              value={inputs.full_desc}
              onChange={(event) => {
                setInputs({ ...inputs, full_desc: event });
              }}
            />
          </div>

          <div className="flex h-[20%] justify-between items-center">
            <div className="w-[45%] flex justify-between">
              <div className="w-[45%]">
                <Text>Minimum Gaji</Text>
                <NumberInput
                  value={inputs.min_salary}
                  step={1000000}
                  min={0}
                  max={inputs.max_salary}
                >
                  <NumberInputField
                    onChange={(event) => {
                      setInputs({
                        ...inputs,
                        min_salary: parseInt(event.target.value),
                      });
                    }}
                  />
                </NumberInput>
              </div>

              <div className="w-[45%]">
                <Text>Maksimum Gaji</Text>
                <NumberInput
                  value={inputs.max_salary}
                  step={1000000}
                  min={inputs.min_salary}
                >
                  <NumberInputField
                    onChange={(event) => {
                      setInputs({
                        ...inputs,
                        max_salary: parseInt(event.target.value),
                      });
                    }}
                  />
                </NumberInput>
              </div>
            </div>
            <div className="w-[45%]">
              <Text>Batas Pengiriman Berkas(MM/DD/YY):</Text>
              <Input
                placeholder="Insert date"
                type={"date"}
                onChange={handleInputChange("batasPengiriman")}
              />
            </div>
          </div>

          <div className="flex h-[20%] justify-between items-center">
            <div className="w-[45%]">
              <Text>Bidang Job</Text>
              <Select
                placeholder="Pilih Bidang"
                onChange={handleInputChange("job_divisions_id")}
              >
                {jobDivisionsOptionMap()}
              </Select>
            </div>
            <div className="w-[45%]">
              <HStack>
                <Text>Pilih Gambar</Text>
                <Text textColor={"red.500"}>*optional</Text>
              </HStack>
              <InputGroup>
                <Input isDisabled={true} w={"100%"} value={imageInputField} />
                <InputRightAddon px={"0%"}>
                  <label htmlFor="fileInput">
                    <div className="cursor-pointer p-3">Browse</div>
                  </label>

                  <input
                    type={"file"}
                    id="fileInput"
                    className="hidden"
                    onChange={handleChangeImage}
                  />
                </InputRightAddon>
              </InputGroup>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Select
            placeholder="Pilih Status"
            w={"15vw"}
            value={inputs.postingStatus}
            onChange={handleInputChange("postingStatus")}
          >
            <option value={"PUBLISH"}>Publish</option>
            <option value={"DRAFT"}>Draft</option>
          </Select>
          <Button colorScheme="red" ml={"3"} onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme="blue" ml={"3"} onClick={onClickSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
