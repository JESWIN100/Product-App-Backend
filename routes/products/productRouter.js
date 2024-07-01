const express = require('express');
const { addProduct, getAllProduct, getProductId, deleteProductId, updateProductId } = require('../../controllers/productController');
const asyncHandler = require('../../utils/asyncHandler');
const { verifyToken } = require('../../utils/jwtToken');

const router = express.Router();

router.post('/', verifyToken, asyncHandler(addProduct))
  .get('/', asyncHandler(getAllProduct))
  .get('/:id', asyncHandler(getProductId))
  .delete('/:id', asyncHandler(deleteProductId))
  .put('/:id', asyncHandler(updateProductId))
  // .post('/upload', upload.single('image'), uploadImage);

module.exports = router;
