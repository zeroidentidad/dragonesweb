# DragonesWeb

Documentación del desarrollo de caso practico con NodeJS, React y PostgreSQL

## instalación dependencias /backend:

- npm i nodemon --save-dev   -> package.json con  scripts > "start": "node .", "dev": "nodemon ."

- npm i express --save   -> para la web API

- npm i pg --save -> pool conexion BD

- npm i cors --save -> para intercambio de recursos de origen cruzado entre el backend y el frontend

## instalación dependencias /frontend:

- npm i -g parcel-bundler  -> instalacion global del empaquetador web

- npm i react@16.2.0 react-dom@16.2.0 --save  -> version usada, posible en linux-mac modificar permisos en /.npm/_ cacache, para permitir instalar en el dir local /frontend

- npm i babel-preset-env babel-preset-react babel-plugin-transform-class-properties --save-dev  -> para transpilación del codigo JS

- #configuracion inicial: .babelrc con: { "presets": ["env", "react"], "plugins": ["transform-class-properties"] }

-> package.json con: "start": "parcel index.html", "clean": "rm -rf dist .cache"

* ver archivos finales en el dir /frontend de .babelrc  y package.json

## creación BD /backend/scripts_sql:

- estructura_bd.sql

- node ./data/insertarRasgos.js -> rasgos predeterminados para la tabla.
