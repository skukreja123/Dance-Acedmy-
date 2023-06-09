let express = require('express');
let fs = require('fs');
let path = require('path');
let app = express();
var mongoose = require('mongoose');

mongoose.set('strictQuery', false);
// let mongoose = require('mongoose');
//  mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
//  const mongoose = require('mongoose');

// main().catch(err => console.log(err));
// async function main() {
//   mongoose.connect('mongodb://localhost:27017/contactDance');
// }
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));
// mongoose.Promise = global.Promise;

let port = 8000;

// mongoose schema
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    gender: String,
    email: String,
    address: String
});

const Contact = mongoose.model('Contact', contactschema);

app.use('/static', express.static('static'));
// pug use as HTML
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (_req, res) => {
    let params = { 'title': 'First Project', 'content': 'Learning new things:' };
    res.status(200).render('./home.pug', params);
});

app.get('/contact', (_req, res) => {
    let params = { 'title': 'First Project', 'content': 'Learning new things:' };
    res.status(200).render('./contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.status(200).send("This itme save  in dat base")
    }).catch(() => {
        res.status(400).send("Item was not saved")
    });

    // res.status(200).render('contact.pug', params);
});



app.listen(port, () => {
    console.log(`Successfully excuted ${port}`);
})
