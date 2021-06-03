var mongoose   = require('mongoose');
var Comment    = require('./models/comment');
var Liked      = require('./models/liked');
var User       = require('./models/user');
// const movie = require('./models/movie');
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
        genre: 'SCI-FI',
        actors: ' Dylan OBrien, Thomas brodie Sangster',
        trailer: 'https://www.youtube.com/embed/4-BTxXm8KSg',
        rating: '7.3',
        type: 'showing'
    }     
];



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


