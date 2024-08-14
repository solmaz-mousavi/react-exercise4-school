import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContextData } from "../../contexts/ContextData";
import ReportHeader from '../subComponents/reportHeader/ReportHeader';
import Table from "../subComponents/table/Table";

function TeacherCourses() {
	const ContextDatas = useContext(ContextData);
	const params = useParams();
	const navigate = useNavigate();
	const mainTeacher = ContextDatas.getTeacher(params.teacherID);

	// report header contents:
	const headerTitle = [
		'نام',
		'نام خانوادگی',
		'تعداد دروس تدریسی'
	];
	const headerBody =[
		mainTeacher.firstName,
		mainTeacher.lastName,
		ContextDatas.calcCourseSumByTchrID(params.teacherID)
	];

	// report contents:
		const title = [
		'کد درس',
		'عنوان درس',
		'تعداد واحد',
		'رشته'
	];
	let body = [];
	ContextDatas.courses.forEach(course => {
		if( course.teacher == params.teacherID ){
			let newItem = [ course.id, course.title, course.unit, ContextDatas.getField(course.field).title ];
			body = [...body, newItem];
		};
	});
	const actions = [];

	return (
		<div className="container">
			<ReportHeader title={headerTitle} content={headerBody} />
			<p className='sub-title'>جدول دروس تدریسی:</p>
			<Table title={title} body={body} actions={actions} />
			<div className='back-btn-container'>
				<button type='button' className='btn btn-orange' onClick={()=> navigate('/teachers/list')}>بازگشت</button>
			</div>
		</div>
	)
}

export default TeacherCourses

