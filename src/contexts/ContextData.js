import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ContextData = createContext();
function DataProvider({children}) {
	const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [fields, setFields] = useState([]);
  const [error, setError] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedFilteredData, setPaginatedFilteredData] = useState([]);
	const pageSize = 10;
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);

	const getStudent = (studentID) => students.filter(student => student.id === studentID)[0];
	const getTeacher = (teacherID) => teachers.filter(teacher => teacher.id === teacherID)[0];
	const getCourse = (courseID) => courses.filter(course => course.id === courseID)[0];
	const getField = (fieldID) => fields.filter(field => field.id === fieldID)[0];

	const calcUnitSumByStdID = (studentID) => {
		let unitSum = 0;
			getStudent(studentID)?.courses?.forEach(courseID => {
				unitSum = unitSum + getCourse(+courseID).unit;
			})
		return unitSum;
	};

	const calcStudentSumByCrsID = (courseID) => {
		let studentSum = students.filter(student => student.courses.includes(courseID + "")).length;
		return studentSum;
	};

	const calcCourseSumByTchrID = (teacherID) => {
		let courseSum = courses.filter(course => course.teacher === teacherID ).length;
		return courseSum;
	};

	useEffect(() => {
    Promise.all([
      axios.get("../datas/students.json"),
      axios.get("../datas/teachers.json"),
      axios.get("../datas/courses.json"),
      axios.get("../datas/fields.json"),
    ])
      .then((res) => {
        setStudents(res[0].data.students);
        setTeachers(res[1].data.teachers);
        setCourses(res[2].data.courses);
        setFields(res[3].data.fields);
      })
      .catch((err) => setError(err.message));
  }, []);

	return (
		<ContextData.Provider value={{
			students,
			setStudents,
			teachers,
			setTeachers,
			courses,
			setCourses,
			fields,
			error,
			filteredData,
			setFilteredData,
			paginatedFilteredData,
			setPaginatedFilteredData,
			pageSize,
			showDeleteModal,
			setShowDeleteModal,
			showErrorModal,
			setShowErrorModal,
			getStudent,
			getTeacher,
			getCourse,
			getField,
			calcUnitSumByStdID,
			calcStudentSumByCrsID,
			calcCourseSumByTchrID,
			
		}}>
 			{children}
 		</ContextData.Provider>
	)
}

export default DataProvider