function OnScreen(e) {
    function t() {
        !l.animFrame && l.items.length && (l.animFrame = requestAnimationFrame(i))
    }

    function i() {
        l.animFrame = null, l.items.forEach(function(e) {
            var t = e.element,
                i = e.options,
                s = e.side,
                a = n(e),
                r = e.side,
                l = e.offset,
                c = {
                    side: a ? s : r,
                    offset: l,
                    data: i.data
                },
                u = t.getAttribute("class").match(new RegExp("\\b(" + i.screenEnterClass + "|" + i.screenLeaveClass + ")(-(-(top|bottom|left|right)){0,2})*", "g")) || [];
            if (a) {
                if (!e.onscreen) {
                    if (e.onscreen = !0, !o(t, "screenenter", c) || i.onScreenEnter && i.onScreenEnter.call(t, c) === !1) return;
                    u.forEach(function(e) {
                        t.classList.remove(e)
                    }), t.classList.add(i.screenEnterClass), t.classList.add(i.screenEnterClass + "--" + s)
                }
            } else if (e.onscreen) {
                if (e.onscreen = !1, !o(t, "screenleave", c) || i.onScreenLeave && i.onScreenLeave.call(t, c) === !1) return;
                u.forEach(function(e) {
                    t.classList.remove(e)
                }), t.classList.add(i.screenLeaveClass), t.classList.add(i.screenLeaveClass + "--" + r)
            }!i.disableScreenMove && (a || i.fireScreenMoveOffScreen) && (!o(t, "screenmove", c) || i.onScreenMove && i.onScreenMove.call(t, c) === !1)
        })
    }

    function n(e) {
        var t = e.element.getBoundingClientRect(),
            i = {
                top: 0,
                right: window.innerWidth,
                bottom: window.innerHeight,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            },
            n = s(t, e.options.target),
            a = s(i, e.options.screen),
            o = n.top - a.top,
            r = a.right - n.right,
            l = a.bottom - n.bottom,
            c = n.left - a.left,
            u = a.height - n.height,
            d = a.width - n.width,
            h = a.height + n.height,
            p = a.width + n.width,
            m = {
                top: o / a.height,
                right: r / a.width,
                bottom: l / a.height,
                left: c / a.width,
                inside: {
                    top: o / u,
                    right: r / d,
                    bottom: l / u,
                    left: c / d
                },
                outside: {
                    top: (n.bottom - a.top) / h,
                    right: (a.right - n.left) / p,
                    bottom: (a.bottom - n.top) / h,
                    left: (n.right - a.left) / p
                }
            },
            f = [];
        return n.bottom <= a.top ? f[f.length] = "top" : n.top >= a.bottom && (f[f.length] = "bottom"), n.right <= a.left ? f[f.length] = "left" : n.left >= a.right && (f[f.length] = "right"), e.offset = m, f.length ? (e.side = f.join("-"), !1) : !0
    }

    function s(e, t) {
        var i = e.width || e.right - e.left,
            n = e.height || e.bottom - e.top,
            s = {};
        return t = t || {}, s.top = e.top + (t.top ? a(t.top, n) : 0), s.right = e.right - (t.right ? a(t.right, i) : 0), s.bottom = e.bottom - (t.bottom ? a(t.bottom, n) : 0), s.left = e.left + (t.left ? a(t.left, i) : 0), s.width = s.right - s.left, s.height = s.bottom - s.top, s
    }

    function a(e, t) {
        return /\d%$/.test(e) ? parseFloat(e) / 100 * t : parseFloat(e || 0)
    }

    function o(e, t, i) {
        var n;
        return "function" == typeof CustomEvent ? n = new CustomEvent(t, {
            detail: i,
            bubbles: !0,
            cancelable: !0
        }) : (n = document.createEvent("CustomEvent"), n.initCustomEvent(t, !0, !0, i)), !!e.dispatchEvent(n)
    }

    function r() {
        var e = {};
        return [].forEach.call(arguments, function(t) {
            for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i] && "[object Object]" === {}.toString.call(t[i]) ? r(e[i] || {}, t[i]) : t[i])
        }), e
    }
    var l = this,
        c = {
            scrollContainer: [document.body, document.documentElement, window],
            scroll: !0,
            resize: !0,
            load: !0
        };
    l.options = r(c, e || {}), l.animFrame = null, l.items = [], l.map = {}, l.update = t, l.util = {
        mergeObjects: r
    }, l.options.scroll && [].forEach.call(l.options.scrollContainer, function(e) {
        e.addEventListener("scroll", t)
    }), l.options.resize && window.addEventListener("resize", t), l.options.load && window.addEventListener("load", t)
}

function assert(e, t) {
    e === !0 ? console.log(t) : console.warn(t)
}

function Throttle() {
    var e = this;
    this.now = Date.now || function() {
        return new Date.getTime
    }, this.debounce = function(e, t, i) {
        var n;
        return function() {
            var s = this,
                a = arguments,
                o = function() {
                    n = null, i || e.apply(s, a)
                },
                r = i && !n;
            clearTimeout(n), n = setTimeout(o, t), r && e.apply(s, a)
        }
    }, this.throttle = function(t, i, n) {
        var s, a, o, r = null,
            l = 0;
        n || (n = {});
        var c = function() {
            l = n.leading === !1 ? 0 : e.now(), r = null, o = t.apply(s, a), r || (s = a = null)
        };
        return function() {
            var u = e.now();
            l || n.leading !== !1 || (l = u);
            var d = i - (u - l);
            return s = this, a = arguments, 0 >= d || d > i ? (clearTimeout(r), r = null, l = u, o = t.apply(s, a), r || (s = a = null)) : r || n.trailing === !1 || (r = setTimeout(c, d)), o
        }
    }
}

function Globals() {}

function Url() {
    this.pathCache = [], this.domain = function(e) {
        var t = (e ? e.replace(/^https*:\/\/|(:|\/).*$/g, "") : location.hostname).split("."),
            i = t.length;
        return t.slice(i - 2, i).join(".")
    }, this.section = function() {
        return ((location.pathname.split("/")[1] || "").match(/^[^\.]*$/) || [""])[0]
    }, this.isSecure = function() {
        return "https:" === location.protocol
    }, this.transformToArray = function(e) {
        for (var t = {}, i = e.split("&"), n = 0; n < i.length; n++) {
            var s = i[n].split("=");
            t[s[0]] = s[1]
        }
        return t
    }, this.params = function() {
        var e = window.location.search.substr(1);
        return null !== e && "" !== e ? this.transformToArray(e) : {}
    }, this.path = function() {
        return this.pathCache = location.pathname.match(/([^\/]+)/g) || [""], this.pathCache
    }, this.getFragment = function() {
        return location.hash.substring(1) || !1
    }, this.setFragment = function(e) {
        return location.hash = e || "", this
    }, this.baseUrl = function() {
        var e = window.location;
        return e.protocol + "//" + e.host
    }, this.completeUrl = function() {
        var e = this.baseUrl() + "/" + this.path().join("/") + "/",
            t = e.substr(e.length - 2);
        return "//" === t && (e = e.substring(0, e.length - 1)), e
    }
}

function PageType() {
    this.getType = function() {
        for (var e, t = $("body").attr("class"), i = ["home", "about", "services", "projects", "case-study", "team", "member", "contact", "jobs", "listing"], n = 0; n < i.length; n++) - 1 !== t.indexOf("page-type--" + i[n]) && (e = i[n]);
        return e
    }, this.type = this.getType(), this.getPageBackground = function() {
        return $(".page__background")
    }, this.pageBackground = this.getPageBackground(), this.getMain = function() {
        return $(".main")
    }, this.main = this.getMain(), this.onNewPageLoad = function() {
        this.pageBackground = this.getPageBackground(), this.main = this.getMain()
    }, this.onPageLeave = function() {
        this.pageBackground = this.main = this.nextPage = null
    }
}

function Browser() {
    this.getIsWebkit = function() {
        return -1 != navigator.userAgent.toLowerCase().indexOf("webkit") ? !0 : !1
    }, this.isWebkit = this.getIsWebkit(), this.getOperatingSystem = function() {
        var e = "";
        return -1 != navigator.appVersion.indexOf("Win") && (e += " windows"), -1 != navigator.appVersion.indexOf("Mac") && (e += " osx"), -1 != navigator.appVersion.indexOf("X11") && (e += " unix"), -1 != navigator.appVersion.indexOf("Linux") && (e += " linux"), FLD.HtmlTag.addClass(e), e
    }, this.IE10 = function(e) {
        return RegExp("msie" + (isNaN(e) ? "" : "\\s10" + e), "i").test(navigator.userAgent)
    }, this.IE11 = function() {
        return /rv:11.0/i.test(navigator.userAgent)
    }, this.checkForGteIE10 = function() {
        var e = "";
        this.IE10(10) && (e = "ie-10"), this.IE11() && (e = "ie-11"), "" != e && FLD.HtmlTag.addClass("ie " + e)
    }, this.operatingSystem = this.getOperatingSystem(), this.CheckForPseudoAnimations = function() {}, this.CheckForSVGSupport = function() {
        return FLD.HtmlTag.hasClass("ie8") && (document.createElement("svg"), $('img[src*="svg"]').attr("src", function() {
            return $(this).attr("src").replace(".svg", ".png")
        })), this
    }, this.checkForClip = function() {
        var e = document.createElement("x-test"),
            t = "undefined" != typeof e.style.webkitBackgroundClip && (e.style.webkitBackgroundClip = "text", "text" === e.style.webkitBackgroundClip);
        $("html").addClass(t ? "clippy" : "no-clippy")
    }, this.onNewPageLoad = function() {
        this.checkForGteIE10(), this.isWebkit = this.getIsWebkit(), this.operatingSystem = this.getOperatingSystem(), this.CheckForSVGSupport(), this.checkForClip(), this.CheckForPseudoAnimations()
    }, this.IE = function(e) {
        return RegExp("msie" + (isNaN(e) ? "" : "\\s" + e), "i").test(navigator.userAgent)
    }, this.onNewPageLoad()
}

function Resize() {
    var e = this;
    this.getBrowserWidth = function() {
        return FLD.Window.width()
    }, this.BrowserWidth = this.getBrowserWidth(), this.getBrowserHeight = function() {
        return FLD.Window.height()
    }, this.BrowserHeight = this.getBrowserHeight(), this.Recalculate = function() {
        this.BrowserHeight = this.getBrowserHeight(), this.BrowserWidth = this.getBrowserWidth()
    }, $(window).on("resize", function() {
        e.Recalculate()
    }), $(window).load(function() {
        e.Recalculate()
    })
}

function MobileNavigation() {
    var e = this;
    $("html").hasClass("ie8") || /mobile/i.test(navigator.userAgent) && !window.location.hash && setTimeout(function() {
        window.scrollTo(0, 1)
    }, 1e3), this.breakpoint = 767, this.isMobile = function() {
        return FLD.Resize.BrowserWidth <= this.breakpoint
    }, this.mobileFlag = this.isMobile(), this.classes = {
        hide: "js--mobile-nav-hide-on-resize"
    }, this.watchAndAddClass = function() {
        var e = this.isMobile();
        this.mobileFlag !== e && (this.mobileFlag = e, this.addRemoveClass())
    }, this.addRemoveClass = function() {
        this.mobileFlag === !0 ? ($(".main-navigation").addClass(this.classes.hide), setTimeout(function() {
            $(".main-navigation").removeClass(e.classes.hide)
        }, 500)) : $(".main-navigation").removeClass(this.classes.hide)
    }, this.addRemoveClass(), $(document).on("touchend click", "#nav-toggle", function(e) {
        e.preventDefault(), $("body").hasClass("ios-accellerate") || $("body").addClass("ios-accellerate"), setTimeout(function() {
            $("html").toggleClass("js--show-menu"), $("html").hasClass("js--show-menu") && $("html").addClass("js--fade-menu-in"), $("body").hasClass("ios-accellerate") && ($("body").removeClass("ios-accellerate"), setTimeout(function() {
                $("html").hasClass("js--show-menu") || $("html").removeClass("js--fade-menu-in")
            }, 400))
        }, 10)
    }), $(document).on("touchend click", ".toggle--social", function() {
        $(".menu--social").toggleClass("js--show-social")
    }), $(document).on("click", ".toggle--social", function() {
        $(".menu--social").toggleClass("js--show-social")
    }), $(window).on("resize", function() {
        e.watchAndAddClass()
    })
}

function History() {
    var e = this,
        t = window;
    this.hasAddressChanged = !1, window.location.hash && (this.hasAddressChanged = !0), this.baseURL = window.location.protocol + "//" + window.location.host, this.lastAddress = "", this.runOnNewPageLoad = function() {
        FLD.PageType.type = FLD.PageType.getType(), FLD.PageType.onNewPageLoad(), FLD.Resize.Recalculate(), $(".page--services").imagesLoaded(function() {
            FLD.FlexsliderServices.setUpSliders()
        }), $(".main-navigation a").blur(), FLD.HomeProjects.onNewPageLoad(), FLD.AboutScroll.onNewPageLoad(), FLD.ExperienceBg.onNewPageLoad(), FLD.HomepageMousewheel.onNewPageLoad(), FLD.Slideshow.onNewPageLoad(), FLD.RandomQuote.onNewPageLoad(), FLD.CaseStudy.onNewPageLoad(), FLD.Contact.onNewPageLoad(), FLD.Chimp.onNewPageLoad(), FLD.OnScreen.onNewPageLoad(), FLD.Jobs.onNewPageLoad(), FLD.NavigationHide.onNewPageLoad(), FLD.NavigationHome.onNewPageLoad(), FLD.HomeUI.onNewPageLoad(), FLD.ProjectsMenu.onNewPageLoad(), FLD.Afterlight.onNewPageLoad()
    }, this.runOnPageLeave = function() {}, this.setUpAddressLinks = function() {
        $(document).on("click", '.site-header a:not(".menu__item__link--external, .sub-menu-link, .menu-link--blog"), .js--address', function(e) {
            var i = $(this).attr("href").replace(t.baseURL, "").replace(/^#/, "");
            $.address.value(i), e.preventDefault()
        })
    }, this.onAddressInit = function(e) {
        if ("#!" === window.location.hash && "/" === window.location.pathname) return void(this.lastAddress = "/");
        $('.site-header a[href="' + e.path + '"]');
        this.lastAddress = e.path, t.hasAddressChanged
    }, this.isProjectsList = function(e) {
        var t = /\/projects\/?$"/;
        return t.test(e)
    }, this.isSingleProject = function(e) {
        var t = /\/projects\/[\w\d\-]+\/?$/;
        return t.test(e)
    }, this.isProjectsOrProject = function(e) {
        var t = /\/projects\/?[\w\d\-]*\/?$/;
        return t.test(e)
    }, this.isContactPage = function(e) {
        var t = /\/contact\/?$/;
        return t.test(e)
    }, this.isHomePage = function(e) {
        var t = /^\/[en|uk]{0,2}\/?$/;
        return t.test(e)
    }, this.isMemberPage = function(e) {
        var t = /^\/[en|uk]{0,2}\/?(?!about|services|team|projects|jobs|contact)[\w\-]+\/?$/;
        return t.test(e)
    }, this.onAddressChange = function(e) {
        if ("#!" !== window.location.hash || "/" !== e.path) {
            var t = {};
            t.url = e.path, t.nav_item = $('.site-header a[href="' + t.url + '"]'), this.hasAddressChanged && "" === e.queryString && (this.runOnPageLeave(), this.loadContent(t.url, e)), this.hasAddressChanged = !0
        }
    }, this.init = function() {
        !Modernizr.history || Modernizr.touch || FLD.Browser.IE(10) || (this.setUpAddressLinks(), $.address.init(function(t) {
            e.onAddressInit(t)
        }), $.address.change(function(t) {
            $.address.loadType(e.isMemberPage(t.value) ? "member" : null), e.onAddressChange(t)
        })), $(".loading-element__title").text("Loading"), $(".loading-element__description").text("Loading")
    }, this.init(), this.getNewPageData = function(e) {
        var t = {};
        return t.title = e.match("<title>(.*?)</title>")[1], t.classes = /body([^>]*)class=(["']+)([^"']*)(["']+)/gi.exec(e.substring(e.indexOf("<body"), e.indexOf("</body>") + 7))[3], t
    }, this.loadContent = function(e, t) {
        FLD.Globals.clearSelection();
        var i = this.lastAddress.replace(/\//g, "");
        this.isSingleProject(t.path) ? this.loadProject(e, t, i) : "member" === $.address.loadType() ? this.loadMember(e, t, i) : this.isContactPage(t.path) && 1 == t.parameterNames.length && "true" === t.parameters.success || this.loadPage(e, t, i), this.lastAddress = t.value
    }, this.isOldProject = function(e) {
        var t = $.inArray(e, ["cleancube", "jack-threads", "pg", "discovery", "weride", "kapture", "ducati", "ribbon", "porsche", "elevatr"]);
        return -1 !== t
    }, this.sanitizeSlug = function(e) {
        e = e.split("/").clean("");
        var t = e[e.length - 1];
        return t
    }, this.loadProject = function(t, i) {
        $("html").addClass("show-loading"), setTimeout(function() {
            $("body,html").scrollTop(0), $("#masthead").removeClass("hide-nav")
        }, 175), $('<span class="progress"><span class="meter"></span></span>').insertBefore(".loading__text");
        var n = this.sanitizeSlug(t),
            s = cdn_url + "/assets/css/cs-" + n + ".css?q=" + query_string,
            a = cdn_url + "/assets/css/cs-global.css?q=" + query_string;
        $(document.createElement("img")).attr({
            src: s
        }).on("error", function() {
            $("[data-js='dynamic-project-global-stylesheet']").remove(), e.isOldProject(n) || $('<link rel="stylesheet" data-js="dynamic-project-global-stylesheet" type="text/css" href="' + a + '" />').appendTo("head"), $('<link rel="stylesheet" data-js="dynamic-project-stylesheet" type="text/css" href="' + s + '" />').appendTo("head"), $(".loading__element").afterTransition(function() {
                $(".site-header .nav--project").remove(), $.ajax({
                    url: t
                }).done(function(n) {
                    var s = $(n).find(".page--project");
                    if ($(s).attr("data-custom-typekit")) {
                        var a = $(s).attr("data-custom-typekit"),
                            o = document.getElementsByTagName("head")[0],
                            r = document.createElement("script");
                        r.type = "text/javascript", r.onreadystatechange = function() {
                            if ("complete" == this.readyState) try {
                                Typekit.load()
                            } catch (e) {}
                        }, r.onload = function() {
                            try {
                                Typekit.load()
                            } catch (e) {}
                        }, r.src = "//use.typekit.net/" + a + ".js", o.appendChild(r)
                    }
                    var l = $(n).find(".page-wrap"),
                        c = $(n).find("img").length,
                        u = 0;
                    $(n).find("img").load(function() {
                        if (++u, $(".meter").css({
                                width: u / c * 100 + "%"
                            }), u == c) {
                            if ($(".progress").fadeOut(100), $("#page").html(l), e.isSingleProject(i.path)) {
                                var s = $(n).find(".nav--project").eq(0);
                                s.insertAfter(".site-header .wrap")
                            }
                            e.doAfterPageLoad(n);
                            var a = e.sanitizeSlug(t);
                            $("[data-js='dynamic-project-stylesheet']").not("[href*='" + a + "']").remove()
                        }
                    })
                })
            })
        })
    }, this.addMetaData = function(t) {
        var i = e.getNewPageData(t);
        document.title = i.title, $("body").attr("class", i.classes)
    }, this.doAfterPageLoad = function(t) {
        this.addMetaData(t), $("html").addClass("hide-loading"), $(".loading__element").afterTransition(function() {
            $("html").removeClass("hide-loading show-loading"), $("body").addClass("page-loaded"), e.runOnNewPageLoad(), "projects" === FLD.PageType.type && ($("body").addClass("slide-showcase-in"), $(".work").addClass("js--work--in")), $("#masthead").css({
                height: 56,
                overflow: "hidden"
            }), $(".main-navigation").removeClass("js--hide-main-nav"), setTimeout(function() {
                $("#masthead").removeAttr("style")
            }, 900)
        })
    }, this.loadPage = function(t, i) {
        if ($("html").addClass("show-loading"), setTimeout(function() {
                $("body,html").scrollTop(0), $("#masthead").removeClass("hide-nav")
            }, 175), e.isSingleProject(i.path)) {
            var n = this.sanitizeSlug(t),
                s = cdn_url + "/assets/css/cs-" + n + ".css?q=" + query_string,
                a = cdn_url + "/assets/css/cs-global.css?q=" + query_string;
            $.ajax({
                url: s,
                success: function() {
                    $("[data-js='dynamic-project-global-stylesheet']").remove(), e.isOldProject(n) || $('<link rel="stylesheet" data-js="dynamic-project-global-stylesheet" type="text/css" href="' + a + '" />').appendTo("head"), $('<link rel="stylesheet" data-js="dynamic-project-stylesheet" type="text/css" href="' + s + '" />').appendTo("head"), $(".loading__element").afterTransition(function() {
                        $(".site-header .nav--project").remove(), $.ajax({
                            url: t
                        }).done(function(n) {
                            var s = $(n).find(".page--project");
                            if ($(s).attr("data-custom-typekit")) {
                                var a = $(s).attr("data-custom-typekit"),
                                    o = document.getElementsByTagName("head")[0],
                                    r = document.createElement("script");
                                r.type = "text/javascript", r.onreadystatechange = function() {
                                    if ("complete" == this.readyState) try {
                                        Typekit.load()
                                    } catch (e) {}
                                }, r.onload = function() {
                                    try {
                                        Typekit.load()
                                    } catch (e) {}
                                }, r.src = "//use.typekit.net/" + a + ".js", o.appendChild(r)
                            }
                            var l = $(n).find(".page-wrap");
                            if ($("#page").html(l), e.isSingleProject(i.path)) {
                                var c = $(n).find(".nav--project").eq(0);
                                c.insertAfter(".site-header .wrap")
                            }
                            e.doAfterPageLoad(n);
                            var u = e.sanitizeSlug(t);
                            $("[data-js='dynamic-project-stylesheet']").not("[href*='" + u + "']").remove()
                        })
                    })
                }
            })
        } else $(".loading__element").afterTransition(function() {
            $(".site-header .nav--project").remove(), $.ajax({
                url: t
            }).done(function(i) {
                var n = $(i).find(".page-wrap");
                $("#page").html(n), e.isHomePage(t) ? (FLD.RandomImage.onNewPageLoad(), e.doAfterPageLoad(i)) : e.doAfterPageLoad(i);
                var s = e.sanitizeSlug(t);
                $("[data-js='dynamic-project-stylesheet']").not("[href*='" + s + "']").remove()
            })
        })
    }, this.loadMember = function(t) {
        $("html").addClass("show-loading"), setTimeout(function() {
            $("body,html").scrollTop(0), $("#masthead").removeClass("hide-nav")
        }, 175), $(".loading__element").afterTransition(function() {
            $(".site-header .nav--project").remove(), $.ajax({
                url: t
            }).done(function(i) {
                var n = $(i).find(".page-wrap");
                $("#page").html(n), e.addMetaData(i), FLD.PageType.type = FLD.PageType.getType(), FLD.Member.onNewPageLoad();
                var s = e.sanitizeSlug(t);
                $("[data-js='dynamic-project-stylesheet']").not("[href*='" + s + "']").remove()
            })
        })
    }
}

function ScrollHandler() {
    var e = this;
    this.onScreen = new OnScreen, this.revealItems = [], this.getRevealItems = function() {
        return this.onScreen.empty(), [].forEach.call(document.querySelectorAll(".cs__reveal, .js--reveal"), function(t) {
            e.onScreen.addItem(t, {
                screen: {
                    bottom: 100 * parseFloat(t.getAttribute("data-reveal") || .1667) + "%"
                },
                screenEnterClass: "js--show",
                screenLeaveClass: "js--show",
                disableScreenMove: !0
            }), ["data-reveal-toggle", "data-reveal-show", "data-reveal-hide"].forEach(function(e, i) {
                if (e = t.getAttribute(e), null !== e) {
                    var n = $.trim(e),
                        s = /^[>+~]/.test(n) ? t : document.body;
                    $(n || t, s).off("click.reveal-" + i).on("click.reveal-" + i, function(e) {
                        $(t).toggleClass("js--show", 0 === i ? void 0 : 1 === i), e.preventDefault()
                    })
                }
            })
        }), this.onScreen.items
    }, this.updateRevealItesm = function() {}, this.onNewPageLoad = function() {
        this.getRevealItems(), this.onScreen.update()
    }, this.onNewPageLoad(), this.onPageLeave = function() {
        this.onScreen.empty()
    }
}

function Scroll() {
    var e = this;
    e.hasScrolled = !1, this.getScrollTop = function() {
        return FLD.Window.scrollTop()
    }, this.scrollTop = this.getScrollTop(), this.scrollTopV = this.getScrollTop(), this.throttle = $.throttle(navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? 50 : 250, !0, function() {
        this.scrollTop = this.getScrollTop(), this.scrollTopV = this.getScrollTop()
    }), FLD.Window.on("scroll", function() {
        e.hasScrolled || (e.hasScrolled = !0, $("body").addClass("page--has-scrolled")), e.throttle()
    })
}

function updateOnScroll(e) {
    this.scrollTop = e
}

function Flexslider() {
    var e = this;
    this.setUpSliders = function() {
        $(".page--services .content__text").flexslider({
            animation: "fade",
            animationSpeed: 600,
            selector: ".content__text__slides > .content__text__slide",
            slideshow: !1,
            smoothHeight: !0,
            controlNav: !0,
            touch: !1,
            directionNav: !1,
            controlsContainer: ".page--services > .wrap",
            manualControls: ".menu--flexslider li",
            start: function(e) {
                var t = {};
                t.slides = e.slides, t.current = $(t.slides[e.currentSlide]), t.title = t.current.attr("data-slide-title"), t.groups = t.current.attr("data-svgs").split(","), t.svg = $(".svg-services"), $(".content__graphic").removeClass().addClass("content__graphic " + t.title), $(".content__text").addClass("flexslider-active"), FLD.Resize.Recalculate()
            },
            before: function(e) {
                var t = {};
                t.slides = e.slides, t.current = $(t.slides[e.animatingTo]), t.title = t.current.attr("data-slide-title"), t.groups = t.current.attr("data-svgs").split(","), t.svg = $(".svg-services"), $(".content__graphic").removeClass().addClass("content__graphic " + t.title), $(".page--services .content").addClass("animate")
            },
            after: function() {
                $(".page--services .content").removeClass("animate")
            }
        }), $(".services__iphone__copy").flexslider({
            animation: "fade",
            animationSpeed: 750,
            selector: ".services__iphone__copy__slider > div",
            smoothHeight: !0,
            slideshow: !1,
            controlNav: !0,
            touch: !1,
            directionNav: !1,
            controlsContainer: ".services__iphone__progress",
            manualControls: ".services__iphone__controls a",
            start: function(e) {
                var t = {};
                t.slides = e.slides, t.current = $(t.slides[e.currentSlide]), t.phoneSelector = t.current.attr("data-phone"), t.phone = $(t.phoneSelector), t.siblings = t.phone.siblings(), Modernizr.svg && t.siblings.each(function(e, t) {
                    t = $(t), t.attr("class", t.attr("class").replace("js--active", ""))
                }), t.phone.attr("class", t.phone.attr("class") + " js--active"), FLD.Resize.Recalculate()
            },
            before: function(e) {
                var t = {};
                t.slides = e.slides, t.current = $(t.slides[e.animatingTo]), t.phoneSelector = t.current.attr("data-phone"), t.phone = $(t.phoneSelector), t.siblings = t.phone.siblings(), Modernizr.svg && t.siblings.each(function(e, t) {
                    t = $(t), t.attr("class", t.attr("class").replace("js--active", ""))
                }), t.phone.attr("class", t.phone.attr("class") + " js--active")
            }
        }), $(".slideshow--testimonials").flexslider({
            animation: "slide",
            animationSpeed: 750,
            selector: ".slideshow__slides > .slideshow__slide",
            slideshow: !1,
            controlNav: !1,
            touch: !1,
            directionNav: !0,
            smoothHeight: navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) ? !0 : !1,
            start: function() {
                FLD.Resize.Recalculate()
            }
        })
    }, this.onNewPageLoad = function() {
        this.setUpSliders()
    }, $(".page--services").imagesLoaded(function() {
        e.setUpSliders()
    }), $("html").hasClass("ie8") && e.setUpSliders(), $(document).on("click", ".svg--services-phone__screen", function(e) {
        $(".services__iphone__copy").flexslider(parseInt($(this).attr("data-slide"))), e.preventDefault()
    })
}

function NavigationHide() {
    var e = this;
    this.lastScroll = FLD.Scroll.getScrollTop(), this.mouseY = 0, this.mouseEnteredTop = !1, this.direction = "", this.isLoadingBetweenCaseStudy = !1, this.hasShownCarousel = !1, this.hasHiddenMenu = !1, this.hasShownCaseStudyFooter = !1, this.scrollThreshold = "home" === FLD.PageType.type ? 240 : 60, this._onMouseMove = function(e) {
        this.mouseY = e.clientY, this.mouseY < 100 ? this.mouseEnteredTop !== !0 && (this.mouseEnteredTop = !0, FLD.Header.removeClass("hide-nav")) : this.mouseEnteredTop !== !1 && (this.mouseEnteredTop = !1)
    }, this.updateCarouselVisibility = function(e) {
        this.isLoadingBetweenCaseStudy === !0 || Modernizr.touch || e >= FLD.Resize.BodyHeight - 1.1 * FLD.Resize.BrowserHeight
    }, this._onMouseWheel = function(e) {
        var t = FLD.Scroll.getScrollTop();
        t > 0 && (0 > e && t >= this.scrollThreshold && this.hasHiddenMenu === !1 && (FLD.BodyTag.removeClass("carousel-active"), FLD.Header.addClass("hide-nav"), this.hasHiddenMenu = !0), e > 0 && this.hasHiddenMenu === !0 && (FLD.Header.removeClass("hide-nav"), this.hasHiddenMenu = !1), "case-study" == FLD.PageType.type && this.updateCarouselVisibility(t)), t < FLD.Resize.BodyHeight - FLD.Resize.BrowserHeight && this.hasShownCarousel === !0 && (FLD.BodyTag.removeClass("carousel-active"), this.hasShownCarousel = !1)
    }, this._hideTabOnScroll = function() {}, this._showTabOnScroll = function() {}, this._onCaseStudyMouseWheel = function(e) {
        var t = FLD.Scroll.getScrollTop();
        t >= FLD.Resize.BodyHeight - FLD.Resize.BrowserHeight && 0 > e && this.hasShownCarousel === !1 && (this.showCarouselAtEndOfPage(), this.hasShownCarousel = !0)
    }, this._onCaseStudyMouseWheelEnd = function(e) {
        var t = FLD.Scroll.getScrollTop();
        t >= FLD.Resize.BodyHeight - FLD.Resize.BrowserHeight && e > 0 && this.hasShownCarousel === !0 && (this.hideCarouselAtEndOfPage(), this.hasShownCarousel = !1)
    }, this.showCarouselAtEndOfPage = function() {
        FLD.BodyTag.removeClass("js--animate-carousel").addClass("js--show-carousel js-disable-scrolling"), FLD.BodyTag.addClass("carousel-active")
    }, this.hideCarouselAtEndOfPage = function() {
        FLD.BodyTag.removeClass("carousel-active")
    }, this.onMouseMove = $.throttle(250, !1, function(e) {
        this._onMouseMove(e)
    }), this.onMouseEnd = $.debounce(50, !1, function() {
        FLD.Window.scrollTop() < 56 && FLD.Header.removeClass("hide-nav")
    }), this.onMouseWheel = $.throttle(150, !1, function(e) {
        this._onMouseWheel(e)
    }), this.hideTabOnScroll = $.debounce(250, !0, function(e) {
        this._hideTabOnScroll(e)
    }), this.showTabOnScroll = $.debounce(250, !1, function(e) {
        this._showTabOnScroll(e)
    }), this.onCaseStudyMouseWheel = $.debounce(50, !1, function(e) {
        this._onCaseStudyMouseWheel(e)
    }), this.onCaseStudyMouseWheelEnd = $.debounce(50, !0, function(e) {
        this._onCaseStudyMouseWheelEnd(e)
    }), this.touchStart = 0, this.touchLast = 0, this.touchCurrent = 0, this.touchDirection = null, this.hasTouchedToggle = !1, this.getCarousel = function() {
        return $(".carousel-wrap")
    }, this.carousel = this.getCarousel(), this.getCarouselHeight = function() {
        return this.carousel.height()
    }, this.carouselHeight = this.getCarouselHeight(), this.carouselBottom = this.carousel.css("bottom"), this.onNewPageLoad = function() {
        this.hasShownCaseStudyFooter = !1, this.carousel = this.getCarousel(), this.carouselHeight = this.getCarouselHeight(), this.carouselBottom = this.carousel.css("bottom"), this.scrollThreshold = "home" === FLD.PageType.type ? 140 : 60
    }, this.onNewPageLoad(), Modernizr.csstransitions && !Modernizr.touch && ($(document).on("mousewheel", 'body:not(".loading-project")', function(t, i, n, s) {
        FLD.BodyTag.hasClass("js-disable-scrolling") || (e.onMouseWheel(s), e.onMouseEnd(t))
    }), $(document).on("mousewheel", ".single-project", function(t, i, n, s) {
        e.hideTabOnScroll(s), e.showTabOnScroll(s)
    }), $(window).on("mousemove", function(t) {
        e.onMouseMove(t)
    })), $(window).load(function() {
        e.carouselHeight = e.getCarouselHeight()
    }), FLD.Window.on("resize", function() {
        e.carouselHeight = e.getCarouselHeight()
    })
}

function Member() {
    var e = this;
    this.classes = {
        body: "page-type--member",
        nowPlaying: "team__music__now-playing",
        musicProviderPrefix: "team__music__list--",
        searchFailed: "js--search-failed",
        searchSearching: "js--search-searching",
        searchEmpty: "js--search-empty"
    }, this.host = core_team_json_host, this.requests = {
        url: this.host + "wp-json/posts/?type[]=team_member&filter[name]="
    }, this.selectors = {
        lastfmTracks: '[data-js="populate-with-lastfm-tracks"]',
        dribbbleShots: '[data-js="populate-with-dribbble-shots"]',
        instaLocation: "[data-insta-location]",
        instaLikes: "[data-comma-insta]",
        musicProviderButton: '[data-js="add-music-logo"]',
        twitterFeed: '[data-js="populate-with-tweets"]',
        search: '[data-js="search-for-team-member"]',
        searchInput: '[data-js="search-input-for-team-member"]',
        stravaData: '[data-js="populate-with-strava-data"]'
    }, this.svgs = {
        nowPlaying: "now-playing",
        spotify: "spotify-logomark",
        rdio: "rdio-logomark",
        soundcloud: "soundcloud-logomark"
    }, this.apiKeys = {
        lastfm: "6af3607d64acafa7d2cb647eb66614d5",
        instagram: "9a333cd7a22b436e9b6765dc1056e225",
        instagramAccess: "290659090.9a333cd.dee155579f244884b8d829f13bccd353",
        soundcloud: "875ccbfb89340c3cd14f034767f712bc"
    }, this.attributes_prefix = "team_member_", this.defaultTerms = ["title", "slug"], this.customTerms = ["biography", "given_name", "address", "last_fm_username", "office_location", "phone_number", "rdio_or_spotify", "subtitle", "twitter_handle"], this.customTermsFunctions = ["email_address", "dribbble_handle", "facebook_handle", "instagram_handle", "linkedin_handle", "twitter_handle", "stat_1_label", "stat_1_value", "stat_2_label", "stat_2_value", "stat_3_label", "stat_3_value", "stat_4_label", "stat_4_value"], this.booleanTerms = ["show_biography", "show_dribbble_feed", "show_instagram_feed", "show_twitter_feed", "show_music"], this.imageTerms = ["avatar"], this.attributes = {}, this.isMember = function() {
        if ("member" === FLD.PageType.type) {
            var e = FLD.Url.path();
            return e[e.length - 1]
        }
        return !1
    }, this.customAttributePath = function(e) {
        return this.attributes.custom_team_options[this.attributes_prefix + e]
    }, this.getCustomAttribute = function(e) {
        var t = this.customAttributePath(e);
        return t ? t : !1
    }, this.getBooleanAttribute = function(e) {
        var t = parseInt(this.customAttributePath(e), 10);
        return !!t
    }, this.setUpAPIs = function(t) {
        e.dribbble(t.dribbble), e.lastfm({
            username: t.lastfm.username,
            provider: t.lastfm.provider
        }), e.instagram({
            username: t.instagram.username,
            userId: t.instagram.userId,
            tag: t.instagram.tag
        }), e.twitter({
            username: t.twitter.username,
            widgetId: t.twitter.widgetId
        }), e.strava({
            token: t.strava.token,
            number: 1
        })
    }, this.twitter = function(e) {
        var t = this.getBooleanAttribute("show_twitter_feed");
        if (t && e.widgetId) {
            var i = {
                id: e.widgetId,
                domId: "",
                maxTweets: 3,
                showUser: !1,
                customCallback: this.handleTweets,
                showInteraction: !1
            };
            twitterFetcher.fetch(i)
        } else $(".team__twitter").remove()
    }, this.handleTweets = function(t) {
        for (var i = t.length, n = 0, s = ""; i > n;) {
            var a = $("<div/>").html(t[n]),
                o = a.children(".tweet:first").html(),
                r = a.children(".timePosted:first"),
                l = r.html(),
                c = r.children("a").attr("href").split("/")[3],
                u = e.getCustomAttribute("twitter_handle").toLowerCase(),
                d = c.toLowerCase() == u ? "" : 'RT <a href="https://twitter.com/' + c + '">@' + c + "</a>: ";
            s += '<li class="team__twitter__item">', s += l.replace("<a href", '<a class="team__twitter__date" href').replace(/Posted\s(on\s)?/gi, ""), s += '<span class="team__twitter__tweet">' + d + o + "</span>", s += "</li>", n++
        }
        $(e.selectors.twitterFeed).html(s)
    }, this.instagram = function(t) {
        var i = this.getBooleanAttribute("show_instagram_feed");
        if (i && t.userId) {
            var n = e.createTemplate(),
                s = new Instafeed({
                    get: "user",
                    userId: t.userId,
                    clientId: e.apiKeys.instagram,
                    accessToken: e.apiKeys.instagramAccess,
                    template: n,
                    resolution: "standard_resolution",
                    limit: 8,
                    after: function() {
                        e.shortenCaptions(), e.commaNumbers()
                    }
                });
            s.run()
        } else $(".team__instagram").remove()
    }, this.createTemplate = function() {
        var e = '<li class="team__insta__item">';
        return e += '<a class="team__insta__link" href="{{link}}" target="_blank">', e += '<span class="team__insta__image" style="background-image: url({{image}});">', e += '<div class="team__insta__overlay">', e += '<span class="team__insta__image--blur" style="background-image: url({{image}});"></span>', e += '<span class="team__insta__text--subtitle">', e += '<span class="team__insta__icon--like" data-comma-insta>{{likes}}</span> ', e += "</span>", e += '<span class="team__insta__text--subtitle">', e += '<span class="team__insta__icon--location" data-insta-location>{{location}}</span> ', e += "</span>", e += "</div>", e += "</a>", e += "</li>"
    }, this.shortenCaptions = function() {
        $(e.selectors.instaLocation).each(function() {
            var e = $(this);
            $(this).html() || e.remove()
        })
    }, this.commaNumbers = function() {
        $(e.selectors.instaLikes).each(function() {
            var t = $(this);
            t.html(e.numberWithCommas(t.html()))
        })
    }, this.bio = function() {
        var e = this.getBooleanAttribute("show_biography");
        return e === !1 && $(".team__about").remove(), this
    }, this.dribbble = function(t) {
        var i = this.getBooleanAttribute("show_dribbble_feed");
        i && t ? $.jribbble.getShotsByPlayerId(t, function(t) {
            var i = "",
                n = $(e.selectors.dribbbleShots);
            $.each(t.shots, function(t, n) {
                opts = {}, opts.title = n.title, opts.date = n.created_at, opts.image = n.image_url.indexOf(".gif") > -1 ? n.image_400_url || n.image_teaser_url : n.image_url, opts.url = n.url, opts.desc = n.description, opts.views = n.views_count, opts.likes = n.likes_count, i += e.createShot(opts)
            }), n.empty().append(i)
        }, {
            page: 1,
            per_page: 8
        }) : $(".team__dribbble").remove()
    }, this.createShot = function(t) {
        var i = ($("<div/>").html(t.desc).text().trunc(75, !0), '<li class="team__dribbble__item">');
        return i += '<a class="team__dribbble__link" href="' + t.url + '">', i += '<span class="team__dribbble__image" style="background-image: url(' + t.image + ');">', i += '<div class="team__dribbble__overlay">', i += '<span class="team__dribbble__image--blur" style="background-image: url(' + t.image + ');"></span>', i += '<span class="team__dribbble__text--title">' + t.title + "</span>", i += '<span class="team__dribbble__text--data">', i += '<span class="team__dribbble__icon--view">' + e.numberWithCommas(t.views) + "</span> ", i += '<span class="team__dribbble__icon--like">' + e.numberWithCommas(t.likes) + "</span>", i += "</span>", i += "</div>", i += "</a>", i += "</li>"
    }, this.lastfm = function(t) {
        var i = this.getBooleanAttribute("show_music");
        if (i) {
            var n = $(e.selectors.lastfmTracks),
                s = "",
                a = 0;
            "soundcloud" === t.provider ? $.getJSON("https://api.soundcloud.com/resolve.json?url=http://soundcloud.com/" + t.username + "&client_id=" + e.apiKeys.soundcloud, function(i) {
                var o = i.id;
                t.url = i.permalink_url, e.musicProvider(t), $.getJSON("https://api.soundcloud.com/users/" + o + "/favorites?client_id=" + e.apiKeys.soundcloud + "&limit=3", function(t) {
                    var i = t;
                    if (i.length < 3) $(".team__music").remove();
                    else {
                        for (; 3 > a;) {
                            var o = i[a],
                                r = {};
                            r.isPlaying = !1, r.song = o.title, r.album = !1, r.artist = o.user.username || !1, r.cover = o.artwork_url ? o.artwork_url.replace("-large.jpg", "-t300x300.jpg") : !1, r.url = o.permalink_url, s += e.createAlbum(r), a++
                        }
                        n.empty().append(s)
                    }
                })
            }) : (e.musicProvider(t), $.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + t.username + "&api_key=" + e.apiKeys.lastfm + "&format=json&limit=3", function(t) {
                if ("0" !== t.recenttracks.total)
                    for (var i = t.recenttracks.track; 3 > a;) {
                        var o = i[a],
                            r = {};
                        r.isPlaying = o["@attr"] ? o["@attr"].nowplaying : !1, r.song = o.name, r.album = o.album["#text"], r.artist = o.artist["#text"], r.cover = o.image[3]["#text"], r.url = o.url, s += e.createAlbum(r), a++
                    }
                n.empty().append(s)
            }))
        } else $(".team__music").remove()
    }, this.musicProvider = function(t) {
        $(e.selectors.lastfmTracks).addClass(e.classes.musicProviderPrefix + t.provider);
        var i = $(e.selectors.musicProviderButton),
            n = i.html(),
            s = n + ' on <span class="visuallyhidden">' + t.provider.capCase() + "</span>" + e.getSvg(e.svgs[t.provider], ""),
            a = "spotify" === t.provider ? "https://open.spotify.com/user/" : "http://rdio.com/people/";
        a = t.url ? t.url : a + this.getCustomAttribute(t.provider + "_username"), i.attr("href", a).html(s).attr("title", i.text())
    }, this.createAlbum = function(t) {
        var i = t.cover ? ' style="background-image: url(' + t.cover + ');"' : "",
            n = '<li class="team__music__item--' + (t.isPlaying ? "playing" : "not-playing") + '">';
        return n += "<a" + (t.url ? ' href="' + t.url + '"' : "") + ' class="team__music__album">', n += t.isPlaying ? e.getSvg(e.svgs.nowPlaying, e.classes.nowPlaying) : "", n += '<span class="team__music__cover"' + i + "></span>", n += '<div class="team__music__title-card">', n += '<span class="team__music__cover--blur"' + i + "></span>", n += '<span class="team__music__text--title">' + (t.song ? t.song.trunc(45, !0) : "Unknown track") + "</span>", n += '<span class="team__music__text--artist">' + (t.artist ? t.artist.trunc(45, !0) : "Unknown artist") + "</span>", n += t.album ? '<span class="team__music__text--album">' + t.album.trunc(45, !0) + "</span>" : "", n += "</div>", n += "</a>", n += "</li>"
    }, this.strava = function(t) {
        var i = this.getBooleanAttribute("show_strava");
        if (i) {
            var n = t.number;
            $.getJSON("https://www.strava.com/api/v3/athlete/activities?per_page=" + n + "&access_token=" + t.token + "&callback=?", function(t) {
                if (t.length >= n) {
                    var i = $(e.selectors.stravaData),
                        s = "",
                        a = 0;
                    for (maps = []; n > a;) {
                        if (t[a]) {
                            var o = t[a],
                                r = {};
                            r.idx = a, r.date = o.start_date_local || !1, r.title = o.name, r.duration = o.elapsed_time, r.distance = o.distance, r.url = "https://strava.com/activities/" + o.id, r.discipline = o.type, r.extra = {}, r.extra.heart = o.average_heartrate, r.extra.speed = o.average_speed, r.extra.kilojoules = o.kilojoules, r.extra.elevation = o.total_elevation_gain, r.extra.awards = o.achievement_count, null != o.start_latitude ? (r.hasMap = !0, map = {}, map.lat = [o.start_latlng[0], o.end_latlng[0]], map.lng = [o.start_latlng[1], o.end_latlng[1]], map.line = o.map.summary_polyline, maps.push(map)) : (r.hasMap = !1, maps.push(null)), s += e.createActivity(r)
                        }
                        a++
                    }
                    i.empty().append(s), e.stravaMapSetup(maps)
                } else $(".team__strava").remove()
            })
        } else $(".team__strava").remove()
    }, this.createActivity = function(t) {
        var i = t.discipline.toLowerCase(),
            n = "",
            s = t.extra,
            a = "",
            o = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            r = new Date(t.date),
            l = new Date,
            c = e.rationaliseDigit(r.getDate()) + " " + o[r.getMonth()].substring(0, 3) + (r.getFullYear() < l.getFullYear() ? " " + r.getFullYear().toString().substring(2, 4) : ""),
            u = $('[data-json-replace="given_name"]:first').text(),
            d = '<time datetime="' + r + '" class="team__strava__date">' + c + "</time>";
        if (t.distance && (n += e.stravaDataItem("distance", e.getDistance(t.distance), stravaTranslations.metrics.distance)), t.duration && (n += e.stravaDataItem("duration", e.getDuration(t.duration, ""), stravaTranslations.metrics.duration)), s) {
            if (s.speed)
                if ("ride" == i) a += e.stravaDataItem("pace", e.getSpeed(s.speed), stravaTranslations.metrics.speed);
                else {
                    var h = "swim" == i ? {
                        distance: 100,
                        unit: "100m"
                    } : {
                        distance: 1e3,
                        unit: "km"
                    };
                    a += e.stravaDataItem("pace", e.getPace(s.speed, h.distance, h.unit), stravaTranslations.metrics.pace)
                }
            s.heart && (a += e.stravaDataItem("hr", e.getHeartRate(s.heart), stravaTranslations.metrics.hr)), s.elevation && (a += e.stravaDataItem("elevation", e.getElevation(s.elevation), stravaTranslations.metrics.elevation)), s.awards && (a += e.stravaDataItem("awards", s.awards, stravaTranslations.metrics.awards))
        }
        var p = ["%{name}", "%{discipline}", "%{date}"],
            m = [u, stravaTranslations.disciplines[i], d],
            f = '<li class="team__strava__item--' + (t.hasMap ? "" : "no-map--") + i + '">';
        return f += '<a href="' + t.url + '" target="_blank" class="team__strava__overlay" title="Check out ' + u + '\u2019s activity on Strava">', f += '<div class="wrap">', f += '<div class="team__strava__content">', f += '<span class="team__strava__subtitle">' + e.stravaTranslateTitle(stravaTranslations.activity, p, m) + "</span>", f += '<h3 class="team__strava__title">' + t.title + "</h3>", f += n || s ? '<p class="team__strava__data">' + n + a + "</p>" : "", f += "</div>", f += "</div>", f += "</a>", f += t.hasMap ? '<div class="team__strava__map" id="map--' + t.idx + '"></div>' : "", f += "</li>"
    }, this.stravaTranslateTitle = function(e, t, i) {
        return e.replaceArray(t, i)
    }, String.prototype.replaceArray = function(e, t) {
        for (var i = this, n = 0; n < e.length; n++) i = i.replace(e[n], t[n]);
        return i
    }, this.stravaDataItem = function(e, t, i) {
        var n = '<span class="team__strava__data-item--' + e + '">';
        return n += '<span class="team__strava__data-label">' + i.replace("Average", '<abbr title="Average">Avg</abbr>') + '<span class="visuallyhidden">: </span></span>', n += '<span class="team__strava__data-value">' + t + " </span>", n += "</span>"
    }, this.stravaMapSetup = function(t) {
        var i = 0;
        for (ourMaps = []; i <= t.length - 1;) t[i] && e.stravaCreateMap(t[i], i), i++
    }, this.getDuration = function(t, i) {
        var n = t,
            s = Math.floor(n / 3600);
        n -= 3600 * s;
        var a = Math.floor(n / 60);
        if (n -= 60 * a, "hh:mm:ss" == i) c = (s ? s + ":" : "") + e.rationaliseDigit(a) + ":" + e.rationaliseDigit(n);
        else var o = s > 0 ? s + "&#8202;h " : "",
            r = a > 0 || o ? a + "&#8202;m " : "",
            l = n > 0 || r ? n + "&#8202;s" : "",
            c = o + r + l;
        return c
    }, this.getPace = function(t, i, n) {
        return e.getDuration(i / t, "hh:mm:ss") + "&#8202;/" + n
    }, this.getSpeed = function(t) {
        return e.roundToNum(3.6 * t, 2) + "&#8202;kph"
    }, this.getElevation = function(e) {
        return e + "&#8202;m"
    }, this.getHeartRate = function(t) {
        return e.roundToNum(t, 0) + "&#8202;bpm"
    }, this.getDistance = function(t) {
        return e.roundToNum(t / 1e3, 2) + "&#8202;km"
    }, this.rationaliseDigit = function(e) {
        return (10 > e ? "0" : "") + Math.floor(e)
    }, this.roundToNum = function(e, t) {
        return +(Math.round(e + "e+" + t) + "e-" + t)
    }, this.stravaCreateMap = function(t, i) {
        var n = (ourMaps[i], t.lat[0] - (t.lat[0] - t.lat[1]) / 2),
            s = t.lng[0] - (t.lng[0] - t.lng[1]) / 2,
            a = new google.maps.LatLng(n, s),
            o = {
                zoom: 13,
                center: a,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: !1,
                styles: [{
                    featureType: "road.highway",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "transit",
                    elementType: "",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "road.arterial",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    stylers: [{
                        lightness: -80
                    }, {
                        gamma: .89
                    }, {
                        saturation: -100
                    }]
                }],
                disableDefaultUI: !0,
                draggable: !1
            },
            r = google.maps.geometry.encoding.decodePath(t.line),
            l = e.decodeLevels("BB");
        e.thisMap = [], e.thisMap[i] = new google.maps.Map(document.getElementById("map--" + i), o), e.setRegion = [], e.setRegion[i] = new google.maps.Polyline({
            path: r,
            levels: l,
            strokeColor: "#ae0000",
            strokeOpacity: 1,
            strokeWeight: 4,
            map: e.thisMap[i]
        }), e.centerMap(e.setRegion[i], e.thisMap[i]), $(".team__strava").addClass("team__strava--loaded"), $(window).on("resize", $.debounce(100, !1, function() {
            "member" == FLD.PageType.type && $("#map--0").length && e.centerMap(e.setRegion[0], e.thisMap[0])
        }))
    }, this.centerMap = function(e, t) {
        var i = new google.maps.LatLngBounds;
        e.getPath().forEach(function(e) {
            i.extend(e)
        }), t.fitBounds(i)
    }, this.decodeLevels = function(e) {
        for (var t = [], i = 0; i < e.length; ++i) {
            var n = e.charCodeAt(i) - 63;
            t.push(n)
        }
        return t
    }, this.getSvg = function(e, t) {
        var i = document.getElementById(e),
            n = new XMLSerializer,
            s = n.serializeToString(i);
        return s.replace("visuallyhidden", t)
    }, this.numberWithCommas = function(e) {
        var t = e.toString().split(".");
        return t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), t.join(".")
    }, this.checkForDividers = function() {
        $(".team__instagram + .team__dribbble").length && $(".team__instagram").after('<div class="team__divider--instagram-dribbble"></div>')
    }, this.populateField = function(t) {
        var i = $('[data-json-replace="' + t.id + '"]'),
            n = t.custom ? this.getCustomAttribute(t.id) : e.attributes[t.id];
        i.html(n)
    }, this.populate = function() {
        $.each(e.customTerms, function(t, i) {
            e.populateField({
                id: i,
                custom: !0
            })
        }), $.each(e.defaultTerms, function(t, i) {
            e.populateField({
                id: i,
                custom: !1
            })
        }), $("[data-json-replace-custom]").each(function() {
            var t = $(this),
                i = t.attr("data-json-replace-custom");
            if ("email_address" == i) {
                var n = e.getCustomAttribute(i);
                t.attr("href", "mailto:" + n).html(n.replace("@", "<wbr>@"))
            }
            if ("biography" == i) {
                var s = e.getCustomAttribute(i).replace(/\n/g, "").replace(/\r\r/g, "</p><p>");
                t.html(s)
            }
            "twitter_handle" == i && t.attr("href", "https://twitter.com/" + e.getCustomAttribute(i)).attr("title", "Follow " + e.getCustomAttribute("given_name") + " on Twitter")
        }), $("[data-json-replace-social]").each(function() {
            var t = $(this),
                i = t.attr("data-json-replace-social"),
                n = e.getCustomAttribute(i);
            if (n) {
                var s = t.children("a");
                s.attr("href", s.attr("data-link") + n)
            } else t.hide()
        }), $("[data-json-replace-phone]").each(function() {
            var t = $(this),
                i = t.attr("data-json-replace-phone"),
                n = (t.attr("href"), e.getCustomAttribute(i));
            n && (t.attr("href", "tel:" + n.replace(/[\s\-\.]/gi, "")), t.html(n))
        }), $("[data-json-replace-google-map]").each(function() {
            var t = $(this),
                i = t.attr("data-json-replace-google-map"),
                n = e.getCustomAttribute(i),
                s = "";
            switch (n) {
                case "London":
                    s = "https://goo.gl/maps/Dm0XT";
                    break;
                case "New York":
                    s = "https://goo.gl/maps/0Y8nr";
                    break;
                case "Newcastle":
                    s = "https://goo.gl/maps/K5h56";
                    break;
                case "Los Angeles":
                    s = "https://goo.gl/maps/EnUyU";
                    break;
                case "Chicago":
                    s = "https://goo.gl/maps/grX0b"
            }
            t.attr("href", s)
        }), $("[data-json-replace-follow]").each(function() {
            var t = $(this),
                i = t.attr("data-json-replace-follow"),
                n = t.attr("href"),
                s = e.getCustomAttribute(i);
            s && t.attr("href", n + s)
        }), $("[data-json-replace-stat]").each(function() {
            var t = $(this),
                i = "stat_" + t.attr("data-json-replace-stat"),
                n = e.getCustomAttribute(i + "_value") / 10,
                s = e.getCustomAttribute(i + "_label"),
                a = t.children(".team__stats__label");
            t.removeClass().addClass("team__stats__item--" + n), a.text(s)
        }), $("[data-json-replace-img]").each(function() {
            var t = $(this),
                i = t.attr("data-json-replace-img"),
                n = e.getCustomAttribute(i);
            n && t.attr("src", n)
        }), $(".team__service-logo__label span").each(function(e, t) {
            var i = new RegExp("\\w*s$", "gi"),
                n = i.test(t.innerHTML);
            t.innerHTML += 1 == n ? "'" : "'s"
        }), this.bio(), this.setUpAPIs({
            dribbble: this.getCustomAttribute("dribbble_handle"),
            lastfm: {
                username: this.getCustomAttribute("Soundcloud" === this.getCustomAttribute("rdio_or_spotify") ? "soundcloud_username" : "last_fm_username"),
                provider: this.getCustomAttribute("rdio_or_spotify") ? this.getCustomAttribute("rdio_or_spotify").toLowerCase() : !1
            },
            instagram: {
                username: this.getCustomAttribute("instagram_handle"),
                userId: parseInt(this.getCustomAttribute("instagram_user_id"), 10),
                tag: this.getCustomAttribute("instagram_tag_filter")
            },
            twitter: {
                username: this.getCustomAttribute("twitter_handle"),
                widgetId: this.getCustomAttribute("twitter_widget_id")
            },
            strava: {
                token: this.getCustomAttribute("strava_api_token")
            }
        }), this.checkForDividers(), !Modernizr.history || Modernizr.touch || FLD.Browser.IE(10) || ($("html").addClass("hide-loading"), $(".loading__element").afterTransition(function() {
            $("html").removeClass("hide-loading show-loading"), $("body").addClass("page-loaded team-member--loaded"), FLD.History.runOnNewPageLoad(), $("#masthead").css({
                height: 56,
                overflow: "hidden"
            }), $(".main-navigation").removeClass("js--hide-main-nav"), setTimeout(function() {
                $("#masthead").removeAttr("style")
            }, 900)
        }))
    }, this.makeRequest = function() {
        if ("member" === FLD.PageType.type) {
            var t = this.isMember();
            $.ajax({
                type: "GET",
                crossDomain: !0,
                async: !1,
                url: this.requests.url + t + "&_jsonp=?",
                dataType: "jsonp",
                success: function(t) {
                    e.attributes = t[0], e.populate()
                }
            })
        }
    }, this.submitListener = function() {
        $(document).on("submit", e.selectors.search, function(t) {
            t.preventDefault();
            var i = $(this),
                n = $(e.selectors.searchInput),
                s = n.val().replace(/ +(?= )/g, "") || null;
            if (i.removeClass(e.classes.searchFailed + " " + e.classes.searchEmpty + " " + e.classes.searchSearching), s && " " != s) {
                var a = s.replace(/\s+/g, "-").toLowerCase();
                i.addClass(e.classes.searchSearching), $.getJSON(e.requests.url + a + "&_jsonp=?").done(function(t) {
                    e.attributes = t[0], "undefined" != typeof e.attributes ? !Modernizr.history || Modernizr.touch || FLD.Browser.IE(10) ? window.location.href = "/" + e.attributes.slug + "/" : $.address.value("/" + e.attributes.slug + "/") : setTimeout(function() {
                        i.addClass(e.classes.searchEmpty)
                    }, 10)
                })
            } else e.clearSearchField()
        })
    }, this.clearSearchField = function() {
        if ("" === $(e.selectors.searchInput)[0].value) {
            var t = [e.classes.searchFailed, e.classes.searchEmpty, e.classes.searchSearching];
            $(e.selectors.search).removeClass(t.join(" "))
        }
    }, this.debounceClearing = $.debounce(500, function() {
        e.clearSearchField()
    }), this.onNewPageLoad = function() {
        this.submitListener(), this.makeRequest()
    }, this.onNewPageLoad(), $(document).on("keyup", e.selectors.searchInput, e.debounceClearing)
}

function CaseStudy() {
    var e = this;
    this.getRdioUx = function() {
        return {
            wrap: $(".page--rdio-drop .cs__ux"),
            inner: $(".page--rdio-drop .cs__ux__inner"),
            status: null,
            1: $(".ux__row--1"),
            2: $(".ux__row--2"),
            3: $(".ux__row--3"),
            4: $(".ux__row--4"),
            5: $(".ux__row--5")
        }
    }, this.rdioUx = this.getRdioUx(), this.getStartAtSlide = function() {
        return "case-study" == FLD.PageType.type ? $(".page--project").attr("data-index") : 2
    }, this.startAtSlide = this.getStartAtSlide(), this.canClickCarousel = !0, this.setUpCarousel = function() {
        $(".carousel .carousel__wrap").owlCarousel({
            items: 2,
            itemsDesktop: !1,
            itemsDesktopSmall: !1,
            itemsTablet: !1,
            itemsMobile: [649, 1],
            pagination: !1,
            afterInit: function() {
                $(".carousel-wrap").addClass("carousel--ran")
            },
            startDragging: function() {},
            afterAction: function() {}
        })
    }, this.setUpSlideshow = function() {
        $(".cs__slideshow").flexslider({
            animation: "slide",
            animationSpeed: 750,
            selector: ".slideshow__slides > .slideshow__slide",
            slideshow: !1,
            controlNav: !0,
            directionNav: !0,
            start: function() {
                FLD.Resize.Recalculate()
            }
        })
    }, this.dragging = null, this.getLoupes = function() {
        return $(".loupe")
    }, this.loupes = this.getLoupes(), this.setUpUserflow = function() {
        var e = this;
        this.loupes.each(function(t, i) {
            var n = {};
            n.loupe = $(i), n.loupeInner = n.loupe.children(), n.originalLayer = n.loupe.siblings("img"), n.containerElement = n.loupe.parent();
            var s = {};
            s.x = n.containerElement.width() / 6, s.y = n.containerElement.height() - (n.loupe.height() - 200), n.loupe.css({
                left: s.x,
                top: s.y
            });
            var a = (n.loupeInner.width() / 2, 0 - s.x),
                o = 0 - s.y;
            n.bgpx = 2 * a + 130 + "px", n.bgpy = 2 * o + 100 + "px", n.loupeInner.css("background-position", 2 * a + .1083333 * n.containerElement.width() + "px " + (2 * o + .175746924 * n.containerElement.height()) + "px"), n.loupeInner.css("background-size", 2 * parseInt(n.originalLayer.css("width"))), n.loupe.FueledDragging({
                startDragging: function() {
                    e.dragging = !0, n.loupe.removeClass("return-to-position"), $(n.loupe.attr("data-helper")).addClass("js--fade-out")
                },
                dragging: function(t, i) {
                    if (e.dragging) {
                        var s = 0 - t.x,
                            a = 0 - t.y;
                        $('.loupe[data-helper="' + i + '"]').children().css("background-position", 2 * s + .1083333 * n.containerElement.width() + "px " + (2 * a + .175746924 * n.containerElement.height()) + "px")
                    }
                },
                outOfLoupe: function() {
                    e.dragging = !1, n.loupe.addClass("return-to-position"), n.loupe.css({
                        top: s.y,
                        left: s.x
                    }), n.loupeInner.css("background-position", n.bgpx + " " + n.bgpy), $(n.loupe).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                        n.loupe.removeClass("return-to-position")
                    }), setTimeout(function() {
                        $(n.loupe.attr("data-helper")).removeClass("js--fade-out")
                    }, 600)
                },
                endDragging: function() {
                    e.dragging = !1, n.loupe.addClass("return-to-position"), n.loupe.css({
                        top: s.y,
                        left: s.x
                    }), n.loupeInner.css("background-position", n.bgpx + " " + n.bgpy), $(n.loupe).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                        n.loupe.removeClass("return-to-position")
                    }), setTimeout(function() {
                        $(n.loupe.attr("data-helper")).removeClass("js--fade-out")
                    }, 600)
                }
            });
            var r = function(e, t, i) {
                e.loupe.css({
                    top: i,
                    left: t
                }), e.loupeInner.css({
                    "background-size": 2 * parseInt(e.originalLayer.css("width"))
                })
            };
            $(window).on("resize", function() {
                s.x = n.containerElement.width() / 6, s.y = n.containerElement.height() - (n.loupe.height() - 200), r(n, s.x, s.y)
            })
        })
    }, this.getCs = function() {
        return $(".cs")
    }, this.cs = this.getCs(), this.getFooter = function() {
        return $(".cs__footer")
    }, this.footer = this.getFooter(), this.getFooterElements = function() {
        return $(".cs__footer--resize")
    }, this.footerElements = this.getFooterElements(), this.getFooterEnd = function() {
        return $(".cs__footer__end")
    }, this.footerEnd = this.getFooterEnd(), this.getFooterBg = function() {
        return $(".cs__footer__bg")
    }, this.footerBg = this.getFooterBg(), this.getBrandingBg = function() {
        return {
            elem: $(".cs__branding__large--2"),
            bg: $(".cs__branding__large--2 .cs__branding__large__bg")
        }
    }, this.brandingBg = this.getBrandingBg(), this.onScroll = function() {
        if (0 !== this.footer.length) {
            var e = FLD.Window.scrollTop(),
                t = this.footer.offset().top,
                i = -1 * (t - (e + FLD.Resize.BrowserHeight)),
                n = 200,
                s = i / (2 * FLD.Resize.BrowserHeight + FLD.Resize.BrowserHeight) * n;
            if (!Modernizr.touch) {
                if (s > 0 && n > s) {
                    var a = "translate3d(0," + -1 * s + "px,0)";
                    this.footerBg.css({
                        "-webkit-transform": a,
                        "-moz-transform": a,
                        transform: a
                    })
                }
                if (this.brandingBg.elem.length > 0) {
                    var o = this.brandingBg.elem[0].getBoundingClientRect(),
                        r = o.top / FLD.Resize.BrowserHeight,
                        l = 1 - r;
                    1 > r && r > -1 && this.brandingBg.bg.css({
                        "-webkit-transform": "translate(0, " + 12.375 * l + "%)",
                        "-moz-transform": "translate(0, " + 12.375 * l + "%)",
                        transform: "translate(0, " + 12.375 * l + "%)"
                    })
                }
                if (this.rdioUx.wrap.length > 0) {
                    {
                        var c = this.rdioUx.wrap[0].getBoundingClientRect();
                        c.top - FLD.Resize.BrowserHeight, c.bottom - FLD.Resize.BrowserHeight
                    }
                    c.top <= 0 ? "sticky" !== this.rdioUx.status && (this.rdioUx.wrap.addClass("wrap--sticky"), this.rdioUx.status = "sticky") : "not-sticky" !== this.rdioUx.status && (this.rdioUx.wrap.removeClass("wrap--sticky"), this.rdioUx.status = "not-sticky"), c.bottom <= FLD.Resize.BrowserHeight ? "not-sticky-bottom" !== this.rdioUx.status && (this.rdioUx.wrap.removeClass("wrap--sticky").addClass("wrap--remove"), this.rdioUx.status = "not-sticky-bottom") : c.top <= 0 && "sticky-bottom" !== this.rdioUx.status && (this.rdioUx.wrap.addClass("wrap--sticky").removeClass("wrap--remove"), this.rdioUx.status = "sticky-bottom")
                }
                if ("sticky" === this.rdioUx.status || "sticky-bottom" === this.rdioUx.status) {
                    for (var s = c.top / (c.height - FLD.Resize.BrowserHeight), u = -1 * s, d = null, n = .2, h = 1; 5 >= h; h++) u >= n * (h - 1) && n * h > u && d !== h && (d = h), d !== h && $(".js--fixed-" + h).removeAttr("style").css({
                        opacity: 0
                    });
                    if (1 === d) {
                        var p = 5 * (u - 0 * n);
                        $(".js--fixed-1").css({
                            "-webkit-transform": "translate(0," + -75 * p + "%)",
                            "-moz-transform": "translate(0," + -75 * p + "%)",
                            transform: "translate(0," + -75 * p + "%)",
                            opacity: 1 - p
                        })
                    }
                    if (2 === d || 3 === d || 4 === d) {
                        var p = 5 * (u - n * (d - 1)),
                            m = 1 - 2 * Math.abs(p - .5);
                        $(".js--fixed-" + d).css({
                            "-webkit-transform": "translate(0," + (10 + -50 * p) + "%)",
                            "-moz-transform": "translate(0," + (10 + -50 * p) + "%)",
                            transform: "translate(0," + (10 + -50 * p) + "%)",
                            opacity: 3 * m
                        })
                    }
                    if (5 === d) {
                        var p = 5 * (u - n * (d - 1)),
                            m = 1 - 2 * Math.abs(p - .5);
                        $(".js--fixed-" + d).css({
                            "-webkit-transform": "translate(0," + (25 + -25 * p) + "%)",
                            "-moz-transform": "translate(0," + (25 + -25 * p) + "%)",
                            transform: "translate(0," + (25 + -25 * p) + "%)",
                            opacity: 1.75 * p
                        })
                    }
                }
            }
        }
    }, this.canDoNewScrollAnim = function() {
        return isCustom = "true" == $("[data-custom-cs]").attr("data-custom-cs") ? !0 : !1, isCustom
    }, this.canDoNewScrollAnimFlag = this.canDoNewScrollAnim(), this.checkIsAfterlight = function() {
        return $("body").hasClass("projects_afterlight")
    }, this.isAfterlight = this.checkIsAfterlight(), this.checkIsDayo = function() {
        return $("body").hasClass("projects_dayo")
    }, this.isDayo = this.checkIsDayo(), this.getCachedSelectors = function() {
        var e = {
            listener: "[data-plx]",
            exploder: "[data-exploder]",
            parent: "[data-plx-fade-up-parent]",
            sliderWrap: '[data-js="slider-wrap"]',
            preserveEven: '[data-js="preserve-even-height"]',
            hero: '[data-plx-hero="parent"]',
            scrollerParent: "[data-scroller-parent]",
            vSlider: '[data-js="vslider"]',
            uxSingleMover: '[data-js="ux-single-mover"]',
            uxSingleShaker: '[data-js="ux-single-shaker"]',
            dayoDay: '[data-js="dayo-progress-day"]',
            dayoSun: '[data-js="dayo-progress-sun"]',
            dayoRay: '[data-js="dayo-progress-sun-rays"]',
            dayoNight: '[data-js="dayo-progress-night"]',
            dayoMoon: '[data-js="dayo-progress-moon"]',
            dayoStar1: '[data-js="dayo-progress-moon-star-1"]',
            dayoStar2: '[data-js="dayo-progress-moon-star-2"]'
        };
        return {
            listener: $(e.listener),
            exploder: $(e.exploder),
            parent: $(e.parent),
            sliderWrap: $(e.sliderWrap),
            preserveEven: $(e.preserveEven),
            hero: $(e.hero),
            scrollerParent: $(e.scrollerParent),
            vSlider: $(e.vSlider),
            uxSingleMover: $(e.uxSingleMover),
            uxSingleShaker: $(e.uxSingleShaker),
            dayoDay: $(e.dayoDay),
            dayoSun: $(e.dayoSun),
            dayoRay: $(e.dayoRay),
            dayoNight: $(e.dayoNight),
            dayoMoon: $(e.dayoMoon),
            dayoStar1: $(e.dayoStar1),
            dayoStar2: $(e.dayoStar2)
        }
    }, this.cachedSelectors = this.getCachedSelectors(), $("[data-scroller-link]").on("click", function(e) {
        e.preventDefault();
        var t = $(this).attr("data-scroller-link");
        $("html, body").animate({
            scrollTop: $(t).offset().top + "px"
        }, 600)
    }), $("[data-vslider-link]").on("click", function(e) {
        e.preventDefault();
        var t = $(this).attr("data-vslider-link");
        $("html, body").animate({
            scrollTop: Math.round($(t).offset().top)
        }, 600)
    }), this.scrollAnim = function() {
        function t(e) {
            return +(Math.round(e + "e+2") + "e-2")
        }

        function n(e, t) {
            return +(Math.round(e + "e+" + t) + "e-" + t)
        }
        var s = {
                fixed: "cs__app-design__exploder--fixed",
                sliderFixed: "cs__planning--fixed",
                sliderSelected: "cs__slider__item--selected",
                addEvenPixel: "js--preserve-3d-add-pixel"
            },
            a = {
                plxType: "data-plx",
                plxId: "data-plx-id",
                moverPlxId: "data-plx-mover",
                expNum: "data-exploder",
                expId: "data-exploder-id",
                slides: "data-slider",
                current: "data-slide-current",
                slideNum: "data-slide"
            },
            o = !1,
            r = function() {
                var r = $(window).height(),
                    l = $(window).scrollTop(),
                    c = r + l;
                if (e.cachedSelectors.listener.each(function() {
                        var i = $(this).offset().top,
                            s = (c - i) / r * 100,
                            o = $(this).attr(a.plxId),
                            l = $("[" + a.moverPlxId + '="' + o + '"]'),
                            u = $(this).attr(a.plxType),
                            d = t(50 > s ? s / 25 : 2 + (50 - s) / 25),
                            h = (s - 50) / 5;
                        if ("bg-translateY" != u) var p = h * h / 20,
                            p = t(s >= 50 ? -1 * p : p);
                        else var p = n(s / 10 * -1, 2);
                        var m = "translateX" == u || "bg-translateY" == u ? "translate3d(0," + p + "%,0) rotate(0.0001deg)" : "translate3d(" + p + "%,0,0) rotate(0.0001deg)";
                        if ("bg-translateY" != u ? l.css({
                                opacity: e.isDayo && "ux-1" != o && "ux-6" != o ? 1 : d >= 0 ? d : 0,
                                visibility: e.isDayo && "ux-1" != o && "ux-6" != o ? "visible" : d >= 0 ? "visible" : "hidden",
                                "-ms-transform": m,
                                "-webkit-transform": m,
                                transform: m
                            }) : -2 * p >= -1 && 22 >= -1 * p && l.css({
                                "-ms-transform": m,
                                "-webkit-transform": m,
                                transform: m
                            }), e.isDayo)
                            for (var f = 1, g = s / 25; 4 >= f;) {
                                var v = g - f / 2 + 1;
                                l.children("img:nth-child(" + f + ")").css({
                                    opacity: 7 > g ? v : 1 + (7 - g)
                                }), f++
                            }
                        if (d > .5) {
                            var w = l.closest("[data-plx-id]").data("plx-id");
                            $('[data-plx-itemid="' + w + '"]').addClass("cs__scroller-nav__link--selected").siblings().removeClass("cs__scroller-nav__link--selected")
                        }
                    }), e.cachedSelectors.uxSingleMover.each(function() {
                        var t = $(this).offset().top,
                            i = ($(this).height(), c - t),
                            n = "translateY(" + i / 20 + "px)",
                            s = 1.5 - i / 1500;
                        e.cachedSelectors.uxSingleShaker.css({
                            "-ms-transform": n,
                            "-webkit-transform": n,
                            transform: n,
                            opacity: s
                        })
                    }), e.isDayo) {
                    var u = $(".cs--dayo__ux__phones"),
                        d = $(".cs--dayo__ux__phones-wrap"),
                        h = u.offset().top,
                        p = (c - h) / r * 100,
                        m = "translate3d(0, " + p / -5 + "%, 0)";
                    d.css({
                        "-webkit-transform": m,
                        transform: m
                    })
                }
                e.cachedSelectors.exploder.each(function() {
                    var t = e.isAfterlight ? 4 : 1,
                        o = $(this).offset().top,
                        l = $(this).height(),
                        u = c - l / t - o;
                    u >= 0 ? $(this).addClass(s.fixed) : $(this).removeClass(s.fixed);
                    var d = $(this).attr(a.expNum);
                    for (i = 0; i < d; i++)
                        if (e.isAfterlight) {
                            var h, p = null;
                            p = 0 == i || i == d - 1 ? u * (d - 2.5) : u * (d - 3.5), p = 0 >= p ? 0 : p, h = 0 == i || 1 == i ? "translate3d(-" + n(p / 3, 3) + "px,0,0)" : "translate3d(" + n(p / 3, 3) + "px,0,0)", r + 400 > u && $("[" + a.expId + '="' + (i + 1) + '"]').css({
                                "-webkit-transform": h,
                                transform: h
                            })
                        } else {
                            var p = u * (d - i),
                                p = 0 >= p ? 0 : p,
                                h = "translate3d(0,-" + n(p / 3, 3) + "px,0)";
                            r + 400 > u && $("[" + a.expId + '="' + (i + 1) + '"]').css({
                                "-webkit-transform": h,
                                transform: h
                            })
                        }
                }), e.cachedSelectors.parent.each(function() {
                    var e = $(this).offset().top,
                        t = ($(this).height(), c - e),
                        i = $(this).attr("data-plx-fade-up-parent"),
                        s = "translate3d(0, " + -1 * t + "px, 0)",
                        a = (t - 600) / 150;
                    $('[data-plx-fade-up-text="' + i + '"]').css({
                        "-webkit-transform": s,
                        transform: s,
                        opacity: n(a, 3)
                    });
                    var s = "translate3d(0, " + -1 * (t - r) * 1.3 + "px, 0)";
                    $('[data-plx-fade-up-phone="' + i + '"]').css({
                        "-webkit-transform": s,
                        transform: s
                    })
                }), e.cachedSelectors.hero.each(function() {
                    var e = "translate3d(0, " + -1 * l / 2 + "px, 0)";
                    $('[data-plx-hero="mover"]').css({
                        "-webkit-transform": e,
                        transform: e
                    })
                }), scrollerFirstTop = 0, e.cachedSelectors.scrollerParent.each(function() {
                    var e = $(this).offset().top,
                        t = $(this).height(),
                        i = c - e - t,
                        s = $(this).attr("data-scroller-parent"),
                        a = n(i / 250, 3);
                    if (1 == s) {
                        scrollerFirstTop = i;
                        var a = 1
                    }
                    var o = "translate3d(0, " + n((-1 * scrollerFirstTop + r + 300) / 8, 0) + "px, 0)";
                    $("[data-scroller-child='" + $(this).attr("data-scroller-parent") + "']").css({
                        opacity: a,
                        "-webkit-transform": o,
                        transform: o,
                        visibility: a >= 0 ? "visible" : "hidden"
                    });
                    var u = n(l - e, 0) - 0;
                    u >= -300 && 300 > u && ($(".cs__scroller-nav__link--selected").removeClass("cs__scroller-nav__link--selected"), $('[data-scroller-link="#scroller-' + s + '"]').addClass("cs__scroller-nav__link--selected"))
                });
                var f = 750,
                    g = 5,
                    v = 240;
                e.cachedSelectors.preserveEven.each(function() {
                    $(this).height() % 2 == 0 ? $(this).removeClass(s.addEvenPixel) : $(this).addClass(s.addEvenPixel)
                }), e.cachedSelectors.sliderWrap.each(function() {
                    var e = $(this).offset().top,
                        t = $(this).height(),
                        i = l - e;
                    sBottomOffset = c - t - e, i >= 0 ? $(this).addClass(s.sliderFixed) : $(this).removeClass(s.sliderFixed);
                    var a = (i + 150) / 200,
                        o = i > 0 ? i / 3.25 * -1 : i / 2 * -1;
                    $("[data-slide]").each(function() {
                        var e = parseInt($(this).attr("data-slide")),
                            e = e - 1,
                            t = (i - e * f) / 100,
                            t = e + 1 == 1 && f - 100 >= i ? 1 : t,
                            t = i >= f * (e + 1) - 300 && e + 1 != g ? f / 100 - t : t;
                        $('[data-slide="' + (e + 1) + '"] .cs__slider__fade').css("opacity", n(t, 2)), $('[data-slide="' + (e + 1) + '"] .cs__planning__phone--selected').css("opacity", n(t + .5, 2));
                        var s = n(1 + t / 20, 3),
                            s = s >= 1 ? 1 : .8 >= s ? .8 : s;
                        $('[data-slide="' + (e + 1) + '"] img').css("transform", "scale(" + s + "," + s + ")")
                    });
                    var r = (g - 1) * v,
                        u = "translate3d(" + o + "px,0,0)",
                        u = -1 * o >= r ? r : u;
                    $(".cs__planning__phone").css({
                        "-webkit-transform": u,
                        transform: u,
                        opacity: a
                    });
                    var u = "translate3d(0," + n(-1 * (sBottomOffset > 0 ? sBottomOffset : 0), 2) + "px,0)";
                    $(".cs__slider__wrap").css({
                        "-webkit-transform": u,
                        transform: u
                    })
                }), e.cachedSelectors.vSlider.each(function(e, t) {
                    var i = $(t),
                        s = i.data("vslider-out"),
                        a = t.getBoundingClientRect(),
                        o = window.innerHeight,
                        r = "cs__vslider--fixed",
                        l = "cs__vslider__item--selected",
                        c = "cs__vslider__button--selected",
                        u = "cs__vslider--first-selected",
                        d = "cs__vslider--selected",
                        h = "cs__vslider--last-selected",
                        p = (o - a.top) / o,
                        m = Math.round(p),
                        f = i.find(".cs__vslider__button").eq(m - 1),
                        g = i.find(".cs__vslider__item"),
                        v = g.eq(m - 1),
                        w = g.length;
                    v.addClass(l).siblings("." + l).removeClass(l), f.addClass(c).siblings("." + c).removeClass(c), i.toggleClass(d, v.length > 0), 1 === m ? i.addClass(u).removeClass(h) : m === w ? i.addClass(h).removeClass(u) : i.removeClass(h).removeClass(u), g.each(function(e, t) {
                        var s, a = 0,
                            r = i.data("vslider-move");
                        "together" === r ? a = -8 * p : "none" !== r && (s = t.getBoundingClientRect(), a = 5 * Math.max(-1, Math.min(1, n(s.top / o, 2))));
                        var l = $(t).find(".cs__vslider__inner");
                        $.each(["-webkit-", "-moz-", "-ms-", "-o-", ""], function(e, t) {
                            l.css(t + "transform", "translate3d(0," + a + "vh, 0)")
                        })
                    }), i.toggleClass(r, a.top <= 0 && a.bottom > ("clip" === s ? 0 : o))
                }), e.dayoFadeScrollText = function() {
                    $('[data-js="dayo-screen-text"]').each(function() {
                        var e = $(window).height(),
                            t = e / 2,
                            i = $(this)[0].getBoundingClientRect().top,
                            n = t > i ? (i - 200) / 100 : (e - i - e / 5) / 400;
                        $(this).children("div").css({
                            opacity: n
                        })
                    })
                }, e.dayoOffsetDayNight = function() {
                    var t = $('[data-js="dayo-offset-day-night-mover"]'),
                        i = $('[data-js="dayo-offset-day-night-first-screen"]'),
                        n = $(window).height(),
                        s = (n - 568) / 2,
                        a = t[0].getBoundingClientRect().top - s;
                    (a > 0 && e.dayoDayNightFixed || 0 >= a && !e.dayoDayNightFixed || "unset" == e.dayoDayNightFixed) && (e.dayoDayNightFixed = a > 0 ? !1 : !0, i.css({
                        opacity: a > 0 ? 1 : 0
                    }))
                }, e.dayoProgress = function(t, i, n) {
                    var s = t.height(),
                        a = t[0].getBoundingClientRect().top - 200,
                        o = a / s * -100,
                        r = 9 * (o - 50),
                        l = -50 * Math.sin(1.8 * o * (Math.PI / 180)) + 15,
                        c = 50 >= r ? (o - 10) / 10 : (100 - (o + 10)) / 10,
                        u = "translate3d(" + r + "%, " + l + "%, 0)";
                    if (i.css({
                            "-webkit-transform": u,
                            transform: u,
                            opacity: c
                        }), "day" == n) {
                        var d = c / 4 + .5,
                            h = "scale(" + (d > 1 ? 1 : d) + ") rotate(" + r / 12.5 + "deg)";
                        e.cachedSelectors.dayoRay.css({
                            "-webkit-transform": h,
                            transform: h
                        })
                    }
                    if ("night" == n) {
                        var p = "rotate(" + r / -5 + "deg)",
                            m = 50 >= r ? (o - 30) / 10 : (100 - (o + 15)) / 10;
                        e.cachedSelectors.dayoStar1.css({
                            "-webkit-transform": p,
                            transform: p,
                            opacity: m
                        });
                        var f = "rotate(" + r / 2.5 + "deg)",
                            g = 50 >= r ? (o - 15) / 10 : (100 - (o + 30)) / 10;
                        e.cachedSelectors.dayoStar2.css({
                            "-webkit-transform": f,
                            transform: f,
                            opacity: g
                        })
                    }
                }, e.isDayo && (e.dayoProgress(e.cachedSelectors.dayoDay, e.cachedSelectors.dayoSun, "day"), e.dayoProgress(e.cachedSelectors.dayoNight, e.cachedSelectors.dayoMoon, "night"), !FLD.Browser.IE11() && !FLD.Browser.IE10() && $(window).width() >= 768 && (e.dayoFadeScrollText(), e.dayoOffsetDayNight())), o = !1
            },
            l = function() {
                o || e.canDoNewScrollAnimFlag && (requestAnimFrame(r), o = !0)
            },
            c = function() {
                l()
            };
        c(), window.onscroll = c
    }, Modernizr.touch || this.scrollAnim(), this.dayoSetup = function() {
        this.dayoDayNightFixed = "unset"
    }, this.onNewPageLoad = function() {
        "case-study" == FLD.PageType.type && (this.startAtSlide = this.getStartAtSlide(), this.cs = this.getCs(), this.footer = this.getFooter(), this.footerElements = this.getFooterElements(), this.footerBg = this.getFooterBg(), this.footerEnd = this.getFooterEnd(), this.loupes = this.getLoupes(), this.rdioUx = this.getRdioUx(), this.brandingBg = this.getBrandingBg(), this.canDoNewScrollAnimFlag = this.canDoNewScrollAnim(), this.cachedSelectors = this.getCachedSelectors(), this.setUpCarousel(), e.setUpSlideshow(), e.setUpUserflow(), Modernizr.touch || this.scrollAnim(), $("body").addClass("js--project-loaded"), $(".cs__hero").imagesLoaded(function() {
            $("body").addClass("js--project-hero-loaded")
        }), this.isAfterlight = this.checkIsAfterlight(), this.isDayo = this.checkIsDayo())
    }, this.onNewPageLoad(), this.onPageLeave = function() {
        this.startAtSlide = this.cs = this.footer = this.footerElements = this.footerBg = this.footerEnd = this.brandingBg = this.loupes = null
    }, $(document).on("click", ".toggle--carousel", function() {
        FLD.BodyTag.toggleClass("carousel-active")
    }), $(window).on("scroll", function() {
        "case-study" == FLD.PageType.type && e.onScroll()
    }), $(document).on("click", ".cs__explode__phone", function() {
        $(this).toggleClass("js--show")
    })
}

function Contact() {
    var e = this;
    this.getRequiredFields = function() {
        return $(".form--contact input[required]")
    }, this.requiredFields = this.getRequiredFields(), this.getSubmitButton = function() {
        return $(".form--contact button")
    }, this.submitButton = this.getSubmitButton(), this.canSubmitForm = !0, this.typeOfProjectValue = "", this.approxBudgetValue = "", this.checkRequired = function(e) {
        var t = this;
        this.canSubmitForm = !0, this.requiredFields.each(function(e, i) {
            "" === i.value && (t.canSubmitForm = !1), "email" == $(i).attr("type") && FLD.Contact._validateEmail(i.value) === !1 && (t.canSubmitForm = !1)
        });
        var i = $(e);
        if ("text" === i.attr("type")) {
            var n = i.attr("required");
            "" === e.value && "undefined" != typeof n && n !== !1 ? i.addClass("required--error") : i.removeClass("required--error")
        }
        "email" == $(e).attr("type") && (FLD.Contact._validateEmail(e.value) === !1 || "" == e.value ? i.addClass("required--error") : i.removeClass("required--error"));
        var s = !1;
        $('input[name="form__field--type"]').each(function(e, t) {
            t.checked && (s = !0)
        }), document.getElementById("form__field--type__other").checked && "" != document.getElementById("form__field--type__other--text").value && (s = !0);
        var a = !1;
        $('input[name="form__field--budget"]').each(function(e, t) {
            t.checked && (a = !0)
        }), "" != document.getElementById("form__field--budget__other--text").value && (a = !0), s && a || (this.canSubmitForm = !1), s ? $(".select--type").removeClass("required--error") : $(".select--type").hasClass("js--select-active") && $(".select--type").addClass("required--error"), a ? $(".select--budget").removeClass("required--error") : $(".select--budget").hasClass("js--select-active") && $(".select--budget").addClass("required--error"), this.canSubmitForm === !1 ? this.submitButton.attr("disabled", "disabled").addClass("btn--diamond--disabled") : this.submitButton.removeAttr("disabled").removeClass("btn--diamond--disabled")
    }, this.polyfill = function() {
        Modernizr.input.placeholder === !1 && $("[placeholder]").each(function(e, t) {
            t = $(t);
            var i = t.attr("placeholder");
            t.attr("value", i)
        })
    }, this.getCookieString = function() {
        var e = getGoogleAnalyticsData(),
            t = "Google Analytics Information: --------\r\n";
        return t += "Campaign Source: " + e.source + "\r\n", t += "Campaign Name: " + e.campaign + "\r\n", t += "Campaign Medium: " + e.medium + "\r\n", t += "Campaign Term: " + e.term + "\r\n", t += "Campaign Content: " + e.content + "\r\n", e.time_init && (t += "First Visit: " + e.time_init + "\r\n", t += "Previous Visit: " + e.time_begin + "\r\n", t += "Current Visit: " + e.time_begin_cur + "\r\n", t += "Times Visited: " + e.times_visited + "\r\n"), t
    }, this.cookieString = this.getCookieString(), this.addCookies = function() {
        "contact" == FLD.PageType.type && $("#form__field--referral").val(this.cookieString)
    }, this._validateEmail = function(e) {
        var t = /\S+@\S+\.\S+/;
        return t.test(e)
    }, this.changePhone = function() {
        var e = FLD.Url.params();
        e.gclid && $.cookie("paid-ad", "yep"), $.cookie("paid-ad") && $(".vcard--nyc .tel").html("+1-929-322-4387")
    }, this.changePhone(), this.onNewPageLoad = function() {
        "contact" == FLD.PageType.type && (this.polyfill(), this.cookieString = this.getCookieString(), this.addCookies(), this.requiredFields = this.getRequiredFields(), this.submitButton = this.getSubmitButton(), this.changePhone()), $("html").removeClass("js--rfp-scroll")
    }, this.checkIfValidNumberKey = function(e) {
        return e >= 48 && 57 >= e || 8 == e || 13 == e || e >= 96 && 105 >= e || 75 == e
    }, $(document).on("keydown", '[name="form__field--budget-text"]', function(t) {
        var i = t.keyCode ? t.keyCode : t.charCode;
        return e.checkIfValidNumberKey(i) ? void 0 : !1
    }), $(document).on("keyup", '[name="form__field--budget-text"]', function(t) {
        var i = this;
        e.debouncePrefix(i, t)
    }), $(document).on("keyup", '[name="form__field--budget-text"]', function(t) {
        var i = this;
        e.debounceSuffix(i, t)
    }), this.debounceSuffix = $.debounce(250, function(t, i) {
        var n = i.keyCode ? i.keyCode : i.charCode;
        return e.checkIfValidNumberKey(n) ? void e.addPrefixSuffix(t, i).updateBudgetSpan(t) : !1
    }), this.debouncePrefix = $.debounce(125, !1, function(t, i) {
        var n = i.keyCode ? i.keyCode : i.charCode;
        return e.checkIfValidNumberKey(n) ? void e.removeSuffix(t) : !1
    }), this.removeSuffix = function(e) {
        var t = e.value,
            i = {
                prefix: /^\$/,
                suffix: /^\$[\d\w]+k$/
            };
        i.prefix.test(t) === !1 && (e.value = "$" + e.value), i.suffix.test(t) === !0 && (e.value = e.value.replace(/k$/gi, ""))
    }, this.addPrefixSuffix = function(e) {
        var t = e.value;
        return t.length > 0 && "$" !== t && (e.value = e.value.replace(/k(?=.*k)/gi, "")), this
    }, this.updateBudgetSpan = function(e) {
        return $(".select--budget > div > span")[0].innerHTML = e.value || "&nbsp;", $(".select--budget .option--other label > span")[0].innerHTML = e.value || "&nbsp;", this.approxBudgetValue = $(".select--budget .option--other label > span")[0].innerHTML.replace("&nbsp;", ""), this
    }
}

function Chimp() {
    var e = this;
    this.fnames = new Array, this.fnames[0] = "EMAIL", this.fnames[1] = "FNAME", this.fnames[2] = "LNAME", this.ftypes = new Array, this.ftypes[0] = "email", this.ftypes[1] = "text", this.ftypes[2] = "text", this.err_style = "#mc_embed_signup input.mce_inline_error{border-color:#6B0505;} #mc_embed_signup div.mce_inline_error{margin: 0 0 1em 0; padding: 5px 10px; background-color:#6B0505; font-weight: bold; z-index: 1; color:#fff;}", this.head = document.getElementsByTagName("head")[0], this.style = document.createElement("style"), this.mce_preload_checks = 0, this.setStyle = function() {
        this.style.type = "text/css", this.style.styleSheet ? this.style.styleSheet.cssText = this.err_style : this.style.appendChild(document.createTextNode(this.err_style)), this.head.appendChild(e.style), setTimeout(function() {
            e.mce_preload_check()
        }, 250)
    }, this.mce_preload_check = function() {
        if (!(this.mce_preload_checks > 40)) {
            this.mce_preload_checks++;
            var t = document.createElement("script");
            t.type = "text/javascript", t.src = "http://downloads.mailchimp.com/js/jquery.form-n-validate.js", this.head.appendChild(t);
            try {
                {
                    jQuery("#fake-form").validate({})
                }
            } catch (i) {
                return void setTimeout(function() {
                    e.mce_preload_check()
                }, 250)
            }
            this.mce_init_form()
        }
    }, this.mce_init_form = function() {
        var e = this;
        jQuery(document).ready(function(t) {
            t.support.cors = !0, t("#mc-embedded-subscribe-form").ajaxChimp({
                language: "en",
                callback: e.mce_success_cb
            })
        })
    }, this.addThanksMessage = function() {
        var e = Modernizr.touch ? "Tap" : "Click",
            t = '<div class="block block--red block--thank-you" data-js="close-thank-you-message"><div class="block__inner"><h2 class="block__title" data-copy="Thank You!">Thank You!</h2><p class="block__copy">We have sent you a confirmation email.</p><p class="block__copy block__copy--small">' + e + " anywhere to close.</p></div></div>";
        $("body").append(t), setTimeout(function() {
            $("body").addClass("show-thank-you")
        }, 50)
    }, this.mce_success_cb = function(t) {
        if ($("#mce-success-response").hide(), $("#mce-error-response").hide(), "success" == t.result) e.addThanksMessage(), $("#mc-embedded-subscribe-form").each(function() {
            this.reset()
        });
        else {
            var n, s = -1;
            try {
                var a = t.msg.split(" - ", 2);
                void 0 == a[1] ? n = t.msg : (i = parseInt(a[0]), i.toString() == a[0] ? (s = a[0], n = a[1]) : (s = -1, n = t.msg))
            } catch (o) {
                s = -1, n = t.msg
            }
            try {
                if (-1 == s) $("#mce-" + t.result + "-response").show(), $("#mce-" + t.result + "-response").html(n);
                else {
                    err_id = "mce_tmp_error_msg", html = '<span id="' + err_id + '" style="' + e.err_style + '"> ' + n + "</span>";
                    var r = "#mc_embed_signup",
                        l = $(r);
                    "address" == e.ftypes[s] ? (r = "#mce-" + e.fnames[s] + "-addr1", l = $(r).parent().parent().get(0)) : "date" == ftypes[s] ? (r = "#mce-" + e.fnames[s] + "-month", l = $(r).parent().parent().get(0)) : (r = "#mce-" + e.fnames[s], l = $().parent(r).get(0)), l ? ($(l).append(html), $(r).focus()) : ($("#mce-" + t.result + "-response").show(), $("#mce-" + t.result + "-response").html(n))
                }
            } catch (o) {
                $("#mce-" + t.result + "-response").show(), $("#mce-" + t.result + "-response").html(n)
            }
        }
    }, this.init = function() {
        "contact" === FLD.PageType.type && this.setStyle()
    }, this.onNewPageLoad = function() {
        this.init()
    }, this.init()
}

function Jobs() {}

function NavigationHome() {
    var e = this;
    this.classes = {
        fixed: "js--fixed-home-header"
    }, this.flag = {
        fixed: null
    }, this.scrollPos = 80, this.header = $(".site-header"), this.onNewPageLoad = function() {
        "home" === FLD.PageType.type && (this.header = $(".site-header"))
    }, this.checkFixed = function() {
        var e = $(window).scrollTop();
        e >= this.scrollPos ? this.flag.fixed !== !0 && (this.header.addClass(this.classes.fixed), this.flag.fixed = !0) : this.flag.fixed !== !1 && (this.header.removeClass(this.classes.fixed), this.flag.fixed = !1)
    }, e.checkFixed(), $(window).on("scroll", function() {
        e.checkFixed()
    })
}

function HomeProjects() {
    var e = this;
    this.numberOfProjects = 5, this.getProjects = function() {
        for (var e = [], t = 0; t < this.numberOfProjects; t++) e.push($('[data-home-project="' + (t + 1) + '"]'));
        return e
    }, this.projects = this.getProjects(), this.getFlags = function() {
        for (var e = [], t = 0; t < this.numberOfProjects; t++) e.push(null);
        return e
    }, this.flags = this.getFlags(), this.getContent = function() {
        for (var e = [], t = 0; t < this.numberOfProjects; t++) e.push($('[data-home-project="' + (t + 1) + '"]').find(".home-project__content"));
        return e
    }, this.content = this.getContent(), this.checkForOverlap = function(t) {
        if ("home" === FLD.PageType.type) {
            var i = this.projects[t],
                n = i[0].getBoundingClientRect(),
                s = this.flags[t];
            n.top <= FLD.Resize.BrowserHeight / 2 && n.bottom > FLD.Resize.BrowserHeight / 2 ? "active" !== s && (this.changePaginationLink(t + 1), s = "active") : "inactive" !== s && (s = "inactive");
            var a = e.content[t],
                o = a[0].getBoundingClientRect(),
                r = .5 * FLD.Resize.BrowserHeight - o.height / 2,
                l = .15 * FLD.Resize.BrowserHeight - o.height / 2,
                c = o.top,
                u = (c - r) / (l - r);
            u >= 0 && 1 >= u ? a.css({
                opacity: 1 - u
            }) : 0 > u ? a.css({
                opacity: 1
            }) : u > 1 && a.css({
                opacity: 0
            })
        }
    }, this.onNewPageLoad = function() {
        "home" === FLD.PageType.type && (this.projects = this.getProjects(), this.flags = this.getFlags(), this.content = this.getContent(), this.init())
    }, this.goToProject = function(e, t) {
        if ("home" === FLD.PageType.type) {
            var i = t.getAttribute("data-number"),
                n = $('[data-home-project="' + i + '"]'),
                s = n.find(".wrap");
            return $("html, body").animate({
                scrollTop: s.offset().top - FLD.Resize.BrowserHeight / 2 + s.outerHeight() / 2
            }, 500), $(".nav--home-projects .js--active").removeClass("js--active"), $(t).addClass("js--active"), e.preventDefault()
        }
    }, this.changePaginationLink = function(e) {
        $(".nav--home-projects .js--active").removeClass("js--active"), $(".nav--home-projects a").eq(e - 1).addClass("js--active")
    }, this.init = function() {
        for (var t = 0; t <= this.numberOfProjects - 1; t++) e.checkForOverlap(t)
    }, this.animate = null, this.startAnimation = function() {
        this.animate = window.requestAnimationFrame(e.startAnimation), e.init()
    }, this.cancelAnimation = function() {
        window.cancelAnimationFrame(e.animate)
    }, this.init(), Modernizr.touch || ($(window).on("scroll", FLD.Throttle.debounce(function() {
        e.startAnimation()
    }, 200, !0)), $(window).on("scroll", FLD.Throttle.debounce(function() {
        e.cancelAnimation()
    }, 200, !1))), $(document).on("click", '[data-js="scroll-to-home-project"]', function(t) {
        e.goToProject(t, this)
    })
}

function ImageScroll() {}

function Slideshow() {
    this.init = function() {
        this.slideshow = $(".slideshow"), this.slideshow.flexslider({
            selector: ".slides > .slide",
            directionNav: !1,
            controlNav: !0
        })
    }, this.init(), this.onNewPageLoad = function() {
        this.init()
    }
}

function HomepageMousewheel() {
    var e = this;
    this.title = {
        element: $(".page--homepage .content--hero .content__title"),
        flag: null
    }, this.hero = $(".page--homepage .content--hero .wrap__center"), this.headerScroll = function() {
        var e = FLD.Window.scrollTop();
        Modernizr.touch || ((FLD.Resize.BrowserHeight - e) / FLD.Resize.BrowserHeight > 0 && this.hero.css({
            "-webkit-transform": "translate3d(0," + e / 4 + "px, 0)",
            "-moz-transform": "translate3d(0," + e / 4 + "px,0)",
            transform: "translate3d(0," + e / 4 + "px,0)",
            opacity: (FLD.Resize.BrowserHeight - e) / FLD.Resize.BrowserHeight
        }), this.title.element[0].getBoundingClientRect().bottom <= 0 ? "show-emblem" !== this.title.flag && (FLD.Header.addClass("js--show-emblem"), this.title.flag = "show-emblem") : "hide-emblem" !== this.title.flag && (FLD.Header.removeClass("js--show-emblem"), this.title.flag = "hide-emblem"))
    }, this.onNewPageLoad = function() {
        "home" === FLD.PageType.type && (this.hero = $(".page--homepage .content--hero .wrap__center"), this.title = {
            element: $(".page--homepage .content--hero .content__title"),
            flag: null
        })
    }, $(window).on("scroll", function() {
        "home" === FLD.PageType.type && e.headerScroll()
    }), $(document).on("click", ".page--homepage__scroll", function(e) {
        $("html, body").animate({
            scrollTop: $(".block--site-intro").offset().top
        }, 750, "easeInOutQuart"), e.preventDefault()
    }), $(document).on("click", ".page--homepage .btn--rotate", function() {
        try {
            _gaq.push(["_trackEvent", "Call To Action", "Get in Touch", "Contact from Homepage"])
        } catch (e) {}
    })
}

function AboutScroll() {
    var e = this;
    this.canHaltScrolling = !1, this.getImageGrid = function() {
        return $(".image-grid")
    }, this.imageGrid = this.getImageGrid(), this.getHeader = function() {
        return $(".content--hero .wrap")
    }, this.header = this.getHeader(), this.hasHiddenCollective = !1, this.getCollective = function() {
        return $(".block--collective")
    }, this.collective = this.getCollective(), this.getCollectiveBg = function() {
        return $(".block--collective .block__bg")
    }, this.collectiveBg = this.getCollectiveBg(), this.getCollectiveHeight = function() {
        return this.collective.outerHeight()
    }, this.collectiveHeight = this.getCollectiveHeight(), this.hasHiddenAwards = null, this.getAwards = function() {
        return $(".block--awards")
    }, this.awards = this.getAwards(), this.getAwardsBg = function() {
        return $(".block--awards .block__bg")
    }, this.awardsBg = this.getAwardsBg(), this.getAwardsHeight = function() {
        return this.awards.outerHeight()
    }, this.awardsHeight = this.getAwardsHeight(), this._onScroll = function() {
        "about" === FLD.PageType.type && this.imageGrid.each(function(e, t) {
            t = $(t);
            var i = t.offset().top;
            i - FLD.Resize.BrowserHeight / 1.1 < FLD.Scroll.scrollTop && t.addClass("js--image-grid-show")
        })
    }, this.onScroll = $.throttle(250, !1, function() {
        this._onScroll()
    }), this.headerScroll = function() {
        if ("about" === FLD.PageType.type) {
            var e = FLD.Window.scrollTop();
            Modernizr.touch || (FLD.Resize.BrowserHeight - e) / FLD.Resize.BrowserHeight > 0 && this.header.css({
                "-webkit-transform": "translate3d(0," + e / 4 + "px, 0)",
                "-moz-transform": "translate3d(0," + e / 4 + "px,0)",
                transform: "translate3d(0," + e / 4 + "px,0)",
                opacity: (FLD.Resize.BrowserHeight - e) / FLD.Resize.BrowserHeight
            })
        }
    }, this.collectiveScroll = function() {
        if ("about" === FLD.PageType.type) {
            var e = FLD.Window.scrollTop(),
                t = this.collective.offset().top,
                i = -1 * (t - (e + FLD.Resize.BrowserHeight)),
                n = 200,
                s = i / (this.collectiveHeight + FLD.Resize.BrowserHeight) * n;
            if (!Modernizr.touch && (this.collectiveBg.addClass("js--show-collective"), this.hasHiddenCollective === !1 && i >= 0 && (this.hasHiddenCollective = !0), this.hasHiddenCollective === !0 && 0 >= i && (this.hasHiddenCollective = !1), s > 0 && n > s)) {
                var a = "translate3d(0," + -1 * s + "px,0)";
                this.collectiveBg.css({
                    "-webkit-transform": a,
                    "-moz-transform": a,
                    transform: a
                })
            }
        }
    }, this.awardsScroll = function() {
        if ("about" === FLD.PageType.type) {
            var e = FLD.Window.scrollTop(),
                t = this.awards.offset().top,
                i = -1 * (t - (e + FLD.Resize.BrowserHeight)),
                n = 200,
                s = i / (this.awardsHeight + FLD.Resize.BrowserHeight) * n;
            if (!Modernizr.touch && s > 0 && n > s) {
                var a = "translate3d(0," + (-1 * s).toFixed(2) + "px,0)";
                this.awardsBg.css({
                    "-webkit-transform": a,
                    "-moz-transform": a,
                    transform: a
                })
            }
        }
    }, this.getContent = function() {
        return $(".content--about--wrap")
    }, this.content = this.getContent(), this.onResize = function() {
        this.collectiveHeight = this.getCollectiveHeight(), this.awardsHeight = this.getAwardsHeight()
    }, this.onNewPageLoad = function() {
        "about" == FLD.PageType.type && (this.imageGrid = this.getImageGrid(), this.header = this.getHeader(), this.header.removeAttr("style"), this.content = this.getContent(), this.collective = this.getCollective(), this.collectiveBg = this.getCollectiveBg(), this.collectiveHeight = this.getCollectiveHeight(), this.awards = this.getAwards(), this.awardsBg = this.getAwardsBg(), this.awardsHeight = this.getAwardsHeight())
    }, this.onPageLeave = function() {
        this.imagGrid = this.contentFooter = this.header = this.content = this.collective = this.collectiveBg = this.collectiveHeight = this.awards = this.awardsBg = this.awardsHeight = null
    }, this.onScroll(), Modernizr.touch || ($(window).on("scroll", function() {
        "about" === FLD.PageType.type && (e.onScroll(), e.headerScroll(), e.collectiveScroll(), e.awardsScroll())
    }), $(window).on("resize", function() {
        "about" == FLD.PageType.type && e.onResize()
    }))
}

function Background(e) {
    var t = this;
    this.options = {
        selector: ".block--awards",
        pageType: "about"
    }, this.settings = $.extend(this.options, e), this.getTarget = function() {
        return $(this.settings.selector)
    }, this.target = this.getTarget(), this.getBg = function() {
        return this.target.find(".block__bg")
    }, this.bg = this.getBg(), this.getHeight = function() {
        return this.target.outerHeight()
    }, this.targetHeight = this.getHeight(), this.onNewPageLoad = function() {
        FLD.PageType.type === this.settings.pageType && (this.target = this.getTarget(), this.bg = this.getBg(), this.targetHeight = this.getHeight())
    }, this.moveBackground = function() {
        var e = FLD.Window.scrollTop(),
            t = this.target.offset().top,
            i = -1 * (t - (e + FLD.Resize.BrowserHeight)),
            n = 200,
            s = i / (this.targetHeight + FLD.Resize.BrowserHeight) * n;
        if (!Modernizr.touch && s > 0 && n > s) {
            var a = "translate3d(0," + (-1 * s).toFixed(2) + "px,0)";
            this.bg.css({
                "-webkit-transform": a,
                "-moz-transform": a,
                transform: a
            })
        }
    }, Modernizr.touch || ($(window).on("scroll", function() {
        FLD.PageType.type === t.settings.pageType && t.moveBackground()
    }), $(window).on("resize", function() {
        FLD.PageType.type === t.settings.pageType && (t.targetHeight = t.getHeight())
    }))
}

function RandomQuote() {
    var e = this;
    this.selectors = {
        body: '[data-js="input-random-quote-body"]',
        citation: '[data-js="input-random-quote-citation"]'
    }, this.quote = function(e, t) {
        return {
            body: e,
            citation: t
        }
    }, this.quotes = [e.quote("I met with a ton of dev shops. The moment I walked into Fueled, I knew they were the right partner for me. They just get it. After one meeting I knew they were, to their core, about quality. As you walk through their office, you feel it in the air, in the way everyone\u2019s dressed, in the curated selection of furniture. It\u2019s magical.", "David Spiro, Founder \u2013 Elevatr"), e.quote("Design was critical in my choice of development firms.  After reviewing nearly a hundred firms, I chose Fueled and the results have been nothing short of world class.", "Tony Alfaro, Founder \u2013 Ribbon"), e.quote("There was a real sense of partnership working with Fueled. The team is friendly and accountable, delivering on time and budget. I never felt left in the dark. Better yet, their creativity was incredible, coming up with outside-of-the-box solutions which we really valued.", "Adam Benzion, Portfolio Manager \u2013 Otterbox"), e.quote("Fueled stands for the incendiary fusion of form and function. You can see and feel the difference. They make apps that excite your eyes and set your thumbs on fire.", "Mark Moll\xe9 &amp; Felicity Sargent, Co-Founders \u2013 Definer"), e.quote("Fueled served as a sort of incubator at the beginning of the project. The team always made themselves available and we were able to really work seamlessly.", "Arthur Shmulevsky, Founder \u2013 CleanCube")], this.generateQuote = function() {
        var e = this.quotes.length;
        return this.quotes[Math.floor(Math.random() * e)]
    }, this.populateQuote = function() {
        var e = this.generateQuote();
        $(this.selectors.body).html(e.body), $(this.selectors.citation).html(e.citation)
    }, this.onNewPageLoad = function() {
        "about" === FLD.PageType.type && this.populateQuote()
    }, this.onNewPageLoad()
}

function RandomImage() {
    var e = this;
    this.imagePath = function(e) {
        return "/assets/images/bg/bg--home--" + e + ".jpg"
    }, this.images = [this.imagePath(1), this.imagePath(2), this.imagePath(3), this.imagePath(4), this.imagePath(5), this.imagePath(6)], this.target = $(".page--homepage .content--hero"), this.generateImage = function() {
        var e = this.images.length;
        return this.images[Math.floor(Math.random() * e)]
    }, this.populateImage = function() {
        this.target = $(".page--homepage .content--hero");
        var t = cdn_url + this.generateImage(),
            i = new Image;
        i.src = t, e.target.css({
            "background-image": "url(" + t + ")"
        })
    }, this.onNewPageLoad = function() {
        this.populateImage()
    }, "home" === FLD.PageType.type && this.populateImage()
}

function HomeUI() {
    var e = this;
    Modernizr.touch || (this.init = function() {
        "home" === FLD.PageType.type && (this.ipad = {
            view: $(".faux-img--ipad .faux-img__screen"),
            list: $(".faux-img--ipad .faux-img__list")
        }, this.ipad.position = this.ipad.list.position(), this.ipad.listHeight = this.ipad.list.height(), this.ipad.viewHeight = this.ipad.view.height(), this.iphone = {
            view: $(".faux-img--iphone .faux-img__screen"),
            modal: $(".faux-img--iphone .faux-img__modal"),
            img: $(".faux-img--iphone"),
            flag: null
        }, this.desktop = {
            view: $(".faux-img--browser .faux-img__screen"),
            graph: $(".faux-img--browser .faux-img__graph"),
            line: document.getElementById("js--animate-graph-path"),
            flag: null
        }, this.desktop.lineLength = this.desktop.line.getTotalLength())
    }, this.init(), this.runOnScroll = function() {
        if ("home" === FLD.PageType.type) {
            var e = this.ipad.view[0].getBoundingClientRect().top,
                t = e / FLD.Resize.BrowserHeight,
                i = this.ipad.position.top + (this.ipad.listHeight - this.ipad.viewHeight);
            if (t >= 0 && 1 >= t) {
                var n = 1 - t;
                this.ipad.list.css({
                    transform: "translateY(" + i * n * -1 + "px)"
                })
            }
            var s = this.iphone.view[0].getBoundingClientRect().top,
                a = s / FLD.Resize.BrowserHeight;.5 >= a ? "before" !== this.iphone.flag && (this.iphone.img.addClass("js--reveal-iphone"), this.iphone.flag = "before") : "after" !== this.iphone.flag && (this.iphone.img.removeClass("js--reveal-iphone"), this.iphone.flag = "after");
            var o = this.desktop.view[0].getBoundingClientRect().top,
                r = o / FLD.Resize.BrowserHeight;
            if (r >= .2 && .8 >= r) {
                var l = 10 / 6 * (r - .2);
                this.desktop.line.style.strokeDasharray = this.desktop.lineLength + " " + this.desktop.lineLength, this.desktop.line.style.strokeDashoffset = this.desktop.lineLength * l, null !== this.desktop.flag && (this.desktop.flag = null)
            } else a > .8 ? "before" !== this.desktop.flag && (this.desktop.graph.removeAttr("style"), this.desktop.flag = "before") : .2 > a && "after" !== this.desktop.flag && (this.desktop.graph.removeAttr("style"), this.desktop.flag = "after")
        }
    }, this.getSizes = function() {
        "home" === FLD.PageType.type && (this.ipad.position = this.ipad.list.position(), this.ipad.listHeight = this.ipad.list.height(), this.ipad.viewHeight = this.ipad.view.height())
    }, this.onNewPageLoad = function() {
        this.init()
    }, this.animate = null, this.startAnimation = function() {
        this.animate = window.requestAnimationFrame(e.startAnimation), e.runOnScroll()
    }, this.cancelAnimation = function() {
        window.cancelAnimationFrame(e.animate)
    }, e.runOnScroll(), $(window).on("scroll", FLD.Throttle.debounce(function() {
        e.startAnimation()
    }, 200, !0)), $(window).on("scroll", FLD.Throttle.debounce(function() {
        e.cancelAnimation()
    }, 200, !1)), $(window).on("resize", function() {
        e.getSizes()
    }))
}

function VideoReel() {
    var e = this;
    this.selectors = {
        play: '[data-js="play-showreel"]',
        pause: '[data-js="pause-showreel"]'
    }, this.classes = {
        show: "js--show-reel"
    }, $(document).on("click", e.selectors.play, function(t) {
        var i = $f(document.getElementById("fueled-showreel"));
        $(".page--about .content--hero").addClass(e.classes.show), setTimeout(function() {
            i.api("play")
        }, 600), t.preventDefault()
    }), $(document).on("click", e.selectors.pause, function() {
        var t = $f(document.getElementById("fueled-showreel"));
        t.api("pause"), $(".page--about .content--hero").removeClass(e.classes.show)
    })
}

function ProjectsMenu() {
    var e = this;
    this.selectors = {
        menuItem: '[data-js="move-to-project-hero"]'
    }, this.classes = {
        active: "menu__item__link--active",
        dark: "menu__item--dark",
        animate: "js--animate-in"
    }, this.moveToProject = function(e) {
        $("html, body").animate({
            scrollTop: $(e).offset().top
        }, 750, "easeInOutCubic")
    }, this.projects = document.getElementsByClassName("project--featured"), this.descriptions = $(".project--featured .project__description"), this.menuItems = $(".menu--projects li"), this.getMenuItemBounding = function() {
        for (var e = [], t = 0; t < this.menuItems.length; t++) e.push(this.menuItems[t].getBoundingClientRect());
        return e
    }, this.getMenuFlag = function() {
        for (var e = [], t = 0; t < this.menuItems.length; t++) e.push(null);
        return e
    }, this.menuItemBounding = this.getMenuItemBounding(), this.flags = {
        project: null,
        menu: this.getMenuFlag()
    }, this.changeActiveClass = function(e) {
        $("." + this.classes.active).removeClass(this.classes.active), $(e).addClass(this.classes.active)
    }, this._checkForProject = function() {
        for (var e = 0; e < this.projects.length; e++) {
            var t = this.projects[e],
                i = t.getBoundingClientRect();
            if (i.top <= FLD.Resize.BrowserHeight / 2 && i.bottom > FLD.Resize.BrowserHeight / 2 && this.flags.project !== e) {
                var n = $(t.getAttribute("data-target"))[0];
                this.changeActiveClass(n), $(this.projects[e]).addClass(this.classes.animate), this.flags.project = e
            }
            e == this.projects.length - 1 && i.bottom < FLD.Resize.BrowserHeight / 2 && "out" !== this.flags.project && ($("." + this.classes.active).removeClass(this.classes.active), this.flags.project = "out")
        }
    }, this._checkForMenuOverlap = function() {
        for (var e = 0; e < this.menuItems.length; e++) {
            for (var t = (this.menuItems[e], !1), i = 0; i < this.descriptions.length; i++) {
                var n = this.descriptions[i],
                    s = n.getBoundingClientRect();
                s.top < this.menuItemBounding[e].bottom && s.bottom > this.menuItemBounding[e].top && (t = !0)
            }
            t ? $(this.menuItems[e]).addClass(this.classes.dark) : $(this.menuItems[e]).removeClass(this.classes.dark)
        }
    }, this.checkForProject = $.throttle(250, !1, function() {
        e._checkForProject(), e._checkForMenuOverlap()
    }), $(window).on("load", function() {
        e.checkForProject()
    }), this.onNewPageLoad = function() {
        this.projects = document.getElementsByClassName("project--featured"), this.descriptions = $(".project--featured .project__description"), this.menuItems = $(".menu--projects li"), this.menuItemBounding = this.getMenuItemBounding(), this.flags = {
            project: null,
            menu: e.getMenuFlag()
        }, this.checkForProject()
    }, $(document).on("click", e.selectors.menuItem, function(t) {
        var i = $(this).attr("data-target");
        e.moveToProject(i), e.changeActiveClass(this), t.preventDefault()
    }), $(window).on("scroll", function() {
        "projects" === FLD.PageType.type && e.checkForProject()
    }), $(window).on("resize", function() {
        "projects" === FLD.PageType.type && (e.menuItemBounding = e.getMenuItemBounding(), e.checkForProject())
    })
}

function Press() {
    var e = this;
    this.selectors = {
        toCheck: '[data-js="indent-if-quote"]',
        toBalance: "[data-balance-heights]"
    }, this.classes = {
        isIndented: "press__item__copy--indented-"
    }, this.data = {
        toBalance: "data-balance-heights"
    }, this.variables = {
        colTwo: 700,
        colThree: 950,
        colFour: 1600,
        debounce: 100
    }, this.setUpPress = function() {
        this.hangPunctuation(), Modernizr.flexbox || (this.balanceHeights(), $(window).on("resize", function() {
            e.balanceHeights()
        }))
    }, this.hangPunctuation = function() {
        var t = {
            "\u201c": "medium",
            "\u2018": "small",
            '"': "medium",
            "'": "small",
            "\xab": "large",
            "\u2039": "medium",
            "\u201e": "medium",
            "\u201a": "small"
        };
        $(e.selectors.toCheck).each(function() {
            var i = $(this).text();
            for (var n in t) 0 === i.indexOf(n) && $(this).addClass(e.classes.isIndented + t[n])
        })
    }, this.getColumnNumber = function(e) {
        return e >= this.variables.colFour ? 4 : e >= this.variables.colThree ? 3 : e >= this.variables.colTwo ? 2 : 1
    }, this.createSelector = function(e) {
        return "[" + this.data.toBalance + '="' + e + '"]'
    }, this.setHeights = function(e, t, i) {
        var n = "";
        n += this.createSelector(e), n += ", " + this.createSelector(e - 1), n += i >= 3 ? ", " + this.createSelector(e - 2) : "", n += 4 == i ? ", " + this.createSelector(e - 3) : "", $(n).css("height", t + "px")
    }, this.balanceHeights = function() {
        var e = $(window).width(),
            t = this.getColumnNumber(e);
        if (t > 1) {
            var i = 0,
                n = [0];
            $(this.selectors.toBalance).each(function() {
                $(this).css("height", "auto");
                var e = $(this).height();
                n.push(e)
            });
            var s = n.length,
                a = s - 1;
            console.log(s);
            for (var o = 1; s > o; o++) {
                var i = i < n[o] ? n[o] : i;
                if (o % t === 0) {
                    this.setHeights(o, i, t);
                    var i = 0;
                    a -= t
                } else t > a && o == s - 1 && this.setHeights(o, i, a)
            }
        }
    }, this.onNewPageLoad = function() {
        this.setUpPress()
    }, this.setUpPress()
}

function Afterlight() {
    var e = this;
    this.selectors = {
        bg: '[data-js="fade-afterlight-bg-on-scroll"]',
        scrub: '[data-js="move-afterlight-scrubber-on-scroll"]'
    }, this.elements = {
        scrub: $(e.selectors.scrub),
        bg: $(e.selectors.bg)
    }, this.isAfterlight = $("body").hasClass("projects_afterlight"), this.animate = null, this.updateScrubber = function() {
        if (this.isAfterlight) {
            var e = $(window).scrollTop(),
                t = e / (FLD.Resize.BrowserHeight / 2);
            t = t > 1 ? 1 : 0 > t ? 0 : t, t >= 0 && 1 >= t && (this.elements.scrub.css({
                width: 100 * t + "%"
            }), this.elements.bg.css({
                opacity: t
            }))
        }
    }, this.startAnimation = function() {
        e.animate = window.requestAnimationFrame(e.startAnimation), e.updateScrubber()
    }, this.cancelAnimation = function() {
        window.cancelAnimationFrame(e.animate)
    }, this.onNewPageLoad = function() {
        this.elements = {
            scrub: $(e.selectors.scrub),
            bg: $(e.selectors.bg)
        }, this.isAfterlight = $("body").hasClass("projects_afterlight"), this.animate = null
    }, Modernizr.touch || ($(window).on("scroll", $.debounce(200, !0, function() {
        e.startAnimation()
    })), $(window).on("scroll", $.debounce(200, !1, function() {
        e.cancelAnimation()
    })), this.updateScrubber())
}! function() {
    for (var e, t = function() {}, i = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], n = i.length, s = window.console = window.console || {}; n--;) e = i[n], s[e] || (s[e] = t)
}(),
function(e) {
    e.fn.drag = function(t, i, n) {
        var s = "string" == typeof t ? t : "",
            a = e.isFunction(t) ? t : e.isFunction(i) ? i : null;
        return 0 !== s.indexOf("drag") && (s = "drag" + s), n = (t == a ? i : n) || {}, a ? this.bind(s, n, a) : this.trigger(s)
    };
    var t = e.event,
        i = t.special,
        n = i.drag = {
            defaults: {
                which: 1,
                distance: 0,
                not: ":input",
                handle: null,
                relative: !1,
                drop: !0,
                click: !1
            },
            datakey: "dragdata",
            noBubble: !0,
            add: function(t) {
                var i = e.data(this, n.datakey),
                    s = t.data || {};
                i.related += 1, e.each(n.defaults, function(e) {
                    void 0 !== s[e] && (i[e] = s[e])
                })
            },
            remove: function() {
                e.data(this, n.datakey).related -= 1
            },
            setup: function() {
                if (!e.data(this, n.datakey)) {
                    var i = e.extend({
                        related: 0
                    }, n.defaults);
                    e.data(this, n.datakey, i), t.add(this, "touchstart mousedown", n.init, i), this.attachEvent && this.attachEvent("ondragstart", n.dontstart)
                }
            },
            teardown: function() {
                var i = e.data(this, n.datakey) || {};
                i.related || (e.removeData(this, n.datakey), t.remove(this, "touchstart mousedown", n.init), n.textselect(!0), this.detachEvent && this.detachEvent("ondragstart", n.dontstart))
            },
            init: function(s) {
                if (!n.touched) {
                    var a, o = s.data;
                    if (!(0 != s.which && o.which > 0 && s.which != o.which || e(s.target).is(o.not) || o.handle && !e(s.target).closest(o.handle, s.currentTarget).length) && (n.touched = "touchstart" == s.type ? this : null, o.propagates = 1, o.mousedown = this, o.interactions = [n.interaction(this, o)], o.target = s.target, o.pageX = s.pageX, o.pageY = s.pageY, o.dragging = null, a = n.hijack(s, "draginit", o), o.propagates)) return a = n.flatten(a), a && a.length && (o.interactions = [], e.each(a, function() {
                        o.interactions.push(n.interaction(this, o))
                    })), o.propagates = o.interactions.length, o.drop !== !1 && i.drop && i.drop.handler(s, o), n.textselect(!1), n.touched ? t.add(n.touched, "touchmove touchend", n.handler, o) : t.add(document, "mousemove mouseup", n.handler, o), !n.touched || o.live ? !1 : void 0
                }
            },
            interaction: function(t, i) {
                var s = e(t)[i.relative ? "position" : "offset"]() || {
                    top: 0,
                    left: 0
                };
                return {
                    drag: t,
                    callback: new n.callback,
                    droppable: [],
                    offset: s
                }
            },
            handler: function(s) {
                var a = s.data;
                switch (s.type) {
                    case !a.dragging && "touchmove":
                        s.preventDefault();
                    case !a.dragging && "mousemove":
                        if (Math.pow(s.pageX - a.pageX, 2) + Math.pow(s.pageY - a.pageY, 2) < Math.pow(a.distance, 2)) break;
                        s.target = a.target, n.hijack(s, "dragstart", a), a.propagates && (a.dragging = !0);
                    case "touchmove":
                        s.preventDefault();
                    case "mousemove":
                        if (a.dragging) {
                            if (n.hijack(s, "drag", a), a.propagates) {
                                a.drop !== !1 && i.drop && i.drop.handler(s, a);
                                break
                            }
                            s.type = "mouseup"
                        }
                    case "touchend":
                    case "mouseup":
                    default:
                        n.touched ? t.remove(n.touched, "touchmove touchend", n.handler) : t.remove(document, "mousemove mouseup", n.handler), a.dragging && (a.drop !== !1 && i.drop && i.drop.handler(s, a), n.hijack(s, "dragend", a)), n.textselect(!0), a.click === !1 && a.dragging && e.data(a.mousedown, "suppress.click", (new Date).getTime() + 5), a.dragging = n.touched = !1
                }
            },
            hijack: function(i, s, a, o, r) {
                if (a) {
                    var l, c, u, d = {
                            event: i.originalEvent,
                            type: i.type
                        },
                        h = s.indexOf("drop") ? "drag" : "drop",
                        p = o || 0,
                        m = isNaN(o) ? a.interactions.length : o;
                    i.type = s, i.originalEvent = null, a.results = [];
                    do
                        if (c = a.interactions[p]) {
                            if ("dragend" !== s && c.cancelled) continue;
                            u = n.properties(i, a, c), c.results = [], e(r || c[h] || a.droppable).each(function(o, r) {
                                return u.target = r, i.isPropagationStopped = function() {
                                    return !1
                                }, l = r ? t.dispatch.call(r, i, u) : null, l === !1 ? ("drag" == h && (c.cancelled = !0, a.propagates -= 1), "drop" == s && (c[h][o] = null)) : "dropinit" == s && c.droppable.push(n.element(l) || r), "dragstart" == s && (c.proxy = e(n.element(l) || c.drag)[0]), c.results.push(l), delete i.result, "dropinit" !== s ? l : void 0
                            }), a.results[p] = n.flatten(c.results), "dropinit" == s && (c.droppable = n.flatten(c.droppable)), "dragstart" != s || c.cancelled || u.update()
                        }
                    while (m > ++p);
                    return i.type = d.type, i.originalEvent = d.event, n.flatten(a.results)
                }
            },
            properties: function(e, t, i) {
                var s = i.callback;
                return s.drag = i.drag, s.proxy = i.proxy || i.drag, s.startX = t.pageX, s.startY = t.pageY, s.deltaX = e.pageX - t.pageX, s.deltaY = e.pageY - t.pageY, s.originalX = i.offset.left, s.originalY = i.offset.top, s.offsetX = s.originalX + s.deltaX, s.offsetY = s.originalY + s.deltaY, s.drop = n.flatten((i.drop || []).slice()), s.available = n.flatten((i.droppable || []).slice()), s
            },
            element: function(e) {
                return e && (e.jquery || 1 == e.nodeType) ? e : void 0
            },
            flatten: function(t) {
                return e.map(t, function(t) {
                    return t && t.jquery ? e.makeArray(t) : t && t.length ? n.flatten(t) : t
                })
            },
            textselect: function(t) {
                e(document)[t ? "unbind" : "bind"]("selectstart", n.dontstart).css("MozUserSelect", t ? "" : "none"), document.unselectable = t ? "off" : "on"
            },
            dontstart: function() {
                return !1
            },
            callback: function() {}
        };
    n.callback.prototype = {
        update: function() {
            i.drop && this.available.length && e.each(this.available, function(e) {
                i.drop.locate(this, e)
            })
        }
    };
    var s = t.dispatch;
    t.dispatch = function(t) {
        return e.data(this, "suppress." + t.type) - (new Date).getTime() > 0 ? void e.removeData(this, "suppress." + t.type) : s.apply(this, arguments)
    };
    var a = t.fixHooks.touchstart = t.fixHooks.touchmove = t.fixHooks.touchend = t.fixHooks.touchcancel = {
        props: "clientX clientY pageX pageY screenX screenY".split(" "),
        filter: function(t, i) {
            if (i) {
                var n = i.touches && i.touches[0] || i.changedTouches && i.changedTouches[0] || null;
                n && e.each(a.props, function(e, i) {
                    t[i] = n[i]
                })
            }
            return t
        }
    };
    i.draginit = i.dragstart = i.dragend = n
}(jQuery),
function(e, t) {
    var i = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    e.fn.imagesLoaded = function(n) {
        function s() {
            var t = e(h),
                i = e(p);
            l && (p.length ? l.reject(u, t, i) : l.resolve(u)), e.isFunction(n) && n.call(r, u, t, i)
        }

        function a(e) {
            o(e.target, "error" === e.type)
        }

        function o(t, n) {
            t.src === i || -1 !== e.inArray(t, d) || (d.push(t), n ? p.push(t) : h.push(t), e.data(t, "imagesLoaded", {
                isBroken: n,
                src: t.src
            }), c && l.notifyWith(e(t), [n, u, e(h), e(p)]), u.length === d.length && (setTimeout(s), u.unbind(".imagesLoaded", a)))
        }
        var r = this,
            l = e.isFunction(e.Deferred) ? e.Deferred() : 0,
            c = e.isFunction(l.notify),
            u = r.find("img").add(r.filter("img")),
            d = [],
            h = [],
            p = [];
        return e.isPlainObject(n) && e.each(n, function(e, t) {
            "callback" === e ? n = t : l && l[e](t)
        }), u.length ? u.bind("load.imagesLoaded error.imagesLoaded", a).each(function(n, s) {
            var a = s.src,
                r = e.data(s, "imagesLoaded");
            r && r.src === a ? o(s, r.isBroken) : s.complete && s.naturalWidth !== t ? o(s, 0 === s.naturalWidth || 0 === s.naturalHeight) : (s.readyState || s.complete) && (s.src = i, s.src = a)
        }) : s(), l ? l.promise(r) : r
    }
}(jQuery),
function(e) {
    e.belowthefold = function(t, i) {
        var n = e(window).height() + e(window).scrollTop();
        return n <= e(t).offset().top - i.threshold
    }, e.abovethetop = function(t, i) {
        var n = e(window).scrollTop();
        return n >= e(t).offset().top + e(t).height() - i.threshold
    }, e.rightofscreen = function(t, i) {
        var n = e(window).width() + e(window).scrollLeft();
        return n <= e(t).offset().left - i.threshold
    }, e.leftofscreen = function(t, i) {
        var n = e(window).scrollLeft();
        return n >= e(t).offset().left + e(t).width() - i.threshold
    }, e.inviewport = function(t, i) {
        return !(e.rightofscreen(t, i) || e.leftofscreen(t, i) || e.belowthefold(t, i) || e.abovethetop(t, i))
    }, e.extend(e.expr[":"], {
        "below-the-fold": function(t) {
            return e.belowthefold(t, {
                threshold: 0
            })
        },
        "above-the-top": function(t) {
            return e.abovethetop(t, {
                threshold: 0
            })
        },
        "left-of-screen": function(t) {
            return e.leftofscreen(t, {
                threshold: 0
            })
        },
        "right-of-screen": function(t) {
            return e.rightofscreen(t, {
                threshold: 0
            })
        },
        "in-viewport": function(t) {
            return e.inviewport(t, {
                threshold: 0
            })
        }
    })
}(jQuery),
/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2013 Metafizzy
 */
function(e, t) {
    "use strict";
    var i, n = e.document,
        s = e.Modernizr,
        a = function(e) {
            return e.charAt(0).toUpperCase() + e.slice(1)
        },
        o = "Moz Webkit O Ms".split(" "),
        r = function(e) {
            var t, i = n.documentElement.style;
            if ("string" == typeof i[e]) return e;
            e = a(e);
            for (var s = 0, r = o.length; r > s; s++)
                if (t = o[s] + e, "string" == typeof i[t]) return t
        },
        l = r("transform"),
        c = r("transitionProperty"),
        u = {
            csstransforms: function() {
                return !!l
            },
            csstransforms3d: function() {
                var e = !!r("perspective");
                if (e) {
                    var i = " -o- -moz- -ms- -webkit- -khtml- ".split(" "),
                        n = "@media (" + i.join("transform-3d),(") + "modernizr)",
                        s = t("<style>" + n + "{#modernizr{height:3px}}</style>").appendTo("head"),
                        a = t('<div id="modernizr" />').appendTo("html");
                    e = 3 === a.height(), a.remove(), s.remove()
                }
                return e
            },
            csstransitions: function() {
                return !!c
            }
        };
    if (s)
        for (i in u) s.hasOwnProperty(i) || s.addTest(i, u[i]);
    else {
        s = e.Modernizr = {
            _version: "1.6ish: miniModernizr for Isotope"
        };
        var d, h = " ";
        for (i in u) d = u[i](), s[i] = d, h += " " + (d ? "" : "no-") + i;
        t("html").addClass(h)
    }
    if (s.csstransforms) {
        var p = s.csstransforms3d ? {
                translate: function(e) {
                    return "translate3d(" + e[0] + "px, " + e[1] + "px, 0) "
                },
                scale: function(e) {
                    return "scale3d(" + e + ", " + e + ", 1) "
                }
            } : {
                translate: function(e) {
                    return "translate(" + e[0] + "px, " + e[1] + "px) "
                },
                scale: function(e) {
                    return "scale(" + e + ") "
                }
            },
            m = function(e, i, n) {
                var s, a, o = t.data(e, "isoTransform") || {},
                    r = {},
                    c = {};
                r[i] = n, t.extend(o, r);
                for (s in o) a = o[s], c[s] = p[s](a);
                var u = c.translate || "",
                    d = c.scale || "",
                    h = u + d;
                t.data(e, "isoTransform", o), e.style[l] = h
            };
        t.cssNumber.scale = !0, t.cssHooks.scale = {
            set: function(e, t) {
                m(e, "scale", t)
            },
            get: function(e) {
                var i = t.data(e, "isoTransform");
                return i && i.scale ? i.scale : 1
            }
        }, t.fx.step.scale = function(e) {
            t.cssHooks.scale.set(e.elem, e.now + e.unit)
        }, t.cssNumber.translate = !0, t.cssHooks.translate = {
            set: function(e, t) {
                m(e, "translate", t)
            },
            get: function(e) {
                var i = t.data(e, "isoTransform");
                return i && i.translate ? i.translate : [0, 0]
            }
        }
    }
    var f, g;
    s.csstransitions && (f = {
        WebkitTransitionProperty: "webkitTransitionEnd",
        MozTransitionProperty: "transitionend",
        OTransitionProperty: "oTransitionEnd otransitionend",
        transitionProperty: "transitionend"
    }[c], g = r("transitionDuration"));
    var v, w = t.event,
        y = t.event.handle ? "handle" : "dispatch";
    w.special.smartresize = {
        setup: function() {
            t(this).bind("resize", w.special.smartresize.handler)
        },
        teardown: function() {
            t(this).unbind("resize", w.special.smartresize.handler)
        },
        handler: function(e, t) {
            var i = this,
                n = arguments;
            e.type = "smartresize", v && clearTimeout(v), v = setTimeout(function() {
                w[y].apply(i, n)
            }, "execAsap" === t ? 0 : 100)
        }
    }, t.fn.smartresize = function(e) {
        return e ? this.bind("smartresize", e) : this.trigger("smartresize", ["execAsap"])
    }, t.Isotope = function(e, i, n) {
        this.element = t(i), this._create(e), this._init(n)
    };
    var b = ["width", "height"],
        _ = t(e);
    t.Isotope.settings = {
        resizable: !0,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: {
            opacity: 0,
            scale: .001
        },
        visibleStyle: {
            opacity: 1,
            scale: 1
        },
        containerStyle: {
            position: "relative",
            overflow: "hidden"
        },
        animationEngine: "best-available",
        animationOptions: {
            queue: !1,
            duration: 800
        },
        sortBy: "original-order",
        sortAscending: !0,
        resizesContainer: !0,
        transformsEnabled: !0,
        itemPositionDataEnabled: !1
    }, t.Isotope.prototype = {
        _create: function(e) {
            this.options = t.extend({}, t.Isotope.settings, e), this.styleQueue = [], this.elemCount = 0;
            var i = this.element[0].style;
            this.originalStyle = {};
            var n = b.slice(0);
            for (var s in this.options.containerStyle) n.push(s);
            for (var a = 0, o = n.length; o > a; a++) s = n[a], this.originalStyle[s] = i[s] || "";
            this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms();
            var r = {
                "original-order": function(e, t) {
                    return t.elemCount++, t.elemCount
                },
                random: function() {
                    return Math.random()
                }
            };
            this.options.getSortData = t.extend(this.options.getSortData, r), this.reloadItems(), this.offset = {
                left: parseInt(this.element.css("padding-left") || 0, 10),
                top: parseInt(this.element.css("padding-top") || 0, 10)
            };
            var l = this;
            setTimeout(function() {
                l.element.addClass(l.options.containerClass)
            }, 0), this.options.resizable && _.bind("smartresize.isotope", function() {
                l.resize()
            }), this.element.delegate("." + this.options.hiddenClass, "click", function() {
                return !1
            })
        },
        _getAtoms: function(e) {
            var t = this.options.itemSelector,
                i = t ? e.filter(t).add(e.find(t)) : e,
                n = {
                    position: "absolute"
                };
            return i = i.filter(function(e, t) {
                return 1 === t.nodeType
            }), this.usingTransforms && (n.left = 0, n.top = 0), i.css(n).addClass(this.options.itemClass), this.updateSortData(i, !0), i
        },
        _init: function(e) {
            this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(e)
        },
        option: function(e) {
            if (t.isPlainObject(e)) {
                this.options = t.extend(!0, this.options, e);
                var i;
                for (var n in e) i = "_update" + a(n), this[i] && this[i]()
            }
        },
        _updateAnimationEngine: function() {
            var e, t = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, "");
            switch (t) {
                case "css":
                case "none":
                    e = !1;
                    break;
                case "jquery":
                    e = !0;
                    break;
                default:
                    e = !s.csstransitions
            }
            this.isUsingJQueryAnimation = e, this._updateUsingTransforms()
        },
        _updateTransformsEnabled: function() {
            this._updateUsingTransforms()
        },
        _updateUsingTransforms: function() {
            var e = this.usingTransforms = this.options.transformsEnabled && s.csstransforms && s.csstransitions && !this.isUsingJQueryAnimation;
            e || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = e ? this._translate : this._positionAbs
        },
        _filter: function(e) {
            var t = "" === this.options.filter ? "*" : this.options.filter;
            if (!t) return e;
            var i = this.options.hiddenClass,
                n = "." + i,
                s = e.filter(n),
                a = s;
            if ("*" !== t) {
                a = s.filter(t);
                var o = e.not(n).not(t).addClass(i);
                this.styleQueue.push({
                    $el: o,
                    style: this.options.hiddenStyle
                })
            }
            return this.styleQueue.push({
                $el: a,
                style: this.options.visibleStyle
            }), a.removeClass(i), e.filter(t)
        },
        updateSortData: function(e, i) {
            var n, s, a = this,
                o = this.options.getSortData;
            e.each(function() {
                n = t(this), s = {};
                for (var e in o) s[e] = i || "original-order" !== e ? o[e](n, a) : t.data(this, "isotope-sort-data")[e];
                t.data(this, "isotope-sort-data", s)
            })
        },
        _sort: function() {
            var e = this.options.sortBy,
                t = this._getSorter,
                i = this.options.sortAscending ? 1 : -1,
                n = function(n, s) {
                    var a = t(n, e),
                        o = t(s, e);
                    return a === o && "original-order" !== e && (a = t(n, "original-order"), o = t(s, "original-order")), (a > o ? 1 : o > a ? -1 : 0) * i
                };
            this.$filteredAtoms.sort(n)
        },
        _getSorter: function(e, i) {
            return t.data(e, "isotope-sort-data")[i]
        },
        _translate: function(e, t) {
            return {
                translate: [e, t]
            }
        },
        _positionAbs: function(e, t) {
            return {
                left: e,
                top: t
            }
        },
        _pushPosition: function(e, t, i) {
            t = Math.round(t + this.offset.left), i = Math.round(i + this.offset.top);
            var n = this.getPositionStyles(t, i);
            this.styleQueue.push({
                $el: e,
                style: n
            }), this.options.itemPositionDataEnabled && e.data("isotope-item-position", {
                x: t,
                y: i
            })
        },
        layout: function(e, t) {
            var i = this.options.layoutMode;
            if (this["_" + i + "Layout"](e), this.options.resizesContainer) {
                var n = this["_" + i + "GetContainerSize"]();
                this.styleQueue.push({
                    $el: this.element,
                    style: n
                })
            }
            this._processStyleQueue(e, t), this.isLaidOut = !0
        },
        _processStyleQueue: function(e, i) {
            var n, a, o, r, l = this.isLaidOut && this.isUsingJQueryAnimation ? "animate" : "css",
                c = this.options.animationOptions,
                u = this.options.onLayout;
            if (a = function(e, t) {
                    t.$el[l](t.style, c)
                }, this._isInserting && this.isUsingJQueryAnimation) a = function(e, t) {
                n = t.$el.hasClass("no-transition") ? "css" : l, t.$el[n](t.style, c)
            };
            else if (i || u || c.complete) {
                var d = !1,
                    h = [i, u, c.complete],
                    p = this;
                if (o = !0, r = function() {
                        if (!d) {
                            for (var t, i = 0, n = h.length; n > i; i++) t = h[i], "function" == typeof t && t.call(p.element, e, p);
                            d = !0
                        }
                    }, this.isUsingJQueryAnimation && "animate" === l) c.complete = r, o = !1;
                else if (s.csstransitions) {
                    for (var m, v = 0, w = this.styleQueue[0], y = w && w.$el; !y || !y.length;) {
                        if (m = this.styleQueue[v++], !m) return;
                        y = m.$el
                    }
                    var b = parseFloat(getComputedStyle(y[0])[g]);
                    b > 0 && (a = function(e, t) {
                        t.$el[l](t.style, c).one(f, r)
                    }, o = !1)
                }
            }
            t.each(this.styleQueue, a), o && r(), this.styleQueue = []
        },
        resize: function() {
            this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout()
        },
        reLayout: function(e) {
            this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, e)
        },
        addItems: function(e, t) {
            var i = this._getAtoms(e);
            this.$allAtoms = this.$allAtoms.add(i), t && t(i)
        },
        insert: function(e, t) {
            this.element.append(e);
            var i = this;
            this.addItems(e, function(e) {
                var n = i._filter(e);
                i._addHideAppended(n), i._sort(), i.reLayout(), i._revealAppended(n, t)
            })
        },
        appended: function(e, t) {
            var i = this;
            this.addItems(e, function(e) {
                i._addHideAppended(e), i.layout(e), i._revealAppended(e, t)
            })
        },
        _addHideAppended: function(e) {
            this.$filteredAtoms = this.$filteredAtoms.add(e), e.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({
                $el: e,
                style: this.options.hiddenStyle
            })
        },
        _revealAppended: function(e, t) {
            var i = this;
            setTimeout(function() {
                e.removeClass("no-transition"), i.styleQueue.push({
                    $el: e,
                    style: i.options.visibleStyle
                }), i._isInserting = !1, i._processStyleQueue(e, t)
            }, 10)
        },
        reloadItems: function() {
            this.$allAtoms = this._getAtoms(this.element.children())
        },
        remove: function(e, t) {
            this.$allAtoms = this.$allAtoms.not(e), this.$filteredAtoms = this.$filteredAtoms.not(e);
            var i = this,
                n = function() {
                    e.remove(), t && t.call(i.element)
                };
            e.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({
                $el: e,
                style: this.options.hiddenStyle
            }), this._sort(), this.reLayout(n)) : n()
        },
        shuffle: function(e) {
            this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(e)
        },
        destroy: function() {
            var e = this.usingTransforms,
                t = this.options;
            this.$allAtoms.removeClass(t.hiddenClass + " " + t.itemClass).each(function() {
                var t = this.style;
                t.position = "", t.top = "", t.left = "", t.opacity = "", e && (t[l] = "")
            });
            var i = this.element[0].style;
            for (var n in this.originalStyle) i[n] = this.originalStyle[n];
            this.element.unbind(".isotope").undelegate("." + t.hiddenClass, "click").removeClass(t.containerClass).removeData("isotope"), _.unbind(".isotope")
        },
        _getSegments: function(e) {
            var t, i = this.options.layoutMode,
                n = e ? "rowHeight" : "columnWidth",
                s = e ? "height" : "width",
                o = e ? "rows" : "cols",
                r = this.element[s](),
                l = this.options[i] && this.options[i][n] || this.$filteredAtoms["outer" + a(s)](!0) || r;
            t = Math.floor(r / l), t = Math.max(t, 1), this[i][o] = t, this[i][n] = l
        },
        _checkIfSegmentsChanged: function(e) {
            var t = this.options.layoutMode,
                i = e ? "rows" : "cols",
                n = this[t][i];
            return this._getSegments(e), this[t][i] !== n
        },
        _masonryReset: function() {
            this.masonry = {}, this._getSegments();
            var e = this.masonry.cols;
            for (this.masonry.colYs = []; e--;) this.masonry.colYs.push(0)
        },
        _masonryLayout: function(e) {
            var i = this,
                n = i.masonry;
            e.each(function() {
                var e = t(this),
                    s = Math.ceil(e.outerWidth(!0) / n.columnWidth);
                if (s = Math.min(s, n.cols), 1 === s) i._masonryPlaceBrick(e, n.colYs);
                else {
                    var a, o, r = n.cols + 1 - s,
                        l = [];
                    for (o = 0; r > o; o++) a = n.colYs.slice(o, o + s), l[o] = Math.max.apply(Math, a);
                    i._masonryPlaceBrick(e, l)
                }
            })
        },
        _masonryPlaceBrick: function(e, t) {
            for (var i = Math.min.apply(Math, t), n = 0, s = 0, a = t.length; a > s; s++)
                if (t[s] === i) {
                    n = s;
                    break
                }
            var o = this.masonry.columnWidth * n,
                r = i;
            this._pushPosition(e, o, r);
            var l = i + e.outerHeight(!0),
                c = this.masonry.cols + 1 - a;
            for (s = 0; c > s; s++) this.masonry.colYs[n + s] = l
        },
        _masonryGetContainerSize: function() {
            var e = Math.max.apply(Math, this.masonry.colYs);
            return {
                height: e
            }
        },
        _masonryResizeChanged: function() {
            return this._checkIfSegmentsChanged()
        },
        _fitRowsReset: function() {
            this.fitRows = {
                x: 0,
                y: 0,
                height: 0
            }
        },
        _fitRowsLayout: function(e) {
            var i = this,
                n = this.element.width(),
                s = this.fitRows;
            e.each(function() {
                var e = t(this),
                    a = e.outerWidth(!0),
                    o = e.outerHeight(!0);
                0 !== s.x && a + s.x > n && (s.x = 0, s.y = s.height), i._pushPosition(e, s.x, s.y), s.height = Math.max(s.y + o, s.height), s.x += a
            })
        },
        _fitRowsGetContainerSize: function() {
            return {
                height: this.fitRows.height
            }
        },
        _fitRowsResizeChanged: function() {
            return !0
        },
        _cellsByRowReset: function() {
            this.cellsByRow = {
                index: 0
            }, this._getSegments(), this._getSegments(!0)
        },
        _cellsByRowLayout: function(e) {
            var i = this,
                n = this.cellsByRow;
            e.each(function() {
                var e = t(this),
                    s = n.index % n.cols,
                    a = Math.floor(n.index / n.cols),
                    o = (s + .5) * n.columnWidth - e.outerWidth(!0) / 2,
                    r = (a + .5) * n.rowHeight - e.outerHeight(!0) / 2;
                i._pushPosition(e, o, r), n.index++
            })
        },
        _cellsByRowGetContainerSize: function() {
            return {
                height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top
            }
        },
        _cellsByRowResizeChanged: function() {
            return this._checkIfSegmentsChanged()
        },
        _straightDownReset: function() {
            this.straightDown = {
                y: 0
            }
        },
        _straightDownLayout: function(e) {
            var i = this;
            e.each(function() {
                var e = t(this);
                i._pushPosition(e, 0, i.straightDown.y), i.straightDown.y += e.outerHeight(!0)
            })
        },
        _straightDownGetContainerSize: function() {
            return {
                height: this.straightDown.y
            }
        },
        _straightDownResizeChanged: function() {
            return !0
        },
        _masonryHorizontalReset: function() {
            this.masonryHorizontal = {}, this._getSegments(!0);
            var e = this.masonryHorizontal.rows;
            for (this.masonryHorizontal.rowXs = []; e--;) this.masonryHorizontal.rowXs.push(0)
        },
        _masonryHorizontalLayout: function(e) {
            var i = this,
                n = i.masonryHorizontal;
            e.each(function() {
                var e = t(this),
                    s = Math.ceil(e.outerHeight(!0) / n.rowHeight);
                if (s = Math.min(s, n.rows), 1 === s) i._masonryHorizontalPlaceBrick(e, n.rowXs);
                else {
                    var a, o, r = n.rows + 1 - s,
                        l = [];
                    for (o = 0; r > o; o++) a = n.rowXs.slice(o, o + s), l[o] = Math.max.apply(Math, a);
                    i._masonryHorizontalPlaceBrick(e, l)
                }
            })
        },
        _masonryHorizontalPlaceBrick: function(e, t) {
            for (var i = Math.min.apply(Math, t), n = 0, s = 0, a = t.length; a > s; s++)
                if (t[s] === i) {
                    n = s;
                    break
                }
            var o = i,
                r = this.masonryHorizontal.rowHeight * n;
            this._pushPosition(e, o, r);
            var l = i + e.outerWidth(!0),
                c = this.masonryHorizontal.rows + 1 - a;
            for (s = 0; c > s; s++) this.masonryHorizontal.rowXs[n + s] = l
        },
        _masonryHorizontalGetContainerSize: function() {
            var e = Math.max.apply(Math, this.masonryHorizontal.rowXs);
            return {
                width: e
            }
        },
        _masonryHorizontalResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0)
        },
        _fitColumnsReset: function() {
            this.fitColumns = {
                x: 0,
                y: 0,
                width: 0
            }
        },
        _fitColumnsLayout: function(e) {
            var i = this,
                n = this.element.height(),
                s = this.fitColumns;
            e.each(function() {
                var e = t(this),
                    a = e.outerWidth(!0),
                    o = e.outerHeight(!0);
                0 !== s.y && o + s.y > n && (s.x = s.width, s.y = 0), i._pushPosition(e, s.x, s.y), s.width = Math.max(s.x + a, s.width), s.y += o
            })
        },
        _fitColumnsGetContainerSize: function() {
            return {
                width: this.fitColumns.width
            }
        },
        _fitColumnsResizeChanged: function() {
            return !0
        },
        _cellsByColumnReset: function() {
            this.cellsByColumn = {
                index: 0
            }, this._getSegments(), this._getSegments(!0)
        },
        _cellsByColumnLayout: function(e) {
            var i = this,
                n = this.cellsByColumn;
            e.each(function() {
                var e = t(this),
                    s = Math.floor(n.index / n.rows),
                    a = n.index % n.rows,
                    o = (s + .5) * n.columnWidth - e.outerWidth(!0) / 2,
                    r = (a + .5) * n.rowHeight - e.outerHeight(!0) / 2;
                i._pushPosition(e, o, r), n.index++
            })
        },
        _cellsByColumnGetContainerSize: function() {
            return {
                width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth
            }
        },
        _cellsByColumnResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0)
        },
        _straightAcrossReset: function() {
            this.straightAcross = {
                x: 0
            }
        },
        _straightAcrossLayout: function(e) {
            var i = this;
            e.each(function() {
                var e = t(this);
                i._pushPosition(e, i.straightAcross.x, 0), i.straightAcross.x += e.outerWidth(!0)
            })
        },
        _straightAcrossGetContainerSize: function() {
            return {
                width: this.straightAcross.x
            }
        },
        _straightAcrossResizeChanged: function() {
            return !0
        }
    }, t.fn.imagesLoaded = function(e) {
        function i() {
            e && e.call(s, a)
        }

        function n(e) {
            var s = e.target;
            s.src !== r && -1 === t.inArray(s, l) && (l.push(s), --o <= 0 && (setTimeout(i), a.unbind(".imagesLoaded", n)))
        }
        var s = this,
            a = s.find("img").add(s.filter("img")),
            o = a.length,
            r = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
            l = [];
        return o || i(), a.bind("load.imagesLoaded error.imagesLoaded", n).each(function() {
            var e = this.src;
            this.src = r, this.src = e
        }), s
    };
    var $ = function(t) {
        e.console && e.console.error(t)
    };
    t.fn.isotope = function(e, i) {
        if ("string" == typeof e) {
            var n = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var i = t.data(this, "isotope");
                return i ? t.isFunction(i[e]) && "_" !== e.charAt(0) ? void i[e].apply(i, n) : void $("no such method '" + e + "' for isotope instance") : void $("cannot call methods on isotope prior to initialization; attempted to call method '" + e + "'")
            })
        } else this.each(function() {
            var n = t.data(this, "isotope");
            n ? (n.option(e), n._init(i)) : t.data(this, "isotope", new t.Isotope(e, this, i))
        });
        return this
    }
}(window, jQuery),
function(e, t, i) {
    "function" == typeof define && define.amd ? define(["jquery"], function(n) {
        return i(n, e, t), n.mobile
    }) : i(e.jQuery, e, t)
}(this, document, function(e, t, i) {
    ! function(e, t, i, n) {
        function s(e) {
            for (; e && "undefined" != typeof e.originalEvent;) e = e.originalEvent;
            return e
        }

        function a(t, i) {
            var a, o, r, l, c, u, d, h, p, m = t.type;
            if (t = e.Event(t), t.type = i, a = t.originalEvent, o = e.event.props, m.search(/^(mouse|click)/) > -1 && (o = D), a)
                for (d = o.length, l; d;) l = o[--d], t[l] = a[l];
            if (m.search(/mouse(down|up)|click/) > -1 && !t.which && (t.which = 1), -1 !== m.search(/^touch/) && (r = s(a), m = r.touches, c = r.changedTouches, u = m && m.length ? m[0] : c && c.length ? c[0] : n, u))
                for (h = 0, p = T.length; p > h; h++) l = T[h], t[l] = u[l];
            return t
        }

        function o(t) {
            for (var i, n, s = {}; t;) {
                i = e.data(t, x);
                for (n in i) i[n] && (s[n] = s.hasVirtualBinding = !0);
                t = t.parentNode
            }
            return s
        }

        function r(t, i) {
            for (var n; t;) {
                if (n = e.data(t, x), n && (!i || n[i])) return t;
                t = t.parentNode
            }
            return null
        }

        function l() {
            B = !1
        }

        function c() {
            B = !0
        }

        function u() {
            O = 0, M.length = 0, E = !1, c()
        }

        function d() {
            l()
        }

        function h() {
            p(), P = setTimeout(function() {
                P = 0, u()
            }, e.vmouse.resetTimerDuration)
        }

        function p() {
            P && (clearTimeout(P), P = 0)
        }

        function m(t, i, n) {
            var s;
            return (n && n[t] || !n && r(i.target, t)) && (s = a(i, t), e(i.target).trigger(s)), s
        }

        function f(t) {
            var i = e.data(t.target, k);
            if (!(E || O && O === i)) {
                var n = m("v" + t.type, t);
                n && (n.isDefaultPrevented() && t.preventDefault(), n.isPropagationStopped() && t.stopPropagation(), n.isImmediatePropagationStopped() && t.stopImmediatePropagation())
            }
        }

        function g(t) {
            var i, n, a = s(t).touches;
            if (a && 1 === a.length && (i = t.target, n = o(i), n.hasVirtualBinding)) {
                O = z++, e.data(i, k, O), p(), d(), j = !1;
                var r = s(t).touches[0];
                A = r.pageX, F = r.pageY, m("vmouseover", t, n), m("vmousedown", t, n)
            }
        }

        function v(e) {
            B || (j || m("vmousecancel", e, o(e.target)), j = !0, h())
        }

        function w(t) {
            if (!B) {
                var i = s(t).touches[0],
                    n = j,
                    a = e.vmouse.moveDistanceThreshold,
                    r = o(t.target);
                j = j || Math.abs(i.pageX - A) > a || Math.abs(i.pageY - F) > a, j && !n && m("vmousecancel", t, r), m("vmousemove", t, r), h()
            }
        }

        function y(e) {
            if (!B) {
                c();
                var t, i = o(e.target);
                if (m("vmouseup", e, i), !j) {
                    var n = m("vclick", e, i);
                    n && n.isDefaultPrevented() && (t = s(e).changedTouches[0], M.push({
                        touchID: O,
                        x: t.clientX,
                        y: t.clientY
                    }), E = !0)
                }
                m("vmouseout", e, i), j = !1, h()
            }
        }

        function b(t) {
            var i, n = e.data(t, x);
            if (n)
                for (i in n)
                    if (n[i]) return !0;
            return !1
        }

        function _() {}

        function $(t) {
            var i = t.substr(1);
            return {
                setup: function() {
                    b(this) || e.data(this, x, {});
                    var n = e.data(this, x);
                    n[t] = !0, L[t] = (L[t] || 0) + 1, 1 === L[t] && H.bind(i, f), e(this).bind(i, _), N && (L.touchstart = (L.touchstart || 0) + 1, 1 === L.touchstart && H.bind("touchstart", g).bind("touchend", y).bind("touchmove", w).bind("scroll", v))
                },
                teardown: function() {
                    --L[t], L[t] || H.unbind(i, f), N && (--L.touchstart, L.touchstart || H.unbind("touchstart", g).unbind("touchmove", w).unbind("touchend", y).unbind("scroll", v));
                    var n = e(this),
                        s = e.data(this, x);
                    s && (s[t] = !1), n.unbind(i, _), b(this) || n.removeData(x)
                }
            }
        }
        var C, x = "virtualMouseBindings",
            k = "virtualTouchID",
            S = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
            T = "clientX clientY pageX pageY screenX screenY".split(" "),
            I = e.event.mouseHooks ? e.event.mouseHooks.props : [],
            D = e.event.props.concat(I),
            L = {},
            P = 0,
            A = 0,
            F = 0,
            j = !1,
            M = [],
            E = !1,
            B = !1,
            N = "addEventListener" in i,
            H = e(i),
            z = 1,
            O = 0;
        e.vmouse = {
            moveDistanceThreshold: 10,
            clickDistanceThreshold: 10,
            resetTimerDuration: 1500
        };
        for (var R = 0; R < S.length; R++) e.event.special[S[R]] = $(S[R]);
        N && i.addEventListener("click", function(t) {
            var i, n, s, a, o, r, l = M.length,
                c = t.target;
            if (l)
                for (i = t.clientX, n = t.clientY, C = e.vmouse.clickDistanceThreshold, s = c; s;) {
                    for (a = 0; l > a; a++)
                        if (o = M[a], r = 0, s === c && Math.abs(o.x - i) < C && Math.abs(o.y - n) < C || e.data(s, k) === o.touchID) return t.preventDefault(), void t.stopPropagation();
                    s = s.parentNode
                }
        }, !0)
    }(e, t, i),
    function(e) {
        e.mobile = {}
    }(e),
    function(e) {
        var t = {
            touch: "ontouchend" in i
        };
        e.mobile.support = e.mobile.support || {}, e.extend(e.support, t), e.extend(e.mobile.support, t)
    }(e),
    function(e, t, n) {
        function s(t, i, n) {
            var s = n.type;
            n.type = i, e.event.dispatch.call(t, n), n.type = s
        }
        var a = e(i);
        e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(t, i) {
            e.fn[i] = function(e) {
                return e ? this.bind(i, e) : this.trigger(i)
            }, e.attrFn && (e.attrFn[i] = !0)
        });
        var o = e.mobile.support.touch,
            r = "touchmove scroll",
            l = o ? "touchstart" : "mousedown",
            c = o ? "touchend" : "mouseup",
            u = o ? "touchmove" : "mousemove";
        e.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
                function t(e, t) {
                    i = t, s(a, i ? "scrollstart" : "scrollstop", e)
                }
                var i, n, a = this,
                    o = e(a);
                o.bind(r, function(s) {
                    e.event.special.scrollstart.enabled && (i || t(s, !0), clearTimeout(n), n = setTimeout(function() {
                        t(s, !1)
                    }, 50))
                })
            }
        }, e.event.special.tap = {
            tapholdThreshold: 750,
            setup: function() {
                var t = this,
                    i = e(t);
                i.bind("vmousedown", function(n) {
                    function o() {
                        clearTimeout(c)
                    }

                    function r() {
                        o(), i.unbind("vclick", l).unbind("vmouseup", o), a.unbind("vmousecancel", r)
                    }

                    function l(e) {
                        r(), u === e.target && s(t, "tap", e)
                    }
                    if (n.which && 1 !== n.which) return !1; {
                        var c, u = n.target;
                        n.originalEvent
                    }
                    i.bind("vmouseup", o).bind("vclick", l), a.bind("vmousecancel", r), c = setTimeout(function() {
                        s(t, "taphold", e.Event("taphold", {
                            target: u
                        }))
                    }, e.event.special.tap.tapholdThreshold)
                })
            }
        }, e.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 75,
            start: function(t) {
                var i = t.originalEvent.touches ? t.originalEvent.touches[0] : t;
                return {
                    time: (new Date).getTime(),
                    coords: [i.pageX, i.pageY],
                    origin: e(t.target)
                }
            },
            stop: function(e) {
                var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                return {
                    time: (new Date).getTime(),
                    coords: [t.pageX, t.pageY]
                }
            },
            handleSwipe: function(t, i) {
                i.time - t.time < e.event.special.swipe.durationThreshold && Math.abs(t.coords[0] - i.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(t.coords[1] - i.coords[1]) < e.event.special.swipe.verticalDistanceThreshold && t.origin.trigger("swipe").trigger(t.coords[0] > i.coords[0] ? "swipeleft" : "swiperight")
            },
            setup: function() {
                var t = this,
                    i = e(t);
                i.bind(l, function(t) {
                    function s(t) {
                        o && (a = e.event.special.swipe.stop(t), Math.abs(o.coords[0] - a.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault())
                    }
                    var a, o = e.event.special.swipe.start(t);
                    i.bind(u, s).one(c, function() {
                        i.unbind(u, s), o && a && e.event.special.swipe.handleSwipe(o, a), o = a = n
                    })
                })
            }
        }, e.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe",
            swiperight: "swipe"
        }, function(t, i) {
            e.event.special[t] = {
                setup: function() {
                    e(this).bind(i, e.noop)
                }
            }
        })
    }(e, this)
}),
function() {
    var e = $.support.touch,
        t = e ? "touchstart" : "mousedown",
        i = e ? "touchend" : "mouseup",
        n = e ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var e = this,
                s = $(e);
            s.bind(t, function(e) {
                function t(e) {
                    if (r) {
                        var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                        a = {
                            time: (new Date).getTime(),
                            coords: [t.pageX, t.pageY]
                        }, r.coords[1] > a.coords[1] && $("body").hasClass("page-template-page-templatesfront-page-php") && e.preventDefault()
                    }
                }
                var a, o = e.originalEvent.touches ? e.originalEvent.touches[0] : e,
                    r = {
                        time: (new Date).getTime(),
                        coords: [o.pageX, o.pageY],
                        origin: $(e.target)
                    };
                s.bind(n, t).one(i, function() {
                    s.unbind(n, t), r && a && a.time - r.time < 1e3 && Math.abs(r.coords[1] - a.coords[1]) > 30 && Math.abs(r.coords[0] - a.coords[0]) < 75 && r.origin.trigger("swipeupdown").trigger(r.coords[1] > a.coords[1] ? "swipeup" : "swipedown"), r = a = void 0
                })
            })
        }
    }, $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(e, t) {
        $.event.special[e] = {
            setup: function() {
                $(this).bind(t, $.noop)
            }
        }
    })
}(),
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
function(e, t, i) {
    function n(e) {
        return e = e || location.href, "#" + e.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var s, a = "hashchange",
        o = document,
        r = e.event.special,
        l = o.documentMode,
        c = "on" + a in t && (l === i || l > 7);
    e.fn[a] = function(e) {
        return e ? this.bind(a, e) : this.trigger(a)
    }, e.fn[a].delay = 50, r[a] = e.extend(r[a], {
        setup: function() {
            return c ? !1 : void e(s.start)
        },
        teardown: function() {
            return c ? !1 : void e(s.stop)
        }
    }), s = function() {
        function s() {
            var i = n(),
                o = p(u);
            i !== u ? (h(u = i, o), e(t).trigger(a)) : o !== u && (location.href = location.href.replace(/#.*/, "") + o), r = setTimeout(s, e.fn[a].delay)
        }
        var r, l = {},
            u = n(),
            d = function(e) {
                return e
            },
            h = d,
            p = d;
        return l.start = function() {
            r || s()
        }, l.stop = function() {
            r && clearTimeout(r), r = i
        }, e.browser.msie && !c && function() {
            var t, i;
            l.start = function() {
                t || (i = e.fn[a].src, i = i && i + n(), t = e('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                    i || h(n()), s()
                }).attr("src", i || "javascript:0").insertAfter("body")[0].contentWindow, o.onpropertychange = function() {
                    try {
                        "title" === event.propertyName && (t.document.title = o.title)
                    } catch (e) {}
                })
            }, l.stop = d, p = function() {
                return n(t.location.href)
            }, h = function(i, n) {
                var s = t.document,
                    r = e.fn[a].domain;
                i !== n && (s.title = o.title, s.open(), r && s.write('<script>document.domain="' + r + '"</script>'), s.close(), t.location.hash = i)
            }
        }(), l
    }()
}(jQuery, this),
/*
 * jQuery FlexSlider v2.4.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
! function(e) {
    e.flexslider = function(t, i) {
        var n = e(t);
        n.vars = e.extend({}, e.flexslider.defaults, i);
        var s, a = n.vars.namespace,
            o = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
            r = ("ontouchstart" in window || o || window.DocumentTouch && document instanceof DocumentTouch) && n.vars.touch,
            l = "click touchend MSPointerUp keyup",
            c = "",
            u = "vertical" === n.vars.direction,
            d = n.vars.reverse,
            h = n.vars.itemWidth > 0,
            p = "fade" === n.vars.animation,
            m = "" !== n.vars.asNavFor,
            f = {},
            g = !0;
        e.data(t, "flexslider", n), f = {
            init: function() {
                n.animating = !1, n.currentSlide = parseInt(n.vars.startAt ? n.vars.startAt : 0, 10), isNaN(n.currentSlide) && (n.currentSlide = 0), n.animatingTo = n.currentSlide, n.atEnd = 0 === n.currentSlide || n.currentSlide === n.last, n.containerSelector = n.vars.selector.substr(0, n.vars.selector.search(" ")), n.slides = e(n.vars.selector, n), n.container = e(n.containerSelector, n), n.count = n.slides.length, n.syncExists = e(n.vars.sync).length > 0, "slide" === n.vars.animation && (n.vars.animation = "swing"), n.prop = u ? "top" : "marginLeft", n.args = {}, n.manualPause = !1, n.stopped = !1, n.started = !1, n.startTimeout = null, n.transitions = !n.vars.video && !p && n.vars.useCSS && function() {
                    var e = document.createElement("div"),
                        t = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var i in t)
                        if (void 0 !== e.style[t[i]]) return n.pfx = t[i].replace("Perspective", "").toLowerCase(), n.prop = "-" + n.pfx + "-transform", !0;
                    return !1
                }(), n.ensureAnimationEnd = "", "" !== n.vars.controlsContainer && (n.controlsContainer = e(n.vars.controlsContainer).length > 0 && e(n.vars.controlsContainer)), "" !== n.vars.manualControls && (n.manualControls = e(n.vars.manualControls).length > 0 && e(n.vars.manualControls)), n.vars.randomize && (n.slides.sort(function() {
                    return Math.round(Math.random()) - .5
                }), n.container.empty().append(n.slides)), n.doMath(), n.setup("init"), n.vars.controlNav && f.controlNav.setup(), n.vars.directionNav && f.directionNav.setup(), n.vars.keyboard && (1 === e(n.containerSelector).length || n.vars.multipleKeyboard) && e(document).bind("keyup", function(e) {
                    var t = e.keyCode;
                    if (!n.animating && (39 === t || 37 === t)) {
                        var i = 39 === t ? n.getTarget("next") : 37 === t ? n.getTarget("prev") : !1;
                        n.flexAnimate(i, n.vars.pauseOnAction)
                    }
                }), n.vars.mousewheel && n.bind("mousewheel", function(e, t) {
                    e.preventDefault();
                    var i = n.getTarget(0 > t ? "next" : "prev");
                    n.flexAnimate(i, n.vars.pauseOnAction)
                }), n.vars.pausePlay && f.pausePlay.setup(), n.vars.slideshow && n.vars.pauseInvisible && f.pauseInvisible.init(), n.vars.slideshow && (n.vars.pauseOnHover && n.hover(function() {
                    n.manualPlay || n.manualPause || n.pause()
                }, function() {
                    n.manualPause || n.manualPlay || n.stopped || n.play()
                }), n.vars.pauseInvisible && f.pauseInvisible.isHidden() || (n.vars.initDelay > 0 ? n.startTimeout = setTimeout(n.play, n.vars.initDelay) : n.play())), m && f.asNav.setup(), r && n.vars.touch && f.touch(), (!p || p && n.vars.smoothHeight) && e(window).bind("resize orientationchange focus", f.resize), n.find("img").attr("draggable", "false"), setTimeout(function() {
                    n.vars.start(n)
                }, 200)
            },
            asNav: {
                setup: function() {
                    n.asNav = !0, n.animatingTo = Math.floor(n.currentSlide / n.move), n.currentItem = n.currentSlide, n.slides.removeClass(a + "active-slide").eq(n.currentItem).addClass(a + "active-slide"), o ? (t._slider = n, n.slides.each(function() {
                        var t = this;
                        t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", function(e) {
                            e.preventDefault(), e.currentTarget._gesture && e.currentTarget._gesture.addPointer(e.pointerId)
                        }, !1), t.addEventListener("MSGestureTap", function(t) {
                            t.preventDefault();
                            var i = e(this),
                                s = i.index();
                            e(n.vars.asNavFor).data("flexslider").animating || i.hasClass("active") || (n.direction = n.currentItem < s ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction, !1, !0, !0))
                        })
                    })) : n.slides.on(l, function(t) {
                        t.preventDefault();
                        var i = e(this),
                            s = i.index(),
                            o = i.offset().left - e(n).scrollLeft();
                        0 >= o && i.hasClass(a + "active-slide") ? n.flexAnimate(n.getTarget("prev"), !0) : e(n.vars.asNavFor).data("flexslider").animating || i.hasClass(a + "active-slide") || (n.direction = n.currentItem < s ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction, !1, !0, !0))
                    })
                }
            },
            controlNav: {
                setup: function() {
                    n.manualControls ? f.controlNav.setupManual() : f.controlNav.setupPaging()
                },
                setupPaging: function() {
                    var t, i, s = "thumbnails" === n.vars.controlNav ? "control-thumbs" : "control-paging",
                        o = 1;
                    if (n.controlNavScaffold = e('<ol class="' + a + "control-nav " + a + s + '"></ol>'), n.pagingCount > 1)
                        for (var r = 0; r < n.pagingCount; r++) {
                            if (i = n.slides.eq(r), t = "thumbnails" === n.vars.controlNav ? '<img src="' + i.attr("data-thumb") + '"/>' : "<a>" + o + "</a>", "thumbnails" === n.vars.controlNav && !0 === n.vars.thumbCaptions) {
                                var u = i.attr("data-thumbcaption");
                                "" != u && void 0 != u && (t += '<span class="' + a + 'caption">' + u + "</span>")
                            }
                            n.controlNavScaffold.append("<li>" + t + "</li>"), o++
                        }
                    n.controlsContainer ? e(n.controlsContainer).append(n.controlNavScaffold) : n.append(n.controlNavScaffold), f.controlNav.set(), f.controlNav.active(), n.controlNavScaffold.delegate("a, img", l, function(t) {
                        if (t.preventDefault(), "" === c || c === t.type) {
                            var i = e(this),
                                s = n.controlNav.index(i);
                            i.hasClass(a + "active") || (n.direction = s > n.currentSlide ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction))
                        }
                        "" === c && (c = t.type), f.setToClearWatchedEvent()
                    })
                },
                setupManual: function() {
                    n.controlNav = n.manualControls, f.controlNav.active(), n.controlNav.bind(l, function(t) {
                        if (t.preventDefault(), "" === c || c === t.type) {
                            var i = e(this),
                                s = n.controlNav.index(i);
                            i.hasClass(a + "active") || (n.direction = s > n.currentSlide ? "next" : "prev", n.flexAnimate(s, n.vars.pauseOnAction))
                        }
                        "" === c && (c = t.type), f.setToClearWatchedEvent()
                    })
                },
                set: function() {
                    var t = "thumbnails" === n.vars.controlNav ? "img" : "a";
                    n.controlNav = e("." + a + "control-nav li " + t, n.controlsContainer ? n.controlsContainer : n)
                },
                active: function() {
                    n.controlNav.removeClass(a + "active").eq(n.animatingTo).addClass(a + "active")
                },
                update: function(t, i) {
                    n.pagingCount > 1 && "add" === t ? n.controlNavScaffold.append(e("<li><a>" + n.count + "</a></li>")) : 1 === n.pagingCount ? n.controlNavScaffold.find("li").remove() : n.controlNav.eq(i).closest("li").remove(), f.controlNav.set(), n.pagingCount > 1 && n.pagingCount !== n.controlNav.length ? n.update(i, t) : f.controlNav.active()
                }
            },
            directionNav: {
                setup: function() {
                    var t = e('<ul class="' + a + 'direction-nav"><li class="' + a + 'nav-prev"><a class="' + a + 'prev" href="#">' + n.vars.prevText + '</a></li><li class="' + a + 'nav-next"><a class="' + a + 'next" href="#">' + n.vars.nextText + "</a></li></ul>");
                    n.controlsContainer ? (e(n.controlsContainer).append(t), n.directionNav = e("." + a + "direction-nav li a", n.controlsContainer)) : (n.append(t), n.directionNav = e("." + a + "direction-nav li a", n)), f.directionNav.update(), n.directionNav.bind(l, function(t) {
                        t.preventDefault();
                        var i;
                        ("" === c || c === t.type) && (i = n.getTarget(e(this).hasClass(a + "next") ? "next" : "prev"), n.flexAnimate(i, n.vars.pauseOnAction)), "" === c && (c = t.type), f.setToClearWatchedEvent()
                    })
                },
                update: function() {
                    var e = a + "disabled";
                    1 === n.pagingCount ? n.directionNav.addClass(e).attr("tabindex", "-1") : n.vars.animationLoop ? n.directionNav.removeClass(e).removeAttr("tabindex") : 0 === n.animatingTo ? n.directionNav.removeClass(e).filter("." + a + "prev").addClass(e).attr("tabindex", "-1") : n.animatingTo === n.last ? n.directionNav.removeClass(e).filter("." + a + "next").addClass(e).attr("tabindex", "-1") : n.directionNav.removeClass(e).removeAttr("tabindex")
                }
            },
            pausePlay: {
                setup: function() {
                    var t = e('<div class="' + a + 'pauseplay"><a></a></div>');
                    n.controlsContainer ? (n.controlsContainer.append(t), n.pausePlay = e("." + a + "pauseplay a", n.controlsContainer)) : (n.append(t), n.pausePlay = e("." + a + "pauseplay a", n)), f.pausePlay.update(n.vars.slideshow ? a + "pause" : a + "play"), n.pausePlay.bind(l, function(t) {
                        t.preventDefault(), ("" === c || c === t.type) && (e(this).hasClass(a + "pause") ? (n.manualPause = !0, n.manualPlay = !1, n.pause()) : (n.manualPause = !1, n.manualPlay = !0, n.play())), "" === c && (c = t.type), f.setToClearWatchedEvent()
                    })
                },
                update: function(e) {
                    "play" === e ? n.pausePlay.removeClass(a + "pause").addClass(a + "play").html(n.vars.playText) : n.pausePlay.removeClass(a + "play").addClass(a + "pause").html(n.vars.pauseText)
                }
            },
            touch: function() {
                function e(e) {
                    n.animating ? e.preventDefault() : (window.navigator.msPointerEnabled || 1 === e.touches.length) && (n.pause(), g = u ? n.h : n.w, w = Number(new Date), b = e.touches[0].pageX, _ = e.touches[0].pageY, f = h && d && n.animatingTo === n.last ? 0 : h && d ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : h && n.currentSlide === n.last ? n.limit : h ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : d ? (n.last - n.currentSlide + n.cloneOffset) * g : (n.currentSlide + n.cloneOffset) * g, c = u ? _ : b, m = u ? b : _, t.addEventListener("touchmove", i, !1), t.addEventListener("touchend", s, !1))
                }

                function i(e) {
                    b = e.touches[0].pageX, _ = e.touches[0].pageY, v = u ? c - _ : c - b, y = u ? Math.abs(v) < Math.abs(b - m) : Math.abs(v) < Math.abs(_ - m);
                    var t = 500;
                    (!y || Number(new Date) - w > t) && (e.preventDefault(), !p && n.transitions && (n.vars.animationLoop || (v /= 0 === n.currentSlide && 0 > v || n.currentSlide === n.last && v > 0 ? Math.abs(v) / g + 2 : 1), n.setProps(f + v, "setTouch")))
                }

                function s() {
                    if (t.removeEventListener("touchmove", i, !1), n.animatingTo === n.currentSlide && !y && null !== v) {
                        var e = d ? -v : v,
                            a = n.getTarget(e > 0 ? "next" : "prev");
                        n.canAdvance(a) && (Number(new Date) - w < 550 && Math.abs(e) > 50 || Math.abs(e) > g / 2) ? n.flexAnimate(a, n.vars.pauseOnAction) : p || n.flexAnimate(n.currentSlide, n.vars.pauseOnAction, !0)
                    }
                    t.removeEventListener("touchend", s, !1), c = null, m = null, v = null, f = null
                }

                function a(e) {
                    e.stopPropagation(), n.animating ? e.preventDefault() : (n.pause(), t._gesture.addPointer(e.pointerId), $ = 0, g = u ? n.h : n.w, w = Number(new Date), f = h && d && n.animatingTo === n.last ? 0 : h && d ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : h && n.currentSlide === n.last ? n.limit : h ? (n.itemW + n.vars.itemMargin) * n.move * n.currentSlide : d ? (n.last - n.currentSlide + n.cloneOffset) * g : (n.currentSlide + n.cloneOffset) * g)
                }

                function r(e) {
                    e.stopPropagation();
                    var i = e.target._slider;
                    if (i) {
                        var n = -e.translationX,
                            s = -e.translationY;
                        return $ += u ? s : n, v = $, y = u ? Math.abs($) < Math.abs(-n) : Math.abs($) < Math.abs(-s), e.detail === e.MSGESTURE_FLAG_INERTIA ? void setImmediate(function() {
                            t._gesture.stop()
                        }) : void((!y || Number(new Date) - w > 500) && (e.preventDefault(), !p && i.transitions && (i.vars.animationLoop || (v = $ / (0 === i.currentSlide && 0 > $ || i.currentSlide === i.last && $ > 0 ? Math.abs($) / g + 2 : 1)), i.setProps(f + v, "setTouch"))))
                    }
                }

                function l(e) {
                    e.stopPropagation();
                    var t = e.target._slider;
                    if (t) {
                        if (t.animatingTo === t.currentSlide && !y && null !== v) {
                            var i = d ? -v : v,
                                n = t.getTarget(i > 0 ? "next" : "prev");
                            t.canAdvance(n) && (Number(new Date) - w < 550 && Math.abs(i) > 50 || Math.abs(i) > g / 2) ? t.flexAnimate(n, t.vars.pauseOnAction) : p || t.flexAnimate(t.currentSlide, t.vars.pauseOnAction, !0)
                        }
                        c = null, m = null, v = null, f = null, $ = 0
                    }
                }
                var c, m, f, g, v, w, y = !1,
                    b = 0,
                    _ = 0,
                    $ = 0;
                o ? (t.style.msTouchAction = "none", t._gesture = new MSGesture, t._gesture.target = t, t.addEventListener("MSPointerDown", a, !1), t._slider = n, t.addEventListener("MSGestureChange", r, !1), t.addEventListener("MSGestureEnd", l, !1)) : t.addEventListener("touchstart", e, !1)
            },
            resize: function() {
                !n.animating && n.is(":visible") && (h || n.doMath(), p ? f.smoothHeight() : h ? (n.slides.width(n.computedW), n.update(n.pagingCount), n.setProps()) : u ? (n.viewport.height(n.h), n.setProps(n.h, "setTotal")) : (n.vars.smoothHeight && f.smoothHeight(), n.newSlides.width(n.computedW), n.setProps(n.computedW, "setTotal")))
            },
            smoothHeight: function(e) {
                if (!u || p) {
                    var t = p ? n : n.viewport;
                    e ? t.animate({
                        height: n.slides.eq(n.animatingTo).height()
                    }, e) : t.height(n.slides.eq(n.animatingTo).height())
                }
            },
            sync: function(t) {
                var i = e(n.vars.sync).data("flexslider"),
                    s = n.animatingTo;
                switch (t) {
                    case "animate":
                        i.flexAnimate(s, n.vars.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        i.playing || i.asNav || i.play();
                        break;
                    case "pause":
                        i.pause()
                }
            },
            uniqueID: function(t) {
                return t.filter("[id]").add(t.find("[id]")).each(function() {
                    var t = e(this);
                    t.attr("id", t.attr("id") + "_clone")
                }), t
            },
            pauseInvisible: {
                visProp: null,
                init: function() {
                    var e = f.pauseInvisible.getHiddenProp();
                    if (e) {
                        var t = e.replace(/[H|h]idden/, "") + "visibilitychange";
                        document.addEventListener(t, function() {
                            f.pauseInvisible.isHidden() ? n.startTimeout ? clearTimeout(n.startTimeout) : n.pause() : n.started ? n.play() : n.vars.initDelay > 0 ? setTimeout(n.play, n.vars.initDelay) : n.play()
                        })
                    }
                },
                isHidden: function() {
                    var e = f.pauseInvisible.getHiddenProp();
                    return e ? document[e] : !1
                },
                getHiddenProp: function() {
                    var e = ["webkit", "moz", "ms", "o"];
                    if ("hidden" in document) return "hidden";
                    for (var t = 0; t < e.length; t++)
                        if (e[t] + "Hidden" in document) return e[t] + "Hidden";
                    return null
                }
            },
            setToClearWatchedEvent: function() {
                clearTimeout(s), s = setTimeout(function() {
                    c = ""
                }, 3e3)
            }
        }, n.flexAnimate = function(t, i, s, o, l) {
            if (n.vars.animationLoop || t === n.currentSlide || (n.direction = t > n.currentSlide ? "next" : "prev"), m && 1 === n.pagingCount && (n.direction = n.currentItem < t ? "next" : "prev"), !n.animating && (n.canAdvance(t, l) || s) && n.is(":visible")) {
                if (m && o) {
                    var c = e(n.vars.asNavFor).data("flexslider");
                    if (n.atEnd = 0 === t || t === n.count - 1, c.flexAnimate(t, !0, !1, !0, l), n.direction = n.currentItem < t ? "next" : "prev", c.direction = n.direction, Math.ceil((t + 1) / n.visible) - 1 === n.currentSlide || 0 === t) return n.currentItem = t, n.slides.removeClass(a + "active-slide").eq(t).addClass(a + "active-slide"), !1;
                    n.currentItem = t, n.slides.removeClass(a + "active-slide").eq(t).addClass(a + "active-slide"), t = Math.floor(t / n.visible)
                }
                if (n.animating = !0, n.animatingTo = t, i && n.pause(), n.vars.before(n), n.syncExists && !l && f.sync("animate"), n.vars.controlNav && f.controlNav.active(), h || n.slides.removeClass(a + "active-slide").eq(t).addClass(a + "active-slide"), n.atEnd = 0 === t || t === n.last, n.vars.directionNav && f.directionNav.update(), t === n.last && (n.vars.end(n), n.vars.animationLoop || n.pause()), p) r ? (n.slides.eq(n.currentSlide).css({
                    opacity: 0,
                    zIndex: 1
                }), n.slides.eq(t).css({
                    opacity: 1,
                    zIndex: 2
                }), n.wrapup(y)) : (n.slides.eq(n.currentSlide).css({
                    zIndex: 1
                }).animate({
                    opacity: 0
                }, n.vars.animationSpeed, n.vars.easing), n.slides.eq(t).css({
                    zIndex: 2
                }).animate({
                    opacity: 1
                }, n.vars.animationSpeed, n.vars.easing, n.wrapup));
                else {
                    var g, v, w, y = u ? n.slides.filter(":first").height() : n.computedW;
                    h ? (g = n.vars.itemMargin, w = (n.itemW + g) * n.move * n.animatingTo, v = w > n.limit && 1 !== n.visible ? n.limit : w) : v = 0 === n.currentSlide && t === n.count - 1 && n.vars.animationLoop && "next" !== n.direction ? d ? (n.count + n.cloneOffset) * y : 0 : n.currentSlide === n.last && 0 === t && n.vars.animationLoop && "prev" !== n.direction ? d ? 0 : (n.count + 1) * y : d ? (n.count - 1 - t + n.cloneOffset) * y : (t + n.cloneOffset) * y, n.setProps(v, "", n.vars.animationSpeed), n.transitions ? (n.vars.animationLoop && n.atEnd || (n.animating = !1, n.currentSlide = n.animatingTo), n.container.unbind("webkitTransitionEnd transitionend"), n.container.bind("webkitTransitionEnd transitionend", function() {
                        clearTimeout(n.ensureAnimationEnd), n.wrapup(y)
                    }), clearTimeout(n.ensureAnimationEnd), n.ensureAnimationEnd = setTimeout(function() {
                        n.wrapup(y)
                    }, n.vars.animationSpeed + 100)) : n.container.animate(n.args, n.vars.animationSpeed, n.vars.easing, function() {
                        n.wrapup(y)
                    })
                }
                n.vars.smoothHeight && f.smoothHeight(n.vars.animationSpeed)
            }
        }, n.wrapup = function(e) {
            p || h || (0 === n.currentSlide && n.animatingTo === n.last && n.vars.animationLoop ? n.setProps(e, "jumpEnd") : n.currentSlide === n.last && 0 === n.animatingTo && n.vars.animationLoop && n.setProps(e, "jumpStart")), n.animating = !1, n.currentSlide = n.animatingTo, n.vars.after(n)
        }, n.animateSlides = function() {
            !n.animating && g && n.flexAnimate(n.getTarget("next"))
        }, n.pause = function() {
            clearInterval(n.animatedSlides), n.animatedSlides = null, n.playing = !1, n.vars.pausePlay && f.pausePlay.update("play"), n.syncExists && f.sync("pause")
        }, n.play = function() {
            n.playing && clearInterval(n.animatedSlides), n.animatedSlides = n.animatedSlides || setInterval(n.animateSlides, n.vars.slideshowSpeed), n.started = n.playing = !0, n.vars.pausePlay && f.pausePlay.update("pause"), n.syncExists && f.sync("play")
        }, n.stop = function() {
            n.pause(), n.stopped = !0
        }, n.canAdvance = function(e, t) {
            var i = m ? n.pagingCount - 1 : n.last;
            return t ? !0 : m && n.currentItem === n.count - 1 && 0 === e && "prev" === n.direction ? !0 : m && 0 === n.currentItem && e === n.pagingCount - 1 && "next" !== n.direction ? !1 : e !== n.currentSlide || m ? n.vars.animationLoop ? !0 : n.atEnd && 0 === n.currentSlide && e === i && "next" !== n.direction ? !1 : n.atEnd && n.currentSlide === i && 0 === e && "next" === n.direction ? !1 : !0 : !1
        }, n.getTarget = function(e) {
            return n.direction = e, "next" === e ? n.currentSlide === n.last ? 0 : n.currentSlide + 1 : 0 === n.currentSlide ? n.last : n.currentSlide - 1
        }, n.setProps = function(e, t, i) {
            var s = function() {
                var i = e ? e : (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo,
                    s = function() {
                        if (h) return "setTouch" === t ? e : d && n.animatingTo === n.last ? 0 : d ? n.limit - (n.itemW + n.vars.itemMargin) * n.move * n.animatingTo : n.animatingTo === n.last ? n.limit : i;
                        switch (t) {
                            case "setTotal":
                                return d ? (n.count - 1 - n.currentSlide + n.cloneOffset) * e : (n.currentSlide + n.cloneOffset) * e;
                            case "setTouch":
                                return d ? e : e;
                            case "jumpEnd":
                                return d ? e : n.count * e;
                            case "jumpStart":
                                return d ? n.count * e : e;
                            default:
                                return e
                        }
                    }();
                return -1 * s + "px"
            }();
            n.transitions && (s = u ? "translate3d(0," + s + ",0)" : "translate3d(" + s + ",0,0)", i = void 0 !== i ? i / 1e3 + "s" : "0s", n.container.css("-" + n.pfx + "-transition-duration", i), n.container.css("transition-duration", i)), n.args[n.prop] = s, (n.transitions || void 0 === i) && n.container.css(n.args), n.container.css("transform", s)
        }, n.setup = function(t) {
            if (p) n.slides.css({
                width: "100%",
                "float": "left",
                marginRight: "-100%",
                position: "relative"
            }), "init" === t && (r ? n.slides.css({
                opacity: 0,
                display: "block",
                webkitTransition: "opacity " + n.vars.animationSpeed / 1e3 + "s ease",
                zIndex: 1
            }).eq(n.currentSlide).css({
                opacity: 1,
                zIndex: 2
            }) : 0 == n.vars.fadeFirstSlide ? n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).css({
                opacity: 1
            }) : n.slides.css({
                opacity: 0,
                display: "block",
                zIndex: 1
            }).eq(n.currentSlide).css({
                zIndex: 2
            }).animate({
                opacity: 1
            }, n.vars.animationSpeed, n.vars.easing)), n.vars.smoothHeight && f.smoothHeight();
            else {
                var i, s;
                "init" === t && (n.viewport = e('<div class="' + a + 'viewport"></div>').css({
                    overflow: "hidden",
                    position: "relative"
                }).appendTo(n).append(n.container), n.cloneCount = 0, n.cloneOffset = 0, d && (s = e.makeArray(n.slides).reverse(), n.slides = e(s), n.container.empty().append(n.slides))), n.vars.animationLoop && !h && (n.cloneCount = 2, n.cloneOffset = 1, "init" !== t && n.container.find(".clone").remove(), n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden", "true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden", "true"))), n.newSlides = e(n.vars.selector, n), i = d ? n.count - 1 - n.currentSlide + n.cloneOffset : n.currentSlide + n.cloneOffset, u && !h ? (n.container.height(200 * (n.count + n.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
                    n.newSlides.css({
                        display: "block"
                    }), n.doMath(), n.viewport.height(n.h), n.setProps(i * n.h, "init")
                }, "init" === t ? 100 : 0)) : (n.container.width(200 * (n.count + n.cloneCount) + "%"), n.setProps(i * n.computedW, "init"), setTimeout(function() {
                    n.doMath(), n.newSlides.css({
                        width: n.computedW,
                        "float": "left",
                        display: "block"
                    }), n.vars.smoothHeight && f.smoothHeight()
                }, "init" === t ? 100 : 0))
            }
            h || n.slides.removeClass(a + "active-slide").eq(n.currentSlide).addClass(a + "active-slide"), n.vars.init(n)
        }, n.doMath = function() {
            var e = n.slides.first(),
                t = n.vars.itemMargin,
                i = n.vars.minItems,
                s = n.vars.maxItems;
            n.w = void 0 === n.viewport ? n.width() : n.viewport.width(), n.h = e.height(), n.boxPadding = e.outerWidth() - e.width(), h ? (n.itemT = n.vars.itemWidth + t, n.minW = i ? i * n.itemT : n.w, n.maxW = s ? s * n.itemT - t : n.w, n.itemW = n.minW > n.w ? (n.w - t * (i - 1)) / i : n.maxW < n.w ? (n.w - t * (s - 1)) / s : n.vars.itemWidth > n.w ? n.w : n.vars.itemWidth, n.visible = Math.floor(n.w / n.itemW), n.move = n.vars.move > 0 && n.vars.move < n.visible ? n.vars.move : n.visible, n.pagingCount = Math.ceil((n.count - n.visible) / n.move + 1), n.last = n.pagingCount - 1, n.limit = 1 === n.pagingCount ? 0 : n.vars.itemWidth > n.w ? n.itemW * (n.count - 1) + t * (n.count - 1) : (n.itemW + t) * n.count - n.w - t) : (n.itemW = n.w, n.pagingCount = n.count, n.last = n.count - 1), n.computedW = n.itemW - n.boxPadding
        }, n.update = function(e, t) {
            n.doMath(), h || (e < n.currentSlide ? n.currentSlide += 1 : e <= n.currentSlide && 0 !== e && (n.currentSlide -= 1), n.animatingTo = n.currentSlide), n.vars.controlNav && !n.manualControls && ("add" === t && !h || n.pagingCount > n.controlNav.length ? f.controlNav.update("add") : ("remove" === t && !h || n.pagingCount < n.controlNav.length) && (h && n.currentSlide > n.last && (n.currentSlide -= 1, n.animatingTo -= 1), f.controlNav.update("remove", n.last))), n.vars.directionNav && f.directionNav.update()
        }, n.addSlide = function(t, i) {
            var s = e(t);
            n.count += 1, n.last = n.count - 1, u && d ? void 0 !== i ? n.slides.eq(n.count - i).after(s) : n.container.prepend(s) : void 0 !== i ? n.slides.eq(i).before(s) : n.container.append(s), n.update(i, "add"), n.slides = e(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.added(n)
        }, n.removeSlide = function(t) {
            var i = isNaN(t) ? n.slides.index(e(t)) : t;
            n.count -= 1, n.last = n.count - 1, isNaN(t) ? e(t, n.slides).remove() : u && d ? n.slides.eq(n.last).remove() : n.slides.eq(t).remove(), n.doMath(), n.update(i, "remove"), n.slides = e(n.vars.selector + ":not(.clone)", n), n.setup(), n.vars.removed(n)
        }, f.init()
    }, e(window).blur(function() {
        focused = !1
    }).focus(function() {
        focused = !0
    }), e.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        fadeFirstSlide: !0,
        thumbCaptions: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        pauseInvisible: !0,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "Previous",
        nextText: "Next",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 1,
        maxItems: 0,
        move: 0,
        allowOneSlide: !0,
        start: function() {},
        before: function() {},
        after: function() {},
        end: function() {},
        added: function() {},
        removed: function() {},
        init: function() {}
    }, e.fn.flexslider = function(t) {
        if (void 0 === t && (t = {}), "object" == typeof t) return this.each(function() {
            var i = e(this),
                n = t.selector ? t.selector : ".slides > li",
                s = i.find(n);
            1 === s.length && t.allowOneSlide === !0 || 0 === s.length ? (s.fadeIn(400), t.start && t.start(i)) : void 0 === i.data("flexslider") && new e.flexslider(this, t)
        });
        var i = e(this).data("flexslider");
        switch (t) {
            case "play":
                i.play();
                break;
            case "pause":
                i.pause();
                break;
            case "stop":
                i.stop();
                break;
            case "next":
                i.flexAnimate(i.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                i.flexAnimate(i.getTarget("prev"), !0);
                break;
            default:
                "number" == typeof t && i.flexAnimate(t, !0)
        }
    }
}(jQuery),
/*
 *  jQuery OwlCarousel v1.3.3
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */
"function" != typeof Object.create && (Object.create = function(e) {
        function t() {}
        return t.prototype = e, new t
    }),
    function(e, t, i) {
        var n = {
            init: function(t, i) {
                var n = this;
                n.$elem = e(i), n.options = e.extend({}, e.fn.owlCarousel.options, n.$elem.data(), t), n.userOptions = t, n.loadContent()
            },
            loadContent: function() {
                function t(e) {
                    var t, i = "";
                    if ("function" == typeof n.options.jsonSuccess) n.options.jsonSuccess.apply(this, [e]);
                    else {
                        for (t in e.owl) e.owl.hasOwnProperty(t) && (i += e.owl[t].item);
                        n.$elem.html(i)
                    }
                    n.logIn()
                }
                var i, n = this;
                "function" == typeof n.options.beforeInit && n.options.beforeInit.apply(this, [n.$elem]), "string" == typeof n.options.jsonPath ? (i = n.options.jsonPath, e.getJSON(i, t)) : n.logIn()
            },
            logIn: function() {
                var e = this;
                e.$elem.data({
                    "owl-originalStyles": e.$elem.attr("style"),
                    "owl-originalClasses": e.$elem.attr("class")
                }), e.$elem.css({
                    opacity: 0
                }), e.orignalItems = e.options.items, e.checkBrowser(), e.wrapperWidth = 0, e.checkVisible = null, e.setVars()
            },
            setVars: function() {
                var e = this;
                return 0 === e.$elem.children().length ? !1 : (e.baseClass(), e.eventTypes(), e.$userItems = e.$elem.children(), e.itemsAmount = e.$userItems.length, e.wrapItems(), e.$owlItems = e.$elem.find(".owl-item"), e.$owlWrapper = e.$elem.find(".owl-wrapper"), e.playDirection = "next", e.prevItem = 0, e.prevArr = [0], e.currentItem = 0, e.customEvents(), void e.onStartup())
            },
            onStartup: function() {
                var e = this;
                e.updateItems(), e.calculateAll(), e.buildControls(), e.updateControls(), e.response(), e.moveEvents(), e.stopOnHover(), e.owlStatus(), e.options.transitionStyle !== !1 && e.transitionTypes(e.options.transitionStyle), e.options.autoPlay === !0 && (e.options.autoPlay = 5e3), e.play(), e.$elem.find(".owl-wrapper").css("display", "block"), e.$elem.is(":visible") ? e.$elem.css("opacity", 1) : e.watchVisibility(), e.onstartup = !1, e.eachMoveUpdate(), "function" == typeof e.options.afterInit && e.options.afterInit.apply(this, [e.$elem])
            },
            eachMoveUpdate: function() {
                var e = this;
                e.options.lazyLoad === !0 && e.lazyLoad(), e.options.autoHeight === !0 && e.autoHeight(), e.onVisibleItems(), "function" == typeof e.options.afterAction && e.options.afterAction.apply(this, [e.$elem])
            },
            updateVars: function() {
                var e = this;
                "function" == typeof e.options.beforeUpdate && e.options.beforeUpdate.apply(this, [e.$elem]), e.watchVisibility(), e.updateItems(), e.calculateAll(), e.updatePosition(), e.updateControls(), e.eachMoveUpdate(), "function" == typeof e.options.afterUpdate && e.options.afterUpdate.apply(this, [e.$elem])
            },
            reload: function() {
                var e = this;
                t.setTimeout(function() {
                    e.updateVars()
                }, 0)
            },
            watchVisibility: function() {
                var e = this;
                return e.$elem.is(":visible") !== !1 ? !1 : (e.$elem.css({
                    opacity: 0
                }), t.clearInterval(e.autoPlayInterval), t.clearInterval(e.checkVisible), void(e.checkVisible = t.setInterval(function() {
                    e.$elem.is(":visible") && (e.reload(), e.$elem.animate({
                        opacity: 1
                    }, 200), t.clearInterval(e.checkVisible))
                }, 500)))
            },
            wrapItems: function() {
                var e = this;
                e.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), e.wrapperOuter = e.$elem.find(".owl-wrapper-outer"), e.$elem.css("display", "block")
            },
            baseClass: function() {
                var e = this,
                    t = e.$elem.hasClass(e.options.baseClass),
                    i = e.$elem.hasClass(e.options.theme);
                t || e.$elem.addClass(e.options.baseClass), i || e.$elem.addClass(e.options.theme)
            },
            updateItems: function() {
                var t, i, n = this;
                if (n.options.responsive === !1) return !1;
                if (n.options.singleItem === !0) return n.options.items = n.orignalItems = 1, n.options.itemsCustom = !1, n.options.itemsDesktop = !1, n.options.itemsDesktopSmall = !1, n.options.itemsTablet = !1, n.options.itemsTabletSmall = !1, n.options.itemsMobile = !1, !1;
                if (t = e(n.options.responsiveBaseWidth).width(), t > (n.options.itemsDesktop[0] || n.orignalItems) && (n.options.items = n.orignalItems), n.options.itemsCustom !== !1)
                    for (n.options.itemsCustom.sort(function(e, t) {
                            return e[0] - t[0]
                        }), i = 0; i < n.options.itemsCustom.length; i += 1) n.options.itemsCustom[i][0] <= t && (n.options.items = n.options.itemsCustom[i][1]);
                else t <= n.options.itemsDesktop[0] && n.options.itemsDesktop !== !1 && (n.options.items = n.options.itemsDesktop[1]), t <= n.options.itemsDesktopSmall[0] && n.options.itemsDesktopSmall !== !1 && (n.options.items = n.options.itemsDesktopSmall[1]), t <= n.options.itemsTablet[0] && n.options.itemsTablet !== !1 && (n.options.items = n.options.itemsTablet[1]), t <= n.options.itemsTabletSmall[0] && n.options.itemsTabletSmall !== !1 && (n.options.items = n.options.itemsTabletSmall[1]), t <= n.options.itemsMobile[0] && n.options.itemsMobile !== !1 && (n.options.items = n.options.itemsMobile[1]);
                n.options.items > n.itemsAmount && n.options.itemsScaleUp === !0 && (n.options.items = n.itemsAmount)
            },
            response: function() {
                var i, n, s = this;
                return s.options.responsive !== !0 ? !1 : (n = e(t).width(), s.resizer = function() {
                    e(t).width() !== n && (s.options.autoPlay !== !1 && t.clearInterval(s.autoPlayInterval), t.clearTimeout(i), i = t.setTimeout(function() {
                        n = e(t).width(), s.updateVars()
                    }, s.options.responsiveRefreshRate))
                }, void e(t).resize(s.resizer))
            },
            updatePosition: function() {
                var e = this;
                e.jumpTo(e.currentItem), e.options.autoPlay !== !1 && e.checkAp()
            },
            appendItemsSizes: function() {
                var t = this,
                    i = 0,
                    n = t.itemsAmount - t.options.items;
                t.$owlItems.each(function(s) {
                    var a = e(this);
                    a.css({
                        width: t.itemWidth
                    }).data("owl-item", Number(s)), (s % t.options.items === 0 || s === n) && (s > n || (i += 1)), a.data("owl-roundPages", i)
                })
            },
            appendWrapperSizes: function() {
                var e = this,
                    t = e.$owlItems.length * e.itemWidth;
                e.$owlWrapper.css({
                    width: 2 * t,
                    left: 0
                }), e.appendItemsSizes()
            },
            calculateAll: function() {
                var e = this;
                e.calculateWidth(), e.appendWrapperSizes(), e.loops(), e.max()
            },
            calculateWidth: function() {
                var e = this;
                e.itemWidth = Math.round(e.$elem.width() / e.options.items)
            },
            max: function() {
                var e = this,
                    t = -1 * (e.itemsAmount * e.itemWidth - e.options.items * e.itemWidth);
                return e.options.items > e.itemsAmount ? (e.maximumItem = 0, t = 0, e.maximumPixels = 0) : (e.maximumItem = e.itemsAmount - e.options.items, e.maximumPixels = t), t
            },
            min: function() {
                return 0
            },
            loops: function() {
                var t, i, n, s = this,
                    a = 0,
                    o = 0;
                for (s.positionsInArray = [0], s.pagesInArray = [], t = 0; t < s.itemsAmount; t += 1) o += s.itemWidth, s.positionsInArray.push(-o), s.options.scrollPerPage === !0 && (i = e(s.$owlItems[t]), n = i.data("owl-roundPages"), n !== a && (s.pagesInArray[a] = s.positionsInArray[t], a = n))
            },
            buildControls: function() {
                var t = this;
                (t.options.navigation === !0 || t.options.pagination === !0) && (t.owlControls = e('<div class="owl-controls"/>').toggleClass("clickable", !t.browser.isTouch).appendTo(t.$elem)), t.options.pagination === !0 && t.buildPagination(), t.options.navigation === !0 && t.buildButtons()
            },
            buildButtons: function() {
                var t = this,
                    i = e('<div class="owl-buttons"/>');
                t.owlControls.append(i), t.buttonPrev = e("<div/>", {
                    "class": "owl-prev",
                    html: t.options.navigationText[0] || ""
                }), t.buttonNext = e("<div/>", {
                    "class": "owl-next",
                    html: t.options.navigationText[1] || ""
                }), i.append(t.buttonPrev).append(t.buttonNext), i.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(e) {
                    e.preventDefault()
                }), i.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(i) {
                    i.preventDefault(), e(this).hasClass("owl-next") ? t.next() : t.prev()
                })
            },
            buildPagination: function() {
                var t = this;
                t.paginationWrapper = e('<div class="owl-pagination"/>'), t.owlControls.append(t.paginationWrapper), t.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(i) {
                    i.preventDefault(), Number(e(this).data("owl-page")) !== t.currentItem && t.goTo(Number(e(this).data("owl-page")), !0)
                })
            },
            updatePagination: function() {
                var t, i, n, s, a, o, r = this;
                if (r.options.pagination === !1) return !1;
                for (r.paginationWrapper.html(""), t = 0, i = r.itemsAmount - r.itemsAmount % r.options.items, s = 0; s < r.itemsAmount; s += 1) s % r.options.items === 0 && (t += 1, i === s && (n = r.itemsAmount - r.options.items), a = e("<div/>", {
                    "class": "owl-page"
                }), o = e("<span></span>", {
                    text: r.options.paginationNumbers === !0 ? t : "",
                    "class": r.options.paginationNumbers === !0 ? "owl-numbers" : ""
                }), a.append(o), a.data("owl-page", i === s ? n : s), a.data("owl-roundPages", t), r.paginationWrapper.append(a));
                r.checkPagination()
            },
            checkPagination: function() {
                var t = this;
                return t.options.pagination === !1 ? !1 : void t.paginationWrapper.find(".owl-page").each(function() {
                    e(this).data("owl-roundPages") === e(t.$owlItems[t.currentItem]).data("owl-roundPages") && (t.paginationWrapper.find(".owl-page").removeClass("active"), e(this).addClass("active"))
                })
            },
            checkNavigation: function() {
                var e = this;
                return e.options.navigation === !1 ? !1 : void(e.options.rewindNav === !1 && (0 === e.currentItem && 0 === e.maximumItem ? (e.buttonPrev.addClass("disabled"), e.buttonNext.addClass("disabled")) : 0 === e.currentItem && 0 !== e.maximumItem ? (e.buttonPrev.addClass("disabled"), e.buttonNext.removeClass("disabled")) : e.currentItem === e.maximumItem ? (e.buttonPrev.removeClass("disabled"), e.buttonNext.addClass("disabled")) : 0 !== e.currentItem && e.currentItem !== e.maximumItem && (e.buttonPrev.removeClass("disabled"), e.buttonNext.removeClass("disabled"))))
            },
            updateControls: function() {
                var e = this;
                e.updatePagination(), e.checkNavigation(), e.owlControls && (e.options.items >= e.itemsAmount ? e.owlControls.hide() : e.owlControls.show())
            },
            destroyControls: function() {
                var e = this;
                e.owlControls && e.owlControls.remove()
            },
            next: function(e) {
                var t = this;
                if (t.isTransition) return !1;
                if (t.currentItem += t.options.scrollPerPage === !0 ? t.options.items : 1, t.currentItem > t.maximumItem + (t.options.scrollPerPage === !0 ? t.options.items - 1 : 0)) {
                    if (t.options.rewindNav !== !0) return t.currentItem = t.maximumItem, !1;
                    t.currentItem = 0, e = "rewind"
                }
                t.goTo(t.currentItem, e)
            },
            prev: function(e) {
                var t = this;
                if (t.isTransition) return !1;
                if (t.options.scrollPerPage === !0 && t.currentItem > 0 && t.currentItem < t.options.items ? t.currentItem = 0 : t.currentItem -= t.options.scrollPerPage === !0 ? t.options.items : 1, t.currentItem < 0) {
                    if (t.options.rewindNav !== !0) return t.currentItem = 0, !1;
                    t.currentItem = t.maximumItem, e = "rewind"
                }
                t.goTo(t.currentItem, e)
            },
            goTo: function(e, i, n) {
                var s, a = this;
                return a.isTransition ? !1 : ("function" == typeof a.options.beforeMove && a.options.beforeMove.apply(this, [a.$elem]), e >= a.maximumItem ? e = a.maximumItem : 0 >= e && (e = 0), a.currentItem = a.owl.currentItem = e, a.options.transitionStyle !== !1 && "drag" !== n && 1 === a.options.items && a.browser.support3d === !0 ? (a.swapSpeed(0), a.browser.support3d === !0 ? a.transition3d(a.positionsInArray[e]) : a.css2slide(a.positionsInArray[e], 1), a.afterGo(), a.singleItemTransition(), !1) : (s = a.positionsInArray[e], a.browser.support3d === !0 ? (a.isCss3Finish = !1, i === !0 ? (a.swapSpeed("paginationSpeed"), t.setTimeout(function() {
                    a.isCss3Finish = !0
                }, a.options.paginationSpeed)) : "rewind" === i ? (a.swapSpeed(a.options.rewindSpeed), t.setTimeout(function() {
                    a.isCss3Finish = !0
                }, a.options.rewindSpeed)) : (a.swapSpeed("slideSpeed"), t.setTimeout(function() {
                    a.isCss3Finish = !0
                }, a.options.slideSpeed)), a.transition3d(s)) : i === !0 ? a.css2slide(s, a.options.paginationSpeed) : "rewind" === i ? a.css2slide(s, a.options.rewindSpeed) : a.css2slide(s, a.options.slideSpeed), void a.afterGo()))
            },
            jumpTo: function(e) {
                var t = this;
                "function" == typeof t.options.beforeMove && t.options.beforeMove.apply(this, [t.$elem]), e >= t.maximumItem || -1 === e ? e = t.maximumItem : 0 >= e && (e = 0), t.swapSpeed(0), t.browser.support3d === !0 ? t.transition3d(t.positionsInArray[e]) : t.css2slide(t.positionsInArray[e], 1), t.currentItem = t.owl.currentItem = e, t.afterGo()
            },
            afterGo: function() {
                var e = this;
                e.prevArr.push(e.currentItem), e.prevItem = e.owl.prevItem = e.prevArr[e.prevArr.length - 2], e.prevArr.shift(0), e.prevItem !== e.currentItem && (e.checkPagination(), e.checkNavigation(), e.eachMoveUpdate(), e.options.autoPlay !== !1 && e.checkAp()), "function" == typeof e.options.afterMove && e.prevItem !== e.currentItem && e.options.afterMove.apply(this, [e.$elem])
            },
            stop: function() {
                var e = this;
                e.apStatus = "stop", t.clearInterval(e.autoPlayInterval)
            },
            checkAp: function() {
                var e = this;
                "stop" !== e.apStatus && e.play()
            },
            play: function() {
                var e = this;
                return e.apStatus = "play", e.options.autoPlay === !1 ? !1 : (t.clearInterval(e.autoPlayInterval), void(e.autoPlayInterval = t.setInterval(function() {
                    e.next(!0)
                }, e.options.autoPlay)))
            },
            swapSpeed: function(e) {
                var t = this;
                "slideSpeed" === e ? t.$owlWrapper.css(t.addCssSpeed(t.options.slideSpeed)) : "paginationSpeed" === e ? t.$owlWrapper.css(t.addCssSpeed(t.options.paginationSpeed)) : "string" != typeof e && t.$owlWrapper.css(t.addCssSpeed(e))
            },
            addCssSpeed: function(e) {
                return {
                    "-webkit-transition": "all " + e + "ms ease",
                    "-moz-transition": "all " + e + "ms ease",
                    "-o-transition": "all " + e + "ms ease",
                    transition: "all " + e + "ms ease"
                }
            },
            removeTransition: function() {
                return {
                    "-webkit-transition": "",
                    "-moz-transition": "",
                    "-o-transition": "",
                    transition: ""
                }
            },
            doTranslate: function(e) {
                return {
                    "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-moz-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-o-transform": "translate3d(" + e + "px, 0px, 0px)",
                    "-ms-transform": "translate3d(" + e + "px, 0px, 0px)",
                    transform: "translate3d(" + e + "px, 0px,0px)"
                }
            },
            transition3d: function(e) {
                var t = this;
                t.$owlWrapper.css(t.doTranslate(e))
            },
            css2move: function(e) {
                var t = this;
                t.$owlWrapper.css({
                    left: e
                })
            },
            css2slide: function(e, t) {
                var i = this;
                i.isCssFinish = !1, i.$owlWrapper.stop(!0, !0).animate({
                    left: e
                }, {
                    duration: t || i.options.slideSpeed,
                    complete: function() {
                        i.isCssFinish = !0
                    }
                })
            },
            checkBrowser: function() {
                var e, n, s, a, o = this,
                    r = "translate3d(0px, 0px, 0px)",
                    l = i.createElement("div");
                l.style.cssText = "  -moz-transform:" + r + "; -ms-transform:" + r + "; -o-transform:" + r + "; -webkit-transform:" + r + "; transform:" + r, e = /translate3d\(0px, 0px, 0px\)/g, n = l.style.cssText.match(e), s = null !== n && 1 === n.length, a = "ontouchstart" in t || t.navigator.msMaxTouchPoints, o.browser = {
                    support3d: s,
                    isTouch: a
                }
            },
            moveEvents: function() {
                var e = this;
                (e.options.mouseDrag !== !1 || e.options.touchDrag !== !1) && (e.gestures(), e.disabledEvents())
            },
            eventTypes: function() {
                var e = this,
                    t = ["s", "e", "x"];
                e.ev_types = {}, e.options.mouseDrag === !0 && e.options.touchDrag === !0 ? t = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : e.options.mouseDrag === !1 && e.options.touchDrag === !0 ? t = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : e.options.mouseDrag === !0 && e.options.touchDrag === !1 && (t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), e.ev_types.start = t[0], e.ev_types.move = t[1], e.ev_types.end = t[2]
            },
            disabledEvents: function() {
                var t = this;
                t.$elem.on("dragstart.owl", function(e) {
                    e.preventDefault()
                }), t.$elem.on("mousedown.disableTextSelect", function(t) {
                    return e(t.target).is("input, textarea, select, option")
                })
            },
            gestures: function() {
                function n(e) {
                    if (void 0 !== e.touches) return {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    };
                    if (void 0 === e.touches) {
                        if (void 0 !== e.pageX) return {
                            x: e.pageX,
                            y: e.pageY
                        };
                        if (void 0 === e.pageX) return {
                            x: e.clientX,
                            y: e.clientY
                        }
                    }
                }

                function s(t) {
                    "on" === t ? (e(i).on(l.ev_types.move, o), e(i).on(l.ev_types.end, r)) : "off" === t && (e(i).off(l.ev_types.move), e(i).off(l.ev_types.end))
                }

                function a(i) {
                    var a, o = i.originalEvent || i || t.event;
                    if (3 === o.which) return !1;
                    if (!(l.itemsAmount <= l.options.items)) {
                        if (l.isCssFinish === !1 && !l.options.dragBeforeAnimFinish) return !1;
                        if (l.isCss3Finish === !1 && !l.options.dragBeforeAnimFinish) return !1;
                        l.options.autoPlay !== !1 && t.clearInterval(l.autoPlayInterval), l.browser.isTouch === !0 || l.$owlWrapper.hasClass("grabbing") || l.$owlWrapper.addClass("grabbing"), l.newPosX = 0, l.newRelativeX = 0, e(this).css(l.removeTransition()), a = e(this).position(), c.relativePos = a.left, c.offsetX = n(o).x - a.left, c.offsetY = n(o).y - a.top, s("on"), c.sliding = !1, c.targetElement = o.target || o.srcElement
                    }
                }

                function o(s) {
                    var a, o, r = s.originalEvent || s || t.event;
                    l.newPosX = n(r).x - c.offsetX, l.newPosY = n(r).y - c.offsetY, l.newRelativeX = l.newPosX - c.relativePos, "function" == typeof l.options.startDragging && c.dragging !== !0 && 0 !== l.newRelativeX && (c.dragging = !0, l.options.startDragging.apply(l, [l.$elem])), (l.newRelativeX > 8 || l.newRelativeX < -8) && l.browser.isTouch === !0 && (void 0 !== r.preventDefault ? r.preventDefault() : r.returnValue = !1, c.sliding = !0), (l.newPosY > 10 || l.newPosY < -10) && c.sliding === !1 && e(i).off("touchmove.owl"), a = function() {
                        return l.newRelativeX / 5
                    }, o = function() {
                        return l.maximumPixels + l.newRelativeX / 5
                    }, l.newPosX = Math.max(Math.min(l.newPosX, a()), o()), l.browser.support3d === !0 ? l.transition3d(l.newPosX) : l.css2move(l.newPosX)
                }

                function r(i) {
                    var n, a, o, r = i.originalEvent || i || t.event;
                    r.target = r.target || r.srcElement, c.dragging = !1, l.browser.isTouch !== !0 && l.$owlWrapper.removeClass("grabbing"), l.dragDirection = l.owl.dragDirection = l.newRelativeX < 0 ? "left" : "right", 0 !== l.newRelativeX && (n = l.getNewPosition(), l.goTo(n, !1, "drag"), c.targetElement === r.target && l.browser.isTouch !== !0 && (e(r.target).on("click.disable", function(t) {
                        t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault(), e(t.target).off("click.disable")
                    }), a = e._data(r.target, "events").click, o = a.pop(), a.splice(0, 0, o))), s("off")
                }
                var l = this,
                    c = {
                        offsetX: 0,
                        offsetY: 0,
                        baseElWidth: 0,
                        relativePos: 0,
                        position: null,
                        minSwipe: null,
                        maxSwipe: null,
                        sliding: null,
                        dargging: null,
                        targetElement: null
                    };
                l.isCssFinish = !0, l.$elem.on(l.ev_types.start, ".owl-wrapper", a)
            },
            getNewPosition: function() {
                var e = this,
                    t = e.closestItem();
                return t > e.maximumItem ? (e.currentItem = e.maximumItem, t = e.maximumItem) : e.newPosX >= 0 && (t = 0, e.currentItem = 0), t
            },
            closestItem: function() {
                var t = this,
                    i = t.options.scrollPerPage === !0 ? t.pagesInArray : t.positionsInArray,
                    n = t.newPosX,
                    s = null;
                return e.each(i, function(a, o) {
                    n - t.itemWidth / 20 > i[a + 1] && n - t.itemWidth / 20 < o && "left" === t.moveDirection() ? (s = o, t.currentItem = t.options.scrollPerPage === !0 ? e.inArray(s, t.positionsInArray) : a) : n + t.itemWidth / 20 < o && n + t.itemWidth / 20 > (i[a + 1] || i[a] - t.itemWidth) && "right" === t.moveDirection() && (t.options.scrollPerPage === !0 ? (s = i[a + 1] || i[i.length - 1], t.currentItem = e.inArray(s, t.positionsInArray)) : (s = i[a + 1], t.currentItem = a + 1))
                }), t.currentItem
            },
            moveDirection: function() {
                var e, t = this;
                return t.newRelativeX < 0 ? (e = "right", t.playDirection = "next") : (e = "left", t.playDirection = "prev"), e
            },
            customEvents: function() {
                var e = this;
                e.$elem.on("owl.next", function() {
                    e.next()
                }), e.$elem.on("owl.prev", function() {
                    e.prev()
                }), e.$elem.on("owl.play", function(t, i) {
                    e.options.autoPlay = i, e.play(), e.hoverStatus = "play"
                }), e.$elem.on("owl.stop", function() {
                    e.stop(), e.hoverStatus = "stop"
                }), e.$elem.on("owl.goTo", function(t, i) {
                    e.goTo(i)
                }), e.$elem.on("owl.jumpTo", function(t, i) {
                    e.jumpTo(i)
                })
            },
            stopOnHover: function() {
                var e = this;
                e.options.stopOnHover === !0 && e.browser.isTouch !== !0 && e.options.autoPlay !== !1 && (e.$elem.on("mouseover", function() {
                    e.stop()
                }), e.$elem.on("mouseout", function() {
                    "stop" !== e.hoverStatus && e.play()
                }))
            },
            lazyLoad: function() {
                var t, i, n, s, a, o = this;
                if (o.options.lazyLoad === !1) return !1;
                for (t = 0; t < o.itemsAmount; t += 1) i = e(o.$owlItems[t]), "loaded" !== i.data("owl-loaded") && (n = i.data("owl-item"), s = i.find(".lazyOwl"), "string" == typeof s.data("src") ? (void 0 === i.data("owl-loaded") && (s.hide(), i.addClass("loading").data("owl-loaded", "checked")), a = o.options.lazyFollow === !0 ? n >= o.currentItem : !0, a && n < o.currentItem + o.options.items && s.length && s.each(function() {
                    o.lazyPreload(i, e(this))
                })) : i.data("owl-loaded", "loaded"))
            },
            lazyPreload: function(e, i) {
                function n() {
                    e.data("owl-loaded", "loaded").removeClass("loading"), i.removeAttr("data-src"), "fade" === o.options.lazyEffect ? i.fadeIn(400) : i.show(), "function" == typeof o.options.afterLazyLoad && o.options.afterLazyLoad.apply(this, [o.$elem])
                }

                function s() {
                    r += 1, o.completeImg(i.get(0)) || a === !0 ? n() : 100 >= r ? t.setTimeout(s, 100) : n()
                }
                var a, o = this,
                    r = 0;
                "DIV" === i.prop("tagName") ? (i.css("background-image", "url(" + i.data("src") + ")"), a = !0) : i[0].src = i.data("src"), s()
            },
            autoHeight: function() {
                function i() {
                    var i = e(a.$owlItems[a.currentItem]).height();
                    a.wrapperOuter.css("height", i + "px"), a.wrapperOuter.hasClass("autoHeight") || t.setTimeout(function() {
                        a.wrapperOuter.addClass("autoHeight")
                    }, 0)
                }

                function n() {
                    s += 1, a.completeImg(o.get(0)) ? i() : 100 >= s ? t.setTimeout(n, 100) : a.wrapperOuter.css("height", "")
                }
                var s, a = this,
                    o = e(a.$owlItems[a.currentItem]).find("img");
                void 0 !== o.get(0) ? (s = 0, n()) : i()
            },
            completeImg: function(e) {
                var t;
                return e.complete ? (t = typeof e.naturalWidth, "undefined" !== t && 0 === e.naturalWidth ? !1 : !0) : !1
            },
            onVisibleItems: function() {
                var t, i = this;
                for (i.options.addClassActive === !0 && i.$owlItems.removeClass("active"), i.visibleItems = [], t = i.currentItem; t < i.currentItem + i.options.items; t += 1) i.visibleItems.push(t), i.options.addClassActive === !0 && e(i.$owlItems[t]).addClass("active");
                i.owl.visibleItems = i.visibleItems
            },
            transitionTypes: function(e) {
                var t = this;
                t.outClass = "owl-" + e + "-out", t.inClass = "owl-" + e + "-in"
            },
            singleItemTransition: function() {
                function e(e) {
                    return {
                        position: "relative",
                        left: e + "px"
                    }
                }
                var t = this,
                    i = t.outClass,
                    n = t.inClass,
                    s = t.$owlItems.eq(t.currentItem),
                    a = t.$owlItems.eq(t.prevItem),
                    o = Math.abs(t.positionsInArray[t.currentItem]) + t.positionsInArray[t.prevItem],
                    r = Math.abs(t.positionsInArray[t.currentItem]) + t.itemWidth / 2,
                    l = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
                t.isTransition = !0, t.$owlWrapper.addClass("owl-origin").css({
                    "-webkit-transform-origin": r + "px",
                    "-moz-perspective-origin": r + "px",
                    "perspective-origin": r + "px"
                }), a.css(e(o, 10)).addClass(i).on(l, function() {
                    t.endPrev = !0, a.off(l), t.clearTransStyle(a, i)
                }), s.addClass(n).on(l, function() {
                    t.endCurrent = !0, s.off(l), t.clearTransStyle(s, n)
                })
            },
            clearTransStyle: function(e, t) {
                var i = this;
                e.css({
                    position: "",
                    left: ""
                }).removeClass(t), i.endPrev && i.endCurrent && (i.$owlWrapper.removeClass("owl-origin"), i.endPrev = !1, i.endCurrent = !1, i.isTransition = !1)
            },
            owlStatus: function() {
                var e = this;
                e.owl = {
                    userOptions: e.userOptions,
                    baseElement: e.$elem,
                    userItems: e.$userItems,
                    owlItems: e.$owlItems,
                    currentItem: e.currentItem,
                    prevItem: e.prevItem,
                    visibleItems: e.visibleItems,
                    isTouch: e.browser.isTouch,
                    browser: e.browser,
                    dragDirection: e.dragDirection
                }
            },
            clearEvents: function() {
                var n = this;
                n.$elem.off(".owl owl mousedown.disableTextSelect"), e(i).off(".owl owl"), e(t).off("resize", n.resizer)
            },
            unWrap: function() {
                var e = this;
                0 !== e.$elem.children().length && (e.$owlWrapper.unwrap(), e.$userItems.unwrap().unwrap(), e.owlControls && e.owlControls.remove()), e.clearEvents(), e.$elem.attr({
                    style: e.$elem.data("owl-originalStyles") || "",
                    "class": e.$elem.data("owl-originalClasses")
                })
            },
            destroy: function() {
                var e = this;
                e.stop(), t.clearInterval(e.checkVisible), e.unWrap(), e.$elem.removeData()
            },
            reinit: function(t) {
                var i = this,
                    n = e.extend({}, i.userOptions, t);
                i.unWrap(), i.init(n, i.$elem)
            },
            addItem: function(e, t) {
                var i, n = this;
                return e ? 0 === n.$elem.children().length ? (n.$elem.append(e), n.setVars(), !1) : (n.unWrap(), i = void 0 === t || -1 === t ? -1 : t, i >= n.$userItems.length || -1 === i ? n.$userItems.eq(-1).after(e) : n.$userItems.eq(i).before(e), void n.setVars()) : !1
            },
            removeItem: function(e) {
                var t, i = this;
                return 0 === i.$elem.children().length ? !1 : (t = void 0 === e || -1 === e ? -1 : e, i.unWrap(), i.$userItems.eq(t).remove(), void i.setVars())
            }
        };
        e.fn.owlCarousel = function(t) {
            return this.each(function() {
                if (e(this).data("owl-init") === !0) return !1;
                e(this).data("owl-init", !0);
                var i = Object.create(n);
                i.init(t, this), e.data(this, "owlCarousel", i)
            })
        }, e.fn.owlCarousel.options = {
            items: 5,
            itemsCustom: !1,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: !1,
            itemsMobile: [479, 1],
            singleItem: !1,
            itemsScaleUp: !1,
            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1e3,
            autoPlay: !1,
            stopOnHover: !1,
            navigation: !1,
            navigationText: ["prev", "next"],
            rewindNav: !0,
            scrollPerPage: !1,
            pagination: !0,
            paginationNumbers: !1,
            responsive: !0,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: t,
            baseClass: "owl-carousel",
            theme: "owl-theme",
            lazyLoad: !1,
            lazyFollow: !0,
            lazyEffect: "fade",
            autoHeight: !1,
            jsonPath: !1,
            jsonSuccess: !1,
            dragBeforeAnimFinish: !0,
            mouseDrag: !0,
            touchDrag: !0,
            addClassActive: !1,
            transitionStyle: !1,
            beforeUpdate: !1,
            afterUpdate: !1,
            beforeInit: !1,
            afterInit: !1,
            beforeMove: !1,
            afterMove: !1,
            afterAction: !1,
            startDragging: !1,
            afterLazyLoad: !1
        }
    }(jQuery, window, document),
    /*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
     * Licensed under the MIT License (LICENSE.txt).
     *
     * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
     * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
     * Thanks to: Seamus Leahy for adding deltaX and deltaY
     *
     * Version: 3.0.6
     *
     * Requires: 1.2.2+
     */
    function(e) {
        function t(t) {
            var i = t || window.event,
                n = [].slice.call(arguments, 1),
                s = 0,
                a = 0,
                o = 0;
            return t = e.event.fix(i), t.type = "mousewheel", i.wheelDelta && (s = i.wheelDelta / 120), i.detail && (s = -i.detail / 3), o = s, void 0 !== i.axis && i.axis === i.HORIZONTAL_AXIS && (o = 0, a = -1 * s), void 0 !== i.wheelDeltaY && (o = i.wheelDeltaY / 120), void 0 !== i.wheelDeltaX && (a = -1 * i.wheelDeltaX / 120), n.unshift(t, s, a, o), (e.event.dispatch || e.event.handle).apply(this, n)
        }
        var i = ["DOMMouseScroll", "mousewheel"];
        if (e.event.fixHooks)
            for (var n = i.length; n;) e.event.fixHooks[i[--n]] = e.event.mouseHooks;
        e.event.special.mousewheel = {
            setup: function() {
                if (this.addEventListener)
                    for (var e = i.length; e;) this.addEventListener(i[--e], t, !1);
                else this.onmousewheel = t
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var e = i.length; e;) this.removeEventListener(i[--e], t, !1);
                else this.onmousewheel = null
            }
        }, e.fn.extend({
            mousewheel: function(e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function(e) {
                return this.unbind("mousewheel", e)
            }
        })
    }(jQuery),
    /*
     * jQuery throttle / debounce - v1.1 - 3/7/2010
     * http://benalman.com/projects/jquery-throttle-debounce-plugin/
     *
     * Copyright (c) 2010 "Cowboy" Ben Alman
     * Dual licensed under the MIT and GPL licenses.
     * http://benalman.com/about/license/
     */
    function(e, t) {
        var i, n = e.jQuery || e.Cowboy || (e.Cowboy = {});
        n.throttle = i = function(e, i, s, a) {
            function o() {
                function n() {
                    l = +new Date, s.apply(c, d)
                }

                function o() {
                    r = t
                }
                var c = this,
                    u = +new Date - l,
                    d = arguments;
                a && !r && n(), r && clearTimeout(r), a === t && u > e ? n() : i !== !0 && (r = setTimeout(a ? o : n, a === t ? e - u : e))
            }
            var r, l = 0;
            return "boolean" != typeof i && (a = s, s = i, i = t), n.guid && (o.guid = s.guid = s.guid || n.guid++), o
        }, n.debounce = function(e, n, s) {
            return s === t ? i(e, n, !1) : i(e, s, n !== !1)
        }
    }(this);
var Froogaloop = function() {
    function e(t) {
        return new e.fn.init(t)
    }

    function t(e, t, i) {
        if (!i.contentWindow.postMessage) return !1;
        var n = i.getAttribute("src").split("?")[0],
            e = JSON.stringify({
                method: e,
                value: t
            });
        "//" === n.substr(0, 2) && (n = window.location.protocol + n), i.contentWindow.postMessage(e, n)
    }

    function i(e) {
        var t, i;
        try {
            t = JSON.parse(e.data), i = t.event || t.method
        } catch (n) {}
        if ("ready" == i && !a && (a = !0), e.origin != o) return !1;
        var e = t.value,
            r = t.data,
            l = "" === l ? null : t.player_id;
        return t = l ? s[l][i] : s[i], i = [], t ? (void 0 !== e && i.push(e), r && i.push(r), l && i.push(l), 0 < i.length ? t.apply(null, i) : t.call()) : !1
    }

    function n(e, t, i) {
        i ? (s[i] || (s[i] = {}), s[i][e] = t) : s[e] = t
    }
    var s = {},
        a = !1,
        o = "";
    return e.fn = e.prototype = {
        element: null,
        init: function(e) {
            "string" == typeof e && (e = document.getElementById(e)), this.element = e, e = this.element.getAttribute("src"), "//" === e.substr(0, 2) && (e = window.location.protocol + e);
            for (var e = e.split("/"), t = "", i = 0, n = e.length; n > i && 3 > i; i++) t += e[i], 2 > i && (t += "/");
            return o = t, this
        },
        api: function(e, i) {
            if (!this.element || !e) return !1;
            var s = this.element,
                a = "" !== s.id ? s.id : null,
                o = i && i.constructor && i.call && i.apply ? null : i,
                r = i && i.constructor && i.call && i.apply ? i : null;
            return r && n(e, r, a), t(e, o, s), this
        },
        addEvent: function(e, i) {
            if (!this.element) return !1;
            var s = this.element,
                o = "" !== s.id ? s.id : null;
            return n(e, i, o), "ready" != e ? t("addEventListener", e, s) : "ready" == e && a && i.call(null, o), this
        },
        removeEvent: function(e) {
            if (!this.element) return !1;
            var i, n = this.element;
            e: {
                if ((i = "" !== n.id ? n.id : null) && s[i]) {
                    if (!s[i][e]) {
                        i = !1;
                        break e
                    }
                    s[i][e] = null
                } else {
                    if (!s[e]) {
                        i = !1;
                        break e
                    }
                    s[e] = null
                }
                i = !0
            }
            "ready" != e && i && t("removeEventListener", e, n)
        }
    }, e.fn.init.prototype = e.fn, window.addEventListener ? window.addEventListener("message", i, !1) : window.attachEvent("onmessage", i), window.Froogaloop = window.$f = e
}();
! function(e) {
    e.fn.FueledDragging = function(t) {
        t = e.extend({
            element: "",
            startDragging: function() {},
            dragging: function() {},
            endDragging: function() {},
            outOfLoupe: function() {},
            docReady: function() {},
            draggingClass: "js-dragging",
            bodyClass: "js--fade-out"
        }, t), $element = "" === t.element ? this : t.element;
        t.docReady();
        var i;
        $element.on("mousedown touchstart", function(n) {
            n.originalEvent.preventDefault(), t.startDragging(), "" === t.element ? $this = e(this).addClass(t.draggingClass) : !1, i = !0;
            var s = {};
            s.parentOffset = e(this).parent().offset(), s.height = $this.outerHeight(), s.width = $this.outerHeight(), s.posX = n.pageX - s.parentOffset.left, s.posY = n.pageY - s.parentOffset.top, s.newPosX = s.posX, e(document).on("touchmove", ".loupe", function(n) {
                if (i === !0) {
                    var a = n.originalEvent.touches[0];
                    s.posX = a.pageX - s.parentOffset.left, s.posY = a.pageY - s.parentOffset.top, e(window).width() <= a.pageX + s.width / 2 || (s.newPosX = s.posX);
                    var o = {
                        x: s.newPosX,
                        y: s.posY
                    };
                    t.dragging(o, $this.attr("data-helper")), $this.css({
                        top: s.posY,
                        left: s.newPosX
                    })
                }
                n.preventDefault()
            }), $this.on("mousemove", function(n) {
                if (i === !0 && (s.posX = n.pageX - s.parentOffset.left, s.posY = n.pageY - s.parentOffset.top, e(window).width() <= n.pageX + s.width / 2 || (s.newPosX = s.posX), 0 !== n.which)) {
                    var a = {
                        x: s.newPosX,
                        y: s.posY
                    };
                    t.dragging(a, $this.attr("data-helper")), $this.css({
                        top: s.posY,
                        left: s.newPosX
                    }), n.preventDefault()
                }
            }), $this.on("mouseleave", function() {
                i = !1, t.outOfLoupe()
            }), $this.on("mouseup touchend", function() {
                i = !1;
                var n = {
                    x: s.posX,
                    y: s.posY
                };
                t.endDragging(n), "" === t.element ? e(this).removeClass(t.draggingClass) : !1
            })
        }), $element.parent().on("mouseup touchend", function(n) {
            var s = {};
            s.parentOffset = $element.parent().offset(), s.height = $element.outerHeight(), s.width = $element.outerHeight(), s.posX = n.pageX - s.parentOffset.left, s.posY = n.pageY - s.parentOffset.top, i = !1;
            var a = {
                x: s.posX,
                y: s.posY
            };
            t.endDragging(a), "" === t.element ? e(this).removeClass(t.draggingClass) : !1
        })
    }
}(jQuery),
function(e) {
    "use strict";
    e.Transitions = {
        _names: {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend"
        },
        _parseTimes: function(e) {
            for (var t, i = e.split(/,\s*/), n = 0; n < i.length; n++) t = i[n], i[n] = parseFloat(t), t.match(/\ds/) && (i[n] = 1e3 * i[n]);
            return i
        },
        getEvent: function() {
            var e = !1;
            for (var t in this._names)
                if ("undefined" != typeof document.body.style[t]) {
                    e = this._names[t];
                    break
                }
            return this.getEvent = function() {
                return e
            }, e
        },
        animFrame: function(e) {
            var t = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
            return this.animFrame = t ? function(e) {
                return t.call(window, e)
            } : function(e) {
                return setTimeout(e, 10)
            }, this.animFrame(e)
        },
        isSupported: function() {
            return this.getEvent() !== !1
        }
    }, e.extend(e.fn, {
        afterTransition: function(t, i) {
            if ("undefined" == typeof i && (i = t, t = 1), !e.Transitions.isSupported()) {
                for (var n = 0; n < this.length; n++) i.call(this[n], {
                    type: "aftertransition",
                    elapsedTime: 0,
                    propertyName: "",
                    currentTarget: this[n]
                });
                return this
            }
            for (var n = 0; n < this.length; n++) {
                var s = e(this[n]),
                    a = s.css("transition-property").split(/,\s*/),
                    o = s.css("transition-duration"),
                    r = s.css("transition-delay");
                o = e.Transitions._parseTimes(o), r = e.Transitions._parseTimes(r);
                for (var l, c, u, d, h, p = 0; p < a.length; p++) l = a[p], c = o[1 == o.length ? 0 : p], u = r[1 == r.length ? 0 : p], d = u + c * t, h = c * t / 1e3,
                    function(t, n, s, a) {
                        setTimeout(function() {
                            e.Transitions.animFrame(function() {
                                i.call(t[0], {
                                    type: "aftertransition",
                                    elapsedTime: a,
                                    propertyName: n,
                                    currentTarget: t[0]
                                })
                            })
                        }, s)
                    }(s, l, d, h)
            }
            return this
        },
        transitionEnd: function(t) {
            for (var i = 0; i < this.length; i++) this[i].addEventListener(e.Transitions.getEvent(), function(e) {
                t.call(this, e)
            });
            return this
        }
    })
}.call(this, jQuery),
    /*!
    Mailchimp Ajax Submit
    jQuery Plugin
    Author: Siddharth Doshi

    Use:
    ===
    $('#form_id').ajaxchimp(options);

    - Form should have one <input> element with attribute 'type=email'
    - Form should have one label element with attribute 'for=email_input_id' (used to display error/success message)
    - All options are optional.

    Options:
    =======
    options = {
        language: 'en',
        callback: callbackFunction,
        url: 'http://blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f'
    }

    Notes:
    =====
    To get the mailchimp JSONP url (undocumented), change 'post?' to 'post-json?' and add '&c=?' to the end.
    For e.g. 'http://blahblah.us1.list-manage.com/subscribe/post-json?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f&c=?',
    */
    function(e) {
        "use strict";
        e.ajaxChimp = {
            responses: {
                "We have sent you a confirmation email": 0,
                "Please enter a value": 1,
                "An email address must contain a single @": 2,
                "The domain portion of the email address is invalid (the portion after the @: )": 3,
                "The username portion of the email address is invalid (the portion before the @: )": 4,
                "This email address looks fake or invalid. Please enter a real email address": 5
            },
            translations: {
                en: null
            },
            init: function(t, i) {
                e(t).ajaxChimp(i)
            }
        }, e.fn.ajaxChimp = function(t) {
            return e(this).each(function(i, n) {
                var s = e(n),
                    a = s.find("input[type=email]"),
                    o = s.find("label[for=" + a.attr("id") + "]"),
                    r = e.extend({
                        url: s.attr("action"),
                        language: "en"
                    }, t),
                    l = r.url.replace("/post?", "/post-json?").concat("&c=?");
                s.attr("novalidate", "true"), a.attr("name", "EMAIL"), s.submit(function() {
                    function t(t) {
                        if ("success" === t.result) i = "We have sent you a confirmation email", o.removeClass("error").addClass("valid"), a.removeClass("error").addClass("valid");
                        else {
                            a.removeClass("valid").addClass("error"), o.removeClass("valid").addClass("error");
                            var n = -1;
                            try {
                                var s = t.msg.split(" - ", 2);
                                if (void 0 === s[1]) i = t.msg;
                                else {
                                    var l = parseInt(s[0], 10);
                                    l.toString() === s[0] ? (n = s[0], i = s[1]) : (n = -1, i = t.msg)
                                }
                            } catch (c) {
                                n = -1, i = t.msg
                            }
                        }
                        "en" !== r.language && void 0 !== e.ajaxChimp.responses[i] && e.ajaxChimp.translations && e.ajaxChimp.translations[r.language] && e.ajaxChimp.translations[r.language][e.ajaxChimp.responses[i]] && (i = e.ajaxChimp.translations[r.language][e.ajaxChimp.responses[i]]), o.html(i), o.show(2e3), r.callback && r.callback(t)
                    }
                    var i, n = {},
                        c = s.serializeArray();
                    e.each(c, function(e, t) {
                        n[t.name] = t.value
                    }), e.ajax({
                        url: l,
                        data: n,
                        success: t,
                        dataType: "jsonp",
                        error: function(e, t) {
                            console.log("mailchimp ajax submit error: " + t)
                        }
                    });
                    var u = "Submitting...";
                    return "en" !== r.language && e.ajaxChimp.translations && e.ajaxChimp.translations[r.language] && e.ajaxChimp.translations[r.language].submit && (u = e.ajaxChimp.translations[r.language].submit), o.html(u).show(2e3), !1
                })
            }), this
        }
    }(jQuery),
    /*!
     * jQuery Cookie Plugin v1.4.1
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2006, 2014 Klaus Hartl
     * Released under the MIT license
     */
    function(e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
    }(function(e) {
        function t(e) {
            return r.raw ? e : encodeURIComponent(e)
        }

        function i(e) {
            return r.raw ? e : decodeURIComponent(e)
        }

        function n(e) {
            return t(r.json ? JSON.stringify(e) : String(e))
        }

        function s(e) {
            0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
            try {
                return e = decodeURIComponent(e.replace(o, " ")), r.json ? JSON.parse(e) : e
            } catch (t) {}
        }

        function a(t, i) {
            var n = r.raw ? t : s(t);
            return e.isFunction(i) ? i(n) : n
        }
        var o = /\+/g,
            r = e.cookie = function(s, o, l) {
                if (arguments.length > 1 && !e.isFunction(o)) {
                    if (l = e.extend({}, r.defaults, l), "number" == typeof l.expires) {
                        var c = l.expires,
                            u = l.expires = new Date;
                        u.setTime(+u + 864e5 * c)
                    }
                    return document.cookie = [t(s), "=", n(o), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
                }
                for (var d = s ? void 0 : {}, h = document.cookie ? document.cookie.split("; ") : [], p = 0, m = h.length; m > p; p++) {
                    var f = h[p].split("="),
                        g = i(f.shift()),
                        v = f.join("=");
                    if (s && s === g) {
                        d = a(v, o);
                        break
                    }
                    s || void 0 === (v = a(v)) || (d[g] = v)
                }
                return d
            };
        r.defaults = {}, e.removeCookie = function(t, i) {
            return void 0 === e.cookie(t) ? !1 : (e.cookie(t, "", e.extend({}, i, {
                expires: -1
            })), !e.cookie(t))
        }
    }), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(e, t, i, n, s) {
            return jQuery.easing[jQuery.easing.def](e, t, i, n, s)
        },
        easeInQuad: function(e, t, i, n, s) {
            return n * (t /= s) * t + i
        },
        easeOutQuad: function(e, t, i, n, s) {
            return -n * (t /= s) * (t - 2) + i
        },
        easeInOutQuad: function(e, t, i, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t + i : -n / 2 * (--t * (t - 2) - 1) + i
        },
        easeInCubic: function(e, t, i, n, s) {
            return n * (t /= s) * t * t + i
        },
        easeOutCubic: function(e, t, i, n, s) {
            return n * ((t = t / s - 1) * t * t + 1) + i
        },
        easeInOutCubic: function(e, t, i, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t * t + i : n / 2 * ((t -= 2) * t * t + 2) + i
        },
        easeInQuart: function(e, t, i, n, s) {
            return n * (t /= s) * t * t * t + i
        },
        easeOutQuart: function(e, t, i, n, s) {
            return -n * ((t = t / s - 1) * t * t * t - 1) + i
        },
        easeInOutQuart: function(e, t, i, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t * t * t + i : -n / 2 * ((t -= 2) * t * t * t - 2) + i
        },
        easeInQuint: function(e, t, i, n, s) {
            return n * (t /= s) * t * t * t * t + i
        },
        easeOutQuint: function(e, t, i, n, s) {
            return n * ((t = t / s - 1) * t * t * t * t + 1) + i
        },
        easeInOutQuint: function(e, t, i, n, s) {
            return (t /= s / 2) < 1 ? n / 2 * t * t * t * t * t + i : n / 2 * ((t -= 2) * t * t * t * t + 2) + i
        },
        easeInSine: function(e, t, i, n, s) {
            return -n * Math.cos(t / s * (Math.PI / 2)) + n + i
        },
        easeOutSine: function(e, t, i, n, s) {
            return n * Math.sin(t / s * (Math.PI / 2)) + i
        },
        easeInOutSine: function(e, t, i, n, s) {
            return -n / 2 * (Math.cos(Math.PI * t / s) - 1) + i
        },
        easeInExpo: function(e, t, i, n, s) {
            return 0 == t ? i : n * Math.pow(2, 10 * (t / s - 1)) + i
        },
        easeOutExpo: function(e, t, i, n, s) {
            return t == s ? i + n : n * (-Math.pow(2, -10 * t / s) + 1) + i
        },
        easeInOutExpo: function(e, t, i, n, s) {
            return 0 == t ? i : t == s ? i + n : (t /= s / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + i : n / 2 * (-Math.pow(2, -10 * --t) + 2) + i
        },
        easeInCirc: function(e, t, i, n, s) {
            return -n * (Math.sqrt(1 - (t /= s) * t) - 1) + i
        },
        easeOutCirc: function(e, t, i, n, s) {
            return n * Math.sqrt(1 - (t = t / s - 1) * t) + i
        },
        easeInOutCirc: function(e, t, i, n, s) {
            return (t /= s / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + i : n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + i
        },
        easeInElastic: function(e, t, i, n, s) {
            var a = 1.70158,
                o = 0,
                r = n;
            if (0 == t) return i;
            if (1 == (t /= s)) return i + n;
            if (o || (o = .3 * s), r < Math.abs(n)) {
                r = n;
                var a = o / 4
            } else var a = o / (2 * Math.PI) * Math.asin(n / r);
            return -(r * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * s - a) * Math.PI / o)) + i
        },
        easeOutElastic: function(e, t, i, n, s) {
            var a = 1.70158,
                o = 0,
                r = n;
            if (0 == t) return i;
            if (1 == (t /= s)) return i + n;
            if (o || (o = .3 * s), r < Math.abs(n)) {
                r = n;
                var a = o / 4
            } else var a = o / (2 * Math.PI) * Math.asin(n / r);
            return r * Math.pow(2, -10 * t) * Math.sin(2 * (t * s - a) * Math.PI / o) + n + i
        },
        easeInOutElastic: function(e, t, i, n, s) {
            var a = 1.70158,
                o = 0,
                r = n;
            if (0 == t) return i;
            if (2 == (t /= s / 2)) return i + n;
            if (o || (o = .3 * s * 1.5), r < Math.abs(n)) {
                r = n;
                var a = o / 4
            } else var a = o / (2 * Math.PI) * Math.asin(n / r);
            return 1 > t ? -.5 * r * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * s - a) * Math.PI / o) + i : r * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * s - a) * Math.PI / o) * .5 + n + i
        },
        easeInBack: function(e, t, i, n, s, a) {
            return void 0 == a && (a = 1.70158), n * (t /= s) * t * ((a + 1) * t - a) + i
        },
        easeOutBack: function(e, t, i, n, s, a) {
            return void 0 == a && (a = 1.70158), n * ((t = t / s - 1) * t * ((a + 1) * t + a) + 1) + i
        },
        easeInOutBack: function(e, t, i, n, s, a) {
            return void 0 == a && (a = 1.70158), (t /= s / 2) < 1 ? n / 2 * t * t * (((a *= 1.525) + 1) * t - a) + i : n / 2 * ((t -= 2) * t * (((a *= 1.525) + 1) * t + a) + 2) + i
        },
        easeInBounce: function(e, t, i, n, s) {
            return n - jQuery.easing.easeOutBounce(e, s - t, 0, n, s) + i
        },
        easeOutBounce: function(e, t, i, n, s) {
            return (t /= s) < 1 / 2.75 ? 7.5625 * n * t * t + i : 2 / 2.75 > t ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + i : 2.5 / 2.75 > t ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + i : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + i
        },
        easeInOutBounce: function(e, t, i, n, s) {
            return s / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, n, s) + i : .5 * jQuery.easing.easeOutBounce(e, 2 * t - s, 0, n, s) + .5 * n + i
        }
    }), OnScreen.prototype.addItem = function(e, t) {
        var i = {
                screen: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                target: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                screenEnterClass: "js-screenenter",
                screenLeaveClass: "js-screenleave",
                onScreenEnter: null,
                onScreenLeave: null,
                onScreenMove: null,
                fireScreenMoveOffScreen: !1,
                disableScreenMove: !1
            },
            n = this.items.length;
        return this.items[n] = {
            element: e,
            options: this.util.mergeObjects(i, t || {}),
            onscreen: !1,
            side: "bottom"
        }, this.map[e] = n, this.items[n]
    }, OnScreen.prototype.updateItem = function(e, t) {
        var i = parseInt(this.map[e]);
        return i >= 0 && i < this.items.length && this.items[i] && (this.items[i].options = this.util.mergeObjects(this.items[i].options, t || {})), this.items[i]
    }, OnScreen.prototype.removeItem = function(e) {
        var t = parseInt(this.map[e]);
        t >= 0 && t < this.items.length && (this.items.splice(t, 1), this.map[e] = null, delete this.map[e])
    }, OnScreen.prototype.empty = function() {
        this.items = [], this.map = {}
    }, OnScreen.prototype.dispose = function() {
        this.empty(), this.options.scroll && this.options.scrollContainer.forEach(function(e) {
            e.removeEventListener("scroll", this.update)
        }, this), this.options.resize && window.removeEventListener("resize", this.update), this.options.load && window.removeEventListener("load", this.update)
    },
    /*!
     * https://raw.githubusercontent.com/tylergaw/jribbble/master/dist/jquery.jribbble-1.0.1.ugly.js
     */
    function(e) {
        "use strict";
        e.jribbble = {};
        var t = function(t, i) {
                e.ajax({
                    type: "GET",
                    url: "http://api.dribbble.com" + t,
                    data: i[1] || {},
                    dataType: "jsonp",
                    success: function(e) {
                        i[0](void 0 === e ? {
                            error: !0
                        } : e)
                    }
                })
            },
            i = {
                getShotById: "/shots/$/",
                getReboundsOfShot: "/shots/$/rebounds/",
                getShotsByList: "/shots/$/",
                getShotsByPlayerId: "/players/$/shots/",
                getShotsThatPlayerFollows: "/players/$/shots/following/",
                getPlayerById: "/players/$/",
                getPlayerFollowers: "/players/$/followers/",
                getPlayerFollowing: "/players/$/following/",
                getPlayerDraftees: "/players/$/draftees/",
                getCommentsOfShot: "/shots/$/comments/",
                getShotsThatPlayerLikes: "/players/$/shots/likes/"
            },
            n = function(e) {
                return function() {
                    var i = [].slice.call(arguments),
                        n = e.replace("$", i.shift());
                    t(n, i)
                }
            };
        for (var s in i) e.jribbble[s] = n(i[s])
    }(jQuery, window, document),
    function() {
        var e, t;
        e = function() {
            function e(e, t) {
                var i, n;
                if (this.options = {
                        target: "instafeed",
                        get: "popular",
                        resolution: "thumbnail",
                        sortBy: "none",
                        links: !0,
                        mock: !1,
                        useHttp: !1
                    }, "object" == typeof e)
                    for (i in e) n = e[i], this.options[i] = n;
                this.context = null != t ? t : this, this.unique = this._genKey()
            }
            return e.prototype.hasNext = function() {
                return "string" == typeof this.context.nextUrl && this.context.nextUrl.length > 0
            }, e.prototype.next = function() {
                return this.hasNext() ? this.run(this.context.nextUrl) : !1
            }, e.prototype.run = function(t) {
                var i, n, s;
                if ("string" != typeof this.options.clientId && "string" != typeof this.options.accessToken) throw new Error("Missing clientId or accessToken.");
                if ("string" != typeof this.options.accessToken && "string" != typeof this.options.clientId) throw new Error("Missing clientId or accessToken.");
                return null != this.options.before && "function" == typeof this.options.before && this.options.before.call(this), "undefined" != typeof document && null !== document && (s = document.createElement("script"), s.id = "instafeed-fetcher", s.src = t || this._buildUrl(), i = document.getElementsByTagName("head"), i[0].appendChild(s), n = "instafeedCache" + this.unique, window[n] = new e(this.options, this), window[n].unique = this.unique), !0
            }, e.prototype.parse = function(e) {
                var t, i, n, s, a, o, r, l, c, u, d, h, p, m, f, g, v, w, y, b, _, $;
                if ("object" != typeof e) {
                    if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "Invalid JSON data"), !1;
                    throw new Error("Invalid JSON response")
                }
                if (200 !== e.meta.code) {
                    if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, e.meta.error_message), !1;
                    throw new Error("Error from Instagram: " + e.meta.error_message)
                }
                if (0 === e.data.length) {
                    if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "No images were returned from Instagram"), !1;
                    throw new Error("No images were returned from Instagram")
                }
                if (null != this.options.success && "function" == typeof this.options.success && this.options.success.call(this, e), this.context.nextUrl = "", null != e.pagination && (this.context.nextUrl = e.pagination.next_url), "none" !== this.options.sortBy) switch (m = "random" === this.options.sortBy ? ["", "random"] : this.options.sortBy.split("-"), p = "least" === m[0] ? !0 : !1, m[1]) {
                    case "random":
                        e.data.sort(function() {
                            return .5 - Math.random()
                        });
                        break;
                    case "recent":
                        e.data = this._sortBy(e.data, "created_time", p);
                        break;
                    case "liked":
                        e.data = this._sortBy(e.data, "likes.count", p);
                        break;
                    case "commented":
                        e.data = this._sortBy(e.data, "comments.count", p);
                        break;
                    default:
                        throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
                }
                if ("undefined" != typeof document && null !== document && this.options.mock === !1) {
                    if (l = e.data, null != this.options.limit && l.length > this.options.limit && (l = l.slice(0, this.options.limit + 1 || 9e9)), i = document.createDocumentFragment(), null != this.options.filter && "function" == typeof this.options.filter && (l = this._filter(l, this.options.filter)), null != this.options.template && "string" == typeof this.options.template) {
                        for (s = "", o = "", u = "", f = document.createElement("div"), g = 0, y = l.length; y > g; g++) a = l[g], r = a.images[this.options.resolution].url, this.options.useHttp || (r = r.replace("http://", "//")), o = this._makeTemplate(this.options.template, {
                            model: a,
                            id: a.id,
                            link: a.link,
                            image: r,
                            caption: this._getObjectProperty(a, "caption.text"),
                            likes: a.likes.count,
                            comments: a.comments.count,
                            location: this._getObjectProperty(a, "location.name")
                        }), s += o;
                        for (f.innerHTML = s, $ = [].slice.call(f.childNodes), v = 0, b = $.length; b > v; v++) h = $[v], i.appendChild(h)
                    } else
                        for (w = 0, _ = l.length; _ > w; w++) a = l[w], c = document.createElement("img"), r = a.images[this.options.resolution].url, this.options.useHttp || (r = r.replace("http://", "//")), c.src = r, this.options.links === !0 ? (t = document.createElement("a"), t.href = a.link, t.appendChild(c), i.appendChild(t)) : i.appendChild(c);
                    document.getElementById(this.options.target).appendChild(i), n = document.getElementsByTagName("head")[0], n.removeChild(document.getElementById("instafeed-fetcher")), d = "instafeedCache" + this.unique, window[d] = void 0;
                    try {
                        delete window[d]
                    } catch (C) {}
                }
                return null != this.options.after && "function" == typeof this.options.after && this.options.after.call(this), !0
            }, e.prototype._buildUrl = function() {
                var e, t, i;
                switch (e = "https://api.instagram.com/v1", this.options.get) {
                    case "popular":
                        t = "media/popular";
                        break;
                    case "tagged":
                        if ("string" != typeof this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
                        t = "tags/" + this.options.tagName + "/media/recent";
                        break;
                    case "location":
                        if ("number" != typeof this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
                        t = "locations/" + this.options.locationId + "/media/recent";
                        break;
                    case "user":
                        if ("number" != typeof this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
                        if ("string" != typeof this.options.accessToken) throw new Error("No access token. Use the 'accessToken' option.");
                        t = "users/" + this.options.userId + "/media/recent";
                        break;
                    default:
                        throw new Error("Invalid option for get: '" + this.options.get + "'.")
                }
                return i = "" + e + "/" + t, i += null != this.options.accessToken ? "?access_token=" + this.options.accessToken : "?client_id=" + this.options.clientId, null != this.options.limit && (i += "&count=" + this.options.limit), i += "&callback=instafeedCache" + this.unique + ".parse"
            }, e.prototype._genKey = function() {
                var e;
                return e = function() {
                    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
                }, "" + e() + e() + e() + e()
            }, e.prototype._makeTemplate = function(e, t) {
                var i, n, s, a, o;
                for (n = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, i = e; n.test(i);) s = i.match(n)[1], a = null != (o = this._getObjectProperty(t, s)) ? o : "", i = i.replace(n, "" + a);
                return i
            }, e.prototype._getObjectProperty = function(e, t) {
                var i, n;
                for (t = t.replace(/\[(\w+)\]/g, ".$1"), n = t.split("."); n.length;) {
                    if (i = n.shift(), !(null != e && i in e)) return null;
                    e = e[i]
                }
                return e
            }, e.prototype._sortBy = function(e, t, i) {
                var n;
                return n = function(e, n) {
                    var s, a;
                    return s = this._getObjectProperty(e, t), a = this._getObjectProperty(n, t), i ? s > a ? 1 : -1 : a > s ? 1 : -1
                }, e.sort(n.bind(this)), e
            }, e.prototype._filter = function(e, t) {
                var i, n, s, a, o;
                for (i = [], s = function(e) {
                        return t(e) ? i.push(e) : void 0
                    }, a = 0, o = e.length; o > a; a++) n = e[a], s(n);
                return i
            }, e
        }(), t = "undefined" != typeof exports && null !== exports ? exports : window, t.Instafeed = e
    }.call(this),
    function(e, t) {
        "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : t()
    }(this, function() {
        function e(e) {
            return e.replace(/<b[^>]*>(.*?)<\/b>/gi, function(e, t) {
                return t
            }).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "")
        }

        function t(e) {
            e = e.getElementsByTagName("a");
            for (var t = e.length - 1; t >= 0; t--) e[t].setAttribute("target", "_blank")
        }

        function i(e, t) {
            for (var i = [], n = new RegExp("(^| )" + t + "( |$)"), s = e.getElementsByTagName("*"), a = 0, o = s.length; o > a; a++) n.test(s[a].className) && i.push(s[a]);
            return i
        }
        var n = "",
            s = 20,
            a = !0,
            o = [],
            r = !1,
            l = !0,
            c = !0,
            u = null,
            d = !0,
            h = !0,
            p = null,
            m = !0,
            f = !1,
            g = !0,
            v = !0,
            w = {
                fetch: function(e) {
                    if (void 0 === e.maxTweets && (e.maxTweets = 20), void 0 === e.enableLinks && (e.enableLinks = !0), void 0 === e.showUser && (e.showUser = !0), void 0 === e.showTime && (e.showTime = !0), void 0 === e.dateFunction && (e.dateFunction = "default"), void 0 === e.showRetweet && (e.showRetweet = !0), void 0 === e.customCallback && (e.customCallback = null), void 0 === e.showInteraction && (e.showInteraction = !0), void 0 === e.showImages && (e.showImages = !1), void 0 === e.linksInNewWindow && (e.linksInNewWindow = !0), void 0 === e.showPermalinks && (e.showPermalinks = !0), r) o.push(e);
                    else {
                        r = !0, n = e.domId, s = e.maxTweets, a = e.enableLinks, c = e.showUser, l = e.showTime, h = e.showRetweet, u = e.dateFunction, p = e.customCallback, m = e.showInteraction, f = e.showImages, g = e.linksInNewWindow, v = e.showPermalinks;
                        var t = document.createElement("script");
                        t.type = "text/javascript", t.src = "//cdn.syndication.twimg.com/widgets/timelines/" + e.id + "?&lang=" + (e.lang || "en") + "&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random(), document.getElementsByTagName("head")[0].appendChild(t)
                    }
                },
                callback: function(y) {
                    var b = document.createElement("div");
                    b.innerHTML = y.body, "undefined" == typeof b.getElementsByClassName && (d = !1), y = [];
                    var _ = [],
                        $ = [],
                        C = [],
                        x = [],
                        k = [],
                        S = [],
                        T = 0;
                    if (d)
                        for (b = b.getElementsByClassName("tweet"); T < b.length;) x.push(0 < b[T].getElementsByClassName("retweet-credit").length ? !0 : !1), (!x[T] || x[T] && h) && (y.push(b[T].getElementsByClassName("e-entry-title")[0]), k.push(b[T].getAttribute("data-tweet-id")), _.push(b[T].getElementsByClassName("p-author")[0]), $.push(b[T].getElementsByClassName("dt-updated")[0]), S.push(b[T].getElementsByClassName("permalink")[0]), C.push(void 0 !== b[T].getElementsByClassName("inline-media")[0] ? b[T].getElementsByClassName("inline-media")[0] : void 0)), T++;
                    else
                        for (b = i(b, "tweet"); T < b.length;) y.push(i(b[T], "e-entry-title")[0]), k.push(b[T].getAttribute("data-tweet-id")), _.push(i(b[T], "p-author")[0]), $.push(i(b[T], "dt-updated")[0]), S.push(b[T].getElementsByClassName("permalink")[0]), C.push(void 0 !== i(b[T], "inline-media")[0] ? i(b[T], "inline-media")[0] : void 0), x.push(0 < i(b[T], "retweet-credit").length ? !0 : !1), T++;
                    for (y.length > s && (y.splice(s, y.length - s), _.splice(s, _.length - s), $.splice(s, $.length - s), x.splice(s, x.length - s), C.splice(s, C.length - s), S.splice(s, S.length - s)), b = [], T = y.length, x = 0; T > x;) {
                        if ("string" != typeof u) {
                            var I = $[x].getAttribute("datetime"),
                                D = new Date($[x].getAttribute("datetime").replace(/-/g, "/").replace("T", " ").split("+")[0]),
                                I = u(D, I);
                            if ($[x].setAttribute("aria-label", I), y[x].innerText)
                                if (d) $[x].innerText = I;
                                else {
                                    var D = document.createElement("p"),
                                        L = document.createTextNode(I);
                                    D.appendChild(L), D.setAttribute("aria-label", I), $[x] = D
                                } else $[x].textContent = I
                        }
                        I = "", a ? (g && (t(y[x]), c && t(_[x])), c && (I += '<div class="user">' + e(_[x].innerHTML) + "</div>"), I += '<p class="tweet">' + e(y[x].innerHTML) + "</p>", l && (I = v ? I + ('<p class="timePosted"><a href="' + S[x] + '">' + $[x].getAttribute("aria-label") + "</a></p>") : I + ('<p class="timePosted">' + $[x].getAttribute("aria-label") + "</p>"))) : y[x].innerText ? (c && (I += '<p class="user">' + _[x].innerText + "</p>"), I += '<p class="tweet">' + y[x].innerText + "</p>", l && (I += '<p class="timePosted">' + $[x].innerText + "</p>")) : (c && (I += '<p class="user">' + _[x].textContent + "</p>"), I += '<p class="tweet">' + y[x].textContent + "</p>", l && (I += '<p class="timePosted">' + $[x].textContent + "</p>")), m && (I += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + k[x] + '" class="twitter_reply_icon"' + (g ? ' target="_blank">' : ">") + 'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + k[x] + '" class="twitter_retweet_icon"' + (g ? ' target="_blank">' : ">") + 'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + k[x] + '" class="twitter_fav_icon"' + (g ? ' target="_blank">' : ">") + "Favorite</a></p>"), f && void 0 !== C[x] && (D = C[x], void 0 !== D ? (D = D.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0], D = decodeURIComponent(D).split('"')[1]) : D = void 0, I += '<div class="media"><img src="' + D + '" alt="Image from tweet" /></div>'), b.push(I), x++
                    }
                    if (null === p) {
                        for (y = b.length, _ = 0, $ = document.getElementById(n), C = "<ul>"; y > _;) C += "<li>" + b[_] + "</li>", _++;
                        $.innerHTML = C + "</ul>"
                    } else p(b);
                    r = !1, 0 < o.length && (w.fetch(o[0]), o.splice(0, 1))
                }
            };
        return window.twitterFetcher = w
    }),
    /*
     * jQuery Address Plugin v1.5
     * http://www.asual.com/jquery/address/
     *
     * Copyright (c) 2009-2010 Rostislav Hristov
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://jquery.org/license
     *
     * Date: 2012-11-18 23:51:44 +0200 (Sun, 18 Nov 2012)
     */
    function(e) {
        e.address = function() {
            var t, i, n = function(t) {
                    var i = e.extend(e.Event(t), function() {
                        for (var t = {}, i = e.address.parameterNames(), n = 0, s = i.length; s > n; n++) t[i[n]] = e.address.parameter(i[n]);
                        return {
                            value: e.address.value(),
                            path: e.address.path(),
                            pathNames: e.address.pathNames(),
                            parameterNames: i,
                            parameters: t,
                            loadType: e.address.loadType(),
                            queryString: e.address.queryString()
                        }
                    }.call(e.address));
                    return e(e.address).trigger(i), i
                },
                s = function(e) {
                    return Array.prototype.slice.call(e)
                },
                a = function() {
                    return e().bind.apply(e(e.address), Array.prototype.slice.call(arguments)), e.address
                },
                o = function() {
                    return e().unbind.apply(e(e.address), Array.prototype.slice.call(arguments)), e.address
                },
                r = function() {
                    return q.pushState && B.state !== t
                },
                l = function() {
                    return ("/" + U.pathname.replace(new RegExp(B.state), "") + U.search + (c() ? "#" + c() : "")).replace(Q, "/")
                },
                c = function() {
                    var e = U.href.indexOf("#");
                    return -1 != e ? m(U.href.substr(e + 1), E) : ""
                },
                u = function() {
                    return r() ? l() : c()
                },
                d = function() {
                    try {
                        return top.document !== t && top.document.title !== t ? top : window
                    } catch (e) {
                        return window
                    }
                },
                h = function() {
                    return "javascript"
                },
                p = function(e) {
                    return e = e.toString(), (B.strict && "/" != e.substr(0, 1) ? "/" : "") + e
                },
                m = function(e, t) {
                    return B.crawlable && t ? ("" !== e ? "!" : "") + e : e.replace(/^\!/, "")
                },
                f = function(e, t) {
                    return parseInt(e.css(t), 10)
                },
                g = function() {
                    if (!et) {
                        var e = u(),
                            t = decodeURI(st) != decodeURI(e);
                        t && (z && 7 > H ? U.reload() : (z && !G && B.history && Y(b, 50), _old = st, st = e, v(E)))
                    }
                },
                v = function(e) {
                    var t = n(A),
                        i = n(e ? F : j);
                    Y(y, 10), (t.isDefaultPrevented() || i.isDefaultPrevented()) && w()
                },
                w = function() {
                    st = _old, r() ? q.popState({}, "", B.state.replace(/\/$/, "") + ("" === st ? "/" : st)) : (et = M, O ? B.history ? U.hash = "#" + m(st, M) : U.replace("#" + m(st, M)) : st != u() && (B.history ? U.hash = "#" + m(st, M) : U.replace("#" + m(st, M))), z && !G && B.history && Y(b, 50), O ? Y(function() {
                        et = E
                    }, 1) : et = E)
                },
                y = function() {
                    if ("null" !== B.tracker && B.tracker !== T) {
                        var i = e.isFunction(B.tracker) ? B.tracker : R[B.tracker],
                            n = (U.pathname + U.search + (e.address && !r() ? e.address.value() : "")).replace(/\/\//, "/").replace(/^\/$/, "");
                        e.isFunction(i) ? i(n) : e.isFunction(R.urchinTracker) ? R.urchinTracker(n) : R.pageTracker !== t && e.isFunction(R.pageTracker._trackPageview) ? R.pageTracker._trackPageview(n) : R._gaq !== t && e.isFunction(R._gaq.push) && R._gaq.push(["_trackPageview", decodeURI(n)])
                    }
                },
                b = function() {
                    var e = h() + ":" + E + ";document.open();document.writeln('<html><head><title>" + W.title.replace(/\'/g, "\\'") + "</title><script>var " + I + ' = "' + encodeURIComponent(u()).replace(/\'/g, "\\'") + (W.domain != U.hostname ? '";document.domain="' + W.domain : "") + "\";</script></head></html>');document.close();";
                    7 > H ? i.src = e : i.contentWindow.location.replace(e)
                },
                _ = function() {
                    if (J && -1 != K) {
                        var e, t, i = J.substr(K + 1).split("&");
                        for (e = 0; e < i.length; e++) t = i[e].split("="), /^(autoUpdate|crawlable|history|strict|wrap)$/.test(t[0]) && (B[t[0]] = isNaN(t[1]) ? /^(true|yes)$/i.test(t[1]) : 0 !== parseInt(t[1], 10)), /^(state|tracker)$/.test(t[0]) && (B[t[0]] = t[1]);
                        J = T
                    }
                    _old = st, st = u()
                },
                $ = function() {
                    if (!tt) {
                        tt = M, _();
                        var s = function() {
                                C.call(this), S.call(this)
                            },
                            a = e("body").ajaxComplete(s);
                        if (s(), B.wrap) {
                            {
                                e("body > *").wrapAll('<div style="padding:' + (f(a, "marginTop") + f(a, "paddingTop")) + "px " + (f(a, "marginRight") + f(a, "paddingRight")) + "px " + (f(a, "marginBottom") + f(a, "paddingBottom")) + "px " + (f(a, "marginLeft") + f(a, "paddingLeft")) + 'px;" />').parent().wrap('<div id="' + I + '" style="height:100%;overflow:auto;position:relative;' + (O && !window.statusbar.visible ? "resize:both;" : "") + '" />')
                            }
                            e("html, body").css({
                                height: "100%",
                                margin: 0,
                                padding: 0,
                                overflow: "hidden"
                            }), O && e('<style type="text/css" />').appendTo("head").text("#" + I + "::-webkit-resizer { background-color: #fff; }")
                        }
                        if (z && !G) {
                            var o = W.getElementsByTagName("frameset")[0];
                            i = W.createElement((o ? "" : "i") + "frame"), i.src = h() + ":" + E, o ? (o.insertAdjacentElement("beforeEnd", i), o[o.cols ? "cols" : "rows"] += ",0", i.noResize = M, i.frameBorder = i.frameSpacing = 0) : (i.style.display = "none", i.style.width = i.style.height = 0, i.tabIndex = -1, W.body.insertAdjacentElement("afterBegin", i)), Y(function() {
                                e(i).bind("load", function() {
                                    var e = i.contentWindow;
                                    _old = st, st = e[I] !== t ? e[I] : "", st != u() && (v(E), U.hash = m(st, M))
                                }), i.contentWindow[I] === t && b()
                            }, 50)
                        }
                        Y(function() {
                            n("init"), v(E)
                        }, 1), r() || (z && H > 7 || !z && G ? R.addEventListener ? R.addEventListener(L, g, E) : R.attachEvent && R.attachEvent("on" + L, g) : X(g, 50)), "state" in window.history && e(window).trigger("popstate")
                    }
                },
                C = function() {
                    var t, i = e("a"),
                        n = i.size(),
                        s = 1,
                        a = -1,
                        o = '[rel*="address:"]',
                        r = function() {
                            ++a != n && (t = e(i.get(a)), t.is(o) && t.address(o), Y(r, s))
                        };
                    Y(r, s)
                },
                x = function() {
                    decodeURI(st) != decodeURI(u()) && (_old = st, st = u(), v(E))
                },
                k = function() {
                    R.removeEventListener ? R.removeEventListener(L, g, E) : R.detachEvent && R.detachEvent("on" + L, g)
                },
                S = function() {
                    if (B.crawlable) {
                        var t = U.pathname.replace(/\/$/, ""),
                            i = "_escaped_fragment_"; - 1 != e("body").html().indexOf(i) && e('a[href]:not([href^=http]), a[href*="' + document.domain + '"]').each(function() {
                            var n = e(this).attr("href").replace(/^http:/, "").replace(new RegExp(t + "/?$"), "");
                            ("" === n || -1 != n.indexOf(i)) && e(this).attr("href", "#" + encodeURI(decodeURIComponent(n.replace(new RegExp("/(.*)\\?" + i + "=(.*)$"), "!$2"))))
                        })
                    }
                },
                T = null,
                I = "jQueryAddress",
                D = "string",
                L = "hashchange",
                P = "init",
                A = "change",
                F = "internalChange",
                j = "externalChange",
                M = !0,
                E = !1,
                B = {
                    autoUpdate: M,
                    crawlable: E,
                    history: M,
                    strict: M,
                    loadType: null,
                    wrap: E,
                    state: "/"
                },
                N = e.browser,
                H = parseFloat(N.version),
                z = !e.support.opacity,
                O = N.webkit || N.safari,
                R = d(),
                W = R.document,
                q = R.history,
                U = R.location,
                X = setInterval,
                Y = setTimeout,
                Q = /\/{2,9}/g,
                V = navigator.userAgent,
                G = "on" + L in R,
                J = e("script:last").attr("src"),
                K = J ? J.indexOf("?") : -1,
                Z = W.title,
                et = E,
                tt = E,
                it = M,
                nt = E,
                st = u();
            if (_old = st, z) {
                H = parseFloat(V.substr(V.indexOf("MSIE") + 4)), W.documentMode && W.documentMode != H && (H = 8 != W.documentMode ? 7 : 8);
                var at = W.onpropertychange;
                W.onpropertychange = function() {
                    at && at.call(W), W.title != Z && -1 != W.title.indexOf("#" + u()) && (W.title = Z)
                }
            }
            if (q.navigationMode && (q.navigationMode = "compatible"), "complete" == document.readyState) var ot = setInterval(function() {
                e.address && ($(), clearInterval(ot))
            }, 50);
            else _(), e($);
            return e(window).bind("popstate", x).bind("unload", k), {
                bind: function() {
                    return a.apply(this, s(arguments))
                },
                unbind: function() {
                    return o.apply(this, s(arguments))
                },
                init: function() {
                    return a.apply(this, [P].concat(s(arguments)))
                },
                change: function() {
                    return a.apply(this, [A].concat(s(arguments)))
                },
                internalChange: function() {
                    return a.apply(this, [F].concat(s(arguments)))
                },
                externalChange: function() {
                    return a.apply(this, [j].concat(s(arguments)))
                },
                baseURL: function() {
                    var e = U.href;
                    return -1 != e.indexOf("#") && (e = e.substr(0, e.indexOf("#"))), /\/$/.test(e) && (e = e.substr(0, e.length - 1)), e
                },
                autoUpdate: function(e) {
                    return e !== t ? (B.autoUpdate = e, this) : B.autoUpdate
                },
                crawlable: function(e) {
                    return e !== t ? (B.crawlable = e, this) : B.crawlable
                },
                history: function(e) {
                    return e !== t ? (B.history = e, this) : B.history
                },
                state: function(e) {
                    if (e !== t) {
                        B.state = e;
                        var i = l();
                        return B.state !== t && (q.pushState ? "/#/" == i.substr(0, 3) && U.replace(B.state.replace(/^\/$/, "") + i.substr(2)) : "/" != i && i.replace(/^\/#/, "") != c() && Y(function() {
                            U.replace(B.state.replace(/^\/$/, "") + "/#" + i)
                        }, 1)), this
                    }
                    return B.state
                },
                strict: function(e) {
                    return e !== t ? (B.strict = e, this) : B.strict
                },
                tracker: function(e) {
                    return e !== t ? (B.tracker = e, this) : B.tracker
                },
                wrap: function(e) {
                    return e !== t ? (B.wrap = e, this) : B.wrap
                },
                update: function() {
                    return nt = M, this.value(st), nt = E, this
                },
                title: function(e) {
                    return e !== t ? (Y(function() {
                        Z = W.title = e, it && i && i.contentWindow && i.contentWindow.document && (i.contentWindow.document.title = e, it = E)
                    }, 50), this) : W.title
                },
                value: function(e) {
                    if (e !== t) {
                        if (e = p(e), "/" == e && (e = ""), st == e && !nt) return;
                        return _old = st, st = e, (B.autoUpdate || nt) && (v(M), r() ? q[B.history ? "pushState" : "replaceState"]({}, "", B.state.replace(/\/$/, "") + ("" === st ? "/" : st)) : (et = M, O ? B.history ? U.hash = "#" + m(st, M) : U.replace("#" + m(st, M)) : st != u() && (B.history ? U.hash = "#" + m(st, M) : U.replace("#" + m(st, M))), z && !G && B.history && Y(b, 50), O ? Y(function() {
                            et = E
                        }, 1) : et = E)), this
                    }
                    return p(st)
                },
                path: function(e) {
                    if (e !== t) {
                        var i = this.queryString(),
                            n = this.hash();
                        return this.value(e + (i ? "?" + i : "") + (n ? "#" + n : "")), this
                    }
                    return p(st).split("#")[0].split("?")[0]
                },
                pathNames: function() {
                    var e = this.path(),
                        t = e.replace(Q, "/").split("/");
                    return ("/" == e.substr(0, 1) || 0 === e.length) && t.splice(0, 1), "/" == e.substr(e.length - 1, 1) && t.splice(t.length - 1, 1), t
                },
                queryString: function(e) {
                    if (e !== t) {
                        var i = this.hash();
                        return this.value(this.path() + (e ? "?" + e : "") + (i ? "#" + i : "")), this
                    }
                    var n = st.split("?");
                    return n.slice(1, n.length).join("?").split("#")[0]
                },
                parameter: function(i, n, s) {
                    var a, o;
                    if (n !== t) {
                        var r = this.parameterNames();
                        for (o = [], n = n === t || n === T ? "" : n.toString(), a = 0; a < r.length; a++) {
                            var l = r[a],
                                c = this.parameter(l);
                            typeof c == D && (c = [c]), l == i && (c = n === T || "" === n ? [] : s ? c.concat([n]) : [n]);
                            for (var u = 0; u < c.length; u++) o.push(l + "=" + c[u])
                        }
                        return -1 == e.inArray(i, r) && n !== T && "" !== n && o.push(i + "=" + n), this.queryString(o.join("&")), this
                    }
                    if (n = this.queryString()) {
                        var d = [];
                        for (o = n.split("&"), a = 0; a < o.length; a++) {
                            var h = o[a].split("=");
                            h[0] == i && d.push(h.slice(1).join("="))
                        }
                        if (0 !== d.length) return 1 != d.length ? d : d[0]
                    }
                },
                parameterNames: function() {
                    var t = this.queryString(),
                        i = [];
                    if (t && -1 != t.indexOf("="))
                        for (var n = t.split("&"), s = 0; s < n.length; s++) {
                            var a = n[s].split("=")[0]; - 1 == e.inArray(a, i) && i.push(a)
                        }
                    return i
                },
                hash: function(e) {
                    if (e !== t) return this.value(st.split("#")[0] + (e ? "#" + e : "")), this;
                    var i = st.split("#");
                    return i.slice(1, i.length).join("#")
                },
                loadType: function(e) {
                    return e !== t && (B.loadType = e), B.loadType
                }
            }
        }(), e.fn.address = function(t) {
            var i;
            if ("string" == typeof t && (i = t, t = void 0), !e(this).attr("address")) {
                var n = function(i) {
                    if (i.shiftKey || i.ctrlKey || i.metaKey || 2 == i.which) return !0;
                    if (e(this).is("a")) {
                        i.preventDefault();
                        var n = t ? t.call(this) : /address:/.test(e(this).attr("rel")) ? e(this).attr("rel").split("address:")[1].split(" ")[0] : void 0 === e.address.state() || /^\/?$/.test(e.address.state()) ? e(this).attr("href").replace(/^(#\!?|\.)/, "") : e(this).attr("href").replace(new RegExp("^(.*" + e.address.state() + "|\\.)"), "");
                        e.address.value(n)
                    }
                };
                e(i ? i : this).live("click", n).live("submit", function(i) {
                    if (e(this).is("form")) {
                        i.preventDefault();
                        var n = e(this).attr("action"),
                            s = t ? t.call(this) : (-1 != n.indexOf("?") ? n.replace(/&$/, "") : n + "?") + e(this).serialize();
                        e.address.value(s)
                    }
                }).attr("address", !0)
            }
            return this
        }
    }(jQuery);
var FLD = FLD || {};
window.matchMedia = window.matchMedia || function(e) {
    "use strict";
    var t, i = e.documentElement,
        n = i.firstElementChild || i.firstChild,
        s = e.createElement("body"),
        a = e.createElement("div");
    return a.id = "mq-test-1", a.style.cssText = "position:absolute;top:-100em", s.style.background = "none", s.appendChild(a),
        function(e) {
            return a.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>', i.insertBefore(s, n), t = 42 === a.offsetWidth, i.removeChild(s), {
                matches: t,
                media: e
            }
        }
}(document), FLD.HtmlTag = $("html"), FLD.BodyTag = $("body"), FLD.Window = $(window), FLD.Header = $("#masthead"), FLD.HeaderHeight = 56, Globals.prototype.clearSelection = function() {
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
}, FLD.Globals = new Globals;
var globals = function() {};
Array.prototype.clean = function(e) {
        for (var t = 0; t < this.length; t++) this[t] == e && (this.splice(t, 1), t--);
        return this
    }, String.prototype.trunc = function(e, t) {
        var i = this.length > e,
            n = i ? this.substr(0, e - 1) : this;
        return n = t && i ? n.substr(0, n.lastIndexOf(" ")) : n, i ? n + "&nbsp;&hellip;" : String(n)
    }, String.prototype.capCase = function() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    },
    function() {
        for (var e = 0, t = ["webkit", "moz"], i = 0; i < t.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[i] + "CancelAnimationFrame"] || window[t[i] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
            var i = (new Date).getTime(),
                n = Math.max(0, 16 - (i - e)),
                s = window.setTimeout(function() {
                    t(i + n)
                }, n);
            return e = i + n, s
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }(), window.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
            window.setTimeout(e, 1e3 / 60)
        }
    }(), $(document).ready(function() {}), updateOnScroll.prototype.onScroll = function() {
        return this.scrollTop
    };
var getGoogleAnalyticsData = function() {
    var e = "",
        t = "",
        n = "",
        s = "",
        a = "",
        o = "",
        r = "",
        l = "__utmz",
        c = "__utma";
    if (document.cookie.length > 0 && (c_start = document.cookie.indexOf(l + "="), -1 != c_start && (c_start = c_start + l.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), o = unescape(document.cookie.substring(c_start, c_end))), a_start = document.cookie.indexOf(c + "="), -1 != a_start && (a_start = a_start + c.length + 1, a_end = document.cookie.indexOf(";", a_start), -1 == a_end && (c_end = document.cookie.length), r = unescape(document.cookie.substring(a_start, a_end)))), "" != o) {
        var u = o.split(".");
        if (u.length >= 4) {
            var d = u[4].split("|");
            for (i = 0; i < d.length; i++) d[i].indexOf("utmcsr=") >= 0 && (e = d[i].substring(d[i].indexOf("=") + 1)), d[i].indexOf("utmccn=") >= 0 && (t = d[i].substring(d[i].indexOf("=") + 1)), d[i].indexOf("utmcmd=") >= 0 && (n = d[i].substring(d[i].indexOf("=") + 1)), d[i].indexOf("utmctr=") >= 0 && (s = d[i].substring(d[i].indexOf("=") + 1)), d[i].indexOf("utmcct=") >= 0 && (a = d[i].substring(d[i].indexOf("=") + 1))
        }
    }
    if ("" != r) {
        var h = r.split(".");
        ac_domain_hash = h[0], ac_random_id = h[1], ac_time_initial_visit = h[2], ac_time_beginning_previous_visit = h[3], ac_time_beginning_current_visit = h[4], ac_session_counter = h[5]
    }
    var p = {};
    return p.source = e, p.campaign = t, p.medium = n, p.term = s, p.content = a, "" != r && (p.time_init = new Date(1e3 * ac_time_initial_visit), p.time_begin = new Date(1e3 * ac_time_beginning_previous_visit), p.time_begin_cur = new Date(1e3 * ac_time_beginning_current_visit), p.times_visited = ac_session_counter), p
};
Contact.prototype.checkForRadioChange = function(e, t) {
    var i = $(e),
        n = i[0].value,
        s = "text" == i.attr("type"),
        a = "form__field--budget__other" == i.attr("id") ? !0 : !1,
        o = $(".select--" + t),
        r = $(".select--" + t + " > div > span"),
        l = $('input[name="form__field--budget-text"]');
    a ? (l.parent().addClass("input--other--show"), setTimeout(function() {
        l[0].focus()
    }, 100), r[0].innerHTML = l[0].value || "&nbsp;") : (l.parent().removeClass("input--other--show"), i.parent().siblings(".option--other").find("input").removeAttr("checked"), i.parent().siblings("[data-listener]").addClass("hidden"), s && $('[name="form__field--' + t + '"]').removeAttr("checked"), "" != n && (r[0].innerHTML = n + "&nbsp;", o.removeClass("js--select-active"))), this.approxBudgetValue = r[0].innerHTML.replace("&nbsp;", "")
}, Contact.prototype.checkForCheckboxChange = function(e, t) {
    var i = $(e),
        n = i.is(":checked"),
        s = "text" == i.attr("type"),
        a = i[0].value,
        o = $(".select--" + t + " > div > span"),
        r = o.attr("title");
    if (s) {
        var l = o.html(),
            c = o.attr("title");
        l = l.replace(this.otherString + ", ", ""), c = c.replace(this.otherString + ", ", ""), o[0].innerHTML = l, o.attr("title", c), this.otherString = a, o.append(a + ", "), o.attr("title", r + a + ", ")
    }
    if (n) "form__field--type__other" == i.attr("id") ? this.showOther(i, o, r) : (o.append(a + ", "), o.attr("title", r + a + ", "));
    else if ("form__field--type__other" == i.attr("id") && this.hideOther(i, o), !s) {
        var l = o.html(),
            c = o.attr("title");
        l = l.replace(a + ", ", ""), c = c.replace(a + ", ", ""), o[0].innerHTML = l, o.attr("title", c)
    }
    var u = o[0].innerHTML.replace("&nbsp;", "");
    u = u.substr(0, u.length - 2), this.typeOfProjectValue = u
}, Contact.prototype.otherString = "", Contact.prototype.showOther = function(e, t, i) {
    var n = e[0].id;
    $('[data-listener="' + n + '"]').removeClass("hidden");
    var s = $('[data-listener="' + n + '"]').find("input")[0].value;
    "" !== s && (this.otherString = s, t.append(s + ", "), t.attr("title", i + s + ", "))
}, Contact.prototype.hideOther = function(e, t) {
    var i = e[0].id;
    $('[data-listener="' + i + '"]').addClass("hidden");
    var n = t.html(),
        s = t.attr("title");
    n = n.replace(this.otherString + ", ", ""), s = s.replace(this.otherString + ", ", ""), t[0].innerHTML = n, t.attr("title", s)
}, Contact.prototype.displayDetailedForm = function() {
    FLD.HtmlTag.addClass("js--rfp-scroll"), $.address.parameter("status", "open"), setTimeout(function() {
        FLD.BodyTag.addClass("js--rfp-active").removeClass("js--rfp-inactive")
    }, 1), FLD.Header.removeClass("hide-nav"), $(".no-touch, .no-touch body").animate({
        scrollTop: 0
    }, 100), Modernizr.touch && ($(window).scrollTop(0), $(".rfp").scrollTop(0)), FLD.Resize.Recalculate()
}, Contact.prototype.hideDetailedForm = function() {
    $.address.parameter("status", "closed"), FLD.HtmlTag.removeClass("js--rfp-scroll"), setTimeout(function() {
        FLD.BodyTag.removeClass("js--rfp-active").addClass("js--rfp-inactive")
    }, 1), FLD.Resize.Recalculate()
}, Contact.prototype.insertThanksMessage = function() {
    var e = Modernizr.touch ? "Tap" : "Click",
        t = '<div class="block block--red block--thank-you" data-js="close-thank-you-message"><div class="block__inner"><h2 class="block__title" data-copy="Message Sent!">Message Sent!</h2><p class="block__copy">Thank you for your enquiry. A member of our team will be in touch as soon as possible.</p><p class="block__copy block__copy--small">' + e + " anywhere to close.</p></div></div>";
    $("body").append(t), setTimeout(function() {
        $("body").addClass("show-thank-you")
    }, 50)
}, Contact.prototype.removeThanksMessage = function() {
    $("body").removeClass("show-thank-you"), setTimeout(function() {
        $(".block--thank-you").remove()
    }, 350)
}, $(function() {
    $.address.change(function() {
        "open" === $.address.parameter("status") && FLD.Contact.displayDetailedForm(), "closed" === $.address.parameter("status") && FLD.Contact.hideDetailedForm()
    })
}), $(window).on("resize", function() {}), $(document).on("click", ".js--rfp", function(e) {
    e.preventDefault(), FLD.Contact.displayDetailedForm()
}), $(document).on("click", '[data-js="close-thank-you-message"]', function(e) {
    FLD.Contact.removeThanksMessage(), e.preventDefault()
}), $(document).on("click", ".js--close-rfp", function(e) {
    e.preventDefault(), $(".rfp__desc strong").remove(), FLD.Contact.hideDetailedForm()
}), $(document).on("click", ".select > div", function() {
    $(this).parent().toggleClass("js--select-active")
}), $(document).on("change", ".select--type input", function() {
    FLD.Contact.checkForCheckboxChange(this, "type")
}), $(document).on("change", ".select--budget input", function() {
    FLD.Contact.checkForRadioChange(this, "budget")
});
var delay = function() {
    var e = 0;
    return function(t, i) {
        clearTimeout(e), e = setTimeout(t, i)
    }
}();
$(document).on("keyup", ".form--contact input", function() {
    var e = this;
    delay(function() {
        FLD.Contact.checkRequired(e)
    }, 500)
}), $(document).on("blur", ".form--contact input", function() {
    FLD.Contact.checkRequired(this)
}), $(document).on("submit", "#contact-form", function(e) {
    e.preventDefault();
    var t = !0;
    $form = $(this), $form.find(".form__field.required").each(function(e, i) {
        i = $(i), "" === i.val() && (t = !1, i.before('<span class="form__error"><b>!</b></span>'))
    });
    var i = function(e) {
            return e.find("input[name='form__field--subject']").val()
        },
        n = function() {
            return FLD.Contact.typeOfProjectValue
        },
        s = function() {
            return FLD.Contact.approxBudgetValue
        };
    "" !== i($form) && (t = !1);
    var a = {
        name: $form.find("input[name='form__field--name']").val(),
        phone_number: $form.find("input[name='form__field--phone']").val(),
        email: $form.find("input[name='form__field--email']").val(),
        website: $form.find("input[name='form__field--website']").val(),
        synopsis: $form.find("textarea[name='form__field--synopsis']").val(),
        org_name: $form.find("input[name='form__field--company']").val(),
        location: $form.find("input[name='form__field--location']").val(),
        web_referral_source: $form.find("input[name='form__field--referral']").val(),
        project_type: n($form),
        budget: s($form),
        opt_in_for_newsletter: $form.find("input[name='opt_in_for_newsletter']:checked").val(),
        subject: i($form)
    };
    if (t) {
        var o = $.post($form.attr("action"), a);
        o.done(function() {
            Modernizr.history ? (FLD.Contact.insertThanksMessage(), $.address.value("/contact/?success=true"), $("input[checked]").removeAttr("checked"), Modernizr.input.placeholder === !1 ? $("[placeholder]").each(function(e, t) {
                t = $(t);
                var i = t.attr("placeholder");
                t.attr("value", i)
            }) : ($("#contact-form .form__field").val(""), $("#contact-form input").removeAttr("checked"), $("#contact-form .select > div > span").html("&nbsp;")), $("#contact-form .btn--diamond").attr("disabled", "disabled").addClass("btn--diamond--disabled")) : window.location.replace(window.location.protocol + "//" + window.location.host + "/contact/?success=true")
        }), o.fail(function() {
            $(".loading-element__title").html("Whoopsy Daisy!"), $(".loading-element__description").html("Looks like there was a slight hiccup in <br/>submitting your form. Please try again."), $(".loading-element__background").append('<span class="loading-element__close"><i>&times;</i></span>')
        })
    }
}), $(document).on("focus", "#contact-form .form__field", function() {
    $(this).siblings(".form__error").fadeOut(250, function() {
        $(this).remove()
    })
}), $(document).on("click", ".loading-element__close", function(e) {
    $(".loading-element__close").remove(), $("body").removeClass("show-loading show-loading--ff form-sent"), e.preventDefault()
}), $(document).on("click", ".form--contact", function(e) {
    var t = $(e.target).closest(".options"),
        i = $(e.target).closest(".select");
    if (t.length || i.length || ($(".select").removeClass("js--select-active"), FLD.Contact.checkRequired()), t.length || i.length) {
        var n = i.hasClass("js--select-active");
        $(".select").not(i).removeClass("js--select-active"), FLD.Contact.checkRequired(), i.length ? n === !0 && i.addClass("js--select-active") : t.parent().addClass("js--select-active")
    }
});
var _contactSuccessMessage = function() {
    function e(e) {
        return decodeURI((RegExp(e + "=(.+?)(&|$)").exec(location.search) || [, null])[1])
    }
    "true" === e("success") && $(".contact__newsletter").before('<div class="form__thankyou"><p>Thank you for your message. We will get back to you as soon as possible.</p></div>')
};
_contactSuccessMessage(), $(function() {
        var e = getGoogleAnalyticsData();
        e.medium.indexOf("organic") >= 0 && $(".vcard--nyc .tel").html("+1-646-580-1241"), e.medium.indexOf("cpc") >= 0 && $(".vcard--nyc .tel").html("+1-929-322-4387")
    }), Jobs.prototype.jobsTrigger = null, Jobs.prototype.getJobBoard = function() {
        return $(".jobs_index .job__board")
    }, Jobs.prototype.jobBoard = Jobs.prototype.getJobBoard(), Jobs.prototype.jobsIsotope = function(e) {
        var t;
        FLD.Resize.BrowserWidth < 900 && FLD.Resize.BrowserWidth >= 768 ? t = 2 : FLD.Resize.BrowserWidth < 768 ? t = 1 : (t = 4, t = 4.081632653), this.jobBoard.hasClass("isotope") && this.jobBoard.isotope("destroy"), this.jobBoard.isotope({
            selector: ".job",
            filter: e,
            resizable: !1,
            masonry: {
                columnWidth: Math.floor(parseInt(this.jobBoard.width()) / t)
            }
        })
    }, Jobs.prototype.onNewPageLoad = function() {
        "jobs" == FLD.PageType.type && (this.jobBoard = this.getJobBoard(), this.jobsIsotope())
    }, Jobs.prototype.onPageLeave = function() {
        this.jobBoard = null
    }, FLD.Jobs = new Jobs, $(document).on("click", ".job__category", function(e) {
        var t = $(this);
        return t.hasClass("job__category--empty") ? !1 : ($("body").hasClass("single-job") ? (FLD.Jobs.jobsTrigger = t.attr("data-category-title"), $.address.value("/jobs/")) : (t.toggleClass("js--active"), t.siblings().removeClass("js--active"), $(".job__board").isotope(t.hasClass("js--active") ? {
            filter: t.attr("data-category")
        } : {
            filter: "*"
        })), void e.preventDefault())
    }), $(document).on("click", ".menu__item--jobs a", function() {
        FLD.Jobs.jobsTrigger = null, $(".job__category").removeClass("js--active")
    }), $(window).on("smartresize", function() {
        var e;
        e = FLD.Resize.BrowserWidth < 900 && FLD.Resize.BrowserWidth >= 768 ? 2 : FLD.Resize.BrowserWidth < 768 ? 1 : 4, $(".jobs_index .job__board").length && $(".jobs_index .job__board").isotope({
            masonry: {
                columnWidth: Math.floor(parseInt($(".job__board").width()) / e)
            }
        })
    }),
    function() {
        $("[data-vimeo-id]").click(function(e) {
            var t = $(this),
                i = $("img", this),
                n = t.attr("href"),
                s = i.attr("src");
            $(".video__modal").fadeOut(200, function() {
                $(this).remove()
            }), t.after('<div class="video__modal"><div class="video__modal__frame"><img src="' + s + '" alt="" /><iframe onload="$(this).closest(\'.video__modal\').addClass(\'video__modal--loaded\')" src="' + n + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen /></div></div>'), setTimeout(function() {
                $(".video__modal").addClass("video__modal--created").one("click", function(e) {
                    e.preventDefault(), $(this).fadeOut(200, function() {
                        $(this).remove()
                    })
                })
            }, 100), e.preventDefault()
        }).each(function() {
            var e = $(this),
                t = e.data("vimeo-id");
            $.ajax({
                type: "GET",
                url: "http://vimeo.com/api/v2/video/" + t + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function(t) {
                    e.prepend('<img src="' + t[0].thumbnail_large + '" alt="" />')
                }
            })
        })
    }(), $(function() {
        FLD.Globals = new Globals, FLD.PageType = new PageType, FLD.Browser = new Browser, FLD.Throttle = new Throttle, FLD.Url = new Url, FLD.Resize = new Resize, FLD.History = new History, FLD.Scroll = new Scroll, FLD.OnScreen = new ScrollHandler, FLD.FlexsliderServices = new Flexslider, FLD.NavigationHide = new NavigationHide, FLD.Member = new Member, FLD.CaseStudy = new CaseStudy, FLD.Contact = new Contact, FLD.Chimp = new Chimp, FLD.Jobs = new Jobs, FLD.NavigationHide = new NavigationHide, FLD.HomeProjects = new HomeProjects, FLD.ImageScroll = new ImageScroll, FLD.Slideshow = new Slideshow, FLD.MobileNavigation = new MobileNavigation, FLD.AboutScroll = new AboutScroll, FLD.HomepageMousewheel = new HomepageMousewheel, FLD.RandomQuote = new RandomQuote, FLD.RandomImage = new RandomImage, FLD.NavigationHome = new NavigationHome, FLD.ExperienceBg = new Background({
            selector: ".block--experience-fueled",
            pageType: "home"
        }), FLD.HomeUI = new HomeUI, FLD.VideoReel = new VideoReel, FLD.ProjectsMenu = new ProjectsMenu, FLD.Press = new Press, FLD.Afterlight = new Afterlight;
        var e = $($("body").hasClass("page-template-page-templatesfront-page-php") ? ".page--homepage-load" : "body");
        e.imagesLoaded(function() {
            $("body").addClass("page-loaded")
        })
    });