import Modal from "../../../../../common/modal/modalIndex";
import ModalBody from "../../../../../common/modal/components/modalBody";
import ModalFooter from "../../../../../common/modal/components/modalFooter";
import './loginInvalidoStyle.css'

export default function LoginCampos(props) {
  return (
    <Modal>
      <ModalBody>
        <p>Por favor, preencha todos os campos.</p>
      </ModalBody>
      <ModalFooter>
        <button onClick={ props.close } className="btn btn-primary btnConfirmaSenhaModal">Ok</button>
      </ModalFooter>
    </Modal>
  );
}