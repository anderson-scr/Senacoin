import Modal from "../../../../../common/modal/modalIndex";
import ModalHeader from "../../../././../../common/modal/components/modalHead";
import ModalBody from "../../../../../common/modal/components/modalBody";
import ModalFooter from "../../../../../common/modal/components/modalFooter";

export default function TestModal(props) {
  return (
    <Modal>
      <ModalHeader>
        <h3>Test Modal #1</h3>
      </ModalHeader>
      <ModalBody>
        <p>Body of modal #1</p>
      </ModalBody>
      <ModalFooter>
        <button onClick={ props.close } className="btn btn-primary">Close Modal</button>
      </ModalFooter>
    </Modal>
  );
}