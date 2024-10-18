import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../../../Public/utils.js";
import { toast } from "react-toastify";
import style from '../Style/form.module.css';
import { useCandidateAuth } from "../../../hooks/useCandidateAuth.jsx";

const CandidateLogin = () => {
	const [candidateLoginData, setCandidateLoginData] = useState({
		email: "", password: ""
	});
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const { setCandidateAuth } = useCandidateAuth();

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
			candidateLogin(candidateLoginData);
		}

		function candidateLogin(loginData) {
			const registeredCandidate = JSON.parse(localStorage.getItem("registeredCandidate")) || [];
			if (registeredCandidate.length > 0) {
				const matchedCandidate = registeredCandidate.find(candidate => candidate.candidateEmail === loginData.email);
				if (matchedCandidate) {
					if (matchedCandidate.candidatePassword === loginData.password) {
						// check if user has saved jobs or not
						const savedJobs = JSON.parse(sessionStorage.getItem('savedJobs')) || [];
						if (savedJobs.length > 0) {
							const allCandidates = JSON.parse(localStorage.getItem('candidatesDetails')) || [];
							const index = allCandidates.findIndex(candidate => candidate.candidateId === matchedCandidate.candidateId);
							if (index !== -1) {
								if (allCandidates[index].hasOwnProperty("savedJobs")) {
									allCandidates[index].savedJobs.push(...savedJobs);
								}
								else {
									allCandidates[index].savedJobs = [...savedJobs];
								}
							}
							else {
								const newCandidate = {
									candidateId: matchedCandidate.candidateId,
									savedJobs: [...savedJobs]
								}
								allCandidates.push(newCandidate);
							}
							localStorage.setItem('candidatesDetails', JSON.stringify(allCandidates));
							sessionStorage.clear();
						}
						toast.success("success");
						localStorage.setItem("loggedInCandidate", matchedCandidate.candidateId);
						setCandidateAuth(true);
						navigate('/');
						location.reload();
					}
					else {
						toast.error("Invalid Password");
						return;
					}

				}
				else {
					toast.error("Email not registered");
					return;
				}
			}
			else {
				toast.error("Email not registered");
				return;
			}
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
				<Link to={'/forget_password'} state={{ type: "candidate" }} >Forget Password?</Link>
			</div>
			<button className="btn btn-primary">Sign In</button>
		</form >
	)
}

export default CandidateLogin;