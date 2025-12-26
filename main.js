import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe0e0e0);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 5;
camera.position.y = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const treeGroup = new THREE.Group();

const blackMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a1a1a,
  roughness: 0.5,
});

const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 1.5, 32);
const trunk = new THREE.Mesh(trunkGeometry, blackMaterial);
trunk.position.y = 0.75;
treeGroup.add(trunk);

const foliageGeometry = new THREE.ConeGeometry(1.2, 2.5, 32);
const foliage = new THREE.Mesh(foliageGeometry, blackMaterial);
foliage.position.y = 2.25;
treeGroup.add(foliage);

scene.add(treeGroup);

function animate() {
  requestAnimationFrame(animate);
  treeGroup.rotation.y += 0.01;

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
