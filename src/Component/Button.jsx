export default Button = ({ type = "btn-primary", children, handler = null, disabled = false }) => {
	return (
		<button type="button" className={`btn ${type}`} onClick={handler} disabled={disabled}>
			{children}
		</button>
	)
}