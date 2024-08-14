import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContextData } from "../../contexts/ContextData";
import ReportHeader from '../subComponents/reportHeader/ReportHeader';
import Table from "../subComponents/table/Table";

function TakedCourses() {
	const ContextDatas = useContext(ContextData);
	const params = useParams();
	const navigate = useNavigate();
	const mainStudent = ContextDatas.getStudent(params.studentID);

	// report header contents:
	const headerTitle = [
		'نام',
		'نام خانوادگی',
		'رشته',
		'جمع واحدهای انتخابی'
	];
	const headerBody = [
		mainStudent.firstName,
		mainStudent.lastName,
		ContextDatas.getField(mainStudent.field).title,
		ContextDatas.calcUnitSumByStdID(params.studentID)
	];

	// taked courses table contents:
		const title = [
		'کد درس',
		'عنوان درس',
		'تعداد واحد',
		'استاد'
	];
	let body = [];
	mainStudent.courses.forEach(courseID=> {
		let mainCourse = ContextDatas.getCourse(courseID);
		let teacherName = ContextDatas.getTeacher(mainCourse.teacher).firstName + " " + ContextDatas.getTeacher(mainCourse.teacher).lastName;
		let newItem = [mainCourse.id, mainCourse.title, mainCourse.unit, teacherName];
		body = [...body, newItem];
	})
	const actions = [];

	return (
		<div className="container" >
			<ReportHeader title={headerTitle} content={headerBody} />
			<p className='sub-title'>جدول واحدهای انتخاب شده:</p>
			<Table title={title} body={body} actions={actions} />
			<div className='back-btn-container'>
				<button type='button' className='btn btn-orange' onClick={()=> navigate('/students/list')}>بازگشت</button>
			</div>
		</div>
	)
}

export default TakedCourses
