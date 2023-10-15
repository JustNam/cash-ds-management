const userController = require("../controllers/userController");
const router = require("express").Router();


router.get("/", userController.get);
router.post("/", userController.upsert);
router.post("/login", userController.login);
router.post("/delete", userController.del);
router.get("/list", userController.listUsers);
router.post("/tokenValid", userController.tokenValid)

module.exports = router;
