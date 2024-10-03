import { useState } from 'react';
import style from '../Style/form.module.css';
import { generateRandom, validateEmail, validateName, validatePassword } from '../../../../Public/utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CandidateSignup = () => {
	const [candidateData, setCandidateData] = useState({
		candidateFirstName: "",
		candidateLastName: "",
		candidateEmail: "",
		candidatePassword: "",
		candidateConfirmPassword: ""
	});
	const [isChecked, setChecked] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	function handleFormChange(e) {
		setCandidateData({
			...candidateData,
			[e.target.name]: e.target.value
		})
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		const validationError = {};
		const firstNameError = validateName(candidateData.candidateFirstName.trim());
		if (firstNameError) {
			validationError.firstName = firstNameError;
		}
		const lastNameError = validateName(candidateData.candidateLastName.trim());
		if (lastNameError) {
			validationError.lastName = lastNameError;
		}
		const emailError = validateEmail(candidateData.candidateEmail);
		if (emailError) {
			validationError.email = emailError;
		}
		const passwordError = validatePassword(candidateData.candidatePassword);
		if (passwordError) {
			validationError.password = passwordError;
		}
		if (candidateData.candidatePassword !== candidateData.candidateConfirmPassword) {
			validationError.confirmPassword = "Password not matched";
		}
		setErrors(validationError);

		if (Object.keys(validationError).length == 0) {
			signupCandidate(candidateData);
		}
	}

	function handleCheckBoxClick(e) {
		setChecked(e.target.checked);
	}

	function signupCandidate(newCandidate) {
		const registeredCandidate = JSON.parse(localStorage.getItem('registeredCandidate')) || [];

		if (registeredCandidate.find((candidate) => candidate.candidateEmail === newCandidate.candidateEmail)) {
			toast.error("Email already registered");
			return false;
		}
		else {
			newCandidate.candidateId = "CND" + generateRandom(10000, 99999);
			delete newCandidate.candidateConfirmPassword;
			registeredCandidate.push(newCandidate);
			localStorage.setItem('registeredCandidate', JSON.stringify(registeredCandidate));
			toast.success("Successfully registered");
			navigate('/login/candidate');
		}
	}

	return (
		<form className={style.form} onSubmit={handleFormSubmit}>
			<label>
				<input type="text" name="candidateFirstName" placeholder="First Name" value={candidateData.candidateFirstName} onChange={handleFormChange} />
				{errors.firstName && <span> {errors.firstName}</span>}
			</label>
			<label htmlFor="lastName">
				<input type="text" name="candidateLastName" placeholder="Last Name" value={candidateData.candidateLastName} onChange={handleFormChange} />
				{errors.lastName && <span> {errors.lastName}</span>}
			</label>
			<label>
				<input type="email" name="candidateEmail" placeholder="Email Address" value={candidateData.candidateEmail} onChange={handleFormChange} />
				{errors.email && <span> {errors.email}</span>}
			</label>
			<label>
				<input type="password" name="candidatePassword" placeholder="Password" value={candidateData.candidatePassword} onChange={handleFormChange} />
				{errors.password && <span> {errors.password}</span>}
			</label>
			<label>
				<input type="password" name="candidateConfirmPassword" placeholder="Confirm Password" value={candidateData.candidateConfirmPassword} onChange={handleFormChange} />
				{errors.confirmPassword && <span> {errors.confirmPassword}</span>}
			</label>
			<label className={style.checkbox}>
				<input type="checkbox" name="tc" onClick={handleCheckBoxClick} />
				I've read and agree with you Term and Condition
			</label>
			<button className="btn btn-primary" disabled={!isChecked}>Create Account</button>
		</form >
	)
}

export default CandidateSignup;