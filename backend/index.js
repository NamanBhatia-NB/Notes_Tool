// backend/index.js

const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const router = express.Router(); 
const app = express();

router.post('/signup', (req,res,next)=>{
     const username = req.body.username;
     const password = req.body.password;

     bcrypt
        .hash(password, 12) 
        .then(hashedPassword => {
            const user = new User({ // Example if you had a User Model
            email: email,
            password: hashedPassword
          });
          return user.save();
        })
        .then(result => {
            res.status(201).json({ message: 'User created!'}); 
        })
      })
    .catch(err => {
    // Error logic. This is just an example
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/notes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to notes database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

// Schema for users of the app
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: Date.now,
    },
});

const User = mongoose.model('users', UserSchema);

// Express setup
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' // React frontend URL
}));

// Sample route to check if the backend is working
app.get("/", (req, resp) => {
    resp.send("App is working");
});

// API to register a user
app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        if (result) {
            delete result.password; // Ensure you're not sending sensitive info
            resp.status(201).send(result); // Send successful response
        } else {
            console.log("User already registered");
            resp.status(400).send("User already registered");
        }
    } catch (e) {
        resp.status(500).send({ message: "Something went wrong", error: e.message });
    }
});

// Start the server
app.listen(5000, () => {
    console.log("App is running on port 5000");
});