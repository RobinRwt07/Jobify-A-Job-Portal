import { Formik, Form } from 'formik';
import style from '../style/companyProfile.module.css';
import style2 from '../../../Styles/form.module.css';
import { MyTextArea, MyTextInput } from '../../../Component/FormComponent';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEmployerInfo } from '../useEmployerInfo';

const UpdateProfile = ({ employerDetails = {} }) => {
	const { companyInfo } = useEmployerInfo();

	const schema = Yup.object({
		companyPhone: Yup.string().matches(/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/, 'Invalid phone number').required('Phone number is required'),
		companyLocation: Yup.string().required('Company location is required'),
		companyWebsite: Yup.string().required("Company website is required"),
		aboutCompany: Yup.string().min(50).required("field is required."),
	})

	function handleProfileUpdate(values) {
		const allEmployerDetails = JSON.parse(localStorage.getItem('employersDetails')) || [];
		const index = allEmployerDetails.findIndex(org => org.companyId === companyInfo.companyId);
		if (index !== -1) {
			allEmployerDetails[index].employerInfo = values;
		}
		else {
			const newEmployer = {
				companyId: companyInfo.companyId,
				employerInfo: {
					...values
				}
			}
			allEmployerDetails.push(newEmployer);
		}
		localStorage.setItem("employersDetails", JSON.stringify(allEmployerDetails));
		toast.success("Successfully Updated");
		setTimeout(() => {
			location.reload();
		}, 1000)
	}

	return (
		<div className={style.updateProfile} >
			<div className={style.box}>
				<h3>Update Profile</h3>
				<Formik initialValues={{
					companyEmail: companyInfo.companyEmail || "",
					companyPhone: employerDetails.companyPhone || "",
					companyLocation: employerDetails.companyLocation || "",
					companyWebsite: employerDetails.companyWebsite || "",
					aboutCompany: employerDetails.aboutCompany || "",
				}}
					onSubmit={(values) => handleProfileUpdate(values)}
					validationSchema={schema}
				>
					{() => (
						<Form>
							<div className={style2.inputBox}>
								<MyTextInput label={'Company Email'} type="text" name="companyEmail" placeholder={'Company Email'} readOnly={true} />
								<MyTextInput label={'Company Phone'} type="text" name="companyPhone" placeholder={'Company Phone'} />
							</div>

							<div className={style2.inputBox}>
								<MyTextInput label={'Company Website'} type="url" name="companyWebsite" placeholder={'Company Website'} />
								<MyTextInput label={'Company Location'} type="text" name="companyLocation" placeholder={'Company Location'} />
							</div>
							<MyTextArea name='aboutCompany' label="About Company" rows={8} placeholder={'About Company'} />
							<button type='sumbit' className='btn btn-primary'>Update Profile</button>
						</Form>

					)}
				</Formik>
			</div>
		</div >
	)
}

export default UpdateProfile