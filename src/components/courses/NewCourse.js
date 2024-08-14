import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../contexts/ContextData";
import { useFormik } from "formik";
import "../../styles/form-styles.css";

function NewCourse() {
	const ContextDatas = useContext(ContextData);
	const navigate = useNavigate();

	const resetForm = () => {
		form.values.title = "";
    form.values.unit = "";
    form.values.field = "";
    form.values.teacher = "";
		delete form.errors.title;
		delete form.errors.unit;
		delete form.errors.field;
		delete form.errors.teacher;
	}

  const cancelHandler = () => {
    resetForm();
		navigate('/courses/list');
  };

  const form = useFormik({
    initialValues: { title: "", unit: 0 },
    onSubmit: (values) => {
			let newCourse = {
			id: ContextDatas.courses[ContextDatas.courses.length - 1].id + 1,
			title: values.title,
			unit: values.unit,
			field: values.field,
			teacher: values.teacher
			};
      ContextDatas.setCourses(prevCourse => [...prevCourse, newCourse]);
      ContextDatas.setFilteredData(prevData => [...prevData, newCourse]);
			resetForm();
			navigate('/courses/list');
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "فیلد عنوان نباید خالی باشد";
      };
      if (values.unit < 1) {
        errors.unit = "تعداد واحد باید بیشتر از یک باشد";
      } else if (values.unit > 6) {
        errors.unit = "تعداد واحد باید کمتر از 6 باشد";
      };
      if (values.field == "0" || !values.field) {
        errors.field = "فیلد رشته تحصیلی نباید خالی باشد";
      };
			if (values.teacher == "0" || !values.teacher) {
        errors.teacher = "فیلد استاد نباید خالی باشد";
      };
      return errors;
    },
  });

  return (
		<div className="container">
			<form className="form" onSubmit={form.handleSubmit}>
				<div>
					<label className="label">عنوان</label>
					<input
						type="text"
						name="title"
						value={form.values.title}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
					/>
					{form.errors.title && form.touched.title && (
						<span className="error"> {form.errors.title} </span>
					)}
				</div>
				<div>
					<label className="label">تعداد واحد</label>
					<input
						type="number"
						name="unit"
						value={form.values.unit}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
					/>
					{form.errors.unit && form.touched.unit && (
						<span className="error"> {form.errors.unit} </span>
					)}
				</div>
				<div>
					<label className="label">رشته تحصیلی</label>
					<select
						name="field"
						value={form.values.field}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
					>
						<option value="0">لطفا انتخاب کنید</option>
						{ContextDatas.fields.map(field => (
							<option key={field.id} value={field.id}>{field.title}</option>
						))}
					</select>
					{form.errors.field && form.touched.field && (
						<span className="error"> {form.errors.field} </span>
					)}
				</div>
				<div>
					<label className="label">نام استاد</label>
					<select
						name="teacher"
						value={form.values.teacher}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
					>
						<option value="0">لطفا انتخاب کنید</option>
						{ContextDatas.teachers.map(teacher => (
							<option key={teacher.id} value={teacher.id}>{teacher.firstName} {teacher.lastName}</option>
						))}
					</select>
					{form.errors.teacher && form.touched.teacher && (
						<span className="error"> {form.errors.teacher} </span>
					)}
				</div>

				<button type="submit" className="btn btn-green">
					ثبت
				</button>
				<button
					type="button"
					onClick={cancelHandler}
					className="btn btn-orange"
				>
					انصراف
				</button>
			</form>
    </div>
  );
}

export default NewCourse