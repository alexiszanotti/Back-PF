
const users = [

    user1 = {

        UUID: '0345frsde23',
        userName: 'Jorge',
        type: 'user',
        password: '1234',

    },

    user2 = {

        UUID: '0345frsde30',
        userName: 'Abraham',
        type: 'Admin',
        password: '1234admin',

    },

    user3 = {

        UUID: '0345frsde40',
        userName: 'Pablo',
        type: 'user',
        password: '1234',

    },

    user4 = {

        UUID: '0345frsde58',
        userName: 'Ezequiel',
        type: 'user',
        password: '1234',

    },

]

const getAllUsers = () => {

    return users
}

module.exports = getAllUsers