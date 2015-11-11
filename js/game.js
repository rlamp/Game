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
        var ray = new THREE.Vector3().copy(rays[i]);
        ray = ray.applyMatrix4( player.matrixWorld).sub( player.position ).normalize();
        raycaster.set(player.position, ray);
        if(i < 4) {
            raycaster.ray.origin.add(rays[i]);
        }

        var intersections = raycaster.intersectObjects( objects);
        var hit = intersections.length > 0;

        if(hit){
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

function animate() {

    requestAnimationFrame( animate );


    if ( controlsEnabled ) {
        handleKeys();
        move();
    }

    renderer.render( scene, camera );

}

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000 );

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

    // var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    // light.position.set( 0.5, 1, 0.75 );
    // scene.add( light );

    controls = new THREE.PointerLockControls( camera );
    player = controls.getObject();
    scene.add( player );
    player.position = new THREE.Vector3(0,2,0);

    raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(), 0, 0.5 );

    //pointLight
    var pointLight= new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);
    
    var pointLight2= new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 2, -35);
    scene.add(pointLight2);
    
    //gridline
    var size = 100;
    var step = 1;
    var gridHelper = new THREE.GridHelper(size, step);
    scene.add(gridHelper);
    
    //axis helper
    var axisHelper= new THREE.AxisHelper(100);
    scene.add(axisHelper);

    drawLevel();


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

function drawLevel() {

    var loader= new THREE.JSONLoader();
    
    //HALLWAY 1
    loader.load("./models/hall1.json", function(geometry, materials){
        
        console.log(geometry, materials);
        
        //var material= new THREE.MeshFaceMaterial(materials);
        var material= new THREE.MeshPhongMaterial({color: 0xff3300});
        //material.shading= THREE.FlatShading;
        var mesh= new THREE.Mesh(geometry, material);
        
        //mesh.translateY(1.8);
        objects.push(mesh);
        scene.add(mesh);
    
    });
    
    //HALLWAY 2
    loader.load("./models/hall2.json", function(geometry, materials){
        
        console.log(geometry, materials);
        
        //var material= new THREE.MeshFaceMaterial(materials);
        var material= new THREE.MeshPhongMaterial({color: 0xff3300});
        //material.shading= THREE.FlatShading;
        var mesh= new THREE.Mesh(geometry, material);
        
        //mesh.translateY(1.8);
        objects.push(mesh);
        scene.add(mesh);
    
    });
    
    //HALLWAY 3
    loader.load("./models/hall3.json", function(geometry, materials){
        
        console.log(geometry, materials);
        
        //var material= new THREE.MeshFaceMaterial(materials);
        var material= new THREE.MeshPhongMaterial({color: 0xff3300});
        //material.shading= THREE.FlatShading;
        var mesh= new THREE.Mesh(geometry, material);
        
        //mesh.translateY(1.8);
        objects.push(mesh);
        scene.add(mesh);
    
    });
    
    //HALLWAY 4
    loader.load("./models/hall4.json", function(geometry, materials){
        
        console.log(geometry, materials);
        
        //var material= new THREE.MeshFaceMaterial(materials);
        var material= new THREE.MeshPhongMaterial({color: 0xff3300});
        //material.shading= THREE.FlatShading;
        var mesh= new THREE.Mesh(geometry, material);
        
        //mesh.translateY(1.8);
        objects.push(mesh);
        scene.add(mesh);
    
    });
    
    loader.load("./models/round_chamber.json", function(geometry, materials){
        
        console.log(geometry, materials);
        
        //var material= new THREE.MeshFaceMaterial(materials);
        var material= new THREE.MeshPhongMaterial({color: 0xff3322});
        //material.shading= THREE.FlatShading;
        var mesh= new THREE.Mesh(geometry, material);
        
        //mesh.translateZ(-24);
        objects.push(mesh);
        scene.add(mesh);
    });
    
}
