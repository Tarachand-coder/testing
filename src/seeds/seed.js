const { hashedPassword } = require('../helpers/helper');
const User = require('../models/user.model');

const dbSeed = async () => {
    const seedUsers = [
        {
            username: 'Super Admin',
            email: 'superadmin@gmail.com',
            password: await hashedPassword('super@123'),
            role: 'super-admin',
            status: 'active'
        },
        {
            username: 'First Admin',
            email: 'admin@gmail.com',
            password: await hashedPassword('admin@123'),
            role: 'admin',
            status: 'active'
        },
    ];
    await User.deleteMany({});
    await User.insertMany(seedUsers);
}

dbSeed();