const Examinee = require('../models/Examinee');
const express = require('express');
const router = express.Router();

/* ================= REGISTER ================= */
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;

        const ex = await Examinee.findOne({ email: email });

        if (ex) {
            return res.json({ message: "Details already exist" });
        }

        const user = new Examinee(req.body);
        await user.save();

        return res.json({ message: "Registered Successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

/* ================= GET ALL USERS ================= */
router.get('/', async (req, res) => {
    const user = await Examinee.find();
    return res.json(user);
});

/* ================= LOGIN ================= */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Examinee.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password === password) {
            return res.status(200).json({
                message: "Login Successfully",
                user: {
                    email: user.email,
                    id: user._id,
                    role: "user"
                }
            });
        } else {
            return res.status(400).json({ message: "Password not matched" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

/* ================= DELETE ================= */
router.delete('/:id', async (req, res) => {
    await Examinee.findByIdAndDelete(req.params.id);
    return res.json({ message: "Deleted Successfully" });
});

module.exports = router;