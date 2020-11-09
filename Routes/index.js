const router = require ('express').Router();
const memberRoutes = require ('./member.routing');
const authenthication = require ('../Middlewares/authenthication');
const addressRoutes = require ('./address.routing');
const productRoutes = require ('./product.routing');
const categoryRoutes = require ('./category.routing');
const cartRoutes = require ('./cart.routing');
const orderRoutes = require ('./order.routing');
const orderDetailRoutes = require ('./orderDetail.routing');
const errorHandler = require ('../Middlewares/errorHandler');

router.use('/member', memberRoutes);
router.use('/product', productRoutes);
router.use(authenthication);
router.use('/address', addressRoutes);
router.use('/category', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/orderDetail', orderDetailRoutes);



router.use(errorHandler);


module.exports = router;