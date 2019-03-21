import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';

const DRAGON_DEFAULT = {
	dragonId: '',
	generacionId: '',
	nickname: '',
	nacimientofecha: '',
	rasgos: []
};

class Dragon extends Component {
	state = { dragon: DRAGON_DEFAULT };

	componentDidMount(){
		this.recuperarDragon();
	}

	recuperarDragon = () =>{
		fetch('http://localhost:3000/dragon/nuevo')
		.then(respuesta => respuesta.json())
		.then(json => this.setState({ dragon: json.dragon }))
		.catch(error => console.error('error', error));
	}

	render(){
		//const { generacionId, dragonId, rasgos } = this.state.dragon;
		return (
			<div>
				<Button onClick={this.recuperarDragon}>Nuevo Dragon</Button>
				<DragonAvatar dragon={this.state.dragon} />
			</div>
		);		
	}
}

export default Dragon;