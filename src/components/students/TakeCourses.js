import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextData } from "../../contexts/ContextData";
import { MdDeleteOutline } from "react-icons/md";
import { GrCheckboxSelected } from "react-icons/gr";
import ErrorModal from "../modals/errorModal/ErrorModal";
import ReportHeader from '../subComponents/reportHeader/ReportHeader';
import Table from "../subComponents/table/Table";

function TakeCourses() {
	const ContextDatas = useContext(ContextData);
	const params = useParams();
	const navigate = useNavigate();
	const [errorText, setErrorText] = useState('');
	const mainStudent = ContextDatas.getStudent(params.studentID);
	const [unitChange, setUnitChange] = useState(0);

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

	// methods:
	const takeCourseHandler = (event) => {
		let unitSum = ContextDatas.calcUnitSumByStdID(params.studentID) + ContextDatas.getCourse(event.target.getAttribute('name')).unit;
		if(unitSum > 20){
			setErrorText("تعداد واحد انتخابی بیش از حد مجاز می باشد(20واحد)")
			ContextDatas.setShowErrorModal(true);
		} else {
			mainStudent.courses = [...new Set([...mainStudent.courses, event.target.getAttribute('name')])];
			setUnitChange(prev => prev + 1);
		}
	}

	const deleteCourseHandler = (event) => {
		mainStudent.courses = mainStudent.courses.filter(courseID => courseID != event.target.getAttribute('name'));
		setUnitChange(prev => prev + 1);
	}

	// take course table contents:
		const title = [
		'کد درس',
		'عنوان درس',
		'تعداد واحد',
		'استاد'
	];
	let body = [];
	ContextDatas.courses.forEach(course => {
		if( course.field == mainStudent.field ){
			let teacherName = ContextDatas.getTeacher(course.teacher).firstName + " " + ContextDatas.getTeacher(course.teacher).lastName;
			let newItem = [ course.id, course.title, course.unit, teacherName ];
			body = [...body, newItem];
		};
	});
	const actions = [
		{icon:<GrCheckboxSelected />, tooltip:"انتخاب", method:takeCourseHandler ,class:"btn-green"}
	];

	// taked courses table contents:
	let body2 = [];
	mainStudent.courses.forEach(courseID=> {
		let mainCourse = ContextDatas.getCourse(courseID);
		let teacherName = ContextDatas.getTeacher(mainCourse.teacher).firstName + " " + ContextDatas.getTeacher(mainCourse.teacher).lastName;
		let newItem = [mainCourse.id, mainCourse.title, mainCourse.unit, teacherName];
		body2 = [...body2, newItem];
	})
	const actions2 = [
		{icon:<MdDeleteOutline />, tooltip:"حذف درس", method:deleteCourseHandler ,class:"btn-red"}
	];

	return (
		<div className="container" >
			<ReportHeader title={headerTitle} content={headerBody} />
			<p className='sub-title'>برای انتخاب واحد از جدول زیر استفاده کنید:</p>
			<Table title={title} body={body} actions={actions} />
			<p className='sub-title'>جدول واحدهای انتخاب شده:</p>
			<Table title={title} body={body2} actions={actions2} />
			<div className='back-btn-container'>
				<button type='button' className='btn btn-orange' onClick={()=> navigate('/students/list')}>بازگشت</button>
			</div>
			<ErrorModal errorText={errorText} />
		</div>
	)
}

export default TakeCourses
