const express = require('express')
const router = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')
const adminLayout = '../views/layouts/admin'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const connectDB = require('../config/db');
const jwtSecret  = process.env.JWT_SECRET;
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');
connectDB();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Зберігаємо файли в директорію 'uploads'
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Зберігаємо файли з унікальним ім'ям
  }
});
const upload = multer({ storage: storage });

// Створюємо папку uploads, якщо її не існує
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// router.get('/admin', async (req, res) => {
//     try {

//         res.render('admin/index', {layout: adminLayout})
//     } catch (error) {
//         console.log(error);
//     }
// })

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        res.redirect('/')
    }
    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.redirect('/')
    }
}


// router.post('/admin', async (req, res) => {
//     try {
//         const {username , password} = req.body;
//         const user = await User.findOne({username})
//         if(!user){
//             return res.status(401).json({message: "Invalid credentials"});
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password)
//         if(!isPasswordValid){
//             return res.status(401).json({message: "Invalid credentials"});
//         }
//         const token = jwt.sign({userId: user._id}, jwtSecret)
//         res.cookie('token', token, {httpOnly: true})
//         res.redirect('/dashboard')
//     } catch (error) {
//         console.log(error);
//     }
// })
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {

      const data = await Post.find();
      res.render('admin/dashboard', {
        data,
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

// router.post('/register', async (req, res) => {
//     try {
//         const {username , password} = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         try {
//             const user = await User.create({username, password:hashedPassword})
//             res.status(201).json({message: "User Created", user})
//         } catch (error) {
//            if(error.code === 11000){
//             res.status(409).json({message: 'User already in user'})
//            } 
//            res.status(500).json({message: 'Internal server issues'})
//         }

//     } catch (error) {
//         console.log(error);
//     }
// })
router.get('/add-post', authMiddleware, async (req, res) => {
    try {
      
      const data = await Post.find();
      res.render('admin/add-post', {
        layout: adminLayout
        ,data
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });
router.post('/add-post',upload.single('img'), authMiddleware,async (req, res) => {
    try {
      try {
        if (!req.file) {
          return res.status(400).send('No file uploaded');
        }
    
        // Create a unique name for the WebP file
        const webpFilename = `${Date.now()}.webp`;
        const webpPath = path.join('uploads', webpFilename);
    
        // Convert the image to WebP format
        await sharp(req.file.path)
          .webp()
          .toFile(webpPath);
    
        // Delete the original file after conversion
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(`Failed to delete original file: ${err.message}`);
          } else {
            console.log(`Original file ${req.file.path} deleted successfully`);
          }
        });
    
        // Create a new post with the WebP image filename
        const newPost = new Post({
          title: req.body.title,
          mintitle: req.body.mintitle,
          body: req.body.body,
          section:req.body.section,
          img: `/uploads/${webpFilename}` // Save the relative URL of the WebP file
        });
    
        await newPost.save();
        res.redirect('/dashboard');
      } catch (error) {
        console.log(error);
      }
  
    } catch (error) {
      console.log(error);
    }
});

  router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
  
      const data = await Post.findOne({ _id: req.params.id });
  
      res.render('admin/edit-post', {
        data,
        layout: adminLayout
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });
  router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
  
      await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        mintitle: req.body.mintitle,
        body: req.body.body,
        section:req.body.section,
        img:req.body.img
      });
  
      res.redirect(`/edit-post/${req.params.id}`);
  
    } catch (error) {
      console.log(error);
    }
  
  });
  router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
  
      await Post.deleteOne({_id: req.params.id})
  
      res.redirect(`/dashboard`);
  
    } catch (error) {
      console.log(error);
    }
  
  });
  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    //res.json({message: "Log out successful"})
    res.redirect('/')
  });
module.exports = router;