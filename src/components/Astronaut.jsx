
// Importa hooks e componentes necessários para renderização 3D
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei"; // Para carregar modelo 3D e animações
import { useMotionValue, useSpring } from "motion/react"; // Para animações suaves
import { useFrame } from "@react-three/fiber"; // Para executar código a cada frame

// Componente do astronauta 3D
export function Astronaut(props) {
  // Referência para o grupo 3D do astronauta
  const group = useRef();
  
  // Carrega o modelo 3D do astronauta (.glb)
  const { nodes, materials, animations } = useGLTF(
    "/models/tenhun_falling_spaceman_fanart.glb"
  );
  
  // Controles de animação do modelo
  const { actions } = useAnimations(animations, group);
  
  // Inicia a animação quando o componente monta
  useEffect(() => {
    if (animations.length > 0) {
      actions[animations[0].name]?.play(); // Inicia a primeira animação disponível
    }
  }, [actions, animations]);

  // Configuração da animação de movimento vertical (queda)
  const yPosition = useMotionValue(5); // Posição inicial (5 unidades acima)
  const ySpring = useSpring(yPosition, { damping: 30 }); // Animação suave com amortecimento
  
  // Move o astronauta para a posição final
  useEffect(() => {
    ySpring.set(-1); // Define posição final Y = -1
  }, [ySpring]);
  
  // Aplica a posição a cada frame, criando movimento suave
  useFrame(() => {
    group.current.position.y = ySpring.get();
  });

  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  
  // Renderiza o modelo 3D do astronauta
  return (
    <group
      ref={group} // Conecta a referência do grupo
      {...props} // Passa todas as props recebidas (position, scale, etc.)
      dispose={null} // Não descarta o modelo da memória
      rotation={[-Math.PI / 2, -0.2, 2.2]} // Rotação inicial do modelo (em radianos)
      scale={(hovered || touched) ? (props.scale ? props.scale * 1.2 : 0.36) : (props.scale || 0.3)} // Tamanho do modelo (padrão 0.3)
      position={props.position || [1.3, -1, 0]} // Posição inicial (pode ser sobrescrita)
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={() => setTouched(true)}
      onPointerUp={() => setTimeout(() => setTouched(false), 1000)}
    >
      {/* Estrutura hierárquica do modelo 3D */}
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model">
          <group name="Root">
            <group name="metarig">
              {/* Esqueleto/rig do modelo para animação */}
              <primitive object={nodes.metarig_rootJoint} />
              
              {/* Partes do modelo com animação (skinnedMesh) */}
              <skinnedMesh
                name="Cube001_0"
                geometry={nodes.Cube001_0.geometry}
                material={materials["AstronautFallingTexture.png"]} // Textura do astronauta
                skeleton={nodes.Cube001_0.skeleton}
              />
              <skinnedMesh
                name="Cube005_0"
                geometry={nodes.Cube005_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube005_0.skeleton}
              />
              <skinnedMesh
                name="Cube002_0"
                geometry={nodes.Cube002_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube002_0.skeleton}
              />
              <skinnedMesh
                name="Plane_0"
                geometry={nodes.Plane_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Plane_0.skeleton}
              />
              <skinnedMesh
                name="Cube008_0"
                geometry={nodes.Cube008_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube008_0.skeleton}
              />
              <skinnedMesh
                name="Cube004_0"
                geometry={nodes.Cube004_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube004_0.skeleton}
              />
              <skinnedMesh
                name="Cube003_0"
                geometry={nodes.Cube003_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube003_0.skeleton}
              />
              <skinnedMesh
                name="Cube_0"
                geometry={nodes.Cube_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube_0.skeleton}
              />
              <skinnedMesh
                name="Cube009_0"
                geometry={nodes.Cube009_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube009_0.skeleton}
              />
              <skinnedMesh
                name="Cube011_0"
                geometry={nodes.Cube011_0.geometry}
                material={materials["AstronautFallingTexture.png"]}
                skeleton={nodes.Cube011_0.skeleton}
              />
              
              {/* Grupos de controle para animação */}
              <group name="Cube001" />
              <group name="Cube005" />
              <group name="Cube002" />
              <group name="Plane" />
              <group name="Cube008" />
              <group name="Cube004" />
              <group name="Cube003" />
              <group name="Cube" />
              <group
                name="Cube009"
                rotation={[-2.708, 0.013, -1.447]} // Rotação específica para esta parte
                scale={1.307} // Escala específica
              />
              <group name="Cube011" />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

// Pré-carrega o modelo 3D para melhor performance
useGLTF.preload("/models/tenhun_falling_spaceman_fanart.glb");
