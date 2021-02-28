const bcrypt = require('bcryptjs');

const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    return hashedPassword;
};
const comparePassword = async(password,userPassword)=>{
    const result = bcrypt.compare(password,userPassword);
    return result;
};

module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;