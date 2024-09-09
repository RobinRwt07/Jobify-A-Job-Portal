import logo from '../Assest/Images/Logo.svg';
import { Link } from 'react-router-dom';
const Logo = () => {
	const style = {
		maxWidth: "150px",
		height: "35px"
	}
	return (
		<Link to={'/'}>
			<img src={logo} alt="logo" style={style} />
		</Link>
	)
}

export default Logo;