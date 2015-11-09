var camera, scene, renderer;
var geometry, material, mesh;
var controls;
var player;

var objects = [];

var raycaster;
var rays = [
    new THREE.Vector3(0,0,-1), // forward
    new THREE.Vector3(0,0,1), // back
    new THREE.Vector3(-1,0,0), // left
    new THREE.Vector3(1,0,0), // right
    new THREE.Vector3(0,-10,0) // down
];

var controlsEnabled = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var isOnObject = false;

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

    if(pressedKeys[32]) {
        if(canJump) velocity.y += 100;
        canJump = false;
    }
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function collisionDetetcion() {
    isOnObject = false;
    for(var i = 0; i < rays.length; i++) {
        var ray = new THREE.Vector3().copy(rays[i]);
        ray = ray.applyMatrix4( player.matrixWorld).sub( player.position ).normalize();
        raycaster.set(player.position, ray);
        raycaster.ray.origin.add(rays[i]);

        var hit = raycaster.intersectObjects( objects).length > 0;

        if(hit){
            switch (i) {
                case 0:
                    moveForward = false; break;
                case 1:
                    moveBackward = false; break;
                case 2:
                    moveLeft = false; break;
                case 3:
                    moveRight = false; break;
                case 4:
                    isOnObject = true;
            }
        }
    }
}

function move() {
    var time = performance.now();
    var delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    collisionDetetcion();

    if ( moveForward ) velocity.z -= 400.0 * delta;
    if ( moveBackward ) velocity.z += 400.0 * delta;

    if ( moveLeft ) velocity.x -= 400.0 * delta;
    if ( moveRight ) velocity.x += 400.0 * delta;

    if ( isOnObject === true ) {
        velocity.y = Math.max( 0, velocity.y );

        canJump = true;
    }

    player.translateX( velocity.x * delta );
    player.translateY( velocity.y * delta );
    player.translateZ( velocity.z * delta );

    if ( player.position.y < 10 ) {
        velocity.y = 0;

        player.position.y = 10;

        canJump = true;

    }

    prevTime = time;
}

function animate() {

    requestAnimationFrame( animate );


    if ( controlsEnabled ) {
        handleKeys();
        //collisionDetetcion();
        move();
    }

    renderer.render( scene, camera );

}

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

    var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    scene.add( light );

    controls = new THREE.PointerLockControls( camera );
    player = controls.getObject();
    scene.add( player );

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(0,-1,0), 0, 10 );

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };

    // model

    var loader = new THREE.OBJLoader();
    loader.load( './res/level.obj', function ( object ) {


        object.traverse( function ( child ) {
            objects.push(child);
        } );

        scene.add( object );
    }, onProgress, onError );


    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xffffff );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    document.addEventListener( 'keydown', function(event) {pressedKeys[event.keyCode] = true;}, false );
    document.addEventListener( 'keyup', function(event) {pressedKeys[event.keyCode] = false;}, false );
    //

    window.addEventListener( 'resize', onWindowResize, false );

}