import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';

/**
 * Reusable 3D Stage wrapper with Sunburn-style warm/neon rim lighting and OrbitControls.
 */
export default function SceneCanvas({
  children,
  cameraPosition = [0, 0.3, 3.2],
  fov = 40,
  autoRotate = false,
  autoRotateSpeed = 1.4,
  enableZoom = false,
  minPolarAngle = Math.PI * 0.25,
  maxPolarAngle = Math.PI * 0.65,
  shadowY = -1.05,
  className = 'w-full h-full',
}) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.65} color="#ffe8d6" />
        <directionalLight
          position={[4, 6, 5]}
          intensity={2.1}
          color="#ffb347"
          castShadow
        />
        <directionalLight position={[-4, 3, -3]} intensity={1.3} color="#ff3d7f" />
        <pointLight position={[0, -1.5, 2.5]} intensity={1.1} color="#38bdf8" />

        <Suspense fallback={null}>
          {children}
          <ContactShadows
            position={[0, shadowY, 0]}
            opacity={0.55}
            scale={7}
            blur={2.4}
            far={4}
            color="#000000"
          />
          <Environment preset="sunset" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={enableZoom}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          minPolarAngle={minPolarAngle}
          maxPolarAngle={maxPolarAngle}
        />
      </Canvas>
    </div>
  );
}
