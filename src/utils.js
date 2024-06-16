const radian = 180 / Math.PI;

function calculateAngle(deltaX, deltaY) {
    return Math.atan(deltaY / deltaX) * radian;
}

function calculateHypotenuse(a, b) {
    return Math.sqrt(a * a + b * b);
}

function collision(v1, v2, m1, m2) {

}

function radianToDegrees(radians) {
    return radians * radian;
}

function degreesToRadians(degrees) {
    return degrees / radian;
}

function calculateCollisonSpeed(particle1, particle2) {
  // well come back to this later team :)
    return [newv1X, newv1Y]

}

function calculateCollisionVelocityChange(particle1, particle2) {

    var newV = calculateCollisonSpeed(particle1, particle2)

    var newVx = newV[0]
    var newVy = newV[1]

    const deltaVx = newVx - particle1.velocityX
    const deltaVy = newVy - particle1.velocityY

    return [deltaVx, deltaVy]
}



window.utils = {
    calculateCollisonSpeed,
    calculateCollisionVelocityChange,
    calculateHypotenuse,
    radianToDegrees
}