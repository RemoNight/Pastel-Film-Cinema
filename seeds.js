var mongoose   = require('mongoose');
var Comment    = require('./models/comment');
var Cinema     = require('./models/cinema.js');
var Liked      = require('./models/liked');
var User       = require('./models/user');
var Movie      = require('./models/movie');


var data = [
    {
        name:'STAR WARS THE FORCE AWAKENS', 
        image: 'https://www.i-moviehd.com/wp-content/uploads/2019/11/Star-Wars-7-The-Force-Awakens-2015-%E0%B8%AA%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B9%8C-%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%AA-7.png',
        date: '7 AUG 2019',
        time: '126 Mins',
        genre: 'Sci-Fi / Fantasy',
        actors: 'Daisy Ridley, John Boyega, Oscar Isaac',
        trailer: 'https://www.youtube.com/embed/sGbxmsDFVnE',
        rating: '7.2',
        type: 'coming'

    },
    {
        name:'SPIDER-MAN MILES MORALES', 
        image: 'https://cdn.europosters.eu/image/750/posters/spider-man-miles-morales-cybernetic-swing-i100282.jpg',
        date: '18 DEC 2019',
        time: '92 Mins',
        genre: 'Action / Fantasy',
        actors: 'Tom Holland',
        trailer: 'https://www.youtube.com/embed/NTunTURbyUU',
        rating: '6.8',
        type: 'showing'
    },
    {
        name:'MAZE RUNNER', 
        image: 'https://c.min.ms/t/d/member/c/28/28897/pagegallery/1516965596/ecfb4860.jpg',
        date: '26 JAN 2019',
        time: '143 Mins',
        genre: 'Adventure',
        actors: ' Dylan OBrien, Thomas brodie Sangster',
        trailer: 'https://www.youtube.com/embed/4-BTxXm8KSg',
        rating: '8.1',
        type: 'coming'
    },
    {
        name:'ANT MAN', 
        image: 'https://i.pinimg.com/originals/f9/89/34/f98934e9c47cf9f2edb59cf474a6fa21.jpg',
        date: '30 JULY 2019',
        time: '152 Mins',
        genre: 'Sci-Fi',
        actors: ' Dylan OBrien, Thomas brodie Sangster',
        trailer: 'https://www.youtube.com/embed/4-BTxXm8KSg',
        rating: '7.3',
        type: 'showing'
    }     
];


var cinemaData = [
    {
        name: 'Quartier CineArt',
        area: 'bangkok',
        image: 'https://www.emquartier.co.th/wp-content/uploads/2018/02/p5-600x221.jpg',
        logo: 'https://propholic.com/wp-content/uploads/2015/03/cineart.jpg',
        slogan: 'Premium cinema that deserve right to you.',
        seat: [ [0, 0, 0, 0] , [0, 0, 0, 0] ],
        time: [11, 14, 17, 20],
    },
    {
        name: 'Paragon Cineplex',
        area: 'central',
        image: 'https://lh3.googleusercontent.com/proxy/McM3yUz02-RH_YMEBmitjt3KljHvuLAUB16_8FcbYbey1i-WgjJQV9WpLHoJfCzeCBFOEabDM1KPlTwQ6j2mHPtm2mvUmCSHTZO_s2Gqo7PpNA',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkSQC91KpNf1JF-uSMc1gM7Xftt9TwcV3wjWytUE5gUZun89Nq7bPwgkgremnl_9BxDlQ&usqp=CAU',
        slogan: 'Premium cinema that deserve right to you.',
        seat: [ [0, 0, 0, 0] , [0, 0, 0, 0] ],
        time: [10, 13, 16, 19, 22],
    },
]



function seedDB(){
    Movie.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Remove DB completed");
        data.forEach(function(seed){
            Movie.create(seed, function(err, movie){
                if(err) {
                    console.log(err);
                } else {
                    console.log('New data added');
                    
                }
            });
        });
    });

    Cinema.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Remove Cinema completed");
        cinemaData.forEach(function(seed){
            Cinema.create(seed, function(err, cinema){
                if(err) {
                    console.log(err);
                } else {
                    console.log('Cinema data added');
                    
                }
            });
        });
    });

    Liked.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            User.updateMany({likes: []}, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("Remove Liked Complete");
                }
            });
        }
    });

}

module.exports = seedDB;


