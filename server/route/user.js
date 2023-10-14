const userController = require("../controllers/userController");
const router = require("express").Router();


router.post("/create", userController.create)
router.post("/login", userController.login)

module.exports = router;
