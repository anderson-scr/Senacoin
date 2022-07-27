const ModalService = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  open(component, props = {}, funcs, offset ) {
    document.dispatchEvent(new CustomEvent('open', { detail: { component, props, funcs, offset } }));
  },
};

export default ModalService;