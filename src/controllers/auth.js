import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
const saltRounds = 10;
import { getUserByEmail } from '../controllers/user.js';


const signup = async ({ email, password }) => {

    const existedUser = await getUserByEmail(email);

    if (existedUser) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hashedPassword, salt })
    await user.save();

    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: '24h'
    })


}

const login = async ({ email, password }) => {

    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('User does not exist');
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match)

    if (!match) {
        throw new Error('Invalid password');
    }

    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: '24h'
    })


}

export { signup, login }