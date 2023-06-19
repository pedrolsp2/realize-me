const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors")

const db = mysql.createPool({
    host: 'localhost',
    user: 'id20934624_root',
    password: 'Qq34211200@',
    database: 'id20934624_realizeme',
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