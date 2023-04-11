const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello UTeM!')
})

app.get('/bye', (req, res) => {
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

    res.send(result)
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