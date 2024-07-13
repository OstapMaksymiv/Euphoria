const express = require('express')
const router = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret  = process.env.JWT_SECRET;
router.get('/', async (req, res) => {
    try {
        const data = await Post.find();
        res.render('index', {data})
    } catch (error) {
        console.log(error);
    }
})


router.get('/post/:id', async (req, res) => {

    try {
        let slug = req.params.id
        const data = await Post.findById({_id: slug});
        res.render('post', {data})
    } catch (error) {
        console.log(error);
    }
})


router.post('/search', async (req, res) => {

    try {

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g,"")
        const data = await Post.find({
            $or:[
                {
                    title:{ $regex: new RegExp(searchNoSpecialChar, 'i')},
                    body:{ $regex: new RegExp(searchNoSpecialChar, 'i')}
                }
            ]
        })
        res.render('search', {data})
    } catch (error) {
        console.log(error);
    }
})
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ firstName, lastName, email, password: hashedPassword });
            return res.status(201).json({ message: "User Created", user });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({ message: 'User already in use' });
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
            return res.status(401).json({message: "Invalid credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({userId: user._id}, jwtSecret)
        res.cookie('token', token, {httpOnly: true})
        if(email === 'ostaperad@gmail.com'){
            res.redirect('/dashboard')
        }
        else{
            res.render('index', {data})
        }
    } catch (error) {
        console.log(error);
    }
})
router.get('/discover', async (req,res) => {
    // const data = await Post.find();
    let perPage = 12;
    let page = req.query.page || 1;
  
    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('discover', { 
    data,
    current: page,
    nextPage: hasNextPage ? nextPage : null,
    currentRoute: '/discover'
    });
})
module.exports = router;









// function insertPostData () {
//     Post.insertMany([
//         {
//             title: "Fjellheim",
//             body: "Fjellheim is a majestic range known for its towering peaks and serene valleys. The snow-capped mountains provide a stunning backdrop for adventurers and nature enthusiasts alike. The region is also home to diverse wildlife and numerous hiking trails that offer spectacular views of the surrounding landscape. In winter, Fjellheim transforms into a snowy paradise perfect for skiing and snowboarding. The local culture is rich with traditions, and visitors can enjoy the hospitality of mountain villages that offer a glimpse into a simpler way of life. Many myths and legends are associated with these mountains, adding an element of mystique to their grandeur.",
//             mintitle: "Novapara",
//             section:"Mountains",
//             img: "https://assets.website-files.com/640eff55ec39481423c33175/640f3fe023d1bb191895f39c_euphoria-11.jpg"
//         },
//         {
//             title: "Kalttopp",
//             body: "Kalttopp, a formidable mountain, stands proud with its steep cliffs and icy slopes. It is a haven for climbers seeking thrilling challenges and breathtaking views. The treacherous paths and unpredictable weather conditions add to the allure of this peak. Legends speak of hidden caves and ancient artifacts buried deep within the mountain, attracting both adventurers and historians. The mountain is also known for its stunning ice formations and frozen waterfalls, which create a surreal, otherworldly landscape. Wildlife is sparse due to the harsh conditions, but the hardy species that do live here are fascinating to observe.",
//             mintitle: "Caeloria",
//             section:"Mountains",
//             img: "https://assets.website-files.com/640eff55ec39481423c33175/640f3fdbf2c9eb352e4dc5e7_euphoria-12.jpg"
//         },
//         {
//             title: "Mistyhorn",
//             body: "Mistyhorn is enveloped in a perpetual mist that gives it an ethereal quality. The lush forests and hidden waterfalls make it a paradise for hikers and photographers. As you wander through the dense fog, the sound of flowing water and the chirping of birds create a mystical ambiance. Mistyhorn is also home to rare flora and fauna, making it a significant site for nature conservation. The area is dotted with ancient ruins and stone circles, suggesting that it was once an important site for early civilizations. Many visitors come to Mistyhorn not just for its beauty but for the sense of peace and tranquility it imparts.",
//             mintitle: "Zorvania",
//             section:"Mountains",
//             img: "https://assets.website-files.com/640eff55ec39481423c33175/640f3fd5a6452364f64b899f_euphoria-13.jpg"
//         },
//         {
//             title: "Whirlpeak",
//             body: "Whirlpeak is famous for its swirling winds that dance around its summit. The dramatic landscape and diverse wildlife attract explorers from all corners of the globe. The mountain's unique wind patterns have shaped its rugged terrain, creating fascinating rock formations. Visitors often come to experience the thrill of the gusty summit and to witness the breathtaking sunsets that paint the sky in vibrant colors. The region is also rich in folklore, with many tales of spirits and ancient gods said to inhabit the peaks. Whirlpeak's challenging trails and stunning vistas make it a favorite among seasoned hikers and adventure seekers.",
//             mintitle: "Auriya",
//             section:"Mountains",
//             img: "https://assets.website-files.com/640eff55ec39481423c33175/640f3fcdf4a7c6a37e2acadb_euphoria-14.jpg"
//         },
//         {
//             title: "Silvercrag",
//             body: "Silvercrag gleams under the sun with its silver-gray rocks. The mountain's serene lakes and flower-filled meadows offer a peaceful retreat for visitors. The area is perfect for picnics, leisurely hikes, and wildlife watching. At night, the clear skies provide a stunning view of the stars, making Silvercrag a popular spot for stargazing and camping. The mountain is also home to several rare mineral deposits, which attract geologists and collectors. The gentle slopes and accessible trails make Silvercrag ideal for families and those looking for a more relaxed outdoor experience. Local guides offer tours that highlight the area's natural beauty and cultural history.",
//             mintitle: "Caeloria",
//             section:"Mountains",
//             img: "https://assets.website-files.com/640eff55ec39481423c33175/640f3fc623d1bb831695f2da_euphoria-15.jpg"
//         },
//         {
//             title: "Stormcrest",
//             body: "Stormcrest is known for its frequent thunderstorms that roll across the peaks. The dramatic weather adds a sense of adventure and excitement for those who brave its trails. The mountain's turbulent weather conditions create a dynamic and ever-changing landscape, attracting thrill-seekers and photographers eager to capture the raw power of nature. Despite the challenges, the panoramic views from the summit are truly rewarding. The base of the mountain features dense forests and cascading streams, providing a stark contrast to the stormy summit. Stormcrest's unique climate and geography make it a hotspot for meteorologists and nature enthusiasts alike.",
//             mintitle: "Zorvania",
//             section:"Mountains",
//             img: "https://assets.website-files.com/640eff55ec39481423c33175/640f3fbb194f0314eaf84ee2_euphoria-16.jpg"
//         },
//         {
//             title: "FrostSpire",
//             body: "FrostSpire stands tall with its icy spires piercing the sky. The breathtaking glaciers and frozen rivers create a mesmerizing landscape for all who visit. The harsh, cold environment is both beautiful and intimidating, drawing experienced mountaineers and adventurous tourists. The mountain's ice caves and frozen waterfalls are natural wonders that leave visitors in awe of their beauty and scale. In addition to its natural attractions, FrostSpire is also known for its unique light phenomena, such as the stunning auroras that can often be seen dancing in the night sky. The region's remoteness and challenging conditions make it a destination for those seeking true wilderness and adventure.",
//             mintitle: "Novapara",
//             section:"Mountains",
//             img: "https://assets.website-files.com/640eff55ec39481423c33175/640f3fa90952df4ba0992a1e_euphoria-17.jpg"
//         },
//         {
//             title: "Sunburst",
//             body: "Sunburst Mountain is famous for its spectacular sunrises. The golden light bathing the peaks in the morning makes it a favorite spot for early risers and photographers. The mountain's gentle slopes and vibrant flora provide a picturesque setting that is perfect for a peaceful hike or a relaxing picnic. As the sun sets, the mountain transforms, offering equally stunning views of the changing light and colors. The area is rich in biodiversity, with numerous species of plants and animals thriving in its varied habitats. Sunburst is also a popular spot for spiritual retreats and meditation, with many visitors drawn to its serene and uplifting atmosphere.",
//             mintitle: "Caeloria",
//             section:"Mountains",
//             img: "https://assets.website-files.com/640eff55ec39481423c33175/640f15fa0e9d4ee6759b00ee_euphoria-08.jpg"
//         },
//         {
//             title: "Thunderhead",
//             body: "Thunderhead's rugged terrain and rolling thunderclaps give it an imposing presence. It's a destination for those seeking both beauty and the thrill of nature's raw power. The mountain's name is well-deserved, as frequent thunderstorms and dramatic weather patterns create an awe-inspiring atmosphere. The challenging trails and breathtaking vistas make Thunderhead a popular destination for adventurous hikers and climbers. The area is also rich in geological formations, with unique rock structures and mineral deposits that attract scientists and enthusiasts. Local lore tells of ancient deities that control the weather, adding a mythical element to the already formidable landscape.",
//             mintitle: "Auriya",
//             section:"Mountains",
//             img: "https://assets.website-files.com/640eff55ec39481423c33175/640f3f93a6452385814b7e8b_euphoria-19.jpg"
//         },
//         {
//             title: "Snowdrift",
//             body: "Snowdrift is a winter wonderland with its extensive snowfields and pristine white landscapes. It's a top choice for winter sports enthusiasts and those who love the cold. The mountain offers excellent conditions for skiing, snowboarding, and snowshoeing. In the summer, the melting snow reveals lush meadows and vibrant wildflowers, providing a stark but beautiful contrast to the winter scenery. Snowdrift's high altitude and consistent snowfall make it a favorite for both amateur and professional athletes. The surrounding area is dotted with cozy lodges and cabins, offering warm hospitality and a perfect base for exploring the snowy terrain. Whether you're seeking adventure or relaxation, Snowdrift has something to offer everyone.",
//             mintitle: "Missia",
//             section:"Mountains",
//             img: "https://assets.website-files.com/640eff55ec39481423c33175/640f3f844743d4ca4e502354_euphoria-20.jpg"
//         },
//     ]);
// }

// insertPostData();

