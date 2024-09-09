import { useState } from "react";
import { Link } from "react-router-dom";
import style from '../Style/form.module.css';
import { validateEmail } from "../../../../Public/utils.js";

const CandidateLogin = () => {
	const [candidateLoginData, setCandidateLoginData] = useState({
		email: "", password: ""
	});
	const [errors, setErrors] = useState({});

	function handleFormChange(e) {
		setCandidateLoginData({
			...candidateLoginData,
			[e.target.name]: e.target.value
		});
	}
	function handleFormSubmit(e) {
		e.preventDefault();
		const validationErrors = {};
		const isEmailNotValid = validateEmail(candidateLoginData.email);
		if (isEmailNotValid) {
			validationErrors.email = isEmailNotValid;
		}
		if (!candidateLoginData.password) {
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
				<input type="email" name="email" placeholder="Email Address" value={candidateLoginData.email} onChange={handleFormChange} />
				{errors.email && <span> {errors.email}</span>}
			</label>
			<label>
				<input type="password" name="password" placeholder="Password" value={candidateLoginData.password} onChange={handleFormChange} />
				{errors.password && <span> {errors.password}</span>}
			</label>
			<div className={style.forgetPassword}>
				<Link to={"/"}>Forget Password?</Link>
			</div>
			<button className="btn btn-primary">Sign In</button>
		</form >
	)
}

export default CandidateLogin;