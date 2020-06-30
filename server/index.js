import express from 'express'
const app = express()

import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import validator from 'validator'
import xssFilters from 'xss-filters'
import smtpTransport from 'nodemailer-smtp-transport'

app.use(bodyParser.json())

const rejectFunctions = new Map([
  ['name', (v) => v.length < 3],
  ['email', (v) => !validator.isEmail(v)],
  ['phone', (v) => !validator.isMobilePhone(v)],
  ['message', (v) => v.length < 250],
])

const validateAndSanitize = (key, value) => {
  return (
    rejectFunctions.has(key) &&
    !rejectFunctions.get(key)(value) &&
    xssFilters.inHTMLData(value)
  )
}

const sendEmail = (name, email, phone, message) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    })
  )

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_ADDRESS,
    subject: `New message from ${name}`,
    html: `<h1>Contact details</h1>
      <h2> name: ${name} </h2><br>
      <h2> email: ${email} </h2><br>
      <h2> phone: ${phone} </h2><br>
      <h2> message: ${message} </h2><br>`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

app.post('/', (req, res) => {
  const attributes = ['name', 'email', 'phone', 'message']
  const sanitizedAttributes = attributes.map((n) => {
    validateAndSanitize(n, req.body[n])
  })
  const someInvalid = sanitizedAttributes.some((r) => !r)

  if (someInvalid) {
    return res.status(422).json({ error: 'Ugh.. That looks unprocessable!' })
  }

  sendEmail(...sanitizedAttributes)
  res.status(200).json({ message: 'Awesome, sent' })
})

export default {
  path: '/api',
  handler: app,
}
