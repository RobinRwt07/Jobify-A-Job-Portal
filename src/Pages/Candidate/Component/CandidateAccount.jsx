import React, { useState } from 'react';
import style from '../Styles/CandidateProfile.module.css';
import { Form, Formik } from 'formik';
import { validatePassword } from '../../../../Public/utils';
import { MyTextInput } from '../../../Component/FormComponent';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Buttton from '../../../Component/Button';
import { Dialog } from '@mui/material';
import { useCandidateAuth } from '../../../hooks/useCandidateAuth';

const CandidateAccount = ({ candidateInfo }) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { candidateAuthed } = useCandidateAuth();

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

	function handleDeleteAccount() {
		if (candidateAuthed) {
			const allApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
			const filteredApplication = allApplications.filter(application => application.candidateId !== candidateAuthed);
			console.log(filteredApplication);

			localStorage.setItem('jobApplications', JSON.stringify(filteredApplication));

			const allCandidatesDetails = JSON.parse(localStorage.getItem("candidatesDetails")) || [];
			const index = allCandidatesDetails.findIndex(candidate => candidate.candidateId === candidateAuthed);
			if (index !== -1) {
				allCandidatesDetails.splice(index, 1);
				localStorage.setItem('candidatesDetails', JSON.stringify(allCandidatesDetails));
			}
			const allRegisteredCandidate = JSON.parse(localStorage.getItem("registeredCandidate")) || [];
			const candidateIndex = allRegisteredCandidate.findIndex(candidate => candidate.candidateId === candidateAuthed);
			if (candidateIndex !== -1) {
				allRegisteredCandidate.splice(candidateIndex, 1);
				localStorage.setItem('registeredCandidate', JSON.stringify(allRegisteredCandidate));
			}
			localStorage.removeItem('loggedInCandidate');
			handleDialogClose();
			toast.success('Your account has been successfully deleted.');
			setTimeout(() => {
				location.reload();
			}, 1000);
		}
		else {
			toast.error('Account Deletion canceled.')
		}
	}

	function handleDialogClose() {
		setOpen(false);
	}

	return (
		<div className={style.candidateAccount}>
			<div className={style.inputFieldContainer}>
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
			<div className={`${style.deleteAccount} ${style.inputFieldContainer}`}>
				<h3>Delete Your Account</h3>
				<p> Once your account is deleted. All your profile information will be permanently removed.	You will lose access to all saved jobs, job applications, and job alerts.Any ongoing job applications will be canceled, and employers will no longer be able to view your profile.This action is irreversible, and you will not be able to recover your account or its data after deletion.</p>
				<Buttton type='btn btn-danger' handler={() => setOpen(true)}>Delete Account </Buttton>

				<Dialog onClose={handleDialogClose} open={open}>
					<div className={style.dialogContent} >
						<h2>Are you sure you want to delete your account?</h2>
						<p>This action is permanent and cannot be undone. You will lose access to all your saved jobs, applications, and profile information. Please confirm if you wish to proceed.</p>
						<div>
							<Buttton type="btn-primary" handler={handleDialogClose}>Cancel</Buttton>
							<Buttton type="btn btn-danger" handler={handleDeleteAccount}>Delete</Buttton>
						</div>
					</div>
				</Dialog>
			</div>
		</div>
	)
}

export default CandidateAccount