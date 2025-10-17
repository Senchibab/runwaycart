import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../forms/LoginForm';
import '../../styles/Modal.css';
import { useAuth } from '../../context/AuthContext';

function CreateModal() {
    const [open, setOpen] = useState(false);

    // Memoize onClose callback to prevent unwanted re-renders
    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <button className="top-right-button" onClick={() => setOpen(true)}>Sign in</button>
            <Modal isOpen={open} onClose={handleClose}>
                <div className="modal-header">
                    <h2 className="heading-secondary">Welcome back!</h2>
                    <p className="caption">We're so excited to see you again!</p>
                </div>
                <LoginForm />
            </Modal>
        </>
    );
}

function Modal({ isOpen, onClose, children }) {
    const { setError } = useAuth();

    const handleClose = useCallback(() => {
        setError(null);
        onClose();
    }, [setError, onClose]);

    useEffect(() => {
        if (!isOpen) return;

        function onKeyDown(event) {
            if (event.key === "Escape") {
                handleClose();
            }
        }
        console.log("adding listener");
        document.addEventListener("keydown", onKeyDown);
        return () => {
            console.log("removing listener");
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, handleClose]);

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div
                className="modal-content"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                <button className="close-btn" onClick={handleClose} aria-label="Close modal">
                    Close
                </button>
                {children}
            </div>
        </div>,
        document.getElementById("portal-root")
    );
}

export default CreateModal;
