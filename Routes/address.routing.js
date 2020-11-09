const router = require ('express').Router();
const addressController = require('../Controllers/address.controller');


router.post('/create', addressController.createAddress);
router.get('/list', addressController.listAddress);
router.get('/getAddress/:addressId', addressController.getAddressById);
router.put('/update/:addressId', addressController.updateAddress);
router.delete('/delete/:addressId', addressController.deleteAddress);
router.patch('/patchmemberId/:addressId', addressController.patchmemberId);

module.exports = router;