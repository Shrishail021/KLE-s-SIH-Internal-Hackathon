import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMediaQuery } from '../hooks/useMediaQuery'

// ─── Rotating Wireframe Polyhedron ──────────────────────
function WireframePolyhedron() {
  const meshRef = useRef()
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35
      meshRef.current.rotation.y += delta * 0.45
    }
  })
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial color="#87CEEB" wireframe transparent opacity={0.55} />
    </mesh>
  )
}

// ─── Floating Particles ────────────────────────────────
function Particles({ count = 180 }) {
  const meshRef = useRef()
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 12
  }
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.07
    }
  })
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#001F3F" transparent opacity={0.35} />
    </points>
  )
}

// ─── Scene Lighting ────────────────────────────────────
function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} color="#87CEEB" intensity={0.9} />
      <pointLight position={[-5, -3, -5]} color="#001F3F" intensity={0.3} />
    </>
  )
}

// ─── Main Export ───────────────────────────────────────
// Isolated so it can be removed/swapped without touching Hero
export default function ThreeDBackground() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  // On very small screens, render a static decorative gradient instead
  if (isMobile) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 80% 40%, rgba(135,206,235,0.22) 0%, transparent 70%)',
        }}
      />
    )
  }

  return (
    <div
      aria-hidden="true"
      className="threejs-canvas"
      style={{ opacity: 0.6 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 65 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}  // cap pixel ratio for performance
        performance={{ min: 0.5 }}
      >
        <Lights />
        <WireframePolyhedron />
        <Particles />
      </Canvas>
    </div>
  )
}
