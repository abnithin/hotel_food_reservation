const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
// configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to database successfully');
})
.catch((error) => {
    console.log('Error connecting to database:', error.message);
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    menu:{
        type: String,
        required: true
    },
});
const User = mongoose.model('resturant', userSchema);
var qs, name, email,date,time,menu;
app.post('/register', async (req, res) => {
    const { name, email,date,time,menu} = req.body;
    console.log({ name, email,date,time,menu});
    const user = await User.create({ name, email,date,time,menu});
    res.send('Thank you!');
    console.log("inserted");
    console.log(await User.find());
    res.send('Thank you!');

});
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

console.log('Server started');
