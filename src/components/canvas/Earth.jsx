import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

function PlanetModel(props) {
  const gltf = useGLTF('/planet/scene.gltf');
  return <primitive object={gltf.scene} {...props} />;
}

const Earth = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <PlanetModel scale={1.2} />
          <Environment preset="night" />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Earth;

// Note: Ensure @react-three/fiber and @react-three/drei are installed in your project.