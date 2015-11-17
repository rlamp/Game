var healthBox;
var healthBoxSpawnLocations = [
    new THREE.Vector3(33,1,8),
    new THREE.Vector3(34,1,-5),
    new THREE.Vector3(42,1,-5),
    new THREE.Vector3(-4,1,14)
];

function createHealthBox() {
    healthBox = new THREE.Mesh(new THREE.BoxGeometry(0.5,0.25,0.5), new THREE.MeshBasicMaterial({color: 0x00AA00}));
    newHealthBox();
    scene.add(healthBox);
}

function newHealthBox() {
    var idx = Math.floor(Math.random()*healthBoxSpawnLocations.length);
    if(healthBoxSpawnLocations[idx].distanceTo(player.position) <= 2){
        idx = (idx + 1) % healthBoxSpawnLocations.length;
    }
    var pos = healthBoxSpawnLocations[idx];
    healthBox.position.set(pos.x, pos.y, pos.z);
}

function healthBoxHandle() {
    if(healthBox.position.distanceTo(player.position) < 1.5 && playerHealth < 100) {
        playerHealth += 30;
        if(playerHealth > 100) playerHealth = 100;
        newHealthBox();
    }
}