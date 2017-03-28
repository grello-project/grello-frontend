const Express = require('express')
const app = Express()
const dotenv = require('dotenv')

dotenv.load()

const PORT = process.env.PORT || 3000

app.use(Express.static('build'))

app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})
