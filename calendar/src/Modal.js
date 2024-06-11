import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
	const [modal, setModal] = useState(false);

	const toggleModal = () => {
		setModal(!modal);
	};

	if (modal) {
		document.body.classList.add('active-modal');
	} else {
		document.body.classList.remove('active-modal');
	}

	return ( 
			<div className="modal">
				<div onClick={toggleModal} className="overlay"></div>
				<div className="modal-content">
					<h2>Hello Modal</h2>
					<p>
						TESTING TESTING TESTING
					</p>
					<button className="close-modal" onClick={toggleModal}>
				  	CLOSE 
			    	</button>
			    </div>
		    </div>
	);
}