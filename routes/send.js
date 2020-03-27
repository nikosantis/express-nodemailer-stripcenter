const express = require('express')
const { config } = require('../config')
const nodemailer = require('nodemailer')

const mailApi = app => {
  const router = express.Router()

  app.use('/api/v1/send', router)

  router.post(
    '/',
    async (req, res) => {
      try {
        const {
          email
        } = req.body

        if (!email) {
          return res.status(400).send({
            error: {
              message: ' Email requied'
            }
          })
        }

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          service: 'Gmail',
          port: 465,
          secure: true,
          auth: {
            user: config.userMail,
            pass: config.userPass
          }
        })

        transporter.verify((err, res) => {
          if (err) {
            console.error(err)
          } else {
            console.log('Server is ready to take our messages')
          }
        })

        const mailOptions = {
          from: req.body.name,
          to: config.userMail,
          subject: 'Contacto desde Stripcenter Buin',
          text: req.body.message,
          html: `
          Message from: ${req.body.name}
          <br></br>
          Email: ${req.body.email}
          <br></br>
          Message: ${req.body.message}
        `
        }

        transporter.sendMail(mailOptions, (err, res) => {
          if (err) {
            return res.status(400).send({
              error: {
                message: 'Failed'
              }
            })
          }
          console.log('Yeees')
          console.log(JSON.stringify(res))
        })
        return res.status(200).send({
          status: true,
          message: 'Email Send Successfully.'
        })
      } catch (err) {
        console.log(err)
        return res.status(200).send({
          error: {
            message: 'Something went wrong'
          }
        })
      }
    })
}

module.exports = mailApi
