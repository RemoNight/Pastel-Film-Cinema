var mongoose   = require('mongoose');
var Comment    = require('./models/comment');
var Cinema     = require('./models/cinema.js');
var Liked      = require('./models/liked');
var User       = require('./models/user');
var Movie      = require('./models/movie');


var data = [
    {
        name:'Star Wars The Force Awakens ', 
        image: 'https://www.i-moviehd.com/wp-content/uploads/2019/11/Star-Wars-7-The-Force-Awakens-2015-%E0%B8%AA%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B9%8C-%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%AA-7.png',
        date: '7 AUG 2021',
        time: '126 Mins',
        genre: 'Sci-Fi / Fantasy',
        actors: 'Daisy Ridley, John Boyega, Oscar Isaac',
        trailer: 'https://www.youtube.com/embed/sGbxmsDFVnE',
        rating: '0',
        location: 'chi',
        type: 'coming'

    },
    {
        name:   'Spiderman Miles Morales', 
        image: 'https://cdn.europosters.eu/image/750/posters/spider-man-miles-morales-cybernetic-swing-i100282.jpg',
        date: '18 DEC 2020',
        time: '92 Mins',
        genre: 'Action / Fantasy',
        actors: 'Tom Holland',
        trailer: 'https://www.youtube.com/embed/NTunTURbyUU',
        rating: '6.8',
        location: 'port',
        type: 'showing'
    },
    {
        name:'Maze Runner', 
        image: 'https://c.min.ms/t/d/member/c/28/28897/pagegallery/1516965596/ecfb4860.jpg',
        date: '27 SEP 2021',
        time: '143 Mins',
        genre: 'Adventure',
        actors: ' Dylan OBrien, Thomas brodie Sangster',
        trailer: 'https://www.youtube.com/embed/4-BTxXm8KSg',
        rating: '0',
        location: 'chi',
        type: 'coming'
    },
    {
        name:'Ant Man', 
        image: 'https://i.pinimg.com/originals/f9/89/34/f98934e9c47cf9f2edb59cf474a6fa21.jpg',
        date: '2 JAN 2021',
        time: '152 Mins',
        genre: 'Sci-Fi',
        actors: ' Dylan OBrien, Thomas brodie Sangster',
        trailer: 'https://www.youtube.com/embed/4-BTxXm8KSg',
        rating: '7.3',
        location: 'chi',
        type: 'showing'
    },
    {
        name:'Aquaman', 
        image: '/images/aquaman.jpeg',
        date: '13 JUNE 2021',
        time: '152 Mins',
        genre: 'Action / Adventure',
        actors: ' Jason Momoa, Amber Heard',
        trailer: 'https://www.youtube.com/embed/WDkg3h8PCVU',
        rating: '8.2',
        location: 'houst',
        type: 'showing'
    },
    {
        name:'Quiet Place 2', 
        image: 'https://f.ptcdn.info/650/073/000/qtuoc17aioFCDSU27ct-o.jpg',
        date: '10 MAY 2022',
        rating: '0',
        actors: 'Emily Blunt, John Krasinski',
        time: '97 Mins',
        trailer:'https://www.youtube.com/embed/BpdDN9d9Jio',
        genre: 'Horror',
        location: 'port',
        type: 'coming'

    },
    {
        name:'Wrath of Man', 
        image: 'https://www.keeptrailers.com/wp-content/uploads/2021/04/Wrath-of-Man-Poster-1.jpg',
        date: '10 MAY 2022',
        rating: '0',
        actors: 'Jason Statham, Holt McCallany',
        time:'149 Mins',
        trailer:'https://www.youtube.com/embed/EFYEni2gsK0',
        genre: 'Action / Crime',
        location: 'houst',
        type: 'coming'
    },
    {
        name:'Mortal Kombat', 
        image: 'https://m.media-amazon.com/images/M/MV5BY2ZlNWIxODMtN2YwZi00ZjNmLWIyN2UtZTFkYmZkNDQyNTAyXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg',
        date: '9 MAY 2021',
        rating: '9.0',
        actors: 'Jessica McNamee, Lewis Tan',
        time:'163 Mins',
        trailer:'https://www.youtube.com/embed/e0fy8aqe4Aw',
        genre: 'Sci-Fi / Action',
        location: 'port',
        type: 'showing'
    },
    {
        name:'The Witches', 
        image: 'https://s359.kapook.com/rq/450/auto/50/pagebuilder/424246e4-6c9e-4da8-b6c6-d3f83e9bcaef.jpg',
        date: '19 MAY 2022',
        rating: '0',
        actors: 'Anne Hathaway, Octavia Spencer',
        time:'106 Mins',
        trailer:'https://www.youtube.com/embed/9nlhmJF5FNI',
        genre: 'Comedy / Fantasy',
        location: 'houst',
        type: 'coming'
    },
    {
        name:'Promising Young Woman', 
        image: 'https://369movies.com/wp-content/uploads/2021/03/Promising-Young-Woman-2020.jpg',
        date: '22 OCT 2021',
        rating: '4.0',
        actors: 'Carey Mulligan, Bo Burnham',
        time:'163 Mins',
        trailer:'https://www.youtube.com/embed/7i5kiFDunk8',
        genre: 'Comedy / Crime / Drama',
        location: 'port',
        type: 'coming'
    },
    {
        name:'Nobody', 
        image: 'https://www.keeptrailers.com/wp-content/uploads/2021/01/Nobody-Poster-2-690x1000.jpg',
        date: '26 APR 2021',
        rating: '7.4',
        actors: 'Bob Odenkirk, 	Aleksey Serebryakov',
        time:'115 Mins',
        trailer:'https://www.youtube.com/embed/wZti8QKBWPo',
        genre: 'Action / Crime / Drama',
        location: 'chi',
        type: 'showing'
    },
    {
        name:'Cruella', 
        image: 'https://m.media-amazon.com/images/M/MV5BOWI5YTUxOWEtZmRiZS00ZmQxLWE2NzctYTRiODA2NzE1ZjczXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
        date: '10 June 2021',
        rating: '9.1',
        actors: 'Cate Blanchett, Orlando Bloom',
        time:'180 Mins',
        trailer:'https://www.youtube.com/embed/gmRKv7n2If8',
        genre: 'Comedy / Crime',
        location: 'houst',
        type: 'showing'
    }
];


var cinemaData = [
    {
        name: 'Chicago CineBulls',
        area: 'bangkok',
        image: '/uploads/cinemas/cinema-Maroc.jpg',
        logo: '/uploads/cinemas/chicago-bulls-2.png',
        slogan: 'Let’s make enjoyment better.',
        tel: 'Tel. 1397',
        seat: [ [0, 0, 0, 0] , [0, 0, 0, 0] , [0, 0, 0, 0] , [0, 0, 0, 0] ]
    },
    {
        name: 'Portland Cinemia',
        area: 'bangkok',
        image: '/uploads/cinemas/cinema-Maroc.jpg',
        logo: '/uploads/cinemas/portland.png',
        slogan: 'Everyone deserves a great experience.',
        tel: 'Tel. 1349',
        seat: [ [0, 0, 0, 0] , [0, 0, 0, 0] , [0, 0, 0, 0] , [0, 0, 0, 0] ]
    },
    {
        name: 'Houston Rocplex',
        area: 'central',
        image: '/uploads/cinemas/cinema-Maroc.jpg',
        logo: '/uploads/cinemas/houston-rockets.png',
        slogan: 'Have original experience of movie at day first.',
        tel: 'Tel. 1427',
        seat: [ [0, 0, 0, 0] , [0, 0, 0, 0] , [0, 0, 0, 0] , [0, 0, 0, 0] ]
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


