/*
CREATE TABLE knjiga(
    id int(11) primary key AUTO_INCREMENT, 
    naslov varchar(100), 
    autor varchar(100), 
    slika varchar(700))
INSERT INTO knjiga(naslov, autor, slika) VALUES("Istkano kraljevstvo","Tahereh Mafi","https://znanje.hr/product-images/aad12c05-d5db-4961-97f9-b0eec753fd47.jpg")
INSERT INTO knjiga(naslov, autor, slika) VALUES("Violinistica","Harriet Constable","images/violinistica.jpg")
*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: '*'}))

const connection = {
    host:"***",
    database:"***",
    user:"***",
    password:"***"
}
conn = mysql.createConnection(connection);

app.get('/getknjige', (request, response) => {
    conn.query("SELECT * FROM knjiga", (error, results) => {
    if (error) {
        console.log(error)
    }
    return response.send(results);
    })
});

app.post('/addknjiga', (request, response) => {
    const data = request.body;
    console.log(data.autor);
    console.log(data.naslov);
    knjiga = [data.naslov, data.autor, data.slika];
    conn.query("INSERT INTO knjiga(naslov, autor, slika) VALUES(?,?,?)", knjiga, (error, results) => {
        if (error) {
            console.log(error)
        }
        return response.send(results);
    })
});

app.post('/rezervacija/:id_knjige/:id_korisnika', (request, response) => {
    const id_knjige = request.params.id_knjige;
    const id_korisnika = request.params.id_korisnika;
    const datum = request.body.datum;
    conn.query("INSERT INTO `rezervacija`(`datum_rez`,`id_knjige`,`id_korisnika`) VALUES (?,?,?)", [datum, id_knjige, id_korisnika], 
        (error, results) => {
        if (error) {
            console.log(error)
        }
        return response.send(results);
    })
});

app.put('/updateknjiga', (request, response) => {
    const data = request.body;
    console.log(data.autor);
    console.log(data.naslov);
    return response.send('PUT metoda -> Change '+data.autor+" "+data.naslov);
});
app.delete('/deleteknjiga', (request, response) => {
    const data = request.body;
    console.log('Delete '+data.id);
    return response.send('Delete '+data.id);
});
app.get('/hello', (request, response) => {
    return response.send('Hello world');
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});