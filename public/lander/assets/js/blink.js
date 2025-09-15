(function () {
                "use strict";

                var $log    = document.querySelector("#log");
                var theater = new TheaterJS();

                theater
                    .describe("Vader", { speed: .1, accuracy: .6, invincibility: 4 }, "#vader")
                    .describe("Luke", .6, "#luke");

                theater
                    .on("*", function (eventName, originalEvent, sceneName, arg) {
                        var args  = Array.prototype.splice.apply(arguments, [3]),
                            log   = '{\n      name: "' + sceneName + '"';

                        log += ",\n      args: " + JSON.stringify(args).split(",").join(", ").replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        log += "\n    }";

                        $log.innerHTML = log;
                    })
                    .on("say:start, erase:start", function (eventName) {
                        var self    = this,
                            current = self.current.voice;

                        self.utils.addClass(current, "saying");
                    })
                    .on("say:end, erase:end", function (eventName) {
                        var self    = this,
                            current = self.current.voice;

                        self.utils.removeClass(current, "saying");
                    });

                theater
                    .write("Vader:Love", 400, toggleClass)
                     .write("Vader:Good", 400, toggleClass)
                      .write("Vader:Big", 400, toggleClass)
                    // .write("Good", toggleClass)
                    // .write("Big", toggleClass)
                    // .write({ name: "call", args: [kill, true] })
                    // .write("Luke:Nooo...", -3, "!!! ", 400, "No! ", 400)
                    // .write("Luke:That's not true!", 400)
                    // .write("Luke:That's impossible!", toggleClass)
                    // .write("Vader:Search your feelings.", 1600)
                    // .write("Vader:You know it to be true.", 1000, toggleClass)
                    // .write("Luke:Noooooooo! ", 400, "No!", toggleClass)
                    // .write("Vader:Luke.", 800)
                    // .write("Vader:You can destroy the Emperor.", 1600)
                    // .write("Vader:He has foreseen this. ", 800)
                    // .write("Vader:It is your destiny.", 1600)
                    // .write("Vader:Join me.", 800)
                    // .write("Vader:Together we can rule the galaxy.", 800)
                    // .write("Vader:As father and son.", 1600)
                    //.write("Vader:Come with me. ", 800)
                   // .write("Vader:It is the only way.", 2000)
                    .write(function () { theater.play(true); });


                function toggleClass (className) {
 
                }

                function kill () {
                    var self    = this,
                        delay   = 300,
                        i       = 0,
                        timeout = setTimeout(function blink () {
                            toggleClass("blood");
                            if (++i < 6) timeout = setTimeout(blink, delay);
                            else self.next();
                        }, delay);

                    return self;
                }window.theater = theater;
            })();