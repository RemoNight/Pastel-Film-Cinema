var b = document.getElementById('bangkok');
var c = document.getElementById('central');

var bkk = document.getElementById('bkk');
var cen = document.getElementById('cen');



function onClick_Bangkok() {
    if (b.style.display === "none") {
        bkk.classList.add('heading-movie-1');
        cen.classList.remove('heading-movie-1');
        bkk.style.color = "rgb(207, 87, 87)";
        cen.style.color = "white"
        b.style.display = "block"
        c.style.display = "none"
    } else {
        bkk.classList.add('heading-movie-1');
        cen.classList.remove('heading-movie-1');
        bkk.style.color = "rgb(207, 87, 87)";
        cen.style.color = "white"
        b.style.display = "block"
        c.style.display = "none"
    }
}

function onClick_Central() {
    if (c.style.display === "block") {
        cen.classList.add('heading-movie-1');
        bkk.classList.remove('heading-movie-1');
        cen.style.color = "rgb(207, 87, 87)";
        bkk.style.color = "white"
        b.style.display = "none"
        c.style.display = "block"
    } else {
        cen.classList.add('heading-movie-1');
        bkk.classList.remove('heading-movie-1');
        cen.style.color = "rgb(207, 87, 87)";
        bkk.style.color = "white"
        b.style.display = "none"
        c.style.display = "block"
    }
}
