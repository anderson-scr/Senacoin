import { useState, useEffect } from 'react';
import ModalService from '../services/modalService';
import styles from '../styles/modalRoot.module.css';

export default function ModalRoot() {
  const [modal, setModal] = useState({});

  useEffect(() => {
    ModalService.on('open', ({ component, props, funcs }) => {
      setModal({
        component,
        props,
        funcs,
        close: value => {
          setModal({});
        },
      });
    });
  }, []);

  const ModalComponent = modal.component ? modal.component : null;

  return (
    <section className={ modal.component ? styles.modalRoot : '' }>
      
      { ModalComponent && (
        <ModalComponent
          { ...modal.props }
          close={ modal.close }
          funcs={ modal.funcs }
          className={ ModalComponent ? 'd-block' : '' }
        />
      )}
      
    </section>
  );
}