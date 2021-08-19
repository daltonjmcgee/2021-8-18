import "./style.scss";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  SpotLight,
  AmbientLight,
} from 'three';

const width: number = window.innerWidth;
const height: number = window.innerHeight;

// Initializing the scene
const scene: Scene = new Scene();
const camera: PerspectiveCamera = new PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;
const renderer: WebGLRenderer = new WebGLRenderer;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Basic object
const geometry: BoxGeometry = new BoxGeometry();
const material: MeshStandardMaterial = new MeshStandardMaterial({ color: 0xf1521f });
const cube: Mesh = new Mesh(geometry, material);
scene.add(cube);

// Ambient Light
const spotLight2: AmbientLight = new AmbientLight( 0xffffff, .55);
spotLight2.position.set( 10, 25, 20 );
scene.add( spotLight2 );

// Spot Light
const spotLight1: SpotLight = new SpotLight( 0xffffff, .75, 100);
spotLight1.position.set( 0, 10, 10 );
scene.add( spotLight1 );

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
