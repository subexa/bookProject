import React, {Component} from 'react';
import Input from './Input';
import RightNavigation from './RightNavigation';
import './Header.css';

class Header extends Component {
	render() {
		return(
			<div className="header-container">
				<div className="title">Library</div>
		        <Input setInputValue={this.props.setInputValue} buttonClick={this.props.buttonClick} />
		        <RightNavigation />
			</div>
		);
	}
}

export default Header;