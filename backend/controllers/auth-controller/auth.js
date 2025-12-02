const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const  registerUser = async (req, res) => {
    try {
        const { userName, userEmail, password, role } = req.body;

        console.log('registerUser body:', req.body);

        if (!userName || !userEmail || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields (userName, userEmail, password)'
            });
        }

        const existingUser = await User.findOne({ $or: [{ userEmail }, { userName }] });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'username or email already exists'
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, userEmail, role, password: hashPassword });

        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            data: { id: savedUser._id }
        });
    } catch (error) {
        console.error('registerUser error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { userEmail, password } = req.body;

        const checkUser = await User.findOne({ userEmail });

        if (!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const accessToken = jwt.sign({
            _id: checkUser._id,
            userName: checkUser.userName,
            userEmail: checkUser.userEmail,
            role: checkUser.role
        },
            process.env.JWT_SECRET || 'JWT_SECRET',
            { expiresIn: '120m' })

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                accessToken,
                user: {
                    _id: checkUser._id,
                    userName: checkUser.userName,
                    userEmail: checkUser.userEmail,
                    role: checkUser.role
                },
            },
        });
    } catch (error) {
        console.error('loginUser error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};




module.exports = { registerUser, loginUser };