import Logo from '../Assest/Images/Logo.svg';
export default Logo = () => {
	const style = {
		maxWidth: "150px",
		height: "35px"
	}
	return (
		<div >
			<img src={Logo} alt="logo" style={style} />
		</div>
	)
}