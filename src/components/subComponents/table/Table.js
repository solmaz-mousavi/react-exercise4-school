import React from 'react';
import "./table.css";

function Table({title, body, actions}) {
	return (
		<div>
			<table className="table-container">
				<thead>
					<tr>
						{title.map(item => (
							<th key={item}>{item}</th>
							))}
						{actions.length>0 && <th>&nbsp;</th>}
					</tr>
				</thead>
				<tbody>
					{body.map(row => (
						<tr key={row[0]}>
							{row.map((item,index) => (
								<td key={row[0] + 1 + index}>{item}</td>
							))}
							{actions.length>0 && (
								<td>
									<div className="action-container">
										{actions.map(action => (
											<button key={action.tooltip} className={`btn btn-icon ${action.class}`} title={action.tooltip} onClick={action.method}>
												<div className='action-icon' name={row[0]}>
													{action.icon}
												</div>
											</button>
										))}
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
      </table>
		</div>
	)
}

export default Table