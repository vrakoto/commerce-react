require('dotenv').config();
const { forwardAccessWhileConnected, validateToken } = require('./functions/auth');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const port = process.env.PORT;
const front_host = process.env.API_FRONT;
const { sequelize } = require('./db/config');
const generalRouter = require('./routes/general');
const visitorRouter = require('./routes/visitor');
const userRouter = require('./routes/user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: front_host }));

// Routes
app.use('/general', generalRouter);
app.use('/visitor', forwardAccessWhileConnected, visitorRouter);
app.use('/user', validateToken, userRouter);

sequelize.authenticate().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on the port:${port}`);
    });
}).catch((error) => {
    console.log('Impossible de se connecter à la DB');
})