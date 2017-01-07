import React, {Component} from 'react';
import './RightNavigation.css';

class RightNavigation extends Component {
	render() {
		return(
			<div className="right-nav">
				<div className="aqua-circle"></div>
				<div>
					<div>Nabeen Khadka</div>
					<div className="no-of-books">10 books</div>
				</div>
			</div>
		);
	}
}

export default RightNavigation;