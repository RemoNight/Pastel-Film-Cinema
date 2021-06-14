var s = document.getElementById('movie-showing');
var c = document.getElementById('movie-coming');
var r = document.getElementById('movie-recommend');
var ns = document.getElementById('now-showing');
var cs = document.getElementById('coming-soon');
var rc = document.getElementById('recommend');

function onClick_Showing() {
    if (s.style.display === "none") {
        ns.classList.add('heading-movie-1');
        cs.classList.remove('heading-movie-1');
        ns.style.color = "rgb(207, 87, 87)";
        cs.style.color = "white"
        s.style.display = "block"
        c.style.display = "none"
    } else {
        ns.classList.add('heading-movie-1');
        cs.classList.remove('heading-movie-1');
        ns.style.color = "rgb(207, 87, 87)";
        cs.style.color = "white"
        s.style.display = "block"
        c.style.display = "none"
    }
    

}

function onClick_Coming() {
    if (c.style.display === "block") {
        cs.classList.add('heading-movie-1');
        ns.classList.remove('heading-movie-1');
        cs.style.color = "rgb(207, 87, 87)";
        ns.style.color = "white"
        s.style.display = "none"
        c.style.display = "block"
    } else {
        cs.classList.add('heading-movie-1');
        ns.classList.remove('heading-movie-1');
        cs.style.color = "rgb(207, 87, 87)";
        ns.style.color = "white"
        s.style.display = "none"
        c.style.display = "block"
    }
}
