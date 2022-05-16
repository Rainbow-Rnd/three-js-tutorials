import { useEffect } from 'react';

import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // part 0 - add axis helper
    const axesHelper = new THREE.AxesHelper(16);
    test.scene.add(axesHelper);

    // part 1 - boilerplate code
    const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    test.scene.add(boxMesh);

    const startCoords = { x: 0, y: 0, z: 0 };
    const endCoords = { x: 5, y: 0, z: 0 };
    const tween1 = new TWEEN.Tween(startCoords)
      .to(endCoords, 2000)
      .onUpdate(({ x, y, z }) => {
        console.log(x, y, z);
        boxMesh.position.set(x, y, z);
      });

    const tween2 = new TWEEN.Tween(endCoords)
      .to(startCoords, 2000)
      .onUpdate(({ x, y, z }) => {
        console.log(x, y, z);
        boxMesh.position.set(x, y, z);
      })
      .start();

    tween1.chain(tween2);
    tween2.chain(tween1);
    tween1.start();

    const animate = (t) => {
      TWEEN.update(t);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;