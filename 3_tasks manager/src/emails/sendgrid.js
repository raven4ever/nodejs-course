const sgMail = require('@sendgrid/mail')

const sgApiKey = process.env.SENDGRID_API_KEY

if (sgApiKey) {
    sgMail.setApiKey(sgApiKey)
}

const fromEmail = process.env.SENDGRID_FROM_EMAIL

const sendWelcomeEmail = (email, name) => {
    if (sgApiKey) {
        sgMail.send({
            to: email,
            from: fromEmail,
            subject: 'Hello ' + name + '!',
            text: `Welcome to the app, ${name}. Let me know how you get along with the application.`
        })
    } else {
        console.log('Cannot send welcome emails as no API key was set!')
    }
}

const sendGoodbyeEmail = (email, name) => {
    if (sgApiKey) {
        sgMail.send({
            to: email,
            from: fromEmail,
            subject: 'Bye ' + name + '!',
            text: `Sorry to hear you're leaving, ${name}. Hope to see you again!.`
        })
    } else {
        console.log('Cannot send goodbye emails as no API key was set!')
    }
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}