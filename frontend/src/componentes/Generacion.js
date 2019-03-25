import React, { Component } from 'react';
import { connect } from 'react-redux';
import { recuperarGeneracion } from '../acciones/generacion';
import recuperarEstados from '../reductores/recuperarEstados';

const RETRASO_MINIMO = 3000;

class Generacion extends Component{
	timer = null;

	componentDidMount(){ /* funcion compat old React */
		this.recuperarSiguienteGeneracion();
	}

	componentWillUnmount(){
		clearTimeout(this.timer);
	}

	recuperarSiguienteGeneracion = () =>{
		this.props.recuperarGeneracion();

		let retraso = new Date(this.props.generacion.expiracion).getTime() - 
			new Date().getTime();

		if(retraso < RETRASO_MINIMO){
			retraso = RETRASO_MINIMO;
		};

		this.timer = setTimeout(()=>this.recuperarSiguienteGeneracion(), retraso);
	}	

	render(){
		const { generacion } = this.props;

		if (generacion.status === recuperarEstados.error) {
			return <div>{generacion.message}</div>;
		}

		return(
			<div>
			<h3>Generacion {generacion.generacionId}. Expira en:</h3>
			<h4>{new Date(generacion.expiracion).toString()}</h4>
			</div>
		)
	}
}

const mapaStateToProps = state => {
  const generacion = state.generacion;

  return { generacion };
};

const conectorComponente = connect(
  mapaStateToProps,
  { recuperarGeneracion }
);


export default conectorComponente(Generacion);