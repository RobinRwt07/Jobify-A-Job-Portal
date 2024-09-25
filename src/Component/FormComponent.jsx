import { useField } from 'formik'

const error = {
	fontSize: "12px",
	color: "var(--error)"
}

export const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<div>
				<label htmlFor={props.id || props.name}>{label}	</label>
				<input {...field} {...props} />
				{
					meta.touched && meta.error ? <div style={error}>{meta.error}</div> : null
				}
			</div>
		</>
	)
}

export const MySelect = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select {...field} {...props} />
			{meta.touched && meta.error ? (
				<div style={error}>{meta.error}</div>
			) : null}
		</div>
	);
};

export const MyTextArea = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div>
			<label htmlFor={props.id || props.name}>{label}</label>
			<textarea {...props} {...field} cols="30">

			</textarea>
			{meta.touched && meta.error ? (
				<div style={error}>{meta.error}</div>
			) : null}
		</div>
	)
}