import React, { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import style from '../Styles/forgetPassword.module.css';
import { generateRandom, validateEmail, validatePassword } from '../../Public/utils';
import Button from './Button';
import { useCandidateAuth } from '../hooks/useCandidateAuth';
import { useEmployerAuth } from '../hooks/useEmployerAuth';
import useAdminAuth from '../hooks/useAdminAuth';

const ForgetPassword = () => {
	const { candidateAuthed } = useCandidateAuth();
	const { employerAuthed } = useEmployerAuth();
	const isAdminAuth = useAdminAuth();

	const [field, setField] = useState({
		email: "",
		otp: "",
	});
	const [passwords, setPasswords] = useState({
		newPassword: "",
		cPassword: ""
	});
	const [error, setError] = useState({});
	const [isOtpMatched, setOtpMatched] = useState(false);
	const navigate = useNavigate();
	const { state } = useLocation();
	const otpRef = useRef();

	useEffect(() => {
		if (candidateAuthed || employerAuthed || isAdminAuth) {
			navigate('/', { replace: true });
		}
	}, []);

	if (!state?.type) {
		navigate('*', { replace: true });
	}

	function handleChange(e) {
		setField({
			...field,
			[e.target.name]: e.target.value
		})
	}
	function handlePassChange(e) {
		setPasswords({
			...passwords,
			[e.target.name]: e.target.value
		})
	}

	const allCandidates = JSON.parse(localStorage.getItem('registeredCandidate')) || [];
	const allEmployer = JSON.parse(localStorage.getItem('registeredOrg')) || [];

	function handleSendOtp() {
		const isNotValid = validateEmail(field.email);
		if (!isNotValid) {
			if (state.type === "candidate") {
				const index = allCandidates.findIndex(candidate => candidate.candidateEmail === field.email);
				if (index === -1) {
					toast.error("email not registered.")
					return;
				}
				otpRef.current = generateRandom(1000, 9999);
				alert(otpRef.current);
			}
			if (state.type === "employer") {
				const index = allEmployer.findIndex(emp => emp.companyEmail === field.email);
				if (index === -1) {
					toast.error("email not registered.")
					return;
				}
				otpRef.current = generateRandom(1000, 9999);
				alert(otpRef.current);
			}
		}
		else {
			toast.error(isNotValid);
		}
	}

	function handleSubmitOTP() {
		if (field.otp == otpRef.current) {
			console.log("matched");
			setOtpMatched(true);
		}
		else {
			toast.error("Wrong OTP");
		}
		otpRef.current = 0;
	}

	function handleSubmit(e) {
		e.preventDefault();
		const validationError = {};
		const isNewPassNotValid = validatePassword(passwords.newPassword);
		if (isNewPassNotValid) {
			validationError.newPassword = isNewPassNotValid;
		}
		if (passwords.newPassword !== passwords.cPassword) {
			validationError.cPassword = "Password not matched."
		}
		setError(validationError);

		if (Object.keys(validationError).length === 0) {
			updatePassword(passwords.newPassword);
		}
	}

	function updatePassword(newPassword) {
		if (state.type === 'candidate') {
			const index = allCandidates.findIndex(candidate => candidate.candidateEmail === field.email);
			if (index !== -1) {
				allCandidates[index].candidatePassword = newPassword;
				localStorage.setItem('registeredCandidate', JSON.stringify(allCandidates));
				toast.success("Password updated");
			}
		}
		if (state.type === 'employer') {
			const index = allEmployer.findIndex(emp => emp.companyEmail === field.email);
			if (index !== -1) {
				allEmployer[index].password = newPassword;
				localStorage.setItem('registeredOrg', JSON.stringify(allEmployer));
				toast.success('password updated.')
			}
		}
		navigate("/login", { replace: true });
	}

	return (
		<div className='container'>
			<div className={style.forgetPasswordContainer}>
				<div className={style.forgetPassword}>
					<h3 className="tx-center">Change Password</h3>
					{
						!isOtpMatched &&
						<div className={style.newPassword}>
							<input type="email" name="email" id="email" placeholder="Enter Email" value={field.email} onChange={handleChange} />
							<input type="number" name="otp" id="otp" placeholder="Enter OTP" value={field.otp} onChange={handleChange} />

							<div className="flex-justify-center">
								<Button type='btn-primary' handler={handleSendOtp}>Send OTP</Button>
								<Button type='btn-primary' handler={handleSubmitOTP} disabled={field.otp.length != 4}>Sumbit OTP</Button>
							</div>
						</div>
					}
					{
						isOtpMatched &&
						<div>
							<form className={style.newPassword} onSubmit={handleSubmit}>
								<label htmlFor="newPassword">New Password
									<input type="password" name="newPassword" onChange={handlePassChange} value={passwords.newPassword} placeholder='New Password' />
									{error.newPassword && <span className='error'> {error.newPassword} </span>}
								</label>
								<label htmlFor="confirmPassword">Confirm Password
									<input type="password" name="cPassword" value={passwords.cPassword} onChange={handlePassChange} placeholder='Confirm Password' />
									{error.cPassword && <span className='error'> {error.cPassword} </span>}
								</label>
								<button type='submit' className='btn btn-primary'>Update</button>
							</form>
						</div>
					}
				</div>
			</div>
		</div>
	)
}

export default ForgetPassword