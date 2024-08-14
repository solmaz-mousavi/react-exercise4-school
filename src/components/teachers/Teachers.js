import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../contexts/ContextData";
import { MdDeleteOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import Pagination from "../subComponents/pagination/Pagination";
import DeleteModal from "../modals/deleteModal/DeleteModal";
import ErrorModal from "../modals/errorModal/ErrorModal";
import TableTop from "../subComponents/tableTop/TableTop";
import Table from "../subComponents/table/Table";

function Teachers() {
	const ContextDatas = useContext(ContextData);
	const navigate = useNavigate();

	const [deletedId, setDeletedId] = useState('');
	const [search, setSearch] = useState('');
	const [errorText, setErrorText] = useState('')
	
	// methods:
	const deleteTeacherHandler = (event) => {
		if(ContextDatas.calcCourseSumByTchrID(event.target.getAttribute('name')) > 0){
			setErrorText("استاد دارای دروس تدریسی بوده و امکان حذف وجود ندارد")
			ContextDatas.setShowErrorModal(true);
		} else {
			setDeletedId(event.target.getAttribute('name'));
			ContextDatas.setShowDeleteModal(true);
		}
	};

	const teacherCourseReportHandler = (event) => {
		navigate(`/teachers/report/teacher-courses/${event.target.getAttribute('name')}`)
	}

	const searchHandler = () => {
		if(search === ''){
			ContextDatas.setFilteredData(ContextDatas.teachers);
		} else {
				ContextDatas.setFilteredData(ContextDatas.teachers.filter(teacher => teacher.firstName.includes(search) || teacher.lastName.includes(search) ))
		}
	}
	
	// table contents:
	const title = [
		'شماره شناسایی',
		'نام',
		'نام خانوادگی',
		'تعداد دروس تدریسی'
	];
	
	let body = [];
	ContextDatas.paginatedFilteredData.forEach((teacher) => {
		let newItem = [
			teacher.id,
			teacher.firstName,
			teacher.lastName,
			ContextDatas.calcCourseSumByTchrID(teacher.id)
		];
		body = [...body, newItem];
	});

	const actions = [
		{icon:<MdDeleteOutline />, tooltip:"حذف استاد", method:deleteTeacherHandler ,class:"btn-red"},
		{icon:<CgDetailsMore />, tooltip:"مشاهده دروس", method:teacherCourseReportHandler ,class:"btn-green"}
	];

	useEffect(()=>{
		ContextDatas.setFilteredData(ContextDatas.teachers);
	},[]);

	return (
		<div>
			<div className="container">
			<TableTop addMethod={()=>navigate('/teachers/add')} searchMethod={searchHandler} search={search} setSearch={setSearch}/>
			<Table title={title} body={body} actions={actions} />
		</div>

			<Pagination/>
 			<DeleteModal ID={deletedId} tableName='teachers' methodName='setTeachers'/>
			<ErrorModal errorText={errorText} />
	</div>
	)
}

export default Teachers
