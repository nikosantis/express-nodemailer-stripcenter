require('dotenv').config()

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT,
  userMail: process.env.USERGMAIL,
  userPass: process.env.PASSGMAIL
}

module.exports = { config }
