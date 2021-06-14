
    var price = 0; seat = 0;

    document.getElementById("seat").innerHTML = seat;
    document.getElementById("price").innerHTML = price;

    if ( seat > 0 ) {
        document.getElementById('submit').disabled = false;
    }
    else if ( seat == 0 ) {
        document.getElementById('submit').disabled = true;
    }

    // normal seats

    function booking(selectedSeat) {
        if(document.getElementById('i' + selectedSeat).value == 'n'){
            document.getElementById(selectedSeat).style.opacity = '0.5';
            document.getElementById('i' + selectedSeat).value = 'y';

            seat += 1;
            price += 180;

            document.getElementById("num_seat").innerHTML += selectedSeat + " ";
            document.getElementById("seat").innerHTML = seat;
            document.getElementById("price").innerHTML = price;
        }
        else if(document.getElementById('i' + selectedSeat).value == 'y'){
            document.getElementById(selectedSeat).style.opacity = '1';
            document.getElementById('i' + selectedSeat).value = 'n';
            
            seat -= 1;
            price -= 180;

            document.getElementById("num_seat").innerHTML = " ";
            document.getElementById("seat").innerHTML = seat;
            document.getElementById("price").innerHTML = price;
        }

        if ( seat > 0 ) {
            document.getElementById('submit').disabled = false;
        }
        else if ( seat == 0 ) {
            document.getElementById('submit').disabled = true;
        }
    }

    // honeymoon seats

    function bookingHoney(selectedSeat) {
        
        if(document.getElementById('j' + selectedSeat).value == 'n'){
            document.getElementById(selectedSeat).style.opacity = '0.5';
            document.getElementById('j' + selectedSeat).value = 'y';
            seat += 2;
            price += 220;
            
            document.getElementById("num_seat").innerHTML += selectedSeat + " ";
            document.getElementById("seat").innerHTML = seat;
            document.getElementById("price").innerHTML = price;
        }
        else if ( document.getElementById('j' + selectedSeat).value == 'y' ){
            document.getElementById(selectedSeat).style.opacity = '1';
            document.getElementById('j' + selectedSeat).value = 'n';
            
            seat -= 2;
            price -= 220;
            
            document.getElementById("num_seat").innerHTML = " ";
            document.getElementById("seat").innerHTML = seat;
            document.getElementById("price").innerHTML = price;
        } 
        if ( seat > 0 ) {
            document.getElementById('submit').disabled = false;
        }
        else if ( seat == 0 ) {
            document.getElementById('submit').disabled = true;
        }
    }
