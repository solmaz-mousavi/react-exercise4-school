import React, { useContext } from 'react';
import "./reportHeader.css";

function ReportHeader({title, content}) {
	return (
		<div className="report-header">
			{title.map((item, index) => (
				<div key={item}>
					<span className='title'>{item}:</span>
					<span className='content'>{content[index]}</span>
				</div>
			))}
		</div>
	)
}

export default ReportHeader