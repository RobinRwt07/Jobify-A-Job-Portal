import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

function MyEditor({ jobDescription, setJobDescription }) {
	return (
		<div style={{ border: "1px solid lightgray", borderRadius: "4px", marginBlock: "5px" }}>
			<ReactQuill value={jobDescription} onChange={setJobDescription} placeholder='Add Your Job Description' />
		</div>
	);
}

export default MyEditor;