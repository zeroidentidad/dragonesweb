-- CREACIÓN DEL USUARIO
CREATE USER dragones PASSWORD 'xD' LOGIN SUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION; -- como superusuario para extensiones

-- CREACIÓN DEL TABLESPACE (OPCIONAL)
CREATE TABLESPACE ts_dragones OWNER dragones LOCATION E'C:\\tablespaces\\dragones';

-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE dragones OWNER = dragones TABLESPACE = ts_dragones;

-->> CONEXION CON EL USUARIO dragones para lo siguiente:

-- GENERACIÓN:

create table generacion(
id serial primary key, 
expiracion timestamp not null
);

-- DRAGON:

create table dragon(
id serial primary key,
nacimientofecha timestamp not null,
nickname varchar(64),
"generacionId" integer,
foreign key ("generacionId") references generacion(id)
);

-- RASGO:

create table rasgo(
id serial primary key,
"tipoRasgo" varchar not null,
"valorRasgo" varchar not null
);