import Modal from "common/modal/modalIndex";
import ModalHeader from "common/modal/components/modalHead";
import ModalBody from "common/modal/components/modalBody";
import ModalFooter from "common/modal/components/modalFooter";

export default function ModalSelecionarItem() {
  return (
    <Modal>
      <ModalHeader>
        <h3>Senha enviada com sucesso!</h3>
      </ModalHeader>
      <ModalBody>
        <p>Enviamos uma senha para o email informado.</p>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary btnConfirmaSenhaModal">Ok</button>
      </ModalFooter>
    </Modal>
  );
}