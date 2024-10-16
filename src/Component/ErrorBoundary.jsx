import { height } from '@fortawesome/free-solid-svg-icons/faStar';
import React, { Component } from 'react';
import { GoAlert } from "react-icons/go";
const style = {
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	alignItem: 'center',
	height: 'calc(100vh - 90px)',
}
const Fallback = () => {
	return (
		<div style={style}>
			<GoAlert style={{ color: "orange", fontSize: "42px" }} />
			<h2 className='tx-center'>Something went wrong.</h2>
		</div>
	)
}

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(error) {
		return {
			hasError: true
		}
	}
	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <Fallback />
		}
		else {
			return this.props.children;
		}
	}
}

export default ErrorBoundary;