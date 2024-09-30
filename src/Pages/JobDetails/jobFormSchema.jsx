import * as Yup from 'yup';

const schema = Yup.object({
	candidateFirstName: Yup.string().required('FirstName is Required'),
	candidateLastName: Yup.string().required('Last is required'),
	candidatePhone: Yup.string().matches(/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/, 'Invalid phone number').required('Phone number is required'),
	candidateEmail: Yup.string().email().required("Email is required"),
	dateOfBirth: Yup.date().required("Field is required"),
	experience: Yup.number().required().positive(),
	streetAddress: Yup.string().required("Address is required"),
	city: Yup.string().required("City is required"),
	postalCode: Yup.number().required().positive(),
	state: Yup.string().required('State is required'),
	course: Yup.string().required("Course is required"),
	collegeName: Yup.string().required("Field is required"),
	graduationYear: Yup.number().required().min("2000").max(new Date().getFullYear()),
	coverLetter: Yup.string().required().min(50)
})

export default schema;