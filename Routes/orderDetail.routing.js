const router = require ('express').Router();
const orderDetailController = require ('../Controllers/orderDetail.controller');

router.post('/create/:cartId', orderDetailController.orderDetail);
router.get('/list', orderDetailController.listOrderDetail);
router.put('/update/:orderDetailId', orderDetailController.updateOrderDetail);
router.delete('/delete/:orderDetailId', orderDetailController.deleteOrderDetail);
router.patch('/patchorderId/:orderDetailId', orderDetailController.patchorderId);
router.patch('/patchproductId/:orderDetailId', orderDetailController.patchproductId);
router.post('/tes', orderDetailController.createOrderDetail);

module.exports = router;