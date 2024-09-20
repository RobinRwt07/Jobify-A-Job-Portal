import * as Yup from 'yup';

const validationSchema = Yup.object({
	jobTitle: Yup.string().required("Job title required"),
	jobType: Yup.string().required("Job type required"),
	workMode: Yup.string().required(),
	minSalary: Yup.number().required("min salary required").positive("value must be postitive").min(100000),
	maxSalary: Yup.number().required("max salary required").positive('value must be postitive'),
	minExperience: Yup.number().required("min experience required").min(0),
	maxExperience: Yup.number().required("max experience required").min(1).max(20),
	vacancies: Yup.number().required("vacancies required").min(1),
	expirationDate: Yup.date().required("date required").min(new Date(), 'expiration date must be 2 or more days from today'),
	education: Yup.string().required("Education detail required"),
	jobTags: Yup.string().required("Provide some tags"),
	jobLocation: Yup.string().required(),
	skills: Yup.string().required()
})

export default validationSchema;