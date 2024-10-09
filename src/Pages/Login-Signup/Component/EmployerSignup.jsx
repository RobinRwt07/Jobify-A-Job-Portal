import { useState } from 'react';
import style from '../Style/form.module.css';
import { validateEmail, validatePassword, generateRandom } from '../../../../Public/utils';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const EmployerSignup = () => {
	const [companyData, setCompanyData] = useState({
		companyName: "",
		companyLocation: "",
		companyEmail: "",
		companyType: "",
		password: "",
		confirmPassword: ""
	});
	const [errors, setErrors] = useState({});
	const [isChecked, setChecked] = useState(false);
	const navigate = useNavigate();

	const industryType = ["Company Type", "IT and Services", "Marketing", 'CyberSecurity'];
	function handleFormChange(e) {
		setCompanyData({
			...companyData,
			[e.target.name]: e.target.value
		})
	}

	function handleCheckBoxClick(e) {
		setChecked(e.target.checked);
	}

	function handleFormSubmit(e) {
		e.preventDefault();
		const validationError = {};

		if (companyData.companyName.trim().length === 0) {
			validationError.name = "Please provide company name";
		}
		if (companyData.companyLocation.length === 0) {
			validationError.location = "Please provide company location";
		}

		if (companyData.companyType == "" || companyData.companyType == "Company Type") {
			validationError.type = "Select Valid type";
		}
		const emailError = validateEmail(companyData.companyEmail);
		if (emailError) {
			validationError.email = emailError;
		}

		const passwordError = validatePassword(companyData.password);
		if (passwordError) {
			validationError.password = passwordError;
		}
		if (companyData.confirmPassword !== companyData.password) {
			validationError.confirmPassword = "Password not matched";
		}

		setErrors(validationError);

		if (Object.keys(validationError).length == 0) {
			employerSignup(companyData);
		}
	}

	function employerSignup(newOrgDetails) {
		const registeredOrg = JSON.parse(localStorage.getItem('registeredOrg')) || [];
		const employersDetails = JSON.parse(localStorage.getItem('employersDetails')) || [];
		if (registeredOrg.find(org => org.companyName == newOrgDetails.companyName || org.companyEmail === newOrgDetails.companyEmail)) {
			toast.error("Company already registered with this name.");
		}
		else {
			newOrgDetails.companyId = "CMP" + generateRandom(10000, 99999);
			delete newOrgDetails.confirmPassword;
			registeredOrg.push(newOrgDetails);
			localStorage.setItem('registeredOrg', JSON.stringify(registeredOrg));
			employersDetails.push({
				companyId: newOrgDetails.companyId,
				companyName: newOrgDetails.companyName
			})
			localStorage.setItem("employersDetails", JSON.stringify(employersDetails))
			toast.success("Successfully registered");
			navigate('/login/employer');
		}
	}

	return (
		<form className={style.form} onSubmit={handleFormSubmit}>
			<label>
				<input type="text" name="companyName" placeholder="Organization Name" value={companyData.companyName} onChange={handleFormChange} />
				{errors.name && <span> {errors.name}</span>}
			</label>
			<label>
				<input type="email" name="companyEmail" placeholder="Company Email" value={companyData.companyEmail} onChange={handleFormChange} />
				{errors.email && <span> {errors.email}</span>}
			</label>
			<div className={style.parentFormBox}>
				<label>
					<input type="text" name="companyLocation" placeholder="Company Location" value={companyData.companyLocation} onChange={handleFormChange} />
					{errors.location && <span> {errors.location}</span>}
				</label>
				<label>
					<select name="companyType" onChange={handleFormChange} value={companyData.companyType}>
						{
							industryType.map((type, index) => <Option key={index} value={type} />)
						}
					</select>
					{errors.type && <span> {errors.type}</span>}
				</label>
			</div>
			<div className={style.parentFormBox}>
				<label>
					<input type="password" name="password" placeholder="Password" value={companyData.password} onChange={handleFormChange} />
					{errors.password && <span> {errors.password}</span>}
				</label>
				<label>
					<input type="password" name="confirmPassword" placeholder="Confirm Password" value={companyData.confirmPassword} onChange={handleFormChange} />
					{errors.confirmPassword && <span> {errors.confirmPassword}</span>}
				</label>
			</div>
			<label className={style.checkbox}>
				<input type="checkbox" name="tc" onClick={handleCheckBoxClick} />
				I've read and agree with you Term and Condition
			</label>
			<button className="btn btn-primary" disabled={!isChecked}>Create Account</button>
		</form >
	)
}

export default EmployerSignup


function Option({ value }) {
	return (
		<option value={value}>{value}</option>
	)
}