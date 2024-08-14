import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../contexts/ContextData";
import { useFormik } from "formik";
import "../../styles/form-styles.css";

function NewStudent() {
	const ContextDatas = useContext(ContextData);
	const navigate = useNavigate();

	const resetForm = () => {
		form.values.firstName = "";
    form.values.lastName = "";
    form.values.field = "";
		delete form.errors.firstName;
		delete form.errors.lastName;
		delete form.errors.field;
	}

	const cancelHandler = () => {
    resetForm();
		navigate('/students/list');
  };

  const form = useFormik({
    initialValues: { firstName: "", lastName: "" },
    onSubmit: (values) => {
			let newStudent = {
				id: ContextDatas.students[ContextDatas.students.length - 1].id + 1,
				firstName: values.firstName,
				lastName: values.lastName,
				field: values.field,
				cources: []
			};
      ContextDatas.setStudents(prevStudent => [...prevStudent, newStudent]);
      ContextDatas.setFilteredData(prevData => [...prevData, newStudent]);
			resetForm();
			navigate('/students/list');
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = "فیلد نام نباید خالی باشد";
      } else if (values.firstName.length < 3) {
        errors.firstName = "فیلد نام باید حداقل 3 کاراکتر باشد";
      }
      if (!values.lastName) {
        errors.lastName = "فیلد نام خانوادگی نباید خالی باشد";
      } else if (values.lastName.length < 3) {
        errors.lastName = "فیلد نام خانوادگی باید حداقل 3 کاراکتر باشد";
      }
      if (values.field == "0" || !values.field) {
        errors.field = "فیلد رشته تحصیلی نباید خالی باشد";
      }
      return errors;
    },
  });

	return (
		<div className="container">
        <form className="form" onSubmit={form.handleSubmit}>
          <div>
            <label className="label">نام</label>
            <input
              type="text"
              name="firstName"
              value={form.values.firstName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.firstName && form.touched.firstName && (
              <span className="error"> {form.errors.firstName} </span>
            )}
          </div>
          <div>
            <label className="label">نام خانوادگی</label>
            <input
              type="text"
              name="lastName"
              value={form.values.lastName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.lastName && form.touched.lastName && (
              <span className="error"> {form.errors.lastName} </span>
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
	)
}

export default NewStudent
