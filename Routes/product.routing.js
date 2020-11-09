const router = require ('express').Router();
const productController = require ('../Controllers/product.controller');

router.post('/post', productController.postProduct);
router.get('/list', productController.listProduct);
router.get('/detail/:productId', productController.getDetail);
router.get('/image/:productId', productController.viewImageProduct);
router.put('/update/:productId', productController.updateProduct);
router.delete('/delete/:productId', productController.deleteProduct);
router.patch('/patchCategory/:productId', productController.productPatchCategory);
router.param('productId', productController.getProductId);
router.get('/all', productController.productAll);


module.exports = router;