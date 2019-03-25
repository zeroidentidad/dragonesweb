import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAccountDragones } from '../acciones/cuentaDragones';
import CuentaDragonRow from './CuentaDragonRow';

class CuentaDragones extends Component {
  componentDidMount() {
    this.props.fetchAccountDragones();
  }

  render() {
    return (
      <div>
        <h3>Cuenta Dragones</h3>
        {
          this.props.cuentaDragones.dragones.map(dragon => {
            return (
              <div key={dragon.dragonId}>
                <CuentaDragonRow dragon={dragon} />
                <hr />
              </div>
            )
          })
        }
        <Link to='/'>Inicio</Link>
      </div>
    );
  }

}

export default connect(
  ({ cuentaDragones }) => ({ cuentaDragones }),
  { fetchAccountDragones }
)(CuentaDragones);