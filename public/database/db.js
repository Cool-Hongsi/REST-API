const mysql = require('mysql');

var conn = mysql.createConnection({ // check information : heroku config --app appname
    host : 'us-cdbr-iron-east-01.cleardb.net',
    user : 'b0f6184343935b',
    password : 'd5829138',
    database : 'heroku_1e49514ce00fd3b'
});

conn.connect();

module.exports.getData = () => { // select
    return new Promise((resolve, reject) => {
        let selectSQL = 'SELECT * FROM CONTACTS';
        conn.query(selectSQL, (err, rows, fields) => {
            if(err){
                reject(err);
            }
            else{
                resolve(rows);
            }
        })
    })
};

module.exports.addData = (data) => { // insert
    return new Promise((resolve, reject) => {
        let insertSQL = 'INSERT INTO CONTACTS (FNAME, LNAME, PNUMBER, ADDRESS, EMAIL) VALUES (?, ?, ?, ?, ?)';
        let params = [data.fname, data.lname, data.pnumber, data.address, data.email];
        conn.query(insertSQL, params, (err, rows, fields) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Successfully Added");
            }
        })
    })
};

module.exports.updateData = (data) => { // update
    return new Promise((resolve, reject) => {
        let updateSQL = 'UPDATE CONTACTS SET FNAME=?, LNAME=?, PNUMBER=?, ADDRESS=?, EMAIL=? WHERE ID=?';
        let params = [data.fname, data.lname, data.pnumber, data.address, data.email, data.id]; // primary key => id
        conn.query(updateSQL, params, (err, rows, fields) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Successfully Updated");
            }
        })
    })
};

module.exports.deleteData = (data) => { // delete
    return new Promise((resolve, reject) => {
        let deleteSQL = 'DELETE FROM CONTACTS WHERE ID=?';
        let param = data.id; // primary key => id
        conn.query(deleteSQL, param, (err, rows, fields) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Successfully Deleted");
            }
        })
    })
};