import React from "react";

const Modal = () => {
  return (
    <div
      className="modal fade"
      id="errorModal"
      tabIndex="-1"
      aria-labelledby="errorModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Username and/or password incorrect</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
