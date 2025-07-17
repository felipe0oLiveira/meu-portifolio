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
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// Componente principal da seção Hero
const Hero = () => {
  // Detecta se está em uma tela mobile
  const isMobile = useMediaQuery({ maxWidth: 853 });
  // Scroll reveal
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    // Container principal da seção Hero
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 60 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space"
    >
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
    </motion.section>
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
