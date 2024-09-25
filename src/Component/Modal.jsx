import { useRef, useState, useEffect } from 'react';
import style from '../Styles/modal.module.css';
import Button from './Button';
const Modal = ({ isOpen, children, onConfirm }) => {
	const [isModalOpen, setModalOpen] = useState(isOpen);
	const modalRef = useRef(null);

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Escape') {
			handleCloseModal();
		}
	};

	useEffect(() => {
		setModalOpen(isOpen);
	}, [isOpen]);

	useEffect(() => {
		const modalElement = modalRef.current;

		if (modalElement) {
			if (isModalOpen) {
				modalElement.showModal();
			} else {
				modalElement.close();
			}
		}
	}, [isModalOpen]);

	return (
		<dialog ref={modalRef} onKeyDown={handleKeyDown} className={style.modal}>
			<div>
				{children}
			</div>
			<div>
				<Button handler={handleCloseModal}>Close</Button>
				<Button handler={onConfirm}>Ok</Button>
			</div>
		</dialog>
	);
};

export default Modal;
