export default function Modal(props) {
  return (
    <div className="modal d-block">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          { props.children }
        </div>
      </div>
    </div>
  );
}