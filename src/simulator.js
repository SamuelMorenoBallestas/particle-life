const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class Particle {
    constructor(x, y, x_speed, y_speed, size, charge, type) {
        this.x = x
        this.y = y

        this.x_speed = x_speed
        this.y_speed = y_speed

        this.size = size

        this.type = type
        this.charge = charge;
        this.strength = 0;
    }

    handle(particles) {
        throw new Error("Not implemented");
    }

    move() {
        this.x += this.x_speed
        this.y += this.y_speed
    }
}

class Neutral extends Particle {
    constructor(x, y, x_speed, y_speed, size) {
        super(x, y, x_speed, y_speed, size, 0, "neutral");
    }

    handle(particles) {

    }
}

class ChargedParticle extends Particle {
    constructor(x, y, x_speed, y_speed, size, charge, type, strength) {
        super(x, y, x_speed, y_speed, size, charge, type);

        this.strength = strength;
    }

    handle(particles) {
        for (let particle of particles) {
            const dx = particle.x - this.x;
            const dy = particle.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            console.log(distance, this.size);
            if (distance <= this.size) {
                continue;
            }

            const force = this.charge * particle.charge * this.strength / (distance * distance);

            particle.x_speed += force * Math.sign(dx);
            particle.y_speed += force * Math.sign(dy);
        }
    }
}

class Positive extends ChargedParticle {
    constructor(x, y, x_speed, y_speed, size) {
        super(x, y, x_speed, y_speed, size, 1, "positive", 1)
    }
}

class Negative extends ChargedParticle {
    constructor(x, y, x_speed, y_speed, size) {
        super(x, y, x_speed, y_speed, size, -1, "negative", 1);
    }
}

class Simulator {
    constructor() {
        this.particles = []
    }

    addParticle(particle) {
        this.particles.push(particle)
    }

    update() {
        for (let particle of this.particles) {
            particle.handle(this.particles.filter(p => p !== particle));
            particle.move();
        }
    }

    async run() {
        while (true) {
            this.update();
            await sleep(0.01);
        }
    }
}

const simulator = new Simulator();

//simulator.addParticle(new Neutral(400, 400, 1, 1, 5));
simulator.addParticle(new Positive(200, 200, 0, 0, 5));
simulator.addParticle(new Negative(190, 190, 0, 0, 5));
simulator.run();