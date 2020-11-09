const router = require ('express').Router();
const memberController = require ('../Controllers/member.controller');

router.post('/register', memberController.memberRegister);
router.post('/login', memberController.memberLogin);
router.get('/list', memberController.memberList);
router.get('/profile/:memberId', memberController.memberById);
router.put('/update/:memberId', memberController.memberUpdate);
router.delete('/delete/:memberId', memberController.memberDelete);
router.patch('/patchAddress/:memberId', memberController.memberPatchAddress);
router.patch('/patchCart/:memberId', memberController.patchcartId);

module.exports = router;