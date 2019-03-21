import React, { Component } from 'react';
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
		return <DragonAvatar dragon ={this.state.dragon} />;		
	}
}

export default Dragon;