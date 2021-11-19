import  express from 'express';
import path  from 'path';
import engines from 'consolidate';
import  mongoose  from 'mongoose';
import routes from './routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express()

const __dirname = path.resolve()

const port = process.env.PORT || 3000

const mongodbUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/reminderapp";;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
    next();
});
app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.engine('html', engines.mustache);
app.use(express.urlencoded({extended: true}))
     
app.get("/", function(req,res){
    res.render("index.html")
})

app.use('/', routes);

app.listen(port, () => console.log(`Server serves at http://localhost:${port}`));

