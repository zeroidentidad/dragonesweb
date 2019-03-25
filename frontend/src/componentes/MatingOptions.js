import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { BACKEND } from '../config';
import history from '../history';

class MatingOptions extends Component {
  mate = ({ matronDragonId, patronDragonId }) => () => {
    fetch(`${BACKEND.ADDRESS}/dragon/mate`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matronDragonId, patronDragonId })
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
        <h4>Elige uno de tus dragones para aparearse:</h4>
        {
          this.props.cuentaDragones.dragones.map(dragon => {
            const { dragonId, generacionId, nickname } = dragon;

            return (
              <span key={dragonId}>
                <Button onClick={
                  this.mate({
                    patronDragonId: this.props.patronDragonId,
                    matronDragonId: dragon.dragonId
                  })
                }>
                  Gen: {generacionId}. Id: {dragonId}. {nickname}
                </Button>
                {' '}
              </span>
            )
          })
        }
      </div>
    )
  }
}

export default connect(
  ({ cuentaDragones }) => ({ cuentaDragones }),
  null
)(MatingOptions);