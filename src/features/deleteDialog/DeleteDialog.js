import React from "react";
import "./deleteDialog.css";

const DeleteDialog = ({ message, isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal">
                <p>{message}</p>
                <div className="delete-modal-buttons">
                    <button className="delete-cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="delete-confirm-btn" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteDialog;