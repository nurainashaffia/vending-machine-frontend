import './logoutDialog.css';

const LogoutDialog = ({ message, isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="logout-modal-overlay">
            <div className="logout-modal">
                <p>{message}</p>
                <div className="logout-modal-buttons">
                    <button className="logout-cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="logout-confirm-btn" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default LogoutDialog;