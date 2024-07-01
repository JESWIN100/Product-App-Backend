
const productModel = require("../models/products");
const ProductJoi = require("../validation/productJoi");
const multer  = require('multer')
const path = require('path');
const router= require('express').Router();
// const upload = multer({ dest: 'uploads/' })


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {

        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });




// Add new product
const addProduct = async (req, res) => {
    try {
        const data = req.body;
        console.log('not joi', data);
        
        const isJoiValidated = await ProductJoi.validateAsync(data);
        console.log('joi', isJoiValidated); 
        
        const saveData = new productModel(isJoiValidated);
        await saveData.save();
        
        res.status(201).send({ message: "Data saved successfully" });
    } catch (err) {
        console.error(err);
        if (err.isJoi) {
            res.status(400).send({ message: err.details[0].message });
        } else {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}

// Get all products
const getAllProduct = async (req, res) => {
    try {
        const allData = await productModel.find({});
        res.status(200).send({ data: allData, message: "Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

// Get product by ID
const getProductId = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productModel.findById(id);
        if (!data) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send({ data, message: "Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

// Delete product by ID
const deleteProductId = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send({ data, message: "Success" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

// Update product by ID
const updateProductId = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        // Validate the new data
        const isJoiValidated = await ProductJoi.validateAsync(newData);
        console.log('joi', isJoiValidated);

        const data = await productModel.findByIdAndUpdate(id, isJoiValidated, { new: true });
        if (!data) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send({ data, message: "Success" });
    } catch (err) {
        console.error(err);
        if (err.isJoi) {
            res.status(400).send({ message: err.details[0].message });
        } else {
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}

// Image upload route
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        console.log('File received:', req.file);
        res.status(200).json({ message: 'Image uploaded successfully', file: req.file });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error uploading image: ' + error);
    }
});

module.exports = { addProduct, getAllProduct, getProductId, deleteProductId, updateProductId,router }
