import React, {Component} from 'react';
import './SearchResult.css';

class SearchResult extends Component {
	render() {
		console.log(this.props.myData);
		let loading = this.props.loadingImage;
		console.log(loading);
		if (loading === true) {
			return <img src={require("../public/loading.gif")} className="loadingGif" />
		}
		return(
			<div className="display-container">
				{this.props.myData.map((item,index) => 
					<div key={index} className="single-container">
						<img className="image" />
						<div className="description">
							<div className="display-title">{item.title}</div>
							<div className="display-author-name">{item.author_name[0]}</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default SearchResult;