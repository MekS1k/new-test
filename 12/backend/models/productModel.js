// import connection
import db from "../config/database.js";
 
// Get All User
export const getProducts = (result) => {
    db.query("SELECT * FROM credentials", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
// Get All Questions
export const getQuestions = (result) => {
    db.query("SELECT * FROM questions", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
// Get All Tests
export const getTests = (result) => {
    db.query("SELECT * FROM test", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}


export const getRole = (result) => {
    db.query("SELECT * FROM role", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
 
// Get Single Product
export const getProductById = (id, result) => {
    db.query("SELECT * FROM credentials WHERE Логин = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}

// Insert Questions to Database
export const insertQuestions = (data, result) => {
    db.query("INSERT INTO questions SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
// Insert Test to Database
export const insertTest = (data, result) => {
    db.query("INSERT INTO test SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}