const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT,function () {
    console.log("Server is running...")
});

app.get("/demo",function (req,res){
    res.send("Hello World!");
});
// config to connect mysql
const configDB = {
    host: "139.180.186.20",
    port: 3306,//mysql: 3306, sqlserver: 1433
    database: "t2207e",
    user: "t2207e",
    password:"t2207e123", //mamp: "root", xampp: ""
    multipleStatements: true //cho phep su dung nhieu cau sql trong 1 lan gui yeu cau
};

// connect to mysql
const mysql = require("mysql");
const conn = mysql.createConnection(configDB);

// api list all class
app.get("/get-classes",function (req,res) {
    const sql = "select * from classes";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-students",function (req,res) {
    const sql = "select * from students";
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

// loc theo cid

app.get("/get-by-classes",function (req,res) {
    const cid = req.query.cid;
    const sql = "select * from students where cid = "+cid;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-student-by-name",function (req,res) {
    const name = req.query.name;
    const sql = `select * from students where name like '%${name}%' or email like '%${name}%'`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-student-by-classname",function (req,res) {
    const clname = req.query.clname;
    const sql = `select * from students where cid in (select cid from classes where name like '%${clname}%')`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/get-join-table",function (req,res) {
    const clname = req.query.clname;
    const sql = `
select students.name as sname,classes.name as clname from students 
inner join classes on students.cid = classes.cid
where classes.name like '%${clname}%';
`;
    conn.query(sql,function (err,data){
        if(err){
            res.send("404 not found");
        }else{
            res.send(data);
        }
    })
    //dung co ma send o day
});

app.get("/student",function(req,res){
    //Liet ke sinh vien
    res.send("Student with GET");
});
app.post("/student",function(req,res){
    //them 1 sinh vien
    res.send("Student with POST");
});
app.put("/student",function(req,res){
    //update sinh vien
    res.send("Student with PUT");
});
app.delete("/student",function(req,res){
    //delete sinh vien
    res.send("Student with DELETE");
});