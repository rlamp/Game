var player;
var playerHealth = 100;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

var rays = [
    new THREE.Vector3(0,0,-1), // forward
    new THREE.Vector3(0,0,1), // back
    new THREE.Vector3(-1,0,0), // left
    new THREE.Vector3(1,0,0), // right
    new THREE.Vector3(-1,0,-1), // FL
    new THREE.Vector3(1,0,-1), // FR
    new THREE.Vector3(-1,0,1), // BL
    new THREE.Vector3(1,0,1), // BR

];

function collisionDetetcion() {
    for(var i = 0; i < rays.length; i++) {
        var ray = rays[i].clone();
        ray.applyEuler(player.rotation).normalize();
        raycaster.set(player.position, ray);

        var intersections = raycaster.intersectObjects( objects, true);
        var hit = intersections.length > 0;

        if(hit && intersections[0].distance <= 0.5){
            switch (i) {
                case 0:
                    moveForward = false; velocity.x = 0; break;
                case 1:
                    moveBackward = false; velocity.x = 0; break;
                case 2:
                    moveLeft = false; velocity.z = 0; break;
                case 3:
                    moveRight = false; velocity.z = 0; break;
                case 4:
                    moveForward = false; moveLeft = false; velocity.x = 0; velocity.z = 0; break;
                case 5:
                    moveForward = false; moveRight = false; velocity.x = 0; velocity.z = 0; break;
                case 6:
                    moveBackward = false; moveLeft = false; velocity.x = 0; velocity.z = 0; break;
                case 7:
                    moveBackward = false; moveRight = false; velocity.x = 0; velocity.z = 0; break;
        	}
        }
    }
}

function move() {
    var time = performance.now();
    var delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    collisionDetetcion();

    if ( moveForward ) velocity.z -= 120.0 * delta;
    if ( moveBackward ) velocity.z += 120.0 * delta;

    if ( moveLeft ) velocity.x -= 120.0 * delta;
    if ( moveRight ) velocity.x += 120.0 * delta;


    player.translateX( velocity.x * delta );
    player.translateZ( velocity.z * delta );


    prevTime = time;
}