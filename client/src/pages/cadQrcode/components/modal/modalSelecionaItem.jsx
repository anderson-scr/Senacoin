import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verificaSessao } from "auth/login/verificaSessao";
import { cadQrcodeTableSchema } from "common/table/schemas/cadQrcode";
import Table from "common/table/tableIndex";
import { callTodosItemsAPI } from "api/item/apiTodos";

// Imports do modal
import Modal from "common/modal/modalIndex";
import ModalHeader from "common/modal/components/modalHead";
import ModalBody from "common/modal/components/modalBody";
import ModalFooter from "common/modal/components/modalFooter";


export default function ModalSelecionarItem(props) {
  const effectOnce = useRef(true)
  const navigate = useNavigate()

  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }
      return () => effectOnce.current = false
    }

  }, [navigate])

  return (
    <Modal>
      <ModalHeader>
        <h3>Selecione um item</h3>
      </ModalHeader>
      <ModalBody>
        <Table apiRoute={callTodosItemsAPI.ativos} columnSchema={cadQrcodeTableSchema} rowSize={15} />
      </ModalBody>
      <ModalFooter>
        <div className="w-100 d-flex justify-content-between">
          <button className="btn btnCancelar btn-outline-secondary w-25" onClick={ props.close } >Cancelar</button>
          <button className="btn btnSalvar btn-primary w-25" >Salvar</button>
        </div>
      </ModalFooter>
    </Modal>
  );
}