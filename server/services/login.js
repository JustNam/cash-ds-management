const { sequelize } = require("../models")
const authController = require('../controllers/authController')

module.exports = async (req, res) => {

    try {
        await authController.login(req.body)
            .then(result => {
                console.log("Response returned:", result)
                if (result != null) {
                    // console.log(result)
                    res.status(200).json({ "success": true })
                } else {
                    // console.log("failed")
                    res.status(200).json({ "success": false })
                }
            })
            .catch(error => {
                console.error('Error login :', error);
                res.status(500).json({ error: 'An error occurred while login' });
            });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}