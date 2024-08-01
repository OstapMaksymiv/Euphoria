const express = require('express')
const router = express.Router();
const Post = require('../models/Post')
const Activities = require('../models/Activities')
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Impressions = require('../models/Impressions');
const ActivityImpressions = require('../models/ActivityImpressions');

const jwtSecret  = process.env.JWT_SECRET;
router.get('/', async (req, res) => {
    try {
        const data = await Post.find();
        res.render('index', {data,error: 'Invalid password'})
    } catch (error) {
        console.log(error);
    }
})


router.get('/post/:id', async (req, res) => {

    try {
        let slug = req.params.id
        const data = await Post.findById({_id: slug});
        res.render('post', {data,error: 'Invalid password'})
    } catch (error) {
        console.log(error);
    }
})
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await Post.find();
        try {
            const user = await User.create({ firstName, lastName, email, password: hashedPassword });
            return res.render('index',{data, error: "User Created", user });
        } catch (error) {
            if (error.code === 11000) {
                return res.render('index',{data, error: 'User already in use' });
            }
            return res.status(500).json({ message: 'Internal server issues' });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server issues' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const data = await Post.find();
        const {email , password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.render('index', { data, error: 'Invalid password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.render('index', { data, error: 'Invalid password' });
        }
        const token = jwt.sign({userId: user._id}, jwtSecret)
        res.cookie('token', token)
        if(email === 'ostaperad@gmail.com'){

            res.redirect('/dashboard')
        }
        else{
     
            res.render('index', {data, error: 'Successful authorization' })
        }
    } catch (error) {
        console.log(error);
    }
})


router.get('/discover', async (req,res) => {
    let perPage =  8;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const priviesPage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasPriviesPage = priviesPage >= 1
    res.render('discover', { 
    data,
    current: page,
    nextPage: hasNextPage ? nextPage : null,
    priviesPage:hasPriviesPage ? priviesPage : null,
    currentRoute: '/discover',
    error: 'Invalid password'
    });
})
router.get('/activities',async (req,res) => {
    let perPage = 6;
    let page = req.query.page || 1;
    const data = await Activities.aggregate([{$sort:{createdAt: -1}}])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec()
    const count = await Activities.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const priviesPage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage)
    const hasPriviesPage = priviesPage >= 1
    res.render('activities',{
    data,
    current:page,
    nextPage:hasNextPage ? nextPage : null,
    priviesPage:hasPriviesPage ? priviesPage : null,
    currentRoute:'/activities',
    error: 'Invalid password'})
})
router.get('/activity/:id', async (req,res) => {
    try {
        let slug  = req.params.id;
        const data = await Activities.findById({_id: slug})
        res.render('activity',{data,error: 'Invalid password'})
    } catch (error) {
        console.log(error);
    }
})
router.get('/journal',async (req,res) => {
    const data = await Impressions.find();
    const actimprdata = await ActivityImpressions.find();
    const token = req.cookies.token;
    let userdata = null;
    let access = false;
    if (token){
        access = true
        const decoded = jwt.verify(token, jwtSecret);
        userdata = await User.findById(decoded.userId);
    }
    res.render('journal',{data,actimprdata,error: 'Invalid password',access,userdata})
})

router.post('/add-userImpression', async (req, res) => {
    try {
        const { title, text } = req.body;
        const token = req.cookies.token;
        const decoded = jwt.verify(token, jwtSecret);
        userdata = await User.findById(decoded.userId);
        


        const newImpression = new Impressions({
            title,
            text,
            name: userdata.firstName,
            surname: userdata.lastName
        });

        await newImpression.save();
        res.redirect('/journal');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;