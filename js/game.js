var camera, scene, renderer;
var controls;

var objects = [];
var enemies = [];
var enemiesMeshes = [];

var raycaster;

var controlsEnabled = false;

var gameover = false;
var win = false;

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
        animateBullets();
        healthBoxHandle();

        document.getElementById('hud').style.display = 'block';
        if(playerHealth < 20) {
        	document.getElementById('hud').style.backgroundColor = 'red';
        }
        document.getElementById('hud').innerHTML = "HEALTH: " + playerHealth;
        if(playerHealth <= 0) {
            gameOver();
        }
        if(enemiesLeft <= 0) {
        	win = true;
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

    createHealthBox();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    document.addEventListener( 'keydown', function(event) {pressedKeys[event.keyCode] = true;}, false );
    document.addEventListener( 'keyup', function(event) {pressedKeys[event.keyCode] = false;}, false );
	document.addEventListener("mousedown", shoot, false);

    // document.addEventListener('click', function() {console.log(player.position);}, false);

    document.getElementById("tillEnd").innerHTML = enemiesLeft;

    //
    window.setInterval(function() {
        if(controlsEnabled && enemies.length < 42) {
            var idx = Math.floor(Math.random()*(enemySpawnLocations.length));
            enemies.push(new Enemy(enemySpawnLocations[idx]));
        }
    }, 500);


    
    window.addEventListener( 'resize', onWindowResize, false );
}

function gameOver() {
    gameover = true;
    document.exitPointerLock = document.exitPointerLock ||
                               document.mozExitPointerLock ||
                               document.webkitExitPointerLock;
    document.exitPointerLock();
}
