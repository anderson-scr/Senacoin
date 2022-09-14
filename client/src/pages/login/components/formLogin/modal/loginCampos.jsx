import { useEffect } from "react";
import Modal from "common/modal/modalIndex";
import ModalBody from "common/modal/components/modalBody";
import ModalFooter from "common/modal/components/modalFooter";
import './loginInvalidoStyle.css'

export default function LoginCampos(props) {
  useEffect(() => {
    const btnConfirmModal = document.querySelector("#btnConfirmModal")
    btnConfirmModal.focus()
  }, [])

  return (
    <Modal>
      <ModalBody>
        <p>Por favor, preencha todos os campos.</p>
      </ModalBody>
      <ModalFooter>
        <button onClick={ props.close } className="btn btn-primary btnConfirmaSenhaModal" id="btnConfirmModal">Ok</button>
      </ModalFooter>
    </Modal>
  );
}