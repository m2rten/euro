require("dotenv").config()
const { getUsers } = require('../users.js')

console.log(getUsers())
query = getUsers()
query.then((rows)=>{
  console.log("Got back the answer: ", rows);
}
)
