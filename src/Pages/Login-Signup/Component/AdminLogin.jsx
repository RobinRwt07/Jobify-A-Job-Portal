import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from '../Style/form.module.css';
import { validateEmail } from "../../../../Public/utils.js";
import { toast } from "react-toastify";

const AdminLogin = () => {
	const [adminLoginData, setAdminLoginData] = useState({
		email: "", password: ""
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	function handleFormChange(e) {
		setAdminLoginData({
			...adminLoginData,
			[e.target.name]: e.target.value
		});
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		const validationErrors = {};
		const isEmailNotValid = validateEmail(adminLoginData.email);
		if (isEmailNotValid) {
			validationErrors.email = isEmailNotValid;
		}
		if (!adminLoginData.password) {
			validationErrors.password = "Enter password";
		}
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			adminLogin(adminLoginData);
		}
	}

	function adminLogin(adminLoginData) {
		if (adminLoginData.email === 'robin123@gmail.com') {
			if (adminLoginData.password === 'Robin@123Admin') {
				localStorage.setItem("isAdminLoggedIn", true);
				toast.success("Welcome");
				navigate('/admin', { replace: true });
			}
			else {
				toast.error("Incorrect Password");
				return;
			}
		}
		else {
			toast.error("Wrong email");
		}
	}

	return (
		<form className={style.form} onSubmit={handleFormSubmit}>
			<label>
				<input type="email" name="email" placeholder="Email Address" value={adminLoginData.email} onChange={handleFormChange} />
				{errors.email && <span> {errors.email}</span>}
			</label>
			<label>
				<input type="password" name="password" placeholder="Password" value={adminLoginData.password} onChange={handleFormChange} />
				{errors.password && <span> {errors.password}</span>}
			</label>
			<div className={style.forgetPassword}>
				<Link to={"/"}>Forget Password?</Link>
			</div>
			<button type='submit' className="btn btn-primary">Sign In</button>
		</form >
	)
}

export default AdminLogin