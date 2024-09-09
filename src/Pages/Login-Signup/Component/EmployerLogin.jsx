import { useState } from "react";
import { Link } from "react-router-dom";
import style from '../Style/form.module.css';
import { validateEmail } from "../../../../Public/utils.js";

const EmployerLogin = () => {
	const [employerLoginData, setEmployerLoginData] = useState({
		email: "", password: ""
	});
	const [errors, setErrors] = useState({});

	function handleFormChange(e) {
		setEmployerLoginData({
			...employerLoginData,
			[e.target.name]: e.target.value
		});
	}
	function handleFormSubmit(e) {
		e.preventDefault();
		const validationErrors = {};
		const isEmailNotValid = validateEmail(employerLoginData.email);
		if (isEmailNotValid) {
			validationErrors.email = isEmailNotValid;
		}
		if (!employerLoginData.password) {
			validationErrors.password = "Enter password";
		}
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			console.log("valid data");
		}
	}
	return (
		<form className={style.form} onSubmit={handleFormSubmit}>
			<label>
				<input type="email" name="email" placeholder="Email Address" value={employerLoginData.email} onChange={handleFormChange} />
				{errors.email && <span> {errors.email}</span>}
			</label>
			<label>
				<input type="password" name="password" placeholder="Password" value={employerLoginData.password} onChange={handleFormChange} />
				{errors.password && <span> {errors.password}</span>}
			</label>
			<div className={style.forgetPassword}>
				<Link to={"/"}>Forget Password?</Link>
			</div>
			<button className="btn btn-primary">Sign In</button>
		</form >
	)
}

export default EmployerLogin;