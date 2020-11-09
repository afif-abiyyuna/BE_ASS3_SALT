const router = require ('express').Router();
const categoryController = require ('../Controllers/category.controller');

router.post('/create', categoryController.createCategory);
router.get('/list', categoryController.listCategory);
router.put('/modify/:categoryId',categoryController.modifyCategory);
router.delete('/delete/:categoryId', categoryController.deleteCategory)


module.exports = router;