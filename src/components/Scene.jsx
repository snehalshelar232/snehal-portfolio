
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { AdditiveBlending, MathUtils } from 'three'

const orbVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const orbFragmentShader = `
  uniform float uTime;
  uniform float uHover;

  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    vec3 lightDir = normalize(vec3(-0.6, 0.8, 1.0));

    float diffuse = max(dot(normal, lightDir), 0.0);
    float facing = clamp(dot(normal, viewDir), 0.0, 1.0);
    float edge = 1.0 - facing;

    float fresnel = pow(edge, 2.8);

    float highlight = pow(
      max(dot(reflect(-lightDir, normal), viewDir), 0.0),
      28.0
    );

    vec3 solidColor = mix(
      vec3(0.008, 0.003, 0.025),
      vec3(0.15, 0.045, 0.38),
      smoothstep(0.0, 0.85, diffuse)
    );

    solidColor += vec3(0.68, 0.48, 1.0) * highlight * 0.9;
    solidColor += vec3(0.28, 0.10, 0.72) * fresnel * 0.85;

    float ring = smoothstep(0.26, 0.78, edge);

    float angle = atan(normal.y, normal.x);

    float energy = pow(
      0.5 + 0.5 * sin(
        angle * 18.0 - uTime * 5.0 + edge * 12.0
      ),
      8.0
    );

    vec3 galaxyColor = mix(
      vec3(0.20, 0.04, 0.55),
      vec3(1.0, 0.75, 1.45),
      ring
    );

    galaxyColor +=
      vec3(0.8, 0.35, 1.2) * energy * ring;

    galaxyColor *= 1.3 +
      0.15 * sin(uTime * 3.0);

    vec3 color = mix(
      solidColor,
      galaxyColor,
      uHover
    );

    float alpha = mix(
      1.0,
      ring,
      uHover
    );

    gl_FragColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`

const glowVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`

const glowFragmentShader = `
  uniform float uTime;
  uniform float uHover;

  varying vec2 vUv;

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;

    float radius = length(p);
    float angle = atan(p.y, p.x);

    float normalGlow = exp(
      -radius * radius * 2.8
    ) * 0.24;

    float waveRadius = radius +
      0.018 * sin(angle * 12.0 + uTime * 2.0);

    float ringGlow = exp(
      -pow((waveRadius - 0.60) * 3.3, 2.0)
    ) * 0.55;

    float rays = pow(
      abs(cos(angle * 18.0 + uTime * 0.3)),
      30.0
    );

    float rayMask =
      smoothstep(0.42, 0.62, radius) *
      (1.0 - smoothstep(0.85, 1.3, radius));

    float radiance = rays * rayMask * uHover;

    float glow = mix(
      normalGlow,
      ringGlow,
      uHover
    );

    vec3 color = mix(
      vec3(0.25, 0.07, 0.75),
      vec3(0.68, 0.32, 1.0),
      uHover
    );

    float brightness = glow + radiance * 0.6;

    gl_FragColor = vec4(
      color * brightness * 1.8,
      clamp(brightness * 1.8, 0.0, 1.0)
    );
  }
`

function AtmosphereGlow({ hoverAmount }) {
  const materialRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHover: { value: 0 }
  }), [])

  useFrame((state) => {
    if (!materialRef.current) return

    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uHover.value = hoverAmount.current
  })

  return (
    <mesh position={[0, 0, -0.5]} raycast={() => {}}>
      <planeGeometry args={[4.8, 4.8]} />

      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={glowVertexShader}
        fragmentShader={glowFragmentShader}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  )
}

function GalaxyParticles({ hoverAmount }) {
  const pointsRef = useRef()
  const materialRef = useRef()
  const ringOneRef = useRef()
  const ringTwoRef = useRef()
  const ringOneMaterial = useRef()
  const ringTwoMaterial = useRef()

  const positions = useMemo(() => {
    const count = 650
    const values = new Float32Array(count * 3)

    let seed = 12345

    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0
      return seed / 4294967296
    }

    for (let i = 0; i < count; i++) {
      const progress = i / count
      const arm = i % 4

      const angle =
        progress * Math.PI * 12 +
        arm * Math.PI * 0.5 +
        (random() - 0.5) * 0.55

      const radius =
        1.35 +
        Math.sqrt(progress) * 0.48 +
        (random() - 0.5) * 0.18

      values[i * 3] = Math.cos(angle) * radius
      values[i * 3 + 1] = Math.sin(angle) * radius * 0.68
      values[i * 3 + 2] = (random() - 0.5) * 0.35
    }

    return values
  }, [])

  useFrame((state, delta) => {
    const hover = hoverAmount.current

    if (pointsRef.current) {
      pointsRef.current.rotation.z +=
        delta * (0.08 + hover * 0.55)

      pointsRef.current.rotation.y +=
        delta * hover * 0.18
    }

    if (materialRef.current) {
      materialRef.current.opacity = hover * 0.95
    }

    if (ringOneRef.current) {
      ringOneRef.current.rotation.z +=
        delta * hover * 0.7
    }

    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.x +=
        delta * hover * 0.5

      ringTwoRef.current.rotation.z -=
        delta * hover * 0.35
    }

    if (ringOneMaterial.current) {
      ringOneMaterial.current.opacity = hover * 0.8
    }

    if (ringTwoMaterial.current) {
      ringTwoMaterial.current.opacity = hover * 0.65
    }
  })

  return (
    <group>
      <group ref={pointsRef} rotation={[0.5, 0.2, 0]}>
        <points raycast={() => {}}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>

          <pointsMaterial
            ref={materialRef}
            color="#d1a6ff"
            size={0.024}
            sizeAttenuation
            transparent
            opacity={0}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </points>
      </group>

      <mesh
        ref={ringOneRef}
        rotation={[0.65, 0.15, 0.3]}
        raycast={() => {}}
      >
        <torusGeometry args={[1.52, 0.012, 8, 160]} />
        <meshBasicMaterial
          ref={ringOneMaterial}
          color="#c6a0ff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      <mesh
        ref={ringTwoRef}
        rotation={[-0.45, 0.6, -0.3]}
        raycast={() => {}}
      >
        <torusGeometry args={[1.68, 0.009, 8, 160]} />
        <meshBasicMaterial
          ref={ringTwoMaterial}
          color="#a45cff"
          transparent
          opacity={0}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

function Orb({ hoverRef, hoverAmount }) {
  const orbRef = useRef()
  const materialRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHover: { value: 0 }
  }), [])

  useFrame((state, delta) => {
    const target = hoverRef.current ? 1 : 0

    hoverAmount.current = MathUtils.damp(
      hoverAmount.current,
      target,
      4.5,
      delta
    )

    const hover = hoverAmount.current

    if (orbRef.current) {
      orbRef.current.rotation.y +=
        delta * (0.09 + hover * 1.4)

      orbRef.current.rotation.x = MathUtils.damp(
        orbRef.current.rotation.x,
        state.pointer.y * 0.12,
        1.2,
        delta
      )

      const pulse = 1 +
        hover * 0.025 *
        Math.sin(state.clock.elapsedTime * 4)

      const scale = MathUtils.damp(
        orbRef.current.scale.x,
        pulse,
        4,
        delta
      )

      orbRef.current.scale.setScalar(scale)
    }

    if (materialRef.current) {
      uniforms.uTime.value = state.clock.elapsedTime
      uniforms.uHover.value = hover
    }
  })

  return (
    <mesh
      ref={orbRef}
      onPointerOver={(event) => {
        if (event.sourceEvent?.pointerType === 'touch') return
        event.stopPropagation()
        hoverRef.current = true
      }}
      onPointerOut={() => {
        hoverRef.current = false
      }}
    >
      <sphereGeometry args={[1.3, 128, 128]} />

      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={orbVertexShader}
        fragmentShader={orbFragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function GalaxyScene({ hoverRef }) {
  const hoverAmount = useRef(0)

  return (
    <>
      <AtmosphereGlow hoverAmount={hoverAmount} />

      <Float
        speed={0.8}
        rotationIntensity={0.08}
        floatIntensity={0.16}
      >
        <Orb
          hoverRef={hoverRef}
          hoverAmount={hoverAmount}
        />

        <GalaxyParticles hoverAmount={hoverAmount} />
      </Float>
    </>
  )
}

export default function Scene() {
  const hoverRef = useRef(false)

  return (
    <div
      className="scene"
      aria-label="Interactive purple galaxy sphere"
      onPointerLeave={() => {
        hoverRef.current = false
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 42
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true
        }}
      >
        <GalaxyScene hoverRef={hoverRef} />
      </Canvas>

      <span className="scene-caption">
        IMAGINATION, IN ORBIT.
      </span>
    </div>
  )
}
