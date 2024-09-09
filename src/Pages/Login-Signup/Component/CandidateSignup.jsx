import { useState } from 'react';
import style from '../Style/form.module.css';
import { validateEmail, validateName, validatePassword } from '../../../../Public/utils';

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

	function handleFormChange(e) {
		setCandidateData({
			...candidateData,
			[e.target.name]: e.target.value
		})
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		const validationError = {};
		const firstNameError = validateName(candidateData.candidateFirstName);
		if (firstNameError) {
			validationError.firstName = firstNameError;
		}
		const lastNameError = validateName(candidateData.candidateLastName);
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
			console.log(candidateData);
			// send form data
		}
	}

	function handleCheckBoxClick(e) {
		setChecked(e.target.checked);
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