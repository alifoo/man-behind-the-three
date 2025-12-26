import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe0e0e0);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 10;
camera.position.y = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const treeGroup = new THREE.Group();

const blackMaterial = new THREE.MeshStandardMaterial({
  color: 0x9c5748,
  roughness: 0.8,
});

function generateBranch(level, height, radius) {
  const geometry = new THREE.CylinderGeometry(radius * 0.7, radius, height, 16);
  // to fix the pivot point
  geometry.translate(0, height / 2, 0);

  const mesh = new THREE.Mesh(geometry, blackMaterial);

  if (level <= 0) {
    return mesh;
  }

  const subHeight = height * 0.75;
  const subRadius = radius * 0.7;

  const leftBranch = generateBranch(level - 1, subHeight, subRadius);
  leftBranch.position.y = height;
  leftBranch.rotation.z = Math.PI / 4;
  leftBranch.rotation.y = Math.PI / 2;
  mesh.add(leftBranch);

  const rightBranch = generateBranch(level - 1, subHeight, subRadius);
  rightBranch.position.y = height;
  rightBranch.rotation.z = -Math.PI / 4;
  rightBranch.rotation.y = -Math.PI / 2;
  mesh.add(rightBranch);

  return mesh;
}

const tree = generateBranch(5, 2.5, 0.3);
scene.add(tree);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
