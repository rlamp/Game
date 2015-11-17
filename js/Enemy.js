var enemiesLeft = 100;

var enemyGeometry= new THREE.PlaneGeometry(2, 2);;
var enemyMaterial;
var enemyTexture;

function randomTexture() {

	var st_texture= Math.floor((Math.random() * 9) + 0);	//random int med 1 in 9
		
	var path= "./res/textures/ad_";
	var name= st_texture.toString();
	var type= ".png";
	
	var texture= path.concat(name, type);
	
	return texture;
}

var enemyVerticesCD = [];
	enemyVerticesCD.push(enemyGeometry.vertices[1]);
	enemyVerticesCD.push(enemyGeometry.vertices[3]);
	enemyVerticesCD.push(new THREE.Vector3(0,-1,-1));
	enemyVerticesCD.push(new THREE.Vector3(0,1,1));
	enemyVerticesCD.push(new THREE.Vector3(0,0,0));

var enemySpawnLocations = [
	//new THREE.Vector3(0,2,0),
	//new THREE.Vector3(0,2,28),
	new THREE.Vector3(0,2,-45),
	new THREE.Vector3(0,2,-65),
	new THREE.Vector3(55,2,0),
	new THREE.Vector3(-21,2,0)
];

var directions = [
	new THREE.Vector3(0,0,-1),
	new THREE.Vector3(-1,0,0),
	new THREE.Vector3(1,0,0),
	new THREE.Vector3(0,0,1)
];


var Enemy = function(pos) {
	
	enemyTexture= new THREE.ImageUtils.loadTexture(randomTexture());		
	enemyMaterial= new THREE.MeshBasicMaterial({map: enemyTexture, side: THREE.DoubleSide});
	
	var squareMesh = new THREE.Mesh(enemyGeometry, enemyMaterial);
	squareMesh.position.set(pos.x, 2, pos.z); 

	scene.add(squareMesh);
	enemiesMeshes.push(squareMesh);

	this.mesh = squareMesh;
}


Enemy.prototype.checkPos = function(pos) {
	var canMove = {0:true, 1:true, 2:true, 3:true};

	for(var j = 0; j < enemyVerticesCD.length; j++){
		var origin = pos.clone().add(enemyVerticesCD[j]);
		
		for(var i = 0; i < directions.length; i++){
	        raycaster.set(origin, directions[i]);

	        var intersections = raycaster.intersectObjects( objects.concat(enemiesMeshes) );

	        var idx = -1;
	        for(var x = 0; x < intersections.length; x++){
	        	if(intersections[x].object !== this.mesh){
	        		idx = x;
	        		break;
	        	}
	        }

	        if(idx != -1 && intersections[idx].distance <= 0.9){
	        	canMove[i] = false;
        	}
		}
	}

	return canMove;
}

Enemy.prototype.move = function() {
	var d = this.mesh.position.distanceTo(player.position);
	if(d >= 1500) return;
	if(d < 1.5) {


		var ray = player.position.clone().sub(this.mesh.position).normalize();
        raycaster.set(this.mesh.position, ray);

        var intersections = raycaster.intersectObjects( objects, true);
        var hit = intersections.length > 0 && intersections[0].distance <= 1.5;

        if(!hit) {
			document.getElementById('hurt').style.display = '';
			window.setTimeout(function() {document.getElementById('hurt').style.display = 'none';}, 50);

			playerHealth -= 10;
			var idx = enemiesMeshes.indexOf(this.mesh);
			enemiesMeshes.splice(idx,1);
			idx = enemies.indexOf(this);
			enemies.splice(idx,1);
			
			scene.remove(this.mesh);

			delete this;
			return;
        }
	}

	var canMove = this.checkPos(this.mesh.position);

	var bestLength = Infinity;
	var bestMove = -1;
	for (var i = 0; i < directions.length; i++) {
		if(canMove[i]){
			var moveTo = this.mesh.position.clone().add(directions[i].clone().multiplyScalar(0.2));

			var d = moveTo.distanceToSquared(player.position);
			if(d < bestLength) {
				bestMove = i;
				bestLength = d;
			}
		}
	};

	if(bestMove != -1) {
		this.mesh.position.add(directions[bestMove].clone().multiplyScalar(0.2));
	}
	this.mesh.lookAt(player.position);
};