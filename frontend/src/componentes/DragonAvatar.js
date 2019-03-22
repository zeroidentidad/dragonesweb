import React, { Component } from 'react';
import { flaco, esbelto, deportivo, rechoncho, irregular, simple, moteado, rayado } from '../assets';

const mapaPropiedad = {
	backgroundColor: { negro: '#263238', blanco: '#cfd8dc', verde: '#a5d6a7', azul: '#0277bd'},
	pattern: { simple, rayado, moteado, irregular },
	build: { esbelto, rechoncho, deportivo, flaco },
	size: { pequeño: 100, mediano: 140, grande: 180, gigante: 220 }
};

class DragonAvatar extends Component {
	get ImagenDragon(){

		const mapaPropiedadDragon={};

		this.props.dragon.rasgos.forEach(rasgo =>{
			const { tipoRasgo, valorRasgo } = rasgo;
			mapaPropiedadDragon[tipoRasgo] = mapaPropiedad[tipoRasgo][valorRasgo];
		});

		const { backgroundColor, pattern, build, size } = mapaPropiedadDragon;

		const sizing = { width: size, height: size};

		return(
			<div className='dragon-avatar-image-wrapper'>
				<div className='dragon-avatar-image-background' style={{ backgroundColor, ...sizing }}></div>
				<img src={pattern} className='dragon-avatar-image-pattern' style={{ ...sizing }}/>
				<img src={build} className='dragon-avatar-image' style={{ ...sizing }}/>
			</div>
		);
	}

	render(){
		const { generacionId, dragonId, rasgos } = this.props.dragon;

		//if(!dragonId) return <div></div>;

		return(
			<div>
				<span>G{generacionId}.</span>
				<span>I{dragonId}.</span>
				{ rasgos.map(rasgo => rasgo.valorRasgo).join(', ') }
				{ this.ImagenDragon }
			</div>
		)		
	}
}

export default DragonAvatar;