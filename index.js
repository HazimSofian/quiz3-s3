const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');

app.get('/', (req, res) => {
  res.send('Hello UTeM!')
})

app.get('/bye', verifyToken,(req, res) => {
    res.send('Bye Bye UTeM!')
  })

// app.post('/reg', (req, res) => {
//     res.send('Assalamualaikum!')
//   })

app.use(express.json()) 
app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(
      req.body.username,
      req.body.password
    )

    let token = generateToken(result)
    res.send(token)
  })

app.post('/register', (req, res) => {
    let result = register(
      req.body.username,
      req.body.password,
      req.body.name,
      req.body.email
    )
  res.send(result)
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let dbUsers = [
  {
      username: "HazimSofian",
      password: "12345",
      name: "Hazim",
      email: "Hazim@utem.edu.com"

  },
  {
      username: "JimLaureth",
      password: "password",
      name: "Laureth",
      email: "Laureth@utem.edu.com"
  },
  {
      username: "Alipjir",
      password: "12345",
      name: "Alip",
      email: "Alip@utem.edu.com"
  }

]

function login(reqUsername, reqPassword){
   let matchUser = dbUsers.find(
       user => user.username == reqUsername 
   )
   console.log(matchUser)


if(!matchUser) return "User not found!"
if(matchUser.password == reqPassword){
    return matchUser
}else{
    return "Invalid password"
}

}

function register(reqUsername,reqPassword,name,email){
  dbUsers.push({
      username: reqUsername,
      password: reqPassword,
      name: name,
      email: email
  })
}

function generateToken(userData){
  const token = jwt.sign(
    userData,
    'inipassword',
    {expiresIn: 60 }
  );
  return token
}

function verifyToken(req, res, next) {
let header = req.headers.authorization
console.log(header)

let token = header.split(' ')[1]

jwt.verify(token, 'inipassword', function(err, decoded){
  if(err) {
    res.send("Invalid Token")
  }

  req.user = decoded
  next()
});
}