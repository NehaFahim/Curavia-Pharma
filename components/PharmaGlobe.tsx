'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const points = Array.from({ length: 50 }, (_, i) => {
  const phi = Math.acos(1 - 2 * ((i + .5) / 50));
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  return [Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)] as [number, number, number];
});

function NetworkSphere() {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const markerGeometry = useMemo(() => new THREE.SphereGeometry(.025, 8, 8), []);
  const routeGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const routePoints: THREE.Vector3[] = [];
    [2, 8, 15, 22, 31, 39, 46].forEach(i => routePoints.push(new THREE.Vector3(...points[i]).multiplyScalar(1.76)));
    g.setFromPoints(routePoints);
    return g;
  }, []);
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * .045; });
  return <group ref={ref}>
    <mesh>
      <sphereGeometry args={[1.69, 32, 32]} />
      <meshBasicMaterial color="#2ab7b7" transparent opacity={.025} wireframe />
    </mesh>
    {[0, Math.PI / 4, Math.PI / 2, Math.PI * .75].map((r, i) => <mesh key={i} rotation={[0, r, 0]}>
      <torusGeometry args={[1.72, .006, 5, 96]} />
      <meshBasicMaterial color="#72e1dc" transparent opacity={.22} />
    </mesh>)}
    <mesh geometry={routeGeometry}><lineBasicMaterial color="#72e1dc" transparent opacity={.45} /></mesh>
    {points.map((p, i) => <mesh key={i} position={[p[0] * 1.76, p[1] * 1.76, p[2] * 1.76]} geometry={markerGeometry}
      onPointerOver={e => { e.stopPropagation(); setHovered(i); }} onPointerOut={() => setHovered(null)}>
      <meshBasicMaterial color={i % 4 === 0 ? '#ffffff' : '#72e1dc'} />
      {hovered === i && <Html distanceFactor={5}><div className="globe-tooltip"><b>Market {String(i + 1).padStart(2, '0')}</b><span>Interactive network node</span><small>Replace with verified market data</small></div></Html>}
    </mesh>)}
  </group>;
}

export function PharmaGlobe() {
  return <div className="three-globe"><Canvas camera={{ position: [0, 0, 4.5], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={1.1} />
    <pointLight position={[3, 3, 4]} intensity={4} color="#72e1dc" />
    <NetworkSphere />
    <Stars radius={70} depth={35} count={850} factor={1.5} saturation={0} fade speed={.28} />
    <OrbitControls enablePan={false} enableZoom minDistance={3.2} maxDistance={6} autoRotate={false} rotateSpeed={.65} />
  </Canvas></div>;
}
