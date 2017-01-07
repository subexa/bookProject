import React, {Component} from 'react';
import './Input.css';

class Input extends Component {
	render() {
		return(
			<div className="input-container">
				<input type="text" onChange={this.props.setInputValue} className="input-box" />
				<button type="submit" onClick={this.props.buttonClick} className="button">Search</button>
			</div>
		);
	}
}

export default Input;