
const CheckBox = ({ name, checked, onChangeHandler, children }) => {
	return (
		<label>
			<input type="checkbox" name={name} checked={checked} onChange={onChangeHandler} />
			<span>{children}</span>
		</label>
	)
}

export default CheckBox;