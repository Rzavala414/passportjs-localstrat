const router = require('express').Router()

router.get('/login', (req, res) =>{
    res.send('login');
})

router.get('/register', (req, res) =>{
    res.send('register');
})

module.exports = router;