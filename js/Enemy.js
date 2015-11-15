var enemyGeometry = new THREE.Geometry(); 
	enemyGeometry.vertices.push(new THREE.Vector3(-1.0,  1.0, 0.0)); 
	enemyGeometry.vertices.push(new THREE.Vector3( 1.0,  1.0, 0.0)); 
	enemyGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0)); 
	enemyGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0)); 
	enemyGeometry.faces.push(new THREE.Face3(0, 1, 2)); 
	enemyGeometry.faces.push(new THREE.Face3(0, 2, 3));

var enemyMaterial;

var enemyVerticesCD = [];
	enemyVerticesCD.push(enemyGeometry.vertices[1]);
	enemyVerticesCD.push(enemyGeometry.vertices[3]);
	enemyVerticesCD.push(new THREE.Vector3(0,-1,-1));
	enemyVerticesCD.push(new THREE.Vector3(0,1,1));
	enemyVerticesCD.push(new THREE.Vector3(0,0,0));

var Enemy = function(pos) {
	var squareMesh = new THREE.Mesh(enemyGeometry, enemyMaterial);
	// squareMesh.scale.set(sc.x, sc.y, sc.z);
	squareMesh.position.set(pos.x, pos.y, pos.z); 

	scene.add(squareMesh);
	enemiesMeshes.push(squareMesh);

	this.mesh = squareMesh;
}

var directions = [
	new THREE.Vector3(0,0,-1),
	new THREE.Vector3(0,0,1),
	new THREE.Vector3(-1,0,0),
	new THREE.Vector3(1,0,0)
];

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

	        if(idx != -1 && intersections[idx].distance <= 0.5){
	        	canMove[i] = false;
        	}
		}
	}

	return canMove;
}

Enemy.prototype.move = function() {
	var d = this.mesh.position.distanceToSquared(player.position);
	if(d >= 1500) return;
	if(d < 2.5) {
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