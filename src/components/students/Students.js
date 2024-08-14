import React, { useState, useEffect, useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import { ContextData } from "../../contexts/ContextData";
import { MdDeleteOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { BsCardChecklist } from "react-icons/bs";
import Pagination from "../subComponents/pagination/Pagination";
import DeleteModal from "../modals/deleteModal/DeleteModal";
import ErrorModal from "../modals/errorModal/ErrorModal";
import TableTop from "../subComponents/tableTop/TableTop";
import Table from "../subComponents/table/Table";

function Students() {
	const ContextDatas = useContext(ContextData);
	const navigate = useNavigate();

	const [deletedId, setDeletedId] = useState('');
	const [search, setSearch] = useState('');
	const [errorText, setErrorText] = useState('');

// methods:
	const deleteStudentHandler = (event) => {
		if(ContextDatas.calcUnitSumByStdID(event.target.getAttribute('name')) > 0){
			setErrorText("دانشجو دارای واحدهای انتخابی بوده و امکان حذف وجود ندارد")
			ContextDatas.setShowErrorModal(true);
		} else {
			setDeletedId(event.target.getAttribute('name'));
			ContextDatas.setShowDeleteModal(true);
		}
	};
	
	const takedCourseReport = (event) => {
		navigate(`/students/report/taked-courses/${event.target.getAttribute('name')}`)
	};

	const takeCourseHandler = (event) => {
		navigate(`/students/take-courses/${event.target.getAttribute('name')}`)
	};

	const searchHandler = () => {
		if(search === ''){
			ContextDatas.setFilteredData(ContextDatas.students);
		} else {
			ContextDatas.setFilteredData(ContextDatas.students.filter(student => student.firstName.includes(search) || student.lastName.includes(search) || ContextDatas.getField(student.field).title.includes(search) ))
		}
	};
	
	// table contents:
	const title = [
		'شماره دانشجویی',
	  'نام',
	  'نام خانوادگی',
		'رشته تحصیلی',
		'جمع واحدهای انتخابی'
	];
	
	let body = [];
	ContextDatas.paginatedFilteredData.forEach((student) => {
		let newItem = [
			student.id,
			student.firstName,
			student.lastName,
			ContextDatas.getField(student.field)?.title,
			ContextDatas.calcUnitSumByStdID(student.id)
		];
		body = [...body, newItem];
	});

	const actions = [
		{icon:<MdDeleteOutline />, tooltip:"حذف دانشجو", method:deleteStudentHandler ,class:"btn-red"},
		{icon:<CgDetailsMore />, tooltip:"مشاهده واحدها", method:takedCourseReport ,class:"btn-green"},
		{icon:<BsCardChecklist />, tooltip:"انتخاب واحد", method:takeCourseHandler ,class:"btn-blue"}
	];

	useEffect(()=>{
		ContextDatas.setFilteredData(ContextDatas.students);
	},[]);

	return (
		<div>
      <div className="container">
 				<TableTop addMethod={()=>navigate('/students/add')} searchMethod={searchHandler} search={search} setSearch={setSearch} />
 				<Table title={title} body={body} actions={actions} />
      </div>
      
 			<Pagination />
 			<DeleteModal ID={deletedId} tableName='students' methodName='setStudents'/>
			<ErrorModal errorText={errorText} />
    </div>
	)
}

export default Students
