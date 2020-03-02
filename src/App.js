import React, { Component } from 'react';
import './App.css';

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = '53ee32e6022d4373b9f098e9e65c6bcf';
const redirectUri = 'http://localhost:3000';
const scopes = [
	'user-read-currently-playng',
	'user-read-playback-state'
];

//Get the hash of Url
const hash = window.location.hash
	.substring(1)
	.split('&')
	.reduce((initial, item) => {
		if(item) {
			var parts = item.split('=');
			initial[parts[0]] = decodeURIComponent(parts[1]);
		}
		return initial;
	}, {} );

window.location.hash = '';

class App extends Component {


	componentDidMount() {
		//set token
		let _token = hash.access_token;
		if (_token) {
		//set token
			this.setState({
				token: _token
			});
		}
	};

	render() {
		return(
			<div>
				<header>
					{!this.state.token && (
						<a href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>
							Login Spotfy
						</a>

					)}
					
				</header>
			</div>		
		);
	}
};

export default App;
