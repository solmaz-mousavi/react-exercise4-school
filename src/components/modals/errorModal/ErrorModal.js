import React, { useContext} from 'react';
import { ContextData } from "../../../contexts/ContextData";
import { IoMdClose } from "react-icons/io";
import { MdError } from "react-icons/md";
import "./errorModal.css"

function ErrorModal( {errorText} ) {
	const ContextDatas = useContext(ContextData);

	const closemodalHandler = () => {
		ContextDatas.setShowErrorModal(false);
	};

	return (
		<div className={`error-modal-container ${ContextDatas.showErrorModal ? 'show' : ''}`}>
 			<div className='error-modal-wrapper'>
 			<div className='close-btn' title='close' onClick={closemodalHandler}><IoMdClose /></div>
			  <div className="error-icon">
					<MdError />
				</div>
 				<p>{errorText}</p>
 			</div>
 		</div>
	)
}

export default ErrorModal