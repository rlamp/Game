var camera, scene, renderer;
var controls;

var player;
var playerHealth = 10;

var objects = [];
var enemies = [];
var enemiesMeshes = [];

var raycaster;
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

var controlsEnabled = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

var pressedKeys = {};

init();
animate();


function handleKeys()  {
    moveForward = pressedKeys[38] || pressedKeys[87];
    moveBackward = pressedKeys[40] || pressedKeys[83];
    moveLeft = pressedKeys[37] || pressedKeys[65];
    moveRight = pressedKeys[39] || pressedKeys[68];
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function collisionDetetcion() {
    for(var i = 0; i < rays.length; i++) {
        var ray = rays[i].clone();
        ray.applyMatrix4( player.matrixWorld).sub( player.position ).normalize();
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

function moveEnemies() {
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].move();
	};
}

function animate() {
    requestAnimationFrame( animate );

    if ( controlsEnabled ) {
        handleKeys();
        move();
        moveEnemies();
        healthBoxHandle();

        document.getElementById('hud').style.display = 'block';
        if(playerHealth < 20) {
        	document.getElementById('hud').style.backgroundColor = 'red';
        }
        document.getElementById('hud').innerHTML = "HEALTH: " + playerHealth;
        if(playerHealth <= 0) {
            gameOver();
        }
    }

    renderer.render( scene, camera );
}

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000 );

    scene = new THREE.Scene();

    controls = new THREE.PointerLockControls( camera );
    player = controls.getObject();
    scene.add( player );

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(), 0, 3 );


    loadMap();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    document.addEventListener( 'keydown', function(event) {pressedKeys[event.keyCode] = true;}, false );
    document.addEventListener( 'keyup', function(event) {pressedKeys[event.keyCode] = false;}, false );
    
    // document.addEventListener('click', function() {console.log(player.position);}, false);

    //
    // window.setInterval(function() {
    // 	if(controlsEnabled) {
    // 		var idx = Math.floor(Math.random()*enemySpawnLocations.length);
    // 		enemies.push(new Enemy(enemySpawnLocations[idx]));
    // 	}
    // }, 1000);
    
    window.addEventListener( 'resize', onWindowResize, false );
}

var gameover = false;
function gameOver() {
    gameover = true;
    document.exitPointerLock = document.exitPointerLock ||
       document.mozExitPointerLock ||
       document.webkitExitPointerLock;
    document.exitPointerLock();
}