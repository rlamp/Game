function loadMap() {
	scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

    var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    scene.add( light );
    
    // //gridline
    // var size = 100;
    // var step = 1;
    // var gridHelper = new THREE.GridHelper(size, step);
    // scene.add(gridHelper);
    
    // //axis helper
    // var axisHelper= new THREE.AxisHelper(100);
    // scene.add(axisHelper);

	
	var loader= new THREE.JSONLoader();
	
	//HALLWAY 1
	//ground
	loader.load("./res/models/hall1_ground.json", function(geometry, materials){
		
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/FloorTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(50, 50);
		
		var material= new THREE.MeshLambertMaterial({color: 0xa4a4a4, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);
		

		scene.add(mesh);
	
	});
	
	//walls
	loader.load("./res/models/hall1_walls.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/WallTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(6, 8);
		
		var material= new THREE.MeshLambertMaterial({color: 0xbebebe, map: texture});

		var mesh= new THREE.Mesh(geometry, material);
		
	
		objects.push(mesh);
		scene.add(mesh);
	
	});
	
	//ceiling
	loader.load("./res/models/hall1_ceiling.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/CeilingTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(4, 4);
		
		var material= new THREE.MeshLambertMaterial({color: 0xbebebe, map: texture});

		var mesh= new THREE.Mesh(geometry, material);
		

		scene.add(mesh);
	
	});
	
	
	
	//HALLWAY 2
	//ground
	loader.load("./res/models/hall2_ground.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/FloorTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(50, 50);
		
		var material= new THREE.MeshPhongMaterial({color: 0xa4a4a4, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);
	
		scene.add(mesh);
	
	});
	
	//walls
	loader.load("./res/models/hall2_walls.json", function(geometry, materials){
	
		var texture= THREE.ImageUtils.loadTexture("./res/textures/WallTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(6, 8);
		
		var material= new THREE.MeshPhongMaterial({color: 0xbebebe, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);

		objects.push(mesh);
		scene.add(mesh);
	
	});
	
	//ceiling
	loader.load("./res/models/hall2_ceiling.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/CeilingTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(4, 4);
		
		var material= new THREE.MeshLambertMaterial({color: 0xbebebe, map: texture});

		var mesh= new THREE.Mesh(geometry, material);
		

		scene.add(mesh);
	
	});
	
	
	
	
	//HALLWAY 3
	//ground
	loader.load("./res/models/hall3_ground.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/FloorTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(50, 50);
		
		var material= new THREE.MeshPhongMaterial({color: 0xa4a4a4, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);
	
		scene.add(mesh);
	
	});
	
	//walls
	loader.load("./res/models/hall3_walls.json", function(geometry, materials){
	
		var texture= THREE.ImageUtils.loadTexture("./res/textures/WallTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(10, 13);
		
		var material= new THREE.MeshPhongMaterial({color: 0xbebebe, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);

		objects.push(mesh);
		scene.add(mesh);
	
	});
	
	//ceiling
	loader.load("./res/models/hall3_ceiling.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/CeilingTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(6, 6);
		
		var material= new THREE.MeshLambertMaterial({color: 0xbebebe, map: texture});

		var mesh= new THREE.Mesh(geometry, material);
		
		scene.add(mesh);
	
	});
	
	
	
	
	//HALLWAY 4
	//ground
	loader.load("./res/models/hall4_ground.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/FloorTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(50, 50);
		
		var material= new THREE.MeshPhongMaterial({color: 0xa4a4a4, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);

		scene.add(mesh);
	
	});
	
	//walls
	loader.load("./res/models/hall4_walls.json", function(geometry, materials){
	
		var texture= THREE.ImageUtils.loadTexture("./res/textures/WallTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(6, 8);
		
		var material= new THREE.MeshPhongMaterial({color: 0xbebebe, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);

		objects.push(mesh);
		scene.add(mesh);
	
	});
	
	//ceiling
	loader.load("./res/models/hall4_ceiling.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/CeilingTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(6, 6);
		
		var material= new THREE.MeshLambertMaterial({color: 0xbebebe, map: texture});

		var mesh= new THREE.Mesh(geometry, material);
		
	
		scene.add(mesh);
	
	});
	
	//HALLWAY 5
	//ground
	loader.load("./res/models/hall5_ground.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/FloorTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(50, 50);
		
		var material= new THREE.MeshPhongMaterial({color: 0xa4a4a4, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);
	
		scene.add(mesh);
	
	});
	
	//walls
	loader.load("./res/models/hall5_walls.json", function(geometry, materials){
	
		var texture= THREE.ImageUtils.loadTexture("./res/textures/WallTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(10, 13);
		
		var material= new THREE.MeshPhongMaterial({color: 0xbebebe, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);

		objects.push(mesh);
		scene.add(mesh);
	
	});
	
	//ceiling
	loader.load("./res/models/hall5_ceiling.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/CeilingTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(10, 10);
		
		var material= new THREE.MeshLambertMaterial({color: 0xbebebe, map: texture});

		var mesh= new THREE.Mesh(geometry, material);
		
	
		scene.add(mesh);
	
	});
	
	
	//ROUND CHAMBER
	//ground
	loader.load("./res/models/RC_ground.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/FloorTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(50, 50);
		
		var material= new THREE.MeshPhongMaterial({color: 0xa4a4a4, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);
	
		scene.add(mesh);
	
	});
	
	//walls
	loader.load("./res/models/RC_walls.json", function(geometry, materials){
	
		var texture= THREE.ImageUtils.loadTexture("./res/textures/WallTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(4, 3);
		
		var material= new THREE.MeshPhongMaterial({color: 0xbebebe, map: texture});
		
		var mesh= new THREE.Mesh(geometry, material);

		objects.push(mesh);
		scene.add(mesh);
	
	});
	
	//ceiling
	loader.load("./res/models/RC_ceiling.json", function(geometry, materials){
		
		var texture= THREE.ImageUtils.loadTexture("./res/textures/CeilingTEX.jpg", THREE.UVMapping);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(5, 5);
		
		var material= new THREE.MeshLambertMaterial({color: 0xbebebe, map: texture});

		var mesh= new THREE.Mesh(geometry, material);
		
		scene.add(mesh);
	
	});
	
	//enemies
	var loader = new THREE.TextureLoader();
	loader.load("./res/textures/ad.jpg", function(texture) {
		enemyMaterial = new THREE.MeshBasicMaterial( { map: texture, side:THREE.DoubleSide } );
	});

	// first healthbox
	newHealthBox();
}
