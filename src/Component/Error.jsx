import { useNavigate } from 'react-router-dom';
import style from '../Styles/error.module.css';
import Button from './Button';
const Error = () => {
	const navigate = useNavigate();
	return (
		<div className={style.notfound}>
			<div className={style.notfound404}>
				<h3>Oops! Page not found</h3>
				<h1><span>O</span><span>p</span><span>p</span><span>s</span></h1>
			</div>
			<h2>we are sorry, but the page you requested was not found</h2>
			<Button type='btn-primary' handler={() => navigate('/', { replace: true })}>Return to home</Button>
		</div>
	)
}

export default Error;