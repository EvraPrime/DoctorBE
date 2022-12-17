const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

// use bodyparser middleware to receive form data
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//middleware for cookies
app.use(cookieParser());

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/sign-up', require('./routes/register'));
app.use('/sign-in', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/sign-out', require('./routes/logout'));
app.use('/profile', require('./routes/api/profiles'));
app.use('/blogs' , require('./routes/api/blogs'));

app.use(verifyJWT);
app.use('/booking' , require('./routes/api/booking'));
app.use('/patients' , require('./routes/api/patients'));
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);


// connect to MongoDB
mongoose.connect(process.env.DBURL, { useNewUrlParser:true, useUnifiedTopology:true })
.then((res) => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log(err))