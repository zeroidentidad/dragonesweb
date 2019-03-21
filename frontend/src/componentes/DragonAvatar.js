import React, { Component } from 'react';

class DragonAvatar extends Component {
	render(){
		const { generacionId, dragonId, rasgos } = this.props.dragon;

		return(
			<div>
				<span>G{generacionId}.</span>
				<span>I{dragonId}.</span>
				{ rasgos.map(rasgo => rasgo.valorRasgo).join(', ') }
			</div>
		)		
	}
}

export default DragonAvatar;