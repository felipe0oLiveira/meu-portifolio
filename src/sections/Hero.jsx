// Importa componentes e hooks necessários
import { Canvas, useFrame } from "@react-three/fiber"; // Para renderização 3D
import HeroText from "../components/HeroText"; // Texto principal da seção
import ParallaxBackground from "../components/ParallaxBackground"; // Fundo animado
import { Astronaut } from "../components/Astronaut"; // Modelo 3D do astronauta
import { Float } from "@react-three/drei"; // Efeito de flutuação
import { useMediaQuery } from "react-responsive"; // Detecta se é mobile
import { easing } from "maath"; // Suavização de movimentos
import { Suspense } from "react"; // Para carregamento assíncrono
import Loader from "../components/Loader"; // Loader para o 3D

// Componente principal da seção Hero
const Hero = () => {
  // Detecta se está em uma tela mobile
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    // Container principal da seção Hero
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      {/* Texto de apresentação */}
      <HeroText />
      {/* Fundo animado com efeito parallax */}
      <ParallaxBackground />
      {/* Área do 3D, ocupa toda a tela */}
      <figure className="absolute inset-0" style={{ width: "100vw", height: "100vh" }}>
        {/* Canvas do React Three Fiber para renderizar o 3D */}
        <Canvas camera={{ position: [0, 1, 3] }}>
          {/* Suspense exibe o Loader enquanto o modelo 3D carrega */}
          <Suspense fallback={<Loader />}>
            {/* Float aplica efeito de flutuação ao astronauta */}
            <Float>
              {/* Astronauta 3D, com escala e posição ajustadas para mobile ou desktop */}
              <Astronaut
                scale={isMobile && 0.23}
                position={isMobile ? [0.5, -1.5, 0] : [1.8, -1, 0]}
              />
            </Float>
            {/* Rig faz a câmera seguir o mouse suavemente */}
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

// Função que faz a câmera do 3D seguir o mouse suavemente
function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
