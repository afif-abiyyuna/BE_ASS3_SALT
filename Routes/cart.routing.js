const router = require ('express').Router();
const cartController = require ('../Controllers/cart.controller');

// router.post('/add', cartController.addCart);
router.get('/list', cartController.listCart);
router.post('/add/:memberId', cartController.addCart);
router.put('/update/:cartId', cartController.updateCart);
router.delete('/delete/:cartId', cartController.deleteCart);
router.patch('/patchmemberId/:cartId', cartController.patchmemberId);

module.exports = router;