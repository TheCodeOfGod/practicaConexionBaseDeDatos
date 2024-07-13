const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, '..')));

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'conexion_prueba'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// ruta por default (manda a la pagina html)
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// Ruta para mostrar la pagina en lugar
app.get('/lugares', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ruta para mostrar un lugar por id
app.get('/api/lugares', (req, res) => {
    const nombreLugar = req.query.nombre;

    if (!nombreLugar) {
        return res.status(400).json({ error: 'Se requiere el parámetro "nombre"' });
    }

    const sql = 
        `SELECT l.*, c.nombre_categoria 
        FROM lugares l
        JOIN categorias c ON l.fk_categoria = c.id_categoria
        WHERE l.nombre_lugar = ?`
    ;
    
    db.query(sql, [nombreLugar], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la consulta de la base de datos' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontró ningún lugar con ese nombre' });
        }
        res.json(results);
    });
    
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 