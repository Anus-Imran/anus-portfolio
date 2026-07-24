import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import CanvasLoader from '../Loader';

const BallContent = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.8}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, 0.05]} intensity={1.2} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#282043"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          roughness={0.3}
          metalness={0.5}
        />
        {decal && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={0.9}
            map={decal}
            flatShading
          />
        )}
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  if (!icon) return null;
  return (
    <div className="w-28 h-28 cursor-pointer">
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enableZoom={false} />
          <BallContent imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default BallCanvas;