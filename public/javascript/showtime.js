var weekday = new Array(7), month = new Array(12);
weekday[0] = "Sun", weekday[1] = "Mon", weekday[2] = "Tues", weekday[3] = "Wed", weekday[4] = "Thurs", weekday[5] = "Fri", weekday[6] = "Sat";
month[0] = "Jan", month[1] = "Feb",month[2] = "Mar", month[3] = "Apr", month[4] = "May", month[5] = "June", month[6] = "July", month[7] = "Aug", month[8] = "Sept", month[9] = "Oct", month[10] = "Nov", month[11] = "Dec";


var currentTime = new Date();
var hours = currentTime.getHours(), minutes = currentTime.getMinutes();
var todayDay = currentTime.getDay(), todayMonth = currentTime.getMonth(), todayDate = currentTime.getDate();
var today = weekday[todayDay] + ' ' + todayDate + ' ' + month[todayMonth];
var selectDay = document.getElementById("selectDay").value;

    if ( today == selectDay ) {
        if ( hours == 10 && minutes > 15 || hours > 10 ){
            var k = document.getElementsByClassName("10");
            for( var i = 0; i < k.length; i++ ) {
                k[i].disabled = true;
            }
        }
        if ( hours >= 11 && minutes > 15 || hours > 11 ){
            var k = document.getElementsByClassName("11");
            for ( var i = 0; i < k.length; i++ ) {
                k[i].disabled = true;
            }
        }
        if ( hours >= 12 && minutes > 15 || hours > 12 ){
            var k = document.getElementsByClassName("12");
            for ( var i = 0; i < k.length; i++ ) {
                k[i].disabled = true;
            }
        }
        if ( hours >= 13 && minutes > 15 || hours > 13 ){
            var k = document.getElementsByClassName("13");
            for ( var i = 0; i <k.length; i++ ){
                k[i].disabled = true;
            }
        }
        if ( hours >= 14 && minutes > 15 || hours > 14 ){
            var k = document.getElementsByClassName("14");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = true;
            }
        }
        if ( hours >= 15 && minutes > 15 || hours > 15 ){
            var k = document.getElementsByClassName("15");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
                
            }
        }
        if ( hours >= 16 && minutes > 15 || hours > 16 ){
            var k = document.getElementsByClassName("16");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
                
            }
        }
        if ( hours >= 17 && minutes > 15 || hours > 17 ){
            var k = document.getElementsByClassName("17");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
                
            }
        }
        if ( hours >= 18 && minutes > 15 || hours > 18 ){
            var k = document.getElementsByClassName("18");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
            }
        }
        if ( hours >= 19 && minutes > 15 || hours > 19 ){
            var k = document.getElementsByClassName("19");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
            }
        }
        if ( hours >= 21 && minutes > 15 || hours > 21 ){
            var k = document.getElementsByClassName("21");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
            }
        }
    }

    function check(checkSelectDay) {
        if ( today == checkSelectDay ) {
            if ( hours >= 10 && minutes > 15 || hours > 10 ){
                var k = document.getElementsByClassName("10");
                for ( var i = 0; i < k.length; i++ ){
                    k[i].disabled = true;
                    
                }
            }
            if ( hours >= 11 && minutes > 15 || hours > 11 ){
            var k = document.getElementsByClassName("11");
            for ( var i = 0; i < k.length; i++ ) {
                k[i].disabled = true;
                
            }
        }
        if ( hours >= 12 && minutes > 15 || hours > 12 ){
            var k = document.getElementsByClassName("12");
            for ( var i = 0; i < k.length; i++ ) {
                k[i].disabled = true;
            }
        }
        if ( hours >= 13 && minutes > 15 || hours > 13 ){
            var k = document.getElementsByClassName("13");
            for ( var i = 0; i <k.length; i++ ){
                k[i].disabled = true;
            }
        }
        if ( hours >= 14 && minutes > 15 || hours > 14 ){
            var k = document.getElementsByClassName("14");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = true;
            }
        }
        if ( hours >= 15 && minutes > 15 || hours > 15 ){
            var k = document.getElementsByClassName("15");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
            }
        }
        if ( hours >= 16 && minutes > 15 || hours > 16 ){
            var k = document.getElementsByClassName("16");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
            }
        }
        if ( hours >= 17 && minutes > 15 || hours > 17 ){
            var k = document.getElementsByClassName("17");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
            }
        }
        if ( hours >= 18 && minutes > 15 || hours > 18 ){
            var k = document.getElementsByClassName("18");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
            }
        }
        if ( hours >= 19 && minutes > 15 || hours > 19 ){
            var k = document.getElementsByClassName("19");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
            }
        }
        if ( hours >= 21 && minutes > 15 || hours > 21 ){
            var k = document.getElementsByClassName("21");
            for ( var i = 0; i < k.length; i++){
                k[i].disabled = true;
            }
        }
        } else if ( today != checkSelectDay ) {
            var k = document.getElementsByClassName("10");
                for ( var i = 0; i < k.length; i++ ) {
                    k[i].disabled = false;
                }
                
            var k = document.getElementsByClassName("11");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = false;
            }
            var k = document.getElementsByClassName("12");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = false;
            }
            var k = document.getElementsByClassName("13");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = false;
            }
            var k = document.getElementsByClassName("14");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = false;
            }
            var k = document.getElementsByClassName("15");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = false;
            }
            var k = document.getElementsByClassName("16");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = false;
            }
            var k = document.getElementsByClassName("17");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = false;
            }
            var k = document.getElementsByClassName("18");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = false;
            }
            var k = document.getElementsByClassName("19");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = false;
            }
            var k = document.getElementsByClassName("21");
            for ( var i = 0; i < k.length; i++ ){
                k[i].disabled = false;
            }
        }
        document.getElementById("selectDay").value = checkSelectDay;
        document.getElementById("selectDay1").value = checkSelectDay;
        document.getElementById("selectDay2").value = checkSelectDay;
        document.getElementById("selectDay3").value = checkSelectDay;
        document.getElementById("selectDay4").value = checkSelectDay;

    }


