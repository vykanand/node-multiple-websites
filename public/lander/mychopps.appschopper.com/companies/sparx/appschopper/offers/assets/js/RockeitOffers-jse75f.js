(function () {
    var customFadeInOut = {
        easing: {
            linear: function (progress) {
                return progress;
            },
            quadratic: function (progress) {
                return Math.pow(progress, 2);
            },
            swing: function (progress) {
                return 0.5 - Math.cos(progress * Math.PI) / 2;
            },
            circ: function (progress) {
                return 1 - Math.sin(Math.acos(progress));
            },
            back: function (progress, x) {
                return Math.pow(progress, 2) * ((x + 1) * progress - x);
            },
            bounce: function (progress) {
                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (progress >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                    }
                }
            },
            elastic: function (progress, x) {
                return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
            }
        },
        animate: function (options) {
            var start = new Date;
            var id = setInterval(function () {
                var timePassed = new Date - start;
                var progress = timePassed / options.duration;
                if (progress > 1) {
                    progress = 1;
                }
                options.progress = progress;
                var delta = options.delta(progress);
                options.step(delta);
                if (progress == 1) {
                    clearInterval(id);
                    options.complete();
                }
            }, options.delay || 10);
        },
        fadeOut: function (element, options) {
            var to = 1;
            this.animate({
                duration: options.duration,
                delta: function (progress) {
                    progress = this.progress;
                    return customFadeInOut.easing.swing(progress);
                },
                complete: options.complete,
                step: function (delta) {
                    element.style.opacity = to - delta;
                }
            });
        }
    };
    window.customFadeInOut = customFadeInOut;
})()

checkCookiesFun = function () {
    var user = getCookie("popup");
    if (user != "") {
        document.getElementById('offer_popup').style.display = 'none';
        if (document.getElementsByClassName('RockeitOffers-popup-wrapper')[0]) {
            document.getElementsByClassName('RockeitOffers-popup-wrapper')[0].style.display = 'none';
            document.getElementsByClassName('RockeitOffers-overlay')[0].style.display = 'none';
        }
    } else {
        document.getElementById('offer_popup').style.display = 'block';
        if (document.getElementsByClassName('RockeitOffers-popup-wrapper')[0]) {
            document.getElementsByClassName('RockeitOffers-popup-wrapper')[0].style.display = 'block';
            document.getElementsByClassName('RockeitOffers-overlay')[0].style.display = 'block';
        }
    }
}
checkCookiesFun();

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function closedFun() {
    customFadeInOut.fadeOut(document.getElementsByClassName('RockeitOffers-popup-wrapper')[0], {
        duration: 300,
        complete: function () {
            document.getElementsByClassName('RockeitOffers-popup-wrapper')[0].style.display = 'none';
            document.getElementsByClassName('RockeitOffers-overlay')[0].style.display = 'none';
        }
    });
    customFadeInOut.fadeOut(document.getElementsByClassName('RockeitOffers-overlay')[0], {
        duration: 300,
        complete: function () {
            document.getElementsByClassName('RockeitOffers-popup-wrapper')[0].style.display = 'none';
            document.getElementsByClassName('RockeitOffers-overlay')[0].style.display = 'none';
        }
    });
    setCookie("popup", "RockeitOffers", 30);

}


setCookie("rkt_global_id", "RockeitOffers", 30000);