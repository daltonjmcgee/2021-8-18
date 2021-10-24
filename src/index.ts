import "./styles/style.scss";
import "./model.gltf";
import './texture.jpg';
import './bump.jpg';
import './normal.jpg';

import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SpotLight,
  PlaneGeometry,
  MeshPhysicalMaterial,
  Mesh,
  PCFSoftShadowMap,
  TextureLoader,
  DoubleSide,
  CameraHelper,
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

const width: number = window.innerWidth;
const height: number = window.innerHeight;

// Initializing the scene
const scene: Scene = new Scene();
const camera: PerspectiveCamera = new PerspectiveCamera(75, width / height, .01, 100);
camera.position.x = -0.142;
camera.position.y = 0.111;
camera.position.z = 0.01;
camera.rotation.x = -1.489;
camera.rotation.y = -0.904;
camera.rotation.z = -1.462;

const cameraDebug = gui.addFolder('Camera');
const cameraPosition = cameraDebug.addFolder('Position');
cameraPosition.add(camera.position, 'x', -5, 5, .001).listen()
cameraPosition.add(camera.position, 'y', -5, 5, .001).listen()
cameraPosition.add(camera.position, 'z', -5, 5, .001).listen()
const cameraRotation = cameraDebug.addFolder('Rotation');
cameraRotation.add(camera.rotation, 'x', -5, 5, .001).listen()
cameraRotation.add(camera.rotation, 'y', -5, 5, .001).listen()
cameraRotation.add(camera.rotation, 'z', -5, 5, .001).listen()

const renderer: WebGLRenderer = new WebGLRenderer;
renderer.setSize(width, height);
// renderer.setClearColor(0xdddddd);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

// Model
const loader = new GLTFLoader()
loader.load('./model.gltf', (gltf) => {
  gltf.scene.rotation.set(0, 0, 0);
  gltf.scene.traverse(function (node) {
    if (node instanceof Mesh) { node.castShadow = true; }
  });
  scene.add(gltf.scene)
});

const map = new TextureLoader().load('./texture.jpg');
const normalMap = new TextureLoader().load('./normal.jpg');
const bumpMap = new TextureLoader().load('./bump.jpg');

// Table Top
const tableTopGeometry: PlaneGeometry = new PlaneGeometry(.5, .5, 8, 8);
const tableTopMaterial: MeshPhysicalMaterial = new MeshPhysicalMaterial({
  map,
  side: DoubleSide,
  bumpMap,
  bumpScale: 1,
  normalMap,
});
const tableTopMesh = new Mesh(tableTopGeometry, tableTopMaterial);
tableTopMesh.receiveShadow = true;
tableTopMesh.rotation.set(-1.58, 0, 0);
tableTopMesh.position.set(0, -0.014, 0);
scene.add(tableTopMesh);

// Spot Light
const spotLight1: SpotLight = new SpotLight(0xffffff, .75, 100);
spotLight1.position.set(-.754, .398, -.555);
spotLight1.castShadow = true;
const spotlight1debug = gui.addFolder('Spotlight 1');
spotlight1debug.add(spotLight1.position, 'x', -5, 5, .001)
spotlight1debug.add(spotLight1.position, 'y', -5, 5, .001)
spotlight1debug.add(spotLight1.position, 'z', -5, 5, .001)
scene.add(spotLight1);

// Spot Light
const spotLight2: SpotLight = new SpotLight(0xffffff, .75, 100);
spotLight2.position.set(.583, .989, -1.118);
spotLight2.castShadow = true;
const spotlight2debug = gui.addFolder('Spotlight 2');
spotlight2debug.add(spotLight2.position, 'x', -5, 5, .001)
spotlight2debug.add(spotLight2.position, 'y', -5, 5, .001)
spotlight2debug.add(spotLight2.position, 'z', -5, 5, .001)
scene.add(spotLight2);

// Spot Light
const spotLight3: SpotLight = new SpotLight(0xffffff, .75, 100);
spotLight3.position.set(.25, 0, -0.068);
spotLight3.castShadow = true;
const spotlight3debug = gui.addFolder('Spotlight 3');
spotlight3debug.add(spotLight3.position, 'x', -5, 5, .001)
spotlight3debug.add(spotLight3.position, 'y', -5, 5, .001)
spotlight3debug.add(spotLight3.position, 'z', -5, 5, .001)
scene.add(spotLight3);

// Add Orbit Controls
const controls: OrbitControls = new OrbitControls(camera, renderer.domElement);
cameraDebug.open();
cameraRotation.open();
cameraPosition.open();
spotlight1debug.open();
spotlight2debug.open();
spotlight3debug.open();

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
