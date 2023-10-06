const path = require('path');

const express =require('express');

const expressSession = require('express-session');
const mongodbSession = require('connect-mongodb-session');

const authRoutes = require('./routes/auth.routes');
// const createSessionConfig = require('./config/session');
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const database = require('./database/database');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');

const csrf = require('csurf');
const addCsrfTokennMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();


// const sessionConfig = createSessionConfig.createSessionConfig();

const MongoDBStore = mongodbSession(expressSession);
const sessionStore = new MongoDBStore({
    url: 'mongodb://localhost:27017',
    // url: process.env.MONGODB_URI,
    databaseName: 'blog',
    collection: 'sessions'
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//나중에 이 내용 조사
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
// app.use(expressSession(sessionConfig));



app.use(expressSession({
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 2 * 24 * 60 * 60 * 1000
    }
}));

app.use(csrf());
app.use(addCsrfTokennMiddleware);
app.use(checkAuthStatusMiddleware);
app.use(authRoutes);
app.use(productRoutes);
app.use(baseRoutes);

app.use(errorHandlerMiddleware);


database.connectToDatabase()
.then(function() {
    app.listen(3000);
})
.catch(function(error){
    console.log('DB 연결 실패!');
});

