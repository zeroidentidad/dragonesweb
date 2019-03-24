# DragonesWeb

Documentación del desarrollo de caso practico con NodeJS, React y PostgreSQL

## instalación dependencias /backend:

- npm i nodemon --save-dev   -> package.json con  scripts > "start": "node .", "dev": "nodemon ."

- npm i express --save   -> para la web API

- npm i pg --save -> pool conexion BD

- npm i cors --save -> para intercambio de recursos de origen cruzado entre el backend y el frontend

- npm i body-parser@1.18.3 --save-dev -> para los formatos de peticiona a la API

- npm i crypto-js@3.1.9-1 --save -> para encriptacion de usuario y contraseña

- npm i uuid@3.3.2 --save  -> para generacion aletoria de id de sesion

- npm i cookie-parser@1.4.3 --save  -> para manipulacion de las cookies creadas

- npm i base-64@0.1.0 --save -> 

## instalación dependencias /frontend: (versiones estables)

- npm i -g parcel-bundler@1.9.7  -> instalacion global del empaquetador web

- npm i react@16.4.2 react-dom@16.2.0 --save  -> version usada, posible en linux-mac modificar permisos en /.npm/_ cacache, para permitir instalar en el dir local /frontend

- npm i babel-preset-env@1.6.1 babel-preset-react@6.24.1 babel-plugin-transform-class-properties@6.24.1 --save-dev  -> para transpilación del codigo JS

- #configuracion inicial: .babelrc con: { "presets": ["env", "react"], "plugins": ["transform-class-properties"] }

-> package.json con: "start": "parcel index.html", "clean": "rm -rf dist .cache"

- npm i react-bootstrap@0.32.4 --save

- npm i babel-plugin-transform-object-rest-spread@6.26.0 --save-dev

- npm i redux@4.0.0 --save

- npm i react-redux@5.0.7 --save

- npm i redux-thunk@2.3.0 --save

- npm i history@4.7.2 --save

- npm i react-router@4.3.1 --save

- npm i react-router-dom@4.3.1 --save

* ver archivos finales en el dir /frontend de .babelrc  y package.json

## creación BD /backend/scripts_sql:

- estructura_bd.sql

- node ./data/insertarRasgos.js -> rasgos predeterminados para la tabla.
