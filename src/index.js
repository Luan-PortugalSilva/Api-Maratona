const express = require('express');
const db = require('./models');
const response = require('./middlewares/response')

const authController = require('./controllers/auth')
const linkController = require('./controllers/link')

const app = express();

app.use(response);

app.use(express.json);
app.use(express.urlencoded({ extended: false }));


// /auth/sign-in
// /auth/sign-up
app.use('/auth', authController)
app.use('/auth', linkController)


app.get('/', (req, res) => {
    return res.json('Api running...')
})


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Listening on port 3001')
    })
});