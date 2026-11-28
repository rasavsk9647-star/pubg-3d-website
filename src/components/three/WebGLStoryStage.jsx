import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { ContactShadows, Environment, Float, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Floating WebGL embers + red flare smoke particles synced to Lenis scroll progress.
 */
function BattlegroundAtmosphere({ scrollProgress = 0 }) {
  const groupRef = useRef();

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = mouse.x * 0.12 + scrollProgress * 0.8;
    groupRef.current.rotation.x = mouse.y * 0.05;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.1 - scrollProgress * 1.2;
  });

  return (
    <group ref={groupRef}>
      <Sparkles count={95} scale={[14, 10, 8]} size={2.6} speed={0.45} opacity={0.65} color="#ffb347" />
      <Sparkles count={45} scale={[10, 8, 6]} size={4.0} speed={0.6} opacity={0.4} color="#ef4444" />
    </group>
  );
}

/**
 * Fixed full-viewport WebGL ambient canvas for cinematic scroll storytelling.
 */
export function StoryWebGLBackdrop({ scrollProgress = 0 }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-85">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.4} color="#ffd8b8" />
        <directionalLight position={[5, 6, 4]} intensity={1.4} color="#ff8c42" />
        <BattlegroundAtmosphere scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

/**
 * Photorealistic Studio Render inside a 3D WebGL stage with mouse-driven 3D tilt,
 * warm sunset rim lighting, and floating depth.
 */
function StudioRenderPlane({ imageUrl, tintColor = '#ffffff' }) {
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
  }, [texture]);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.36, 0.08);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -pointer.y * 0.18, 0.08);
  });

  return (
    <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.22}>
      <mesh ref={meshRef} castShadow>
        <planeGeometry args={[3.1, 3.1, 24, 24]} />
        <meshStandardMaterial
          map={texture}
          color={tintColor}
          roughness={0.38}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

/**
 * Unified WebGL Studio Stage: renders either a photorealistic studio render plane
 * (with 3D mouse-tilt & lighting) OR a sculpted PBR 3D mesh with 360° OrbitControls.
 */
export function WebGLStudioStage({
  imageUrl,
  tintColor = '#ffffff',
  glowColor = '#f59e0b',
  sculptedNode = null,
  cameraPosition = [0, 0.25, 4.1],
  autoRotate = true,
}) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={imageUrl ? 1.15 : 0.65} color="#fff2e6" />
        <directionalLight position={[4, 5, 5]} intensity={1.8} color="#ffb347" castShadow />
        <directionalLight position={[-4, 2, -3]} intensity={1.1} color="#ef4444" />
        <pointLight position={[0, -1.5, 3]} intensity={1.1} color={glowColor} />

        <React.Suspense fallback={null}>
          {imageUrl ? (
            <StudioRenderPlane key={imageUrl} imageUrl={imageUrl} tintColor={tintColor} />
          ) : (
            <>
              {sculptedNode}
              <ContactShadows position={[0, -1.05, 0]} opacity={0.5} scale={6} blur={2.4} />
              <Environment preset="sunset" />
            </>
          )}
        </React.Suspense>

        <Sparkles count={24} scale={[4.5, 4, 2]} size={2.2} speed={0.35} color={glowColor} />

        {!imageUrl && (
          <OrbitControls
            enablePan={false}
            enableZoom
            autoRotate={autoRotate}
            autoRotateSpeed={1.4}
            minPolarAngle={Math.PI * 0.25}
            maxPolarAngle={Math.PI * 0.65}
          />
        )}
      </Canvas>
    </div>
  );
}
