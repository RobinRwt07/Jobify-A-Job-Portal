import React from 'react';
import style from '../Styles/CandidateProfile.module.css';
import { Form, Formik } from 'formik';
import { validatePassword } from '../../../../Public/utils';
import { MyTextInput } from '../../../Component/FormComponent';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CandidateAccount = ({ candidateInfo }) => {
	const navigate = useNavigate();

	const validate = (values) => {
		const errors = {};
		const currentPassowrdResult = validatePassword(values.currentPassword);
		if (currentPassowrdResult) {
			errors.currentPassword = currentPassowrdResult;
		}
		const newPassowrdResult = validatePassword(values.newPassword);
		if (newPassowrdResult) {
			errors.newPassword = newPassowrdResult;
		}
		if (!values.confirmPassword.trim()) {
			errors.confirmPassword = "Password required";
		}
		else if (values.newPassword !== values.confirmPassword) {
			errors.confirmPassword = "Password not matched";
		}
		return errors;
	}

	function handlePasswordChange(values) {
		if (values.currentPassword !== candidateInfo.candidatePassword) {
			toast.error("Current password not matched");
			return false;
		}
		else {
			const allCandidates = JSON.parse(localStorage.getItem('registeredCandidate')) || [];
			const index = allCandidates.findIndex(candidate => candidate.candidateId === candidateInfo.candidateId);

			if (index !== -1) {
				allCandidates[index].candidatePassword = values.newPassword;
				localStorage.setItem('registeredCandidate', JSON.stringify(allCandidates));
				toast.success('Password updated.');
				navigate('/candidate', { replace: true });
			}
			else {
				return false;
			}
		}
	}

	return (
		<div className={style.candidateAccount}>
			<div>
				<h3>Change Password</h3>
				<Formik initialValues={{
					currentPassword: "",
					newPassword: "",
					confirmPassword: "",
				}}
					onSubmit={(values) => handlePasswordChange(values)}
					validate={validate}
				>
					{() => (
						<Form>
							<div>
								<MyTextInput label={"Current Password"} type="password" name="currentPassword" placeholder="Password" />
								<MyTextInput label={"New Password"} type="password" name="newPassword" placeholder="Password" />
								<MyTextInput label={"Confirm Password"} type="password" name="confirmPassword" placeholder="Password" />
							</div>
							<button type='submit' className='btn btn-primary'>Change Password</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default CandidateAccount