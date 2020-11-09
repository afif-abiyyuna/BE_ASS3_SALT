const router = require ('express').Router();
const orderController = require ('../Controllers/order.controller');

router.post('/create', orderController.createOrder);
router.get('/list', orderController.listOrder);
router.put('/modify/:orderId', orderController.modifyOrder);
router.delete('/delete/:orderId', orderController.deleteOrder);
router.patch('/patchmemberId/:orderId', orderController.patchUser);


module.exports = router;