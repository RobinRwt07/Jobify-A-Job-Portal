export default Button = ({ type = "btn-primary", children, handler = null }) => {
	return (
		<button className={`btn ${type}`} onClick={handler}>{children}</button>
	)
}