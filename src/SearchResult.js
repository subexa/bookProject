import React, {Component} from 'react';
import './SearchResult.css';

class SearchResult extends Component {
	sliceText = (text) => {
		if (text.length > 15) {
			return text.slice(0,15) + "...";
		} else {
			return text;
		}
	}

	getImageURL = coverEditionKey => {
		const imageSource = 'http://covers.openlibrary.org/b/olid/';
		if (coverEditionKey) {
			return imageSource + coverEditionKey + '-M.jpg'
		}
		return 'http://placehold.it/180x268?text=No%20Image%20Found'
	}

	render() {
		const loading = this.props.loadingImage;
		if (loading === true) {
			return <img src={require("../public/loading.gif")} className="loadingGif" />
		}

		const className = (this.props.myBooksClicked === true) ? "my-book-class" : "single-container"

		return(
			<div className="display-container">
				{this.props.myData.map((item,index) => 
					<div key={index} className={className} onClick={() => this.props.addBookClickHandler(item)}>
						<img className="image" src={this.getImageURL(item.cover_edition_key)}
						/>
						<div className="description">
							<div className="display-title">
								<div>{this.sliceText(item.title)}</div>
								<div>
									<img src={require("../public/twoDots.png")} className="twoDots" />
								</div>
							</div>
							<div className="display-author-name">{item.author_name ? this.sliceText(item.author_name[0]) : "aakash"}</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default SearchResult;