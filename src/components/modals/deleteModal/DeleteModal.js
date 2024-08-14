import React, { useContext } from 'react';
import { ContextData } from "../../../contexts/ContextData";
import "./deleteModal.css"

function DeleteModal({ID, tableName, methodName}) {
	const ContextDatas = useContext(ContextData);

	const deleteHandler = ()=>{
		ContextDatas[methodName] (ContextDatas[tableName].filter(item => item.id != ID));
		ContextDatas.setFilteredData(ContextDatas.filteredData.filter(item => item.id != ID));
		ContextDatas.setShowDeleteModal(false);
	}

	const cancelHandler = ()=> ContextDatas.setShowDeleteModal(false);

	return (
		<div className={`del-modal-container ${ContextDatas.showDeleteModal ? 'show' : ''}`}>
			<div className='del-modal-wrapper' >
				<p>آیا از حذف آیتم اطمینان دارید؟</p>
				<div className='del-modal-btn-container' >
					<button type='button' onClick={deleteHandler} className='btn btn-green'>بله</button>
					<button type='button' onClick={cancelHandler} className='btn btn-red'>خیر</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal