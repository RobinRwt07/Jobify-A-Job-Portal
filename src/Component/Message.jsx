import React, { Children } from 'react'
const Message = ({ children }) => {
	return (
		<div style={{
			padding: "var(--p-lg)",
			marginBlock: "var(--m-lg)",
			alignContent: "center",
			textAlign: 'center',
			fontSize: "20px",
			fontWeight: "bold",
		}}>
			{children}
		</div >
	)
}

export default Message