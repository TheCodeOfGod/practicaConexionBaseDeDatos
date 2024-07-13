# practicaConexionBaseDeDatos
Conexion con la base de datos del proyecto integrador


Esta es una parte del proyecto, el proposito es que en el index.html se muestre un lugar seleccionado. Dicha pagina se abrira cuando en una pagina de menu de lugares se seleccione un lugar en especifico, el boton estara enlazado directamente con el request que tiene el nombre del lugar.

En la carpeta de Conexion se encuentra el archivo index.js donde se hace la conexion con el servidor y base de datos. Asi mismo aqui se cre la api: "/api/lugares" que actua con el nombre del lugar, recibiendolo como parametro. Para que funcione esta api se debe especificar de la siguiente manera en el navegador: http://localhost:3000/lugares?nombre=nombre_del_lugar

Al hacer esa busqueda en el navegador la misma api esta diseñada para dirigirnos al index.html y el script se encarga de mostrar los datos del lugar en la pagina html. Dichos datos perteneceran al lugar con el nombre especificado en la busqueda.

La base de datos, tablas e inserciones son las siguientes:

create database conexion_prueba;
use conexion_prueba;

create table categorias(
id_categoria int auto_increment primary key,
nombre_categoria varchar(50)
);

create table lugares(
id_lugar int auto_increment primary key,
nombre_lugar varchar(50) not null,
caracteristica_1 varchar(20) not null,
caracteristica_2 varchar (20) not null,
caracteristica_3 varchar(20) not null,
calle varchar(50) not null,
numero varchar (50) not null,
colonia varchar(50) not null,
ciudad varchar(50) default 'Chihuahua',
fk_categoria int not null,
foreign key (fk_categoria) references categorias(id_categoria)
);


-- Insertar categorias
insert into categorias(nombre_categoria)
values
		('Cafe'),
        ('Restaurante'),
        ('Bar');

-- Insertar datos en lugares
insert into lugares (nombre_lugar, caracteristica_1, caracteristica_2, caracteristica_3, calle, numero, colonia, fk_categoria)
values 
		('Kaldi Café', 'Especializado', 'Acogedor', 'Popular', 'Calle 6', '1800', 'Centro', 1),
		('Corinto', 'Bonito', 'Tranquilo', 'Popular', 'Av. Cantera', '200', 'Cantera 5', 1),
        ('Starbucks', 'Caro', 'Tranquilo', 'Popular', 'Av. Cantera', '200', 'Cantera 5', 1);
        
        
        select * from lugares;
        

SELECT l.*, c.nombre_categoria 
FROM lugares l
JOIN categorias c ON l.fk_categoria = c.id_categoria
WHERE l.fk_categoria = (select fk_categoria from lugares where id_lugar= 1) and l.id_lugar != 1;
