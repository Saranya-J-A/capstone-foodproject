const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const authAdmin = require('../middlewares/authAdmin');

const { createItem, getAllItems, getItemById, updateItem, deleteItem} = require('../controllers/adminItemController');

// CREATE ITEM
router.post('/', authAdmin, upload.single('image'), createItem);

// GET ALL ITEMS
router.get('/', authAdmin, getAllItems);

// GET ITEM BY ID
router.get('/:id', authAdmin, getItemById);

// UPDATE ITEM
router.put('/:id', authAdmin, upload.single('image'), updateItem);

// DELETE ITEM
router.delete('/:id', authAdmin, deleteItem);

module.exports = router;
