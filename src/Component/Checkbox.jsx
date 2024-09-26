
const CheckBox = ({ name, value, checked, onChange, children }) => {
	return (
		<label>
			<input type="checkbox" value={value} name={name} checked={checked} onChange={onChange} />
			<span>{children}</span>
		</label>
	)
}

export default CheckBox;