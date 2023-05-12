// Import function from Product Model
import {getRole, getProducts, getProductById, getQuestions, getTests,insertQuestions,insertTest} from "../models/productModel.js";
 
// Get All Products
export const showProducts = (req, res) => {
    getProducts((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const showRole = (req, res) => {
    getRole((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const showTest = (req, res) => {
    getTests((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

export const showQuestions = (req, res) => {
    getQuestions((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
// Get Single Product 
export const showProductById = (req, res) => {
    getProductById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
// Create New Questions
export const createQuestions = (req, res) => {
    const data = req.body;
    insertQuestions(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
// Create New Test
export const createTest = (req, res) => {
    const data = req.body;
    insertTest(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}