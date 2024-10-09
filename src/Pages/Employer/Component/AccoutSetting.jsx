import { Form, Formik } from 'formik';
import style from '../style/companyProfile.module.css';
import { MyTextInput } from '../../../Component/FormComponent';
import { validatePassword } from '../../../../Public/utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { useEmployerInfo } from '../useEmployerInfo';

const AccoutSetting = () => {
	const { companyInfo } = useEmployerInfo();
	const [isPasswordFieldActive, setPasswordFieldActive] = useState(false);
	const navigate = useNavigate();
	const passwordRef = useRef(null);
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
			errors.confirmPassword = "Password required"
		}
		else if (values.newPassword !== values.confirmPassword) {
			errors.confirmPassword = "Password not matched";
		}
		return errors;
	}

	function handleDeleteAccount() {
		if (passwordRef.current.value.trim() !== companyInfo.password) {
			toast.error("Wrong Password");
			return false;
		}
		// delete all posted jods
		let allJobs = JSON.parse(localStorage.getItem('allJobs')) || [];
		if (allJobs.length > 0) {
			allJobs = allJobs.filter(job => job.companyId !== companyInfo.companyId);
			localStorage.setItem('allJobs', JSON.stringify(allJobs));
			let allOrg = JSON.parse(localStorage.getItem('registeredOrg')) || [];
			allOrg = allOrg.filter(org => org.companyId !== companyInfo.companyId);
			localStorage.setItem('registeredOrg', JSON.stringify(allOrg));
			let allEmployerDetails = JSON.parse(localStorage.getItem("employersDetails")) || [];
			localStorage.setItem('employersDetails', JSON.stringify(allEmployerDetails.filter(employer => employer.companyId !== companyInfo.companyId)))
			if (localStorage.getItem('loggedInOrg') === companyInfo.companyId) {
				localStorage.removeItem("loggedInOrg");
				toast.success("Account Deleted");
				setTimeout(() => {
					location.reload();
				}, 1000)
			}
		}

	}
	function handlePasswordChange(values) {
		if (values.currentPassword !== companyInfo.password) {
			toast.error("Current password not matched");
			return false;
		}
		else {
			const allOrg = JSON.parse(localStorage.getItem('registeredOrg')) || [];
			const company = allOrg.findIndex(org => org.companyId === companyInfo.companyId);
			if (company !== -1) {
				allOrg[company].password = values.newPassword;
				localStorage.setItem('registeredOrg', JSON.stringify(allOrg));
				toast.success('Password updated.');
				navigate('/employer', { replace: true });
			}
			else {
				return false;
			}
		}
	}
	return (
		<div className={style.accountSetting}>
			<div className={style.box}>
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

			<div className={style.deleteAccount}>
				<h3>Delete Your Company</h3>
				<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ipsa iure recusandae culpa dicta architecto rem et. Rerum repellendus est natus dolorem voluptates laudantium nemo quo ex suscipit, aliquid temporibus.</p>
				{
					(!isPasswordFieldActive) && <button className={"btn btn-danger"} onClick={() => setPasswordFieldActive(true)}>
						<FontAwesomeIcon icon={faCircleXmark} />
						Close Account
					</button>
				}
				{
					isPasswordFieldActive &&
					<div>
						<h4>Enter your password-</h4>
						<div>
							<input ref={passwordRef} type="password" name='password' id='deleteAcc' placeholder='Enter Your Password' />
							<button className='btn btn-danger' onClick={handleDeleteAccount}>Delete</button>
						</div>
					</div>
				}
			</div>
		</div >
	)
}

export default AccoutSetting