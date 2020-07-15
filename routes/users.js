const router = require('express').Router();
const User = require('../models/Users')
const bcrypt = require('bcryptjs')
//Login
router.get('/login', (req, res) =>{
    res.render('login');
});

//Register
router.get('/register', (req, res) =>{
    res.render('register');
});

// Register Handle
router.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors = [];

    //checked required fields
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all fields'})
    }

    //Check passwords match
    if(password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }

    if(password.length < 6){
        errors.push({msg: 'password should be at least 6 characters'})
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        // Validation pass
        User.findOne({email: email})
            .then(user => {
                if(user){
                    //User exists error
                    errors.push({msg: 'Email already registered'})
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else{
                    const newUser = new User({
                        name,
                        email,
                        password
                    })
                  // Hash Password
                  bcrypt.genSalt(10, (error, salt) => {
                      bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //Set password to hashed
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and logged in');
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                      })
                  })
                }
            })

    }
})

module.exports = router;