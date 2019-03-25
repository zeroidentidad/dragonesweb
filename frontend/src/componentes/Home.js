import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Generacion from './Generacion';
import Dragon from './Dragon';
import CuentaInfo from './CuentaInfo';
import { logout } from '../acciones/cuenta';

class Home extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.logout} className='logout-button'>
          Salir
        </Button>
        <h3></h3>
        <Generacion />
        <Dragon />
        <hr />
        <CuentaInfo />
        <hr />
        <Link to='/cuenta-dragones'>Cuenta Dragones</Link>
        <br />
        <Link to='/dragones-publicos'>Dragones Publicos</Link>
      </div>
    );
  }
}

export default connect(null, { logout })(Home);