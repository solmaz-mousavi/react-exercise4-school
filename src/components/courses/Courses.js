import React, { useState, useContext, useEffect } from "react";
import { useNavigate  } from 'react-router-dom';
import { ContextData } from "../../contexts/ContextData";
import { MdDeleteOutline } from "react-icons/md";
import Pagination from "../subComponents/pagination/Pagination";
import DeleteModal from "../modals/deleteModal/DeleteModal";
import ErrorModal from "../modals/errorModal/ErrorModal";
import TableTop from "../subComponents/tableTop/TableTop";
import Table from "../subComponents/table/Table";

function Courses() {
	const ContextDatas = useContext(ContextData);
	const navigate = useNavigate();

	const [deletedId, setDeletedId] = useState('');
	const [search, setSearch] = useState('');
	const [errorText, setErrorText] = useState('');

	// methods:
	const deleteCourseHandler = (event) => {
		if(ContextDatas.calcStudentSumByCrsID(event.target.getAttribute('name')) > 0){
			setErrorText("درس دارای دانشجو بوده و امکان حذف وجود ندارد")
			ContextDatas.setShowErrorModal(true);
		} else {
			setDeletedId(event.target.getAttribute('name'));
			ContextDatas.setShowDeleteModal(true);
		}
	};

	const searchHandler = () => {
		if(search === ''){
			ContextDatas.setFilteredData(ContextDatas.courses);
		} else {
				ContextDatas.setFilteredData(ContextDatas.courses.filter(course => course.title.includes(search) || ContextDatas.getTeacher(course.teacher).firstName.includes(search) || ContextDatas.getTeacher(course.teacher).lastName.includes(search) || ContextDatas.getField(course.field).title.includes(search) ))
		}
	};
	
	// table contents:
	const title = [
		'کد درس',
	  'عنوان',
	  'تعداد واحد',
		'رشته',
		'استاد',
		'تعداد دانشجو'
	];
	
	let body = [];
	ContextDatas.paginatedFilteredData.forEach((course) => {
		let TeacherName = ContextDatas.getTeacher(course.teacher)?.firstName + ' ' + ContextDatas.getTeacher(course.teacher)?.lastName
		let newItem = [
			course.id,
			course.title,
			course.unit,
			ContextDatas.getField(course.field)?.title,
			TeacherName,
			ContextDatas.calcStudentSumByCrsID(course.id)
		];
		body = [...body, newItem];
	});

	const actions = [
		{icon:<MdDeleteOutline />, tooltip:"حذف درس", method:deleteCourseHandler ,class:"btn-red"}
	];

	useEffect(()=>{
		ContextDatas.setFilteredData(ContextDatas.courses);
	},[]);

	return (
		<div>
			<div className="container">
				<TableTop addMethod={()=>navigate('/courses/add')} searchMethod={searchHandler} search={search} setSearch={setSearch}/>
				<Table title={title} body={body} actions={actions} />
      </div>
      
			<Pagination/>
			<DeleteModal ID={deletedId} tableName='courses' methodName='setCourses'/>
			<ErrorModal errorText={errorText} />
		</div>
	)
}

export default Courses
