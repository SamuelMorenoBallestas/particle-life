const canvas = document.getElementById("main");

var margin = 50
var screen_height = window.innerHeight - margin
var screen_width = window.innerWidth - margin


var pause_var = false


function run() {
    const ctx = canvas.getContext("2d");

    loopWithDelay(1000, 0.1, ctx, canvas, 0)
}


function draw_particles(particles, ctx) {
    for (particle = 0; particle < particles.length; particle++) {
        var p = particles[particle]
        //console.log(p.x,p.y)
        switch (p.type) {
            case "neutral":
                ctx.fillStyle = "black"
                break
            case "positive":
                ctx.fillStyle = "red"
                break
            case "negative":
                ctx.fillStyle = "blue"
                break
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function loopWithDelay(iterations, delay, ctx, canvas, infin) {
    if (pause_var) {
        if (iterations > 0) {
            setTimeout(function () {
                loopWithDelay(iterations - infin, delay, ctx, canvas, infin);
            }, delay);
        }
        return
    }

    // console.log('Iteration', iterations);

    screen_height = window.innerHeight - margin
    screen_width = window.innerWidth - margin

    canvas.height = screen_height
    canvas.width = screen_width



    ctx.clearRect(0, 0, screen_width, screen_height);

    draw_particles(simulator.particles, ctx)

    if (iterations > 0) {
        setTimeout(function () {
            loopWithDelay(iterations - infin, delay, ctx, canvas, infin);
        }, delay);
    }
}

window.onload = run()