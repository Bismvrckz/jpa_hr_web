import { WarningTwoIcon } from "@chakra-ui/icons";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

export default function PopupModal({ ...props }) {
  const { isOpen, onClose } = props;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            color={"red"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <WarningTwoIcon />
            Waspada Penipuan
          </ModalHeader>
          <ModalBody>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consectetur deleniti quo quia impedit inventore beatae aperiam,
              nostrum quidem dicta, pariatur reiciendis corrupti tempore
              possimus sint sequi autem. Eos, accusantium minus?
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Ya, Saya mengerti.
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
