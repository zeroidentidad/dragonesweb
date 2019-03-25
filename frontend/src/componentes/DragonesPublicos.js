import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPublicDragones } from '../acciones/dragonesPublicos';
import { fetchAccountDragones } from '../acciones/cuentaDragones';
import { Link } from 'react-router-dom';
import DragonPublicoRow from './DragonPublicoRow';

class DragonesPublicos extends Component {
  componentDidMount() {
    this.props.fetchPublicDragones();
    this.props.fetchAccountDragones();
  }

  render() {
    return (
      <div>
        <h3>Dragones Publicos</h3>
        {
          this.props.dragonesPublicos.dragones.map(dragon => {
            return (
              <div key={dragon.dragonId}>
                <DragonPublicoRow dragon={dragon} />
                <hr />
              </div>
            )
          })
        }
        <Link to='/'>Inicio</Link>
      </div>
    )
  }
}

export default connect(
  ({ dragonesPublicos }) => ({ dragonesPublicos }),
  { fetchPublicDragones, fetchAccountDragones }
)(DragonesPublicos);