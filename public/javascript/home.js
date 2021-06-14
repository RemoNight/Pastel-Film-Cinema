var s = document.getElementById('movie-showing');
var c = document.getElementById('movie-coming');
var r = document.getElementById('movie-recommend');
var ns = document.getElementById('now-showing');
var cs = document.getElementById('coming-soon');
var rc = document.getElementById('recommend');


function onClick_Recommend() {
    if (r.style.display === "block") {
        rc.classList.add('heading-movie-1');
        ns.classList.remove('heading-movie-1');
        cs.classList.remove('heading-movie-1');

        rc.style.color = "rgb(207, 87, 87)";
        ns.style.color = "white"
        cs.style.color = "white"

        s.style.display = "none"
        c.style.display = "none"
        r.style.display = "block"
    } else {
        rc.classList.add('heading-movie-1');
        ns.classList.remove('heading-movie-1');
        cs.classList.remove('heading-movie-1');

        rc.style.color = "rgb(207, 87, 87)";
        ns.style.color = "white"
        cs.style.color = "white"

        s.style.display = "none"
        c.style.display = "none"
        r.style.display = "block"
    }
}

function onClick_Showing() {
    if (s.style.display === "none") {
        ns.classList.add('heading-movie-1');
        cs.classList.remove('heading-movie-1');
        rc.classList.remove('heading-movie-1');
 
        ns.style.color = "rgb(207, 87, 87)";
        cs.style.color = "white"
        rc.style.color = "white"

        s.style.display = "block"
        c.style.display = "none"
        r.style.display = "none"
    } else {
        ns.classList.add('heading-movie-1');
        cs.classList.remove('heading-movie-1');
        rc.classList.remove('heading-movie-1');

        ns.style.color = "rgb(207, 87, 87)";
        cs.style.color = "white"
        rc.style.color = "white"
        
        s.style.display = "block"
        c.style.display = "none"
        r.style.display = "none"
    }
    
}

function onClick_Coming() {
    if (c.style.display === "block") {
        cs.classList.add('heading-movie-1');
        ns.classList.remove('heading-movie-1');
        rc.classList.remove('heading-movie-1');

        cs.style.color = "rgb(207, 87, 87)";
        ns.style.color = "white"
        rc.style.color = "white"

        s.style.display = "none"
        c.style.display = "block"
        r.style.display = "none"
    } else {
        cs.classList.add('heading-movie-1');
        ns.classList.remove('heading-movie-1');
        rc.classList.remove('heading-movie-1');

        cs.style.color = "rgb(207, 87, 87)";
        ns.style.color = "white"
        rc.style.color = "white"
        
        s.style.display = "none"
        c.style.display = "block"
        r.style.display = "none"
    }
}



