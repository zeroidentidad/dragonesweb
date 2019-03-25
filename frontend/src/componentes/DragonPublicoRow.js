import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';
import MatingOptions from './MatingOptions';
import { BACKEND } from '../config';
import history from '../history';

class DragonPublicoRow extends Component {
  state = { displayMatingOptions: false };

  toggleDisplayMatingOptions = () => {
    this.setState({
      displayMatingOptions: !this.state.displayMatingOptions
    });
  }

  comprar = () => {
    const { dragonId, saleValue } = this.props.dragon;

    fetch(`${BACKEND.ADDRESS}/dragon/comprar`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dragonId, saleValue })
    }).then(response => response.json())
      .then(json => {
        alert(json.message);

        if (json.type !== 'error') {
          history.push('/cuenta-dragones');
        }
      })
      .catch(error => alert(error.message));
  }

  render() {
    return (
      <div>
        <div>{this.props.dragon.nickname}</div>
        <DragonAvatar dragon={this.props.dragon} />
        <div>
          <span>Valor venta: {this.props.dragon.saleValue}</span>{' | '}
          <span>Valor aparear: {this.props.dragon.sireValue}</span>
        </div>
        <br />
        <Button onClick={this.comprar}>Comprar</Button>{' '}
        <Button onClick={this.toggleDisplayMatingOptions}>Aparear</Button>
        <br />
        {
          this.state.displayMatingOptions ?
            <MatingOptions patronDragonId={this.props.dragon.dragonId} /> :
            <div></div>
        }
      </div>
    )
  }
}

export default DragonPublicoRow;