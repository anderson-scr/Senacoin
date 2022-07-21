import './styles/modalIndexStyle.css'

export default function Modal(props) {
  return (
    <div className="modal d-block" style={{textAlign: 'center'}}>
      <div className="modal-dialog modal-dialog-centered" >
        <div className="modal-content" >
          { props.children }
        </div>
      </div>
    </div>
  );
}