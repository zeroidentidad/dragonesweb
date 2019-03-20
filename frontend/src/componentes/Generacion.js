import React, { Component } from 'react';

class Generacion extends Component{

	estado = { generacion: { generacionId: 999, expiracion:'2020-05-01'} };

	componenteMontado(){
		this.recuperarGeneracion();
	}

	recuperarGeneracion = () =>{
		recuperar('http://localhost:3000/generacion')
		.then(respuesta => console.log('respuesta', respuesta));
	};

	render(){
		const { generacion } = this.estado;
		return(
			<div>
			<h3>Generacion {generacion.generacionId}. Expira en:</h3>
			<h4>{ new Date(generacion.expiracion).toString()}</h4>
			</div>
		)
	}
}

export default Generacion;