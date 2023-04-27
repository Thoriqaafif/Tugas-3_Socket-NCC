const mysql = require('mysql');
// buat konfigurasi koneksi
const dbconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '987654321',
    database: 'realtime_chat',
    multipleStatements: true
});
// koneksi database
dbconnection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected to root@localhost in realtime_chat Database');
});
module.exports = dbconnection;