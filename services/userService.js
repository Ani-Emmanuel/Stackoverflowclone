const { User } = require("../model/model")
const { hashOperation } = require("../helper/helper")
module.exports = {
    register: async (req, res, next) => {
        try {
            //check if user already exist
            const { email } = req.body;
            const emailExist = await User.findOne({ email: email })
            if (emailExist || emailExist.length > 0) {
                return res.status(400).json({ message: "User with email already exists" })
            }

            //created User
            const user = new User(req.body);
            const { password } = user;
            const hashedpass = await hashOperation(password);
            user.password = hashedpass;
            user.save();
            res.status(201).json({ message: "User created successfully" })

        } catch (error) {
            next(error)
        }
    },
    index: async (req, res, next) => {
        try {
            let query = {}
            //check if req.params exist
            if (req.params.id) {
                query = {
                    _id: req.params.id
                }
            }
            const users = await User.find(query);
            res.status(200).json({ payload: { users: users } })
        } catch (error) {
            next(error)
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ message: "User updated successfully" })
        } catch (error) {
            next(error)
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            await User.findByIdAndDelete(id);
            res.status(200).json({ message: "User deleted successfully" })
        } catch (error) {
            next(error)
        }
    }

}