; (function () {
    //輪播圖
    var jsImg = new Array("../images/1.jpg", "../images/2.jpg", "../images/3.jpg");
    var jsImg_len = jsImg.length;
    var Picindex = 0;
    function sequentialImg() {
        document.querySelector(".center").innerHTML = `<img src="${jsImg[Picindex]}" width=380 height=320>`;
        Picindex++;
        if (Picindex >= jsImg_len) Picindex = 0;
    }
    setInterval(sequentialImg, 3000);
    //輪播圖固定
    window.addEventListener("load", slidesFix);
    function slidesFix() {
        var slides = document.querySelector(".slides"),
            slidesPosition = slides.offsetTop;
        function scrollHandler3() {
            if ((window.scrollY + header.offsetHeight) >= slidesPosition) {
                slides.classList.add("fix-right");
                slides.style.top = header.offsetHeight + "px";
                document.querySelector("#SlidesReplace").classList.add("col-3");
            } else {
                slides.classList.remove("fix-right");
                document.querySelector("#SlidesReplace").classList.remove("col-3");
                slides.style.top = 0 + "px";
            }
        }
        window.addEventListener("scroll", scrollHandler3);
    }
    // 搜尋固定  
    window.addEventListener("load", searchFix);
    function searchFix() {
        var search = document.querySelector("#search"),
            searchPosition = search.offsetTop;
        function scrollHandler2() {
            if ((window.scrollY + header.offsetHeight) >= searchPosition) {
                search.classList.add("fix");
                search.style.top = header.offsetHeight + "px";
                document.querySelector("#replace").classList.add("col-3");
                //  search.classList.remove("col-3");
                //  $("#search").append("</div>");
            } else {
                search.classList.remove("fix");
                document.querySelector("#replace").classList.remove("col-3");
                // search.classList.add("col-3");
                search.style.top = 0 + "px";
            }
        }
        window.addEventListener("scroll", scrollHandler2);
    }
    // Little Canvas things
    var canvas = document.querySelector("#canvas"),
        ctx = canvas.getContext('2d');
    var header = document.querySelector(".header");
    var footer = document.querySelector(".footer");
    canvas.width = window.innerWidth;
    canvas.height = (window.innerHeight - header.offsetHeight - footer.offsetHeight) / 2;
    //煙火高度為，扣除頭尾Navbar之高度後，剩下空間的一半
    var space = document.querySelector("#space");
    space.style.height = canvas.height + "px";
    // Configuration, Play with these
    var config = {
        particleNumber: 800,
        maxParticleSize: 10,
        maxSpeed: 40,
        colorVariation: 50
    };

    // Colors
    var colorPalette = {
        bg: { r: 12, g: 9, b: 29 },
        matter: [
            { r: 36, g: 18, b: 42 }, // darkPRPL
            { r: 78, g: 36, b: 42 }, // rockDust
            { r: 252, g: 178, b: 96 }, // solorFlare
            { r: 253, g: 238, b: 152 } // totesASun
        ]
    };

    // Some Variables hanging out
    var particles = [],
        centerX = canvas.width / 2,
        centerY = canvas.height / 2,
        drawBg,

        // Draws the background for the canvas, because space
        drawBg = function (ctx, color) {
            ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

    // Particle Constructor
    var Particle = function (x, y) {
        // X Coordinate
        this.x = x || Math.round(Math.random() * canvas.width);
        // Y Coordinate
        this.y = y || Math.round(Math.random() * canvas.height);
        // Radius of the space dust
        this.r = Math.ceil(Math.random() * config.maxParticleSize);
        // Color of the rock, given some randomness
        this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
        // Speed of which the rock travels
        this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
        // Direction the Rock flies
        this.d = Math.round(Math.random() * 360);
    };

    // Provides some nice color variation
    // Accepts an rgba object
    // returns a modified rgba object or a rgba string if true is passed in for argument 2
    var colorVariation = function (color, returnString) {
        var r, g, b, a, variation;
        r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.r);
        g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.g);
        b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.b);
        a = Math.random() + .5;
        if (returnString) {
            return "rgba(" + r + "," + g + "," + b + "," + a + ")";
        } else {
            return { r, g, b, a };
        }
    };

    // Used to find the rocks next point in space, accounting for speed and direction
    var updateParticleModel = function (p) {
        var a = 180 - (p.d + 90); // find the 3rd angle
        p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
        p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
        return p;
    };

    // Just the function that physically draws the particles
    // Physically? sure why not, physically.
    var drawParticle = function (x, y, r, c) {
        ctx.beginPath();
        ctx.fillStyle = c;
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    };

    // Remove particles that aren't on the canvas
    var cleanUpArray = function () {
        particles = particles.filter((p) => {
            return (p.x > -100 && p.y > -100);
        });
    };


    var initParticles = function (numParticles, x, y) {
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(x, y));
        }
        particles.forEach((p) => {
            drawParticle(p.x, p.y, p.r, p.c);
        });
    };

    // That thing
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    // Our Frame function
    var frame = function () {
        // Draw background first
        drawBg(ctx, colorPalette.bg);
        // Update Particle models to new position
        particles.map((p) => {
            return updateParticleModel(p);
        });
        // Draw em'
        particles.forEach((p) => {
            drawParticle(p.x, p.y, p.r, p.c);
        });
        // Play the same song? Ok!
        window.requestAnimFrame(frame);
    };


    document.body.addEventListener("click", function (e) {
        if (e.clientY <= canvas.height + 150) {
            var x = e.clientX,
                y = e.clientY;
            cleanUpArray();
            initParticles(config.particleNumber, x, y);
        }
        else {
            return;
        }
    });

    frame();

    initParticles(config.particleNumber);
})(); 