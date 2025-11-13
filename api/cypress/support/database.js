const pgp = require('pg-promise')()
//conexao com o banco de dados: 
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'UserDB',
    user: 'dba',
    password: 'dba'
})

function deleteUsersByEmail(email){
    return db.none ('delete from public. "User" where email = $1', [email])
}

module.exports = {
    deleteUsersByEmail
}