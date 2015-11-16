var bulletSpeed= 3.0;

var bulletTime= 1;

var bullets= [];

var sphereMAT= new THREE.MeshBasicMaterial({color: 0xff0000});
var sphereGEO= new THREE.SphereGeometry(0.2, 0.2, 0.2);

function shoot() {
	
	var bulletMesh = new THREE.Mesh(sphereGEO, sphereMAT);												//nrdi nov bullet
	bulletMesh.position.set(player.position.x, player.position.y * 0.8, player.position.z);				//ga postavi "pred/v" kamero

	var eu = new THREE.Euler(player.children[0].rotation.x, player.rotation.y, 0, 'YXZ');
	var bulletVector = new THREE.Vector3(0,0,-1).applyEuler(eu).normalize();					//vektor letenja bulleta


	var timer = new THREE.Clock();
	timer.start();
	
	var bullet= {mesh: bulletMesh, vector: bulletVector, timer: timer};											//nrdi bullet objekt (mesh + vector + time)
	
	
	bullets.push(bullet);																			
	scene.add(bulletMesh);

}

function animateBullets() {
	
	for (var i = 0; i < bullets.length; i++) {
		
		if (bullets[i].timer.getElapsedTime() > bulletTime) {
			
			scene.remove(bullets[i].mesh);
			bullets.splice(i, 1);
		
		}
		else {
			moveBullet(i);
		}
	
	}
}

function moveBullet(i) {	
	var mesh = bullets[i].mesh;
	var bulletVector= bullets[i].vector;			//smer letenja trenutnega metka

	var ray = bulletVector.clone().applyMatrix4( mesh.matrixWorld ).sub( mesh.position ).normalize();
    raycaster.set(mesh.position, ray);

    var intersections = raycaster.intersectObjects( objects, true ); // hit wall
    var hit = intersections.length > 0;

    if(hit && intersections[0].distance <= 3){

    	scene.remove(bullets[i].mesh);
		bullets.splice(i, 1);

		return;
    }
    
    var intersections = raycaster.intersectObjects( enemiesMeshes, true ); // hit enemy
    var hit = intersections.length > 0;

    if(hit && intersections[0].distance <= 3){
    	var enemyMesh = intersections[0].object;
    	var idx = enemiesMeshes.indexOf(enemyMesh);
		enemiesMeshes.splice(idx,1);

		for(var j = 0; j < enemies.length; j++) {
			if(enemies[j].mesh.id === enemyMesh.id){
				enemies.splice(j,1);
				break;
			}
		}
		scene.remove(enemyMesh);

    	scene.remove(bullets[i].mesh);
		bullets.splice(i, 1);
  	
  		return;
    }


    bullets[i].mesh.translateX( bulletVector.x * bulletSpeed);
    bullets[i].mesh.translateY( bulletVector.y * bulletSpeed);
    bullets[i].mesh.translateZ( bulletVector.z * bulletSpeed);
	
}
