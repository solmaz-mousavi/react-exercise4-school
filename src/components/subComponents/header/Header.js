import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css";

function Header() {
	return (
		<div className='navbar-container'>
			<ul>
				<li><Link className='nav-link' to="/">خانه</Link></li>
				<li><Link className='nav-link' to="/students/list">دانشجویان</Link></li>
				<li><Link className='nav-link' to="/teachers/list">اساتید</Link></li>
				<li><Link className='nav-link' to="/courses/list">دروس</Link></li>
			</ul>
		</div>
	)
}

export default Header