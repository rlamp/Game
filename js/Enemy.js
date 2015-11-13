var enemyGeometry = new THREE.Geometry(); 
	enemyGeometry.vertices.push(new THREE.Vector3(-1.0,  1.0, 0.0)); 
	enemyGeometry.vertices.push(new THREE.Vector3( 1.0,  1.0, 0.0)); 
	enemyGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0)); 
	enemyGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0)); 
	enemyGeometry.faces.push(new THREE.Face3(0, 1, 2)); 
	enemyGeometry.faces.push(new THREE.Face3(0, 2, 3));

var enemyMaterial = new THREE.MeshBasicMaterial({ 
 color:0xFFFFFF, 
 side:THREE.DoubleSide 
});

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

	this.mesh = squareMesh;
}

var directions = [
	new THREE.Vector3(0,0,-1),
	new THREE.Vector3(0,0,1),
	new THREE.Vector3(-1,0,0),
	new THREE.Vector3(1,0,0)
];
Enemy.prototype.move = function() {
	var canMove = {0:true, 1:true, 2:true, 3:true};

	for(var j = 0; j < enemyVerticesCD.length; j++){
		var origin = this.mesh.position.clone().add(enemyVerticesCD[j]);
		
		for(var i = 0; i < directions.length; i++){
	        raycaster.set(origin, directions[i]);

	        var intersections = raycaster.intersectObjects( objects, true );
	        var hit = intersections.length > 0;

	        if(hit && intersections[0].distance <= 0.5){
	        	canMove[i] = false;
        	}
		}
	}

	// depth first, stopnja 1
	var best = -1;
	var l = null;
	for(var i = 0; i < directions.length; i++){
		if(canMove[i]) {
			if(l != null){
				var d = this.mesh.position.clone().add(directions[i]).distanceToSquared(player.position);
				if(d < l){
					best = i;
					l = d;
				}
			}
			else {
				l = this.mesh.position.clone().add(directions[i]).distanceToSquared(player.position);
				best = i;
			}
		}
	}

	this.mesh.position.add(directions[best].clone().multiplyScalar(0.2));
	this.mesh.lookAt(player.position);
};