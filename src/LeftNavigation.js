import React, { Component } from 'react';
import './LeftNavigation.css';

class LeftNavigation extends Component {
	render() {
		return(
			<div className="recent">
				<div>RECENT SEARCHES </div>
				<div>{this.props.recentSearchList.map((item,index) => 
						<div key={index} className="recent-searches" onClick={() => this.props.recentResultClick(item)}>
							{item}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default LeftNavigation;