import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Shared material helper for consistent tactile PBR look.
 */
function Mat({ color, metalness = 0.25, roughness = 0.55, emissive = '#000000', emissiveIntensity = 0 }) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={metalness}
      roughness={roughness}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
    />
  );
}

/* ============================================================================
 * 1. HELMETS (lv3, lv2, lv1)
 * ========================================================================== */
export function HelmetMesh({ modelType = 'lv3', swatch, scale = 1 }) {
  const { primary, secondary, accent } = swatch;
  return (
    <group scale={scale}>
      {/* Main Dome */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <sphereGeometry args={[0.36, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
        <Mat color={primary} metalness={0.45} roughness={0.38} />
      </mesh>
      {/* Back Neck Skirt */}
      <mesh position={[0, -0.04, -0.08]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.37, 0.22, 24, 1, true, Math.PI * 0.6, Math.PI * 0.8]} />
        <Mat color={secondary} metalness={0.4} roughness={0.45} />
      </mesh>

      {modelType === 'lv3' && (
        <>
          {/* Iconic Spetsnaz Armored Visor Shield */}
          <mesh position={[0, 0.01, 0.26]} rotation={[0.06, 0, 0]} castShadow>
            <boxGeometry args={[0.46, 0.28, 0.14]} />
            <Mat color={secondary} metalness={0.65} roughness={0.32} />
          </mesh>
          {/* Glowing Visor Slit */}
          <mesh position={[0, 0.03, 0.335]}>
            <boxGeometry args={[0.34, 0.055, 0.02]} />
            <Mat color={accent} emissive={accent} emissiveIntensity={1.6} metalness={0.2} roughness={0.2} />
          </mesh>
          {/* Side Hinges */}
          <mesh position={[-0.28, 0.04, 0.14]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.06, 12]} />
            <Mat color={accent} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0.28, 0.04, 0.14]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.06, 12]} />
            <Mat color={accent} metalness={0.8} roughness={0.25} />
          </mesh>
        </>
      )}

      {modelType === 'lv2' && (
        <>
          {/* NVG Mount Front */}
          <mesh position={[0, 0.18, 0.33]} castShadow>
            <boxGeometry args={[0.12, 0.1, 0.08]} />
            <Mat color={secondary} metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Dual NVG Optics */}
          <mesh position={[-0.065, 0.16, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.045, 0.14, 14]} />
            <Mat color={secondary} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0.065, 0.16, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.045, 0.14, 14]} />
            <Mat color={secondary} metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[-0.065, 0.16, 0.495]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.01, 14]} />
            <Mat color={accent} emissive={accent} emissiveIntensity={1.5} />
          </mesh>
          <mesh position={[0.065, 0.16, 0.495]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.01, 14]} />
            <Mat color={accent} emissive={accent} emissiveIntensity={1.5} />
          </mesh>
          {/* Tactical Side Rails */}
          <mesh position={[0.33, 0.04, 0.02]}>
            <boxGeometry args={[0.06, 0.07, 0.24]} />
            <Mat color={accent} metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[-0.33, 0.04, 0.02]}>
            <boxGeometry args={[0.06, 0.07, 0.24]} />
            <Mat color={accent} metalness={0.6} roughness={0.35} />
          </mesh>
        </>
      )}

      {modelType === 'lv1' && (
        <>
          {/* Racing Stripe */}
          <mesh position={[0, 0.29, 0.02]} rotation={[-0.2, 0, 0]}>
            <boxGeometry args={[0.1, 0.18, 0.56]} />
            <Mat color={secondary} metalness={0.3} roughness={0.3} />
          </mesh>
          {/* Tinted Goggles */}
          <mesh position={[0, 0.03, 0.34]}>
            <boxGeometry args={[0.42, 0.13, 0.08]} />
            <Mat color={accent} metalness={0.85} roughness={0.15} emissive={accent} emissiveIntensity={0.35} />
          </mesh>
          {/* Goggle Strap */}
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.37, 0.37, 0.07, 24, 1, true]} />
            <Mat color={secondary} roughness={0.7} />
          </mesh>
        </>
      )}
    </group>
  );
}

/* ============================================================================
 * 2. DRESS / TOPS (trench, ghillie, cyber, tactical)
 * ========================================================================== */
export function DressMesh({ modelType = 'trench', swatch, scale = 1 }) {
  const { primary, secondary, accent } = swatch;
  return (
    <group scale={scale}>
      {/* Torso Base */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.72, 0.85, 0.42]} />
        <Mat color={primary} roughness={0.65} metalness={0.2} />
      </mesh>
      {/* Collar */}
      <mesh position={[0, 0.56, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.24, 0.12, 16]} />
        <Mat color={secondary} roughness={0.5} />
      </mesh>
      {/* Left & Right Sleeves */}
      <mesh position={[-0.49, 0.12, 0]} rotation={[0, 0, 0.14]} castShadow>
        <cylinderGeometry args={[0.13, 0.11, 0.72, 14]} />
        <Mat color={primary} roughness={0.65} />
      </mesh>
      <mesh position={[0.49, 0.12, 0]} rotation={[0, 0, -0.14]} castShadow>
        <cylinderGeometry args={[0.13, 0.11, 0.72, 14]} />
        <Mat color={primary} roughness={0.65} />
      </mesh>

      {modelType === 'trench' && (
        <>
          {/* Long Trench Skirt Flaps */}
          <mesh position={[-0.18, -0.52, 0]} castShadow>
            <boxGeometry args={[0.34, 0.46, 0.4]} />
            <Mat color={primary} roughness={0.55} />
          </mesh>
          <mesh position={[0.18, -0.52, 0]} castShadow>
            <boxGeometry args={[0.34, 0.46, 0.4]} />
            <Mat color={primary} roughness={0.55} />
          </mesh>
          {/* Lapels */}
          <mesh position={[-0.15, 0.36, 0.22]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.14, 0.34, 0.04]} />
            <Mat color={secondary} roughness={0.45} />
          </mesh>
          <mesh position={[0.15, 0.36, 0.22]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.14, 0.34, 0.04]} />
            <Mat color={secondary} roughness={0.45} />
          </mesh>
          {/* Waist Belt + Buckle */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[0.76, 0.09, 0.46]} />
            <Mat color={secondary} metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.2, 0.24]}>
            <boxGeometry args={[0.12, 0.11, 0.04]} />
            <Mat color={accent} metalness={0.85} roughness={0.2} />
          </mesh>
        </>
      )}

      {modelType === 'ghillie' && (
        <>
          {/* Layered 3D Foliage Plates */}
          {[
            [-0.22, 0.34, 0.24, 0.2],
            [0.2, 0.3, 0.24, -0.2],
            [0, 0.08, 0.25, 0.1],
            [-0.24, -0.14, 0.23, -0.15],
            [0.22, -0.18, 0.23, 0.25],
            [0, 0.25, -0.24, 0.1],
            [-0.2, -0.05, -0.24, -0.2],
            [0.2, -0.1, -0.24, 0.2],
          ].map(([x, y, z, rot], i) => (
            <mesh key={i} position={[x, y, z]} rotation={[0.2, 0, rot]} castShadow>
              <dodecahedronGeometry args={[0.16, 0]} />
              <Mat color={i % 2 === 0 ? secondary : accent} roughness={0.9} metalness={0.05} />
            </mesh>
          ))}
        </>
      )}

      {modelType === 'cyber' && (
        <>
          {/* Glowing Neon Shoulder & Chest Strips */}
          <mesh position={[-0.36, 0.5, 0]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.18, 0.05, 0.44]} />
            <Mat color={secondary} emissive={secondary} emissiveIntensity={1.5} />
          </mesh>
          <mesh position={[0.36, 0.5, 0]} rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.18, 0.05, 0.44]} />
            <Mat color={secondary} emissive={secondary} emissiveIntensity={1.5} />
          </mesh>
          <mesh position={[0, 0.12, 0.22]}>
            <boxGeometry args={[0.06, 0.65, 0.03]} />
            <Mat color={accent} emissive={accent} emissiveIntensity={1.2} />
          </mesh>
        </>
      )}

      {modelType === 'tactical' && (
        <>
          {/* Kevlar Plate Carrier */}
          <mesh position={[0, 0.14, 0]} castShadow>
            <boxGeometry args={[0.76, 0.56, 0.48]} />
            <Mat color={secondary} roughness={0.55} metalness={0.3} />
          </mesh>
          {/* Mag Pouches */}
          {[-0.2, 0, 0.2].map((x, idx) => (
            <mesh key={idx} position={[x, -0.02, 0.26]} castShadow>
              <boxGeometry args={[0.13, 0.2, 0.08]} />
              <Mat color={accent} roughness={0.5} metalness={0.3} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

/* ============================================================================
 * 3. PANTS (cargo, track, ghillie_pants, biker)
 * ========================================================================== */
export function PantsMesh({ modelType = 'cargo', swatch, scale = 1 }) {
  const { primary, secondary, accent } = swatch;
  return (
    <group scale={scale}>
      {/* Waistband */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.68, 0.16, 0.38]} />
        <Mat color={secondary} roughness={0.6} />
      </mesh>
      {/* Left & Right Legs */}
      <mesh position={[-0.18, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.13, 0.92, 16]} />
        <Mat color={primary} roughness={0.7} />
      </mesh>
      <mesh position={[0.18, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.13, 0.92, 16]} />
        <Mat color={primary} roughness={0.7} />
      </mesh>

      {modelType === 'cargo' && (
        <>
          {/* Side Cargo Pockets */}
          <mesh position={[-0.36, 0.04, 0]} castShadow>
            <boxGeometry args={[0.08, 0.24, 0.2]} />
            <Mat color={secondary} roughness={0.6} />
          </mesh>
          <mesh position={[0.36, 0.04, 0]} castShadow>
            <boxGeometry args={[0.08, 0.24, 0.2]} />
            <Mat color={secondary} roughness={0.6} />
          </mesh>
          {/* Molded Knee Pads */}
          <mesh position={[-0.18, -0.08, 0.15]}>
            <boxGeometry args={[0.18, 0.18, 0.06]} />
            <Mat color={accent} metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0.18, -0.08, 0.15]}>
            <boxGeometry args={[0.18, 0.18, 0.06]} />
            <Mat color={accent} metalness={0.4} roughness={0.4} />
          </mesh>
        </>
      )}

      {modelType === 'track' && (
        <>
          {/* Double Racing Stripes */}
          <mesh position={[-0.33, -0.08, 0]}>
            <boxGeometry args={[0.04, 0.88, 0.06]} />
            <Mat color={secondary} emissive={secondary} emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0.33, -0.08, 0]}>
            <boxGeometry args={[0.04, 0.88, 0.06]} />
            <Mat color={secondary} emissive={secondary} emissiveIntensity={0.6} />
          </mesh>
        </>
      )}

      {modelType === 'ghillie_pants' && (
        <>
          {[
            [-0.22, 0.12, 0.15],
            [0.22, 0.05, 0.15],
            [-0.2, -0.22, 0.14],
            [0.2, -0.25, 0.14],
          ].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]} castShadow>
              <dodecahedronGeometry args={[0.13, 0]} />
              <Mat color={i % 2 === 0 ? secondary : accent} roughness={0.9} />
            </mesh>
          ))}
        </>
      )}

      {modelType === 'biker' && (
        <>
          {/* Ribbed Shin Guards & Belt Chain */}
          <mesh position={[-0.18, -0.1, 0.15]}>
            <boxGeometry args={[0.16, 0.34, 0.05]} />
            <Mat color={secondary} metalness={0.5} roughness={0.35} />
          </mesh>
          <mesh position={[0.18, -0.1, 0.15]}>
            <boxGeometry args={[0.16, 0.34, 0.05]} />
            <Mat color={secondary} metalness={0.5} roughness={0.35} />
          </mesh>
          <mesh position={[0.32, 0.35, 0.12]} rotation={[0, 0, 0.3]}>
            <torusGeometry args={[0.12, 0.015, 8, 18, Math.PI]} />
            <Mat color={accent} metalness={0.9} roughness={0.2} />
          </mesh>
        </>
      )}
    </group>
  );
}

/* ============================================================================
 * 4. GUNS (m416, awm, akm, kar98)
 * ========================================================================== */
export function GunMesh({ modelType = 'm416', swatch, scale = 1 }) {
  const { primary, secondary, accent } = swatch;
  const isSniper = modelType === 'awm' || modelType === 'kar98';

  return (
    <group scale={scale}>
      {/* Main Receiver */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.72, 0.16, 0.12]} />
        <Mat color={primary} metalness={0.65} roughness={0.32} />
      </mesh>

      {/* Barrel */}
      <mesh position={[isSniper ? 0.8 : 0.56, 0.03, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.028, 0.034, isSniper ? 1.05 : 0.6, 12]} />
        <Mat color={secondary} metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Handguard / Rail */}
      <mesh position={[0.42, 0.02, 0]} castShadow>
        <boxGeometry args={[0.46, 0.11, 0.11]} />
        <Mat color={secondary} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Suppressor / Muzzle Brake */}
      <mesh position={[isSniper ? 1.32 : 0.88, 0.03, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 0.18, 12]} />
        <Mat color={accent} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Stock */}
      <mesh position={[-0.52, -0.02, 0]} castShadow>
        <boxGeometry args={[0.42, 0.15, 0.1]} />
        <Mat color={primary} metalness={0.35} roughness={0.5} />
      </mesh>

      {/* Pistol Grip */}
      <mesh position={[-0.16, -0.16, 0]} rotation={[0, 0, -0.28]} castShadow>
        <boxGeometry args={[0.09, 0.22, 0.08]} />
        <Mat color={secondary} roughness={0.6} />
      </mesh>

      {/* Magazine */}
      <mesh
        position={[0.12, -0.19, 0]}
        rotation={[0, 0, modelType === 'akm' ? 0.25 : 0.08]}
        castShadow
      >
        <boxGeometry args={[0.11, isSniper ? 0.14 : 0.28, 0.075]} />
        <Mat color={accent} metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Optic / Scope */}
      <mesh position={[0.02, 0.15, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry
          args={[isSniper ? 0.055 : 0.042, isSniper ? 0.045 : 0.042, isSniper ? 0.42 : 0.18, 14]}
        />
        <Mat color={secondary} metalness={0.8} roughness={0.22} />
      </mesh>
      {/* Glowing Optic Lens */}
      <mesh position={[isSniper ? 0.23 : 0.11, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.036, 0.036, 0.02, 12]} />
        <Mat color={accent} emissive={accent} emissiveIntensity={1.6} />
      </mesh>
    </group>
  );
}

/* ============================================================================
 * 5. SHOES (boots, sneakers, ghillie_boots, cyber_boots)
 * ========================================================================== */
export function ShoesMesh({ modelType = 'boots', swatch, scale = 1 }) {
  const { primary, secondary, accent } = swatch;

  const SingleShoe = ({ x }) => (
    <group position={[x, 0, 0]}>
      {/* Ankle Cuff */}
      <mesh position={[0, 0.16, -0.04]} castShadow>
        <cylinderGeometry args={[0.12, 0.13, 0.28, 14]} />
        <Mat color={primary} roughness={0.55} />
      </mesh>
      {/* Toe & Foot Box */}
      <mesh position={[0, -0.02, 0.08]} castShadow>
        <boxGeometry args={[0.24, 0.16, 0.44]} />
        <Mat color={primary} roughness={0.5} />
      </mesh>
      {/* Sole */}
      <mesh position={[0, -0.12, 0.08]} castShadow>
        <boxGeometry args={[0.26, 0.07, 0.47]} />
        <Mat
          color={modelType === 'cyber_boots' ? accent : secondary}
          emissive={modelType === 'cyber_boots' ? accent : '#000000'}
          emissiveIntensity={modelType === 'cyber_boots' ? 0.9 : 0}
          roughness={0.4}
        />
      </mesh>
      {/* Accent Tongue / Heel Tab */}
      <mesh position={[0, 0.16, 0.09]}>
        <boxGeometry args={[0.12, 0.18, 0.04]} />
        <Mat color={accent} metalness={0.4} roughness={0.35} />
      </mesh>
    </group>
  );

  return (
    <group scale={scale}>
      <SingleShoe x={-0.19} />
      <SingleShoe x={0.19} />
    </group>
  );
}

/* ============================================================================
 * 6. FULL 3D PUBG OPERATOR (wears selected Dress + Pants + Helmet + Gun + Shoes)
 * ========================================================================== */
export function OperatorModel({ equipped, onSelectSlot }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.6) * 0.025;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.95, 0]}>
      {/* Head + Neck */}
      <mesh position={[0, 1.98, 0]} castShadow>
        <sphereGeometry args={[0.24, 20, 16]} />
        <Mat color="#d1a68a" roughness={0.75} />
      </mesh>
      <mesh position={[0, 1.74, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.16, 12]} />
        <Mat color="#c29376" roughness={0.75} />
      </mesh>

      {/* Equipped Helmet */}
      <group
        position={[0, 2.04, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSlot?.('helmet');
        }}
      >
        <HelmetMesh
          modelType={equipped.helmet.item.modelType}
          swatch={equipped.helmet.swatch}
          scale={0.78}
        />
      </group>

      {/* Equipped Dress / Top */}
      <group
        position={[0, 1.25, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSlot?.('dress');
        }}
      >
        <DressMesh
          modelType={equipped.dress.item.modelType}
          swatch={equipped.dress.swatch}
          scale={0.92}
        />
      </group>

      {/* Hands */}
      <mesh position={[-0.48, 0.94, 0.04]}>
        <sphereGeometry args={[0.085, 12, 12]} />
        <Mat color="#27272a" roughness={0.6} />
      </mesh>
      <mesh position={[0.48, 0.94, 0.14]}>
        <sphereGeometry args={[0.085, 12, 12]} />
        <Mat color="#27272a" roughness={0.6} />
      </mesh>

      {/* Equipped Gun in Right Hand */}
      <group
        position={[0.52, 1.0, 0.34]}
        rotation={[0.12, -1.2, 0.25]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSlot?.('gun');
        }}
      >
        <GunMesh
          modelType={equipped.gun.item.modelType}
          swatch={equipped.gun.swatch}
          scale={0.68}
        />
      </group>

      {/* Equipped Pants */}
      <group
        position={[0, 0.52, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSlot?.('pants');
        }}
      >
        <PantsMesh
          modelType={equipped.pants.item.modelType}
          swatch={equipped.pants.swatch}
          scale={0.94}
        />
      </group>

      {/* Equipped Shoes */}
      <group
        position={[0, 0.06, 0.02]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSlot?.('shoes');
        }}
      >
        <ShoesMesh
          modelType={equipped.shoes.item.modelType}
          swatch={equipped.shoes.swatch}
          scale={0.86}
        />
      </group>
    </group>
  );
}

/* ============================================================================
 * 7. VEHICLES (coupe, uaz, buggy)
 * ========================================================================== */
export function VehicleMesh({ modelType = 'coupe', swatch, lightsOn = true }) {
  const { primary, secondary, accent } = swatch;

  const Wheel = ({ pos, radius = 0.36, width = 0.24 }) => (
    <group position={pos} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, width, 24]} />
        <Mat color="#111115" roughness={0.85} metalness={0.15} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[radius * 0.58, radius * 0.58, width + 0.02, 12]} />
        <Mat color={accent} metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  );

  return (
    <group position={[0, -0.35, 0]}>
      {/* Underglow Strip */}
      {lightsOn && (
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.65, 3.6]} />
          <meshBasicMaterial color={accent} transparent opacity={0.22} />
        </mesh>
      )}

      {modelType === 'coupe' && (
        <>
          {/* Sleek Sports Chassis */}
          <mesh position={[0, 0.42, 0]} castShadow>
            <boxGeometry args={[1.68, 0.44, 3.9]} />
            <Mat color={primary} metalness={0.7} roughness={0.22} />
          </mesh>
          {/* Cabin */}
          <mesh position={[0, 0.78, -0.18]} castShadow>
            <boxGeometry args={[1.38, 0.38, 1.75]} />
            <Mat color={secondary} metalness={0.6} roughness={0.2} />
          </mesh>
          {/* Rear Spoiler */}
          <mesh position={[0, 0.78, -1.78]} castShadow>
            <boxGeometry args={[1.62, 0.07, 0.28]} />
            <Mat color={secondary} metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[-0.55, 0.68, -1.78]}>
            <boxGeometry args={[0.08, 0.18, 0.16]} />
            <Mat color={secondary} />
          </mesh>
          <mesh position={[0.55, 0.68, -1.78]}>
            <boxGeometry args={[0.08, 0.18, 0.16]} />
            <Mat color={secondary} />
          </mesh>
          {/* Headlights */}
          <mesh position={[-0.56, 0.44, 1.96]}>
            <boxGeometry args={[0.34, 0.12, 0.04]} />
            <Mat
              color="#fff7d6"
              emissive="#fff7d6"
              emissiveIntensity={lightsOn ? 2.2 : 0.1}
            />
          </mesh>
          <mesh position={[0.56, 0.44, 1.96]}>
            <boxGeometry args={[0.34, 0.12, 0.04]} />
            <Mat
              color="#fff7d6"
              emissive="#fff7d6"
              emissiveIntensity={lightsOn ? 2.2 : 0.1}
            />
          </mesh>
          {/* Tail light bar */}
          <mesh position={[0, 0.46, -1.96]}>
            <boxGeometry args={[1.46, 0.1, 0.04]} />
            <Mat color="#ff2e63" emissive="#ff2e63" emissiveIntensity={lightsOn ? 2.0 : 0.2} />
          </mesh>
          <Wheel pos={[-0.86, 0.34, 1.25]} />
          <Wheel pos={[0.86, 0.34, 1.25]} />
          <Wheel pos={[-0.86, 0.34, -1.25]} />
          <Wheel pos={[0.86, 0.34, -1.25]} />
        </>
      )}

      {modelType === 'uaz' && (
        <>
          {/* Heavy 4x4 Lower Body */}
          <mesh position={[0, 0.58, 0]} castShadow>
            <boxGeometry args={[1.76, 0.56, 3.7]} />
            <Mat color={primary} metalness={0.35} roughness={0.55} />
          </mesh>
          {/* Tall Military Cabin */}
          <mesh position={[0, 1.06, -0.25]} castShadow>
            <boxGeometry args={[1.64, 0.56, 2.35]} />
            <Mat color={primary} metalness={0.35} roughness={0.55} />
          </mesh>
          {/* Windshield */}
          <mesh position={[0, 1.04, 0.94]}>
            <boxGeometry args={[1.44, 0.36, 0.05]} />
            <Mat color="#111827" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Bullbar */}
          <mesh position={[0, 0.52, 1.92]}>
            <boxGeometry args={[1.5, 0.28, 0.14]} />
            <Mat color={secondary} metalness={0.7} roughness={0.35} />
          </mesh>
          {/* Roof Rack + Light Bar */}
          <mesh position={[0, 1.38, -0.25]}>
            <boxGeometry args={[1.46, 0.08, 1.8]} />
            <Mat color={secondary} metalness={0.6} roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.42, 0.68]}>
            <boxGeometry args={[1.2, 0.08, 0.1]} />
            <Mat color={accent} emissive={accent} emissiveIntensity={lightsOn ? 2.0 : 0.1} />
          </mesh>
          {/* Spare Tire on Back */}
          <Wheel pos={[0, 0.85, -1.94]} radius={0.34} width={0.22} />
          <Wheel pos={[-0.92, 0.4, 1.18]} radius={0.42} width={0.28} />
          <Wheel pos={[0.92, 0.4, 1.18]} radius={0.42} width={0.28} />
          <Wheel pos={[-0.92, 0.4, -1.18]} radius={0.42} width={0.28} />
          <Wheel pos={[0.92, 0.4, -1.18]} radius={0.42} width={0.28} />
        </>
      )}

      {modelType === 'buggy' && (
        <>
          {/* Tubular Base Frame */}
          <mesh position={[0, 0.42, 0]} castShadow>
            <boxGeometry args={[1.2, 0.24, 3.1]} />
            <Mat color={secondary} metalness={0.7} roughness={0.35} />
          </mesh>
          {/* Nose Hood */}
          <mesh position={[0, 0.54, 0.95]} rotation={[0.18, 0, 0]} castShadow>
            <boxGeometry args={[0.95, 0.22, 1.1]} />
            <Mat color={primary} metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Roll Cage Bars */}
          <mesh position={[-0.52, 0.9, -0.1]} rotation={[0.15, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 1.1, 10]} />
            <Mat color={primary} metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[0.52, 0.9, -0.1]} rotation={[0.15, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 1.1, 10]} />
            <Mat color={primary} metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[0, 1.38, -0.22]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.045, 0.045, 1.08, 10]} />
            <Mat color={primary} metalness={0.6} roughness={0.35} />
          </mesh>
          {/* Exposed Rear Engine */}
          <mesh position={[0, 0.68, -1.25]} castShadow>
            <boxGeometry args={[0.88, 0.48, 0.72]} />
            <Mat color={accent} metalness={0.85} roughness={0.28} />
          </mesh>
          {/* Spotlights */}
          <mesh position={[-0.3, 0.66, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.08, 14]} />
            <Mat color="#fff7d6" emissive="#fff7d6" emissiveIntensity={lightsOn ? 2.2 : 0.1} />
          </mesh>
          <mesh position={[0.3, 0.66, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.08, 14]} />
            <Mat color="#fff7d6" emissive="#fff7d6" emissiveIntensity={lightsOn ? 2.2 : 0.1} />
          </mesh>
          <Wheel pos={[-0.86, 0.36, 1.15]} radius={0.38} width={0.26} />
          <Wheel pos={[0.86, 0.36, 1.15]} radius={0.38} width={0.26} />
          <Wheel pos={[-0.96, 0.44, -1.15]} radius={0.46} width={0.34} />
          <Wheel pos={[0.96, 0.44, -1.15]} radius={0.46} width={0.34} />
        </>
      )}
    </group>
  );
}

/* ============================================================================
 * 8. HERO AIRDROP CRATE (Glowing Red Smoke Crate)
 * ========================================================================== */
export function AirdropCrateMesh() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.35;
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 1.4) * 0.08;
    }
  });

  return (
    <group ref={ref}>
      {/* Main Red Crate Body */}
      <mesh castShadow>
        <boxGeometry args={[1.45, 1.15, 1.45]} />
        <Mat color="#991b1b" metalness={0.35} roughness={0.45} />
      </mesh>
      {/* Blue Tarp Top */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <boxGeometry args={[1.52, 0.18, 1.52]} />
        <Mat color="#1e3a8a" roughness={0.6} />
      </mesh>
      {/* Corner Braces */}
      {[
        [-0.73, 0, 0.73],
        [0.73, 0, 0.73],
        [-0.73, 0, -0.73],
        [0.73, 0, -0.73],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.09, 1.2, 0.09]} />
          <Mat color="#18181b" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* Glowing Flare Beacon */}
      <mesh position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.14, 16]} />
        <Mat color="#ff3d7f" emissive="#ff3d7f" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}
