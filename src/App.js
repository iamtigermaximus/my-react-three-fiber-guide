import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense } from 'react'
import { useSpring, animated, config } from '@react-spring/three'
import React, { useState, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'

function MyRotatingChair() {
  const myMesh = useRef()
  const [active, setActive] = useState(false)

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  })

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime()
    myMesh.current.rotation.y = a
  })

  return (
    <animated.mesh
      scale={scale}
      onClick={() => setActive(!active)}
      ref={myMesh}
    >
      <Scene />
    </animated.mesh>
  )
}

function Scene() {
  const gltf = useLoader(GLTFLoader, '/scene.gltf')
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}

function App() {
  return (
    <div className='container'>
      <Canvas camera={{ position: [0, 0, 150], fov: 70 }}>
        {/* Ambient Light illuminates lights for all objects */}
        <ambientLight intensity={0.3} />
        {/* Diretion light */}
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {/* Spotlight Large overhead light */}
        <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
        <mesh position={[0, -35, 0]}>
          <Suspense>
            <MyRotatingChair />
            <OrbitControls />
          </Suspense>
        </mesh>
      </Canvas>
    </div>
  )
}

export default App
