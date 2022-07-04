import Modal from "common/modal/modalIndex";
import ModalHeader from "common/modal/components/modalHead";
import ModalBody from "common/modal/components/modalBody";
import ModalFooter from "common/modal/components/modalFooter";
import './modalEsqueceuSenhaStyle.css'

export default function ModalEmailInvalido(props) {
  return (
    <Modal>
      <ModalHeader>
        <h3>Erro!</h3>
      </ModalHeader>
      <ModalBody>
        <p>O email informado esta incorreto.</p>
      </ModalBody>
      <ModalFooter>
        <button onClick={ props.close } className="btn btn-primary btnConfirmaSenhaModal">Ok</button>
      </ModalFooter>
    </Modal>
  );
}