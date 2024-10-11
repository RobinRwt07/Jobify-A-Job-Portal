import logo from '../Assest/Images/Jobifylogo.svg';
import { Link } from 'react-router-dom';
const Logo = () => {
	const style = {
		maxWidth: "150px",
		height: "38px"
	}
	return (
		<Link to={'/'} style={{ display: 'flex', alignItems: "center", gap: "5px" }}>
			<img src={logo} alt="logo" style={style} />
			<span style={{ fontWeight: "bold", fontSize: "20px", "letterSpacing": "2px" }}>Jobify</span>
		</Link>
	)
}

export default Logo;