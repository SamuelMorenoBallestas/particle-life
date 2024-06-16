const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let particleCount = 0;

class Particle {
    constructor(x, y, velocityX, velocityY, size, charge, type) {
        this.id = particleCount++;

        this.x = x
        this.y = y

        this.velocityX = velocityX
        this.velocityY = velocityY

        this.size = size;
        this.mass = size * size;

        this.type = type
        this.charge = charge;
        this.strength = 0;
    }

    handle(particles) {
        throw new Error("Not implemented");
    }

    move() {
        this.x += this.velocityX
        this.y += this.velocityY
    }
}

class Neutral extends Particle {
    constructor(x, y, velocityX, velocityY, size) {
        super(x, y, velocityX, velocityY, size, 0, "neutral");
    }

    handle(particles) {

    }
}

class ChargedParticle extends Particle {
    constructor(x, y, velocityX, velocityY, size, charge, type, strength) {
        super(x, y, velocityX, velocityY, size, charge, type);

        this.strength = strength;
    }

    handle(particles) {
        const damp = 1

        for (let particle of particles) {
            const dx = particle.x - this.x;
            const dy = particle.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= this.size) {

                continue;
            }

            const force = this.charge * particle.charge * this.strength / (distance * distance);

            particle.velocityX += force * (dx / distance) * damp;
            particle.velocityY += force * (dy / distance) * damp;
        }
    }
}

class Positive extends ChargedParticle {
    constructor(x, y, velocityX, velocityY, size, strength) {
        super(x, y, velocityX, velocityY, size, 1, "positive", strength)
    }
}

class Negative extends ChargedParticle {
    constructor(x, y, velocityX, velocityY, size, strength) {
        super(x, y, velocityX, velocityY, size, -1, "negative", strength);
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
        const changes = [];
        /*
        this.particles.forEach(particle1 => {
            const id = particle1.id;

            changes[id] = [0, 0];

            this.particles.forEach(particle2 => {
                if (particle1 == particle2) return;

                const delta = utils.calculateHypotenuse(particle1.x - particle2.x, particle1.y - particle2.y);

                if ((particle1.size + particle2.size) * 0.5 < delta) return;

                const [changeX, changeY] = utils.calculateCollisionVelocityChange(particle1, particle2);

                if (isNaN(changeX)) {
                    console.warn("REMOVED ALL PARTICLES DUE TO NAN COLLISION")
                    this.particles = [];
                }

                changes[id][0] += changeX;
                changes[id][1] += changeY;
            })
        });

        this.particles.forEach(particle => {
            const [changeX, changeY] = changes[particle.id];

            if(changeX && changeY) {
                console.log(changeX, changeY)
                //this.particles = [];
            }

            particle.velocityX += changeX;
            particle.velocityY += changeY;
        })
        */
        this.particles.forEach(particle => particle.handle(this.particles.filter(p => p !== particle)));
        this.particles.forEach(particle => particle.move());

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
//simulator.addParticle(new Neutral(350, 350, -0.001, 0.001, 10, 0));

//simulator.addParticle(new Neutral(350, 320, -0, .25, 5, 1));
//simulator.addParticle(new Neutral(357, 480, 0, -1.25, 5, 1));
//simulator.addParticle(new Neutral(450, 350, -1, 0, 5, 1));

//simulator.addParticle(new Neutral(450, 450, -1, -1, 20, 1));
//simulator.addParticle(new Neutral(700, 0, -1, 1, 20, 1));

//simulator.addParticle(new Neutral(250, 250, 1, 1, 11, 1));
simulator.addParticle(new Positive(400, 400, 0, 0, 20, 10))
simulator.addParticle(new Negative(400,200, 0.2, 0.2, 10, 10))
simulator.addParticle(new Negative(200, 400, 0.2, -0.2, 10, 10))
simulator.addParticle(new Negative(400, 600, -0.2, -0.2, 10, 10))
simulator.addParticle(new Negative(600, 400, -0.2, 0.2, 10, 10))


simulator.run();