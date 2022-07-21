import Modal from "common/modal/modalIndex";
import ModalBody from "common/modal/components/modalBody";
import ModalFooter from "common/modal/components/modalFooter";
import './loginInvalidoStyle.css'

export default function LoginInvalido(props) {
  return (
    <Modal>
      <ModalBody>
        <p>A informacoes de login estao incorretas.</p>
      </ModalBody>
      <ModalFooter>
        <button onClick={ props.close } className="btn btn-primary btnConfirmaSenhaModal">Ok</button>
      </ModalFooter>
    </Modal>
  );
}