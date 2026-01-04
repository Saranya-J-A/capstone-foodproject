const jwt = require(`jsonwebtoken`)

const createToken = (id,role)=>{
    try {
        const token = jwt.sign({id:id,role:role},process.env.JWT_SECRET_KEY,{expiresIn:`1h`})
        return token
    } catch (error) {
        console.log(error)
        throw new Error(`token creation failed`,error)

        
    }
}
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
module.exports = createToken