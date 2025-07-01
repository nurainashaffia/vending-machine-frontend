import "./checkoutDialog.css";

const CheckoutDialog = ({ message, isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-checkout">
                <p>{message}</p>
                <div className="modal-buttons-checkout">
                    <button className="cancel-btn" onClick={onCancel}>Cancel</button>
                    <button className="confirm-btn" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutDialog;