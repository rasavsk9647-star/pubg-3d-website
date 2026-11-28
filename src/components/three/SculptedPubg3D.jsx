import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Smooth, sculpted (non-boxy) WebGL 3D models using LatheGeometry, CapsuleGeometry,
 * TubeGeometry, and ExtrudeGeometry with PBR brushed metal & fabric shading.
 */

export function SculptedHelmet({ variant = 'lv3', swatch }) {
  const domePoints = useMemo(
    () => [
      new THREE.Vector2(0.0, 0.42),
      new THREE.Vector2(0.18, 0.4),
      new THREE.Vector2(0.32, 0.31),
      new THREE.Vector2(0.39, 0.14),
      new THREE.Vector2(0.41, -0.06),
      new THREE.Vector2(0.38, -0.2),
    ],
    []
  );

  const visorShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.24, 0.08);
    s.quadraticCurveTo(0, 0.14, 0.24, 0.08);
    s.lineTo(0.22, -0.18);
    s.quadraticCurveTo(0, -0.24, -0.22, -0.18);
    s.closePath();
    return s;
  }, []);

  return (
    <group scale={1.75}>
      {/* Smooth Lathed Steel Dome */}
      <mesh castShadow>
        <latheGeometry args={[domePoints, 48]} />
        <meshStandardMaterial
          color={swatch.primary}
          metalness={0.65}
          roughness={0.28}
        />
      </mesh>

      {variant === 'lv3' && (
        <group position={[0, -0.02, 0.34]}>
          <mesh castShadow>
            <extrudeGeometry
              args={[
                visorShape,
                { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 4 },
              ]}
            />
            <meshStandardMaterial color={swatch.secondary} metalness={0.75} roughness={0.24} />
          </mesh>
          {/* Glowing Tactical Eye Slit */}
          <mesh position={[0, 0.01, 0.082]}>
            <capsuleGeometry args={[0.022, 0.24, 8, 16]} />
            <meshStandardMaterial
              color={swatch.accent}
              emissive={swatch.accent}
              emissiveIntensity={1.8}
              roughness={0.15}
            />
          </mesh>
        </group>
      )}

      {variant === 'lv2' && (
        <group position={[0, 0.16, 0.36]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.075, 0, 0.06]}>
            <capsuleGeometry args={[0.042, 0.12, 8, 16]} />
            <meshStandardMaterial color={swatch.secondary} metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.075, 0, 0.06]}>
            <capsuleGeometry args={[0.042, 0.12, 8, 16]} />
            <meshStandardMaterial color={swatch.secondary} metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[-0.075, 0, 0.16]}>
            <sphereGeometry args={[0.032, 16, 16]} />
            <meshStandardMaterial color={swatch.accent} emissive={swatch.accent} emissiveIntensity={2} />
          </mesh>
          <mesh position={[0.075, 0, 0.16]}>
            <sphereGeometry args={[0.032, 16, 16]} />
            <meshStandardMaterial color={swatch.accent} emissive={swatch.accent} emissiveIntensity={2} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export function SculptedRifle({ variant = 'm416', swatch }) {
  const isSniper = variant === 'awm';

  const stockShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.55, 0.08);
    s.lineTo(-0.15, 0.08);
    s.lineTo(-0.15, -0.06);
    s.lineTo(-0.52, -0.14);
    s.quadraticCurveTo(-0.62, -0.04, -0.55, 0.08);
    return s;
  }, []);

  const magCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.12, -0.06, 0),
      new THREE.Vector3(0.15, -0.22, 0),
      new THREE.Vector3(0.22, -0.36, 0),
    ]);
  }, []);

  return (
    <group scale={1.25}>
      {/* Contoured Stock */}
      <mesh position={[0, 0, -0.035]} castShadow>
        <extrudeGeometry
          args={[
            stockShape,
            { depth: 0.07, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.015, bevelSegments: 3 },
          ]}
        />
        <meshStandardMaterial color={swatch.primary} metalness={0.5} roughness={0.38} />
      </mesh>

      {/* Rounded Receiver */}
      <mesh position={[0.08, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.075, 0.56, 10, 20]} />
        <meshStandardMaterial color={swatch.primary} metalness={0.72} roughness={0.26} />
      </mesh>

      {/* Fluted Barrel */}
      <mesh position={[isSniper ? 0.84 : 0.62, 0.04, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.024, 0.03, isSniper ? 1.1 : 0.68, 20]} />
        <meshStandardMaterial color={swatch.secondary} metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Suppressor */}
      <mesh position={[isSniper ? 1.38 : 0.96, 0.04, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.042, 0.24, 10, 20]} />
        <meshStandardMaterial color={swatch.accent} metalness={0.8} roughness={0.22} />
      </mesh>

      {/* Curved Magazine */}
      <mesh castShadow>
        <tubeGeometry args={[magCurve, 20, 0.042, 12, false]} />
        <meshStandardMaterial color={swatch.accent} metalness={0.65} roughness={0.3} />
      </mesh>

      {/* Ergonomic Grip */}
      <mesh position={[-0.12, -0.14, 0]} rotation={[0, 0, -0.35]}>
        <capsuleGeometry args={[0.038, 0.16, 8, 14]} />
        <meshStandardMaterial color={swatch.secondary} roughness={0.6} />
      </mesh>

      {/* Optic Scope */}
      <mesh position={[0.08, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry
          args={[isSniper ? 0.05 : 0.038, isSniper ? 0.042 : 0.038, isSniper ? 0.44 : 0.2, 20]}
        />
        <meshStandardMaterial color={swatch.secondary} metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[isSniper ? 0.3 : 0.18, 0.15, 0]}>
        <sphereGeometry args={[isSniper ? 0.042 : 0.032, 16, 16]} />
        <meshStandardMaterial color={swatch.accent} emissive={swatch.accent} emissiveIntensity={1.8} />
      </mesh>
    </group>
  );
}

export function SculptedPants({ swatch }) {
  return (
    <group scale={1.35}>
      {/* Contoured Waist */}
      <mesh position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.24, 0.12, 16, 32]} />
        <meshStandardMaterial color={swatch.secondary} roughness={0.65} />
      </mesh>
      {/* Left & Right Sculpted Legs */}
      <mesh position={[-0.17, -0.02, 0]} rotation={[0, 0, -0.05]} castShadow>
        <capsuleGeometry args={[0.145, 0.78, 12, 24]} />
        <meshStandardMaterial color={swatch.primary} roughness={0.72} />
      </mesh>
      <mesh position={[0.17, -0.02, 0]} rotation={[0, 0, 0.05]} castShadow>
        <capsuleGeometry args={[0.145, 0.78, 12, 24]} />
        <meshStandardMaterial color={swatch.primary} roughness={0.72} />
      </mesh>
      {/* Knee Armor Shells */}
      <mesh position={[-0.18, -0.02, 0.13]}>
        <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color={swatch.accent} metalness={0.45} roughness={0.35} />
      </mesh>
      <mesh position={[0.18, -0.02, 0.13]}>
        <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color={swatch.accent} metalness={0.45} roughness={0.35} />
      </mesh>
    </group>
  );
}

export function SculptedVehicle({ swatch }) {
  const bodyShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.7, 0.15);
    s.lineTo(1.75, 0.15);
    s.quadraticCurveTo(1.88, 0.45, 1.5, 0.58);
    s.lineTo(0.75, 0.65);
    s.quadraticCurveTo(0.25, 1.08, -0.5, 1.08);
    s.lineTo(-1.45, 0.95);
    s.quadraticCurveTo(-1.78, 0.6, -1.7, 0.15);
    return s;
  }, []);

  const Wheel = ({ pos }) => (
    <group position={pos} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <torusGeometry args={[0.28, 0.11, 16, 28]} />
        <meshStandardMaterial color="#111115" roughness={0.85} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.16, 18]} />
        <meshStandardMaterial color={swatch.accent} metalness={0.85} roughness={0.22} />
      </mesh>
    </group>
  );

  return (
    <group position={[0, -0.25, 0]} scale={0.9}>
      <mesh position={[0, 0, -0.72]} castShadow>
        <extrudeGeometry
          args={[
            bodyShape,
            { depth: 1.44, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 4 },
          ]}
        />
        <meshStandardMaterial color={swatch.primary} metalness={0.55} roughness={0.35} />
      </mesh>
      <Wheel pos={[1.05, 0.18, 0.78]} />
      <Wheel pos={[1.05, 0.18, -0.78]} />
      <Wheel pos={[-1.05, 0.18, 0.78]} />
      <Wheel pos={[-1.05, 0.18, -0.78]} />
    </group>
  );
}
