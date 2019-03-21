import React, { Component } from 'react';

const GENERACION_DEFAULT = { generacionId: '', expiracion: '' };

const RETRASO_MINIMO = 3000;

class Generacion extends Component{

	state = { generacion: GENERACION_DEFAULT }; // necesario 'state' no se puede usar en español con la palabra "estado" 

	timer = null;

	componentDidMount(){ /* funcion React */
		this.recuperarSiguienteGeneracion();
	}

	componentWillUnmount(){
		clearTimeout(this.timer);
	}

	recuperarGeneracion = () =>{
		fetch('http://localhost:3000/generacion') /* funcion JS */
		.then(respuesta => respuesta.json())
		.then(json => {
			console.log('json',json)

			this.setState({ generacion: json.generacion }); // acualizar estado del componente
		})
		.catch(error => console.error('error', error));
	};

	recuperarSiguienteGeneracion = () =>{
		this.recuperarGeneracion();

		let retraso = new Date(this.state.generacion.expiracion).getTime() - new Date().getTime();

		if(retraso < RETRASO_MINIMO){
			retraso = RETRASO_MINIMO;
		};

		this.timer = setTimeout(()=>this.recuperarSiguienteGeneracion(), retraso);
	};	

	render(){
		const { generacion } = this.state;
		return(
			<div>
			<h3>Generacion {generacion.generacionId}. Expira en:</h3>
			<h4>{new Date(generacion.expiracion).toString()}</h4>
			</div>
		)
	}
}

export default Generacion;