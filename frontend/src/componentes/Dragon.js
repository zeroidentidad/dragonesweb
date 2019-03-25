import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import { recuperarDragon } from '../acciones/dragon';
import recuperarEstados from '../reductores/recuperarEstados';

class Dragon extends Component {
	//state = { dragon: DRAGON_DEFAULT };
	/*componentDidMount(){ this.recuperarDragon(); }*/

	get DragonView() {
		const { dragon } = this.props;

		if (dragon.status === recuperarEstados.error) return <span>{dragon.message}</span>;

		return <DragonAvatar dragon={dragon} />;
	}	

	render(){
		//const { generacionId, dragonId, rasgos } = this.state.dragon;
		return (
			<div>
				<Button onClick={this.props.recuperarDragon}>Nuevo Dragon</Button>
				<br />
				{ this.DragonView }
			</div>
		)
	}
}

export default connect(
  ({ dragon }) => ({ dragon }),
  { recuperarDragon }
)(Dragon);