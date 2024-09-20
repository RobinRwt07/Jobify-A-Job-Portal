import { useField } from 'formik'
import style from '../style/addjob.module.css';

export const MyTextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<div>
				<label htmlFor={props.id || props.name}>{label}	</label>
				<input className={style.inputText} {...field} {...props} />
				{
					meta.touched && meta.error ? <div className={style.error}>{meta.error}</div> : null
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
				<div className={style.error}>{meta.error}</div>
			) : null}
		</div>
	);
};