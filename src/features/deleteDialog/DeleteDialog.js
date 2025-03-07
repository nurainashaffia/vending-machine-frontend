import React from "react";
import "./deleteDialog.css";

const DeleteDialog = ({ message, isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-delete">
                <p>{message}</p>
                <div className="modal-buttons-delete">
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="confirm-btn" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialog;