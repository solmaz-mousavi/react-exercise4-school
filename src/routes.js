import Home from "./components/home/Home";
import Students from "./components/students/Students";
import NewStudent from "./components/students/NewStudent";
import TakedCourses from "./components/students/TakedCourses";
import TakeCourses from "./components/students/TakeCourses";
import Teachers from "./components/teachers/Teachers";
import NewTeacher from "./components/teachers/NewTeacher";
import TeacherCourses from "./components/teachers/TeacherCourses";
import Courses from "./components/courses/Courses";
import NewCourse from "./components/courses/NewCourse";

const router = [
  { path: "/", element: <Home /> },
  { path: "/students/list", element: <Students /> },
  { path: "/students/add", element: <NewStudent /> },
  { path: "/students/report/taked-courses/:studentID", element: <TakedCourses /> },
  { path: "/students/take-courses/:studentID", element: <TakeCourses /> },
  { path: "/teachers/list", element: <Teachers /> },
  { path: "/teachers/add", element: <NewTeacher /> },
  { path: "/teachers/report/teacher-courses/:teacherID", element: <TeacherCourses /> },
  { path: "/courses/list", element: <Courses /> },
  { path: "/courses/add", element: <NewCourse /> }
];

export default router;
