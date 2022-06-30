import Modal from "../../../../../common/modal/modalIndex";
import ModalHeader from "../../../../../common/modal/components/modalHead";
import ModalBody from "../../../../../common/modal/components/modalBody";
import ModalFooter from "../../../../../common/modal/components/modalFooter";
import './modalEsqueceuSenhaStyle.css'

export default function ModalEmailIncompativel(props) {
  return (
    <Modal>
      <ModalHeader>
        <h3>Erro!</h3>
      </ModalHeader>
      <ModalBody>
        <p>Os emails nao sao iguais.</p>
      </ModalBody>
      <ModalFooter>
        <button onClick={ props.close } className="btn btn-primary btnConfirmaSenhaModal">Ok</button>
      </ModalFooter>
    </Modal>
  );
}