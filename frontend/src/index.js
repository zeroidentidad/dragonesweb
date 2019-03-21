import React from 'react';
import { render } from 'react-dom';
import Generacion from './componentes/Generacion';
import Dragon from './componentes/Dragon';
import './index.css';

render(
	<div>
	<h2>Dragones Web desde React</h2>
	<Generacion />
	<Dragon />
	</div>,
	document.getElementById('root')
);