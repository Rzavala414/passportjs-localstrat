const router = require('express').Router()

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
    }
})

module.exports = router;