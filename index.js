const express = require('express');
const bodyParser = require('body-parser');
const dbconnection = require('./configdb/database');
const app = express();
const PORT = process.env.PORT || 5000;

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// read data / get all data
app.get("/", (req, res) => {
    // buat query sql
    const querySql = 'SELECT * FROM Users';

    // jalankan query
    dbconnection.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'There is an error', error: err });
        }

        // jika request berhasil
        res.status(200).json({ data: rows });
    });

    return 0;
});

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));