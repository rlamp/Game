var squareGeometry = new THREE.Geometry(); 
	squareGeometry.vertices.push(new THREE.Vector3(-1.0,  1.0, 0.0)); 
	squareGeometry.vertices.push(new THREE.Vector3( 1.0,  1.0, 0.0)); 
	squareGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0)); 
	squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0)); 
	squareGeometry.faces.push(new THREE.Face3(0, 1, 2)); 
	squareGeometry.faces.push(new THREE.Face3(0, 2, 3));

var squareMaterial = new THREE.MeshBasicMaterial({ 
 color:0xFFFFFF, 
 side:THREE.DoubleSide 
});

var Enemy = function(pos) {
	var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
	// squareMesh.scale.set(sc.x, sc.y, sc.z);
	squareMesh.position.set(pos.x, pos.y, pos.z); 

	scene.add(squareMesh);

	this.mesh = squareMesh;
}

Enemy.prototype.move = function() {
	this.mesh.translateOnAxis(this.mesh.worldToLocal(player.position.clone()).normalize(), 0.1);
	this.mesh.lookAt(player.position);
};