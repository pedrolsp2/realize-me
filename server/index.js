const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors")

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'realize',
});

app.use(cors())
app.use(express.json())

app.post('/register',(req, res)=>{
    const {sonho} = req.body;
    const {foto} = req.body;
    const {descricao} = req.body;
    const {data} = req.body;

    let SQL = "INSERT INTO sonhos (sonho, foto, descricao, data) VALUES (?,?,?,?)"

    db.query(SQL,[sonho, foto, descricao, data],(err, res)=>{
        console.log(err)
    })
})

app.get('/getDream',(req,res)=>{
    let SQL = "SELECT * FROM sonhos order by id desc limit 3"

    db.query(SQL,(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

app.listen(3001,()=>{
    console.log("servidor rodando!")
});