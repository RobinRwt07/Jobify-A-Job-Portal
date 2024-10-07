import React from 'react'
import style from '../Styles/CandidateProfile.module.css';
import { Form, Formik } from 'formik';
import { MySelect, MyTextArea, MyTextInput } from '../../../Component/FormComponent';
import style2 from '../../../Styles/form.module.css';
import { statesOfIndia } from '../../../../Public/utils';
import schema from '../../JobDetails/jobFormSchema';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateCandidateProfile = ({ candidateInfo }) => {
	const navigate = useNavigate();
	let candidateDetails = {};
	const allCandidatesDetails = JSON.parse(localStorage.getItem('candidatesDetails')) || [];
	const index = allCandidatesDetails.findIndex(candidate => candidate.candidateId === candidateInfo.candidateId);
	if (index !== -1) {
		candidateDetails = allCandidatesDetails[index]?.candidateData || {};
	}
	const initialValues = {
		candidateFirstName: candidateInfo?.candidateFirstName || '',
		candidateLastName: candidateInfo?.candidateLastName || '',
		candidatePhone: candidateDetails?.candidatePhone || '',
		candidateEmail: candidateInfo?.candidateEmail || '',
		dateOfBirth: candidateDetails?.dateOfBirth || '',
		experience: candidateDetails?.experience || '',
		streetAddress: candidateDetails?.streetAddress || '',
		city: candidateDetails?.city || '',
		postalCode: candidateDetails?.postalCode || '',
		state: candidateDetails?.state || '',
		course: candidateDetails?.course || '',
		collegeName: candidateDetails?.collegeName || '',
		graduationYear: candidateDetails?.graduationYear || '',
		coverLetter: candidateDetails?.coverLetter || '',
	}

	function handleProfileUpdate(values) {
		if (index === -1) {
			const newCandidate = {
				candidateId: candidateInfo.candidateId,
				candidateData: { ...values }
			}
			allCandidatesDetails.push(newCandidate);
		}
		else {
			allCandidatesDetails[index].candidateData = { ...values };
		}
		localStorage.setItem("candidatesDetails", JSON.stringify(allCandidatesDetails));
		toast.success("Profile Updated");
		navigate('/candidate');
	}

	return (
		<div className={`${style.updateCandidateProfile} ${style2.formSection}`}>
			<Formik initialValues={initialValues}
				onSubmit={(values) => handleProfileUpdate(values)}
				validationSchema={schema}
			>
				{
					() => (
						<Form>
							<div className={style.inputFieldContainer}>
								<h4 >Personal Information</h4>
								<div className={style2.inputBox}>
									<MyTextInput type="text" label="First Name" name="candidateFirstName" readOnly={true} />
									<MyTextInput type="text" label="Last Name" name="candidateLastName" readOnly={true} />
									<MyTextInput type="email" label="Email" name="candidateEmail" readOnly={true} />
								</div>
								<div className={style2.inputBox}>
									<MyTextInput type="number" label="Phone" name="candidatePhone" placeholder={"Phone Number"} />
									<MyTextInput type="text" label="Experience" name="experience" placeholder={"Experience"} />
									<MyTextInput type="date" label="Date of Birth" name="dateOfBirth" />
								</div>
							</div>

							<div className={style.inputFieldContainer}>
								<h4 >Address Details</h4>
								<MyTextInput type="text" name="streetAddress" label={'Street Address'} placeholder={'Street Address'} />

								<div className={style2.inputBox}>
									<MyTextInput type="text" name="city" label="City" placeholder="City" />
									<MySelect label="State" name="state">
										<option value="">Select State</option>
										{
											statesOfIndia.map((state, index) => (
												<option value={state} key={index}>{state}</option>
											))
										}
									</MySelect>
									<MyTextInput type="number" name="postalCode" label={"Postal Code"} placeholder="Postal Code" />
								</div>
							</div>

							<div className={style.inputFieldContainer}>
								<h4>Education Details</h4>
								<MyTextInput type="text" name="course" label={'Education'} placeholder={'Course'} />
								<div className={style2.inputBox}>
									<MyTextInput type="text" name="collegeName" label="College/ University" placeholder="College/University" />

									<MyTextInput type="number" name="graduationYear" label={"Graducation Year"} placeholder="Graduation Year" />
								</div>
							</div>
							<div className={style.inputFieldContainer}>
								<MyTextArea name="coverLetter" label={"About Me"} placeholder={"Write About yourself"} rows={6} />
							</div>
							<button className='btn btn-primary' type='submit'>Update Profile</button>
						</Form>
					)
				}
			</Formik>
		</div >
	)
}

export default UpdateCandidateProfile