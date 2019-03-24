import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../acciones/cuentaInfo';

class CuentaInfo extends Component {
  componentDidMount() {
    this.props.fetchAccountInfo();
  }

  render() {
    return (
      <div>
        <h3>Info. Cuenta</h3>
        <div>Nombre usuario: {this.props.cuentaInfo.username}</div>
        <div>Balance: {this.props.cuentaInfo.balance}</div>
      </div>
    )
  }
  
}

export default connect(
  ({ cuentaInfo }) => ({ cuentaInfo }),
  { fetchAccountInfo }
)(CuentaInfo);