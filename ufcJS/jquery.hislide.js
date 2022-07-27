if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

const emails = [ ];

function ready() {

    document.getElementsByClassName('btn-news')[0].addEventListener('click', subscribeNews)
}

function subscribeNews() {
    var email = document.getElementById("newsText").value;
    var errorMessage = document.getElementById('error-message')

    if(email === "") {
        console.log("empty")
        errorMessage.style.opacity = "1";
    } else {
        errorMessage.style.opacity = "0";
        emails.push(email);
        console.log(emails)
        document.getElementById('newsText').value = ''
        alert(email + ' has been subscribed!')
    }
}

function smallCarousel() {
    var i;
    var x = document.getElementsByClassName("home-store-item");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(smallCarousel, 5000);
}

(function($) {

    var slide = function(ele,options) {
        var $ele = $(ele);

        var windowWidth = window.innerWidth;
        // THIS FINDS THE MAIN CAROUSEL 2/3s OF THE SCREEN
        var widthBigDiv = (windowWidth/3)*2;
        var centerBigDiv = (windowWidth/2) - (widthBigDiv/2);

        var setting = {
            speed: 500,
            interval: 5000,

        };
        $.extend(true, setting, options);
        var states = [

            // CORRECT SPACING
            { $zIndex: 1, width: 120, height: 150, top: 69, left: 134, $opacity: 0.1 },
            { $zIndex: 2, width: 700, height: 450, top: 40, left: 0, $opacity: 0.3 },
            { $zIndex: 3, width: widthBigDiv, height: 600, top: 0, left: centerBigDiv-8, $opacity: 1 },
            { $zIndex: 2, width: 700, height: 450, top: 40, left: windowWidth-717, $opacity: 0.3 },
            { $zIndex: 1, width: 120, height: 150, top: 69, left: 500, $opacity: 0.1 }

            // CORRECT SPACING ON ALL SCREENS EXCEPT MOBILE
            // { $zIndex: 1, width: 120, height: 150, top: 69, left: 134, $opacity: 0.1 },
            // { $zIndex: 2, width: 700, height: 450, top: 40, left: 0, $opacity: 0.3 },
            // { $zIndex: 3, width: widthBigDiv, height: 600, top: -50, left: centerBigDiv-8, $opacity: 1 },
            // { $zIndex: 2, width: 700, height: 450, top: 40, left: windowWidth-717, $opacity: 0.3 },
            // { $zIndex: 1, width: 120, height: 150, top: 69, left: 500, $opacity: 0.1 }
        ];

        var $lis = $ele.find('li');
        var timer = null;

        $ele.find('.hi-next').on('click', function() {
            next();
            console.log("Width: " + windowWidth);
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('div').css('opacity', state.$opacity);
            });
        }

        function next() {
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        return this;
    }
})(jQuery);
