import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.getElementsByClassName('presentation-scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdcd8c0);
const camera = new THREE.PerspectiveCamera(75, container[0].clientWidth / container[0].clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(container[0].clientWidth, container[0].clientHeight);
container[0].appendChild(renderer.domElement);
camera.position.z = 5;

const gltfloader = new GLTFLoader();
let model;

gltfloader.setPath('models/station_b/');
gltfloader.load(
	// resource URL
	'scene.gltf',
	// called when the resource is loaded
	function (gltf) {
        model = gltf.scene;
        model.rotation.x = 0.5;
        model.scale.set(1.5, 1.5, 1.5);
        scene.add(gltf.scene);
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );

	}
);

function animate() {
	requestAnimationFrame(animate);
    
    if (model) {
        
        model.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

animate();
