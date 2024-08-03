const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Activities = require('../models/Activities');
const adminLayout = '../views/layouts/admin';
const jwt = require('jsonwebtoken');
const fs = require('fs');
const connectDB = require('../config/db');
const jwtSecret  = process.env.JWT_SECRET;
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');
const Impressions = require('../models/Impressions');
connectDB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
const authMiddleware = (req, res, next) => {
  try {
      const token = req.cookies.token;
      if (!token) {
          return res.redirect('/'); 
      }

      const decoded = jwt.verify(token, jwtSecret);
      if (decoded.userId !== '669111c56c860137645f22d5') {
          return res.redirect('/'); 
      }

      req.userId = decoded.userId;
      next(); 
  } catch (error) {
      console.error('Authentication error:', error);
      return res.redirect('/'); 
  }
};
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
      res.render('admin/dashboard',{error: 'Invalid password',cloud:false});
    } catch (error) {
      console.log(error);
    }
  
  });
  router.get('/dashboard/posts', authMiddleware, async (req, res) => {
    try {

      const data = await Post.find();
      res.render('admin/posts', {
        data,
        layout: adminLayout,
        cloud:false
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });
router.get('/dashboard/activitys',authMiddleware, async (req,res) => {
  try {

    const data = await Activities.find();
    res.render('admin/activitys', {
      data,
      layout: adminLayout
      ,cloud:false
    });

  } catch (error) {
    console.log(error);
  }
})
router.get('/dashboard/impressions',authMiddleware, async (req,res) => {
  try {

    const data = await Impressions.find();
    res.render('admin/impressions', {
      data,
      layout: adminLayout
      ,cloud:false
    });

  } catch (error) {
    console.log(error);
  }
})

router.get('/add-post', authMiddleware, async (req, res) => {
    try {
      
      const data = await Post.find();
      res.render('admin/add-post', {
        layout: adminLayout
        ,data
        ,cloud:false
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
      const webpFilename = `${Date.now()}.webp`;
      const webpPath = path.join('uploads', webpFilename);
      await sharp(req.file.path)
        .webp()
        .toFile(webpPath);
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error(`Failed to delete original file: ${err.message}`);
        } else {
          console.log(`Original file ${req.file.path} deleted successfully`);
        }
      });
      const newPost = new Post({
        title: req.body.title,
        mintitle: req.body.mintitle,
        body: req.body.body,
        section:req.body.section,
        img: `/uploads/${webpFilename}`

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
router.get('/add-impression', authMiddleware, async (req, res) => {
    try {
      
      const data = await Impressions.find();
      res.render('admin/add-impression', {
        layout: adminLayout
        ,data
        ,cloud:false
      });
  
    } catch (error) {
      console.log(error);

    }
  
  });
  router.post('/add-impression', authMiddleware, async (req, res) => {
    try {
      const newImpression = new Impressions({
        title: req.body.title,
        text: req.body.text,
        name: req.body.name,
        surname: req.body.surname,
      });
      await newImpression.save();
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
      res.status(500).send("There was a problem saving the impression.");
    }
  });

router.get('/add-activity',authMiddleware, async (req,res) => {
  try {
    const data = await Post.find();
    res.render('admin/add-activity', {
      layout: adminLayout
      ,data
      ,cloud:false
    });

  } catch (error) {
    console.log(error);
  }
})


router.post('/add-activity', upload.fields([
  { name: 'first_img', maxCount: 1 },
  { name: 'second_img', maxCount: 1 },
  { name: 'third_img', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log(req.files);
    if (!req.files || !req.files.first_img || !req.files.second_img || !req.files.third_img) {
      console.error('Missing files');
      return res.status(400).send('All three images must be uploaded');
    }

    const imagePaths = [];
    for (const fieldName in req.files) {
      const file = req.files[fieldName][0];
      console.log(`Processing file: ${file.originalname}`);
      const webpFilename = `${Date.now()}-${file.originalname}.webp`;
      const webpPath = path.join('uploads', webpFilename);

      await sharp(file.path)
        .webp()
        .toFile(webpPath);

      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Failed to delete original file: ${err.message}`);
        } else {
          console.log(`Original file ${file.path} deleted successfully`);
        }
      });

      imagePaths.push(`/uploads/${webpFilename}`);
    }

    const newActivity = new Activities({
      title: req.body.title,
      price: req.body.price,
      text: req.body.text,
      section: req.body.section,
      first_img: imagePaths[0],
      second_img: imagePaths[1],
      third_img: imagePaths[2]
    });

    await newActivity.save();
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});


  router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
  
      const data = await Post.findOne({ _id: req.params.id });
  
      res.render('admin/edit-post', {
        data,
        layout: adminLayout
        ,cloud:false
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });
  router.get('/edit-impression/:id', authMiddleware, async (req, res) => {
    try {
  
      const data = await Impressions.findOne({ _id: req.params.id });
  
      res.render('admin/edit-impression', {
        data,
        layout: adminLayout
        ,cloud:false
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });

  router.get('/edit-activity/:id', authMiddleware, async (req, res) => {
    try {
  
      const data = await Activities.findOne({ _id: req.params.id });
  
      res.render('admin/edit-activity', {
        data,
        layout: adminLayout
        ,cloud:false
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });
  router.put('/edit-impression/:id', authMiddleware, async (req, res) => {
    try {
      await Impressions.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        text: req.body.text,
        name: req.body.name,
        surname: req.body.surname,
      });
  
      res.redirect(`/edit-impression/${req.params.id}`);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  router.put('/edit-post/:id', authMiddleware, upload.single('img'), async (req, res) => {
    try {
      const existingPost = await Post.findById(req.params.id);
      if (!existingPost) {
        return res.status(404).send('Post not found');
      }
      let imagePath = existingPost.img;
      if (req.file) {
        const webpFilename = `${Date.now()}.webp`;
        const webpPath = path.join('uploads', webpFilename);
        await sharp(req.file.path)
          .webp()
          .toFile(webpPath);
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(`Failed to delete original file: ${err.message}`);
          }
        });
        imagePath = `/uploads/${webpFilename}`;
      }
      await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        mintitle: req.body.mintitle,
        body: req.body.body,
        section: req.body.section,
        img: imagePath,
      });
  
      res.redirect(`/edit-post/${req.params.id}`);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  router.put('/edit-activity/:id', authMiddleware, upload.fields([
    { name: 'first_img', maxCount: 1 },
    { name: 'second_img', maxCount: 1 },
    { name: 'third_img', maxCount: 1 }
  ]), async (req, res) => {
    try {

      const existingActivity = await Activities.findById(req.params.id);
      if (!existingActivity) {
        return res.status(404).send('Activity not found');
      }
      const imagePaths = {
        first_img: existingActivity.first_img,
        second_img: existingActivity.second_img,
        third_img: existingActivity.third_img
      };
      for (const fieldName in req.files) {
        const file = req.files[fieldName][0];
        const webpFilename = `${Date.now()}-${file.originalname}.webp`;
        const webpPath = path.join('uploads', webpFilename);

        await sharp(file.path)
          .webp()
          .toFile(webpPath);
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(`Failed to delete original file: ${err.message}`);
          }
        });
        imagePaths[fieldName] = `/uploads/${webpFilename}`;
      }

      await Activities.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        price: req.body.price,
        text: req.body.text,
        section: req.body.section,
        first_img: imagePaths.first_img,
        second_img: imagePaths.second_img,
        third_img: imagePaths.third_img
      });
  
      res.redirect(`/edit-activity/${req.params.id}`);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
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
  router.delete('/delete-activity/:id', authMiddleware, async (req, res) => {
    try {
  
      await Activities.deleteOne({_id: req.params.id})
  
      res.redirect(`/dashboard`);
  
    } catch (error) {
      console.log(error);
    }
  
  });
  router.delete('/delete-impression/:id', authMiddleware, async (req, res) => {
    try {
  
      await Impressions.deleteOne({_id: req.params.id})
  
      res.redirect(`/dashboard`);
  
    } catch (error) {
      console.log(error);
    }
  
  });
  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
  });
module.exports = router;