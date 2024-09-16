import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from '../Style/form.module.css';
import { validateEmail } from "../../../../Public/utils.js";
import { toast } from "react-toastify";
import { useEmployerAuth } from "../../../hooks/useEmployerAuth.jsx";

const EmployerLogin = () => {
	const [employerLoginData, setEmployerLoginData] = useState({
		email: "", password: ""
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const { employerAuthed, setEmployerAuth } = useEmployerAuth();

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
			employerLogin(employerLoginData);
		}
	}

	function employerLogin(employerCredential) {
		const registeredOrg = JSON.parse(localStorage.getItem("registeredOrg")) || [];
		if (registeredOrg.length > 0) {
			const matchedOrg = registeredOrg.find(org => org.companyEmail === employerCredential.email);
			if (matchedOrg) {
				if (matchedOrg.password === employerCredential.password) {
					localStorage.setItem("loggedInOrg", matchedOrg.companyId);
					setEmployerAuth(matchedOrg.companyId);
					toast.success("Welcome " + matchedOrg.companyName);
					navigate('/employer');
				}
				else {
					toast.error("Incorrect Password");
					return;
				}
			}
			else {
				toast.error("Email not registered");
				return false;
			}
		}
		else {
			console.log("else");
			toast.error("email not registered.");
			return;
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