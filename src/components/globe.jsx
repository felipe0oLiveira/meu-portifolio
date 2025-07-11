"use client";

// Importações necessárias para o componente Globe
import createGlobe from "cobe"; // Biblioteca para criar o globo 3D
import { useMotionValue, useSpring } from "motion/react"; // Hooks para animações suaves
import { useEffect, useRef } from "react"; // Hooks do React

import { twMerge } from "tailwind-merge"; // Utilitário para mesclar classes CSS

// Constante que controla a sensibilidade do movimento manual do globo
const MOVEMENT_DAMPING = 1700;

// Configuração padrão do globo
const GLOBE_CONFIG = {
  width: 800, // Largura do canvas
  height: 800, // Altura do canvas
  onRender: () => {}, // Função de renderização (será sobrescrita)
  devicePixelRatio: 2, // Razão de pixels para dispositivos de alta resolução
  phi: 0, // Rotação horizontal inicial
  theta: 0.3, // Inclinação vertical (0.1 = alto, 0.5 = baixo)
  dark: 1, // Intensidade do modo escuro
  diffuse: 0.4, // Difusão da luz
  mapSamples: 16000, // Qualidade da textura do mapa
  mapBrightness: 1.2, // Brilho do mapa
  baseColor: [1, 1, 1], // Cor base do globo (branco)
  markerColor: [1, 1, 1], // Cor dos marcadores (branco)
  glowColor: [1, 1, 1], // Cor do brilho (branco)
  // Marcadores das cidades no globo [latitude, longitude]
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 }, // Manila, Filipinas
    { location: [19.076, 72.8777], size: 0.1 }, // Mumbai, Índia
    { location: [23.8103, 90.4125], size: 0.05 }, // Dhaka, Bangladesh
    { location: [30.0444, 31.2357], size: 0.07 }, // Cairo, Egito
    { location: [39.9042, 116.4074], size: 0.08 }, // Beijing, China
    { location: [19.4326, -99.1332], size: 0.1 }, // Cidade do México, México
    { location: [40.7128, -74.006], size: 0.1 }, // Nova York, EUA
    { location: [41.0082, 28.9784], size: 0.06 }, // Istambul, Turquia
    { location: [34.6937, 135.5022], size: 0.05 }, // Osaka, Japão
    { location: [40.4168, -3.7038], size: 0.07 }, // Madri, Espanha
    { location: [41.9028, 12.4964], size: 0.07 }, // Roma, Itália
    { location: [52.52, 13.405], size: 0.07 }, // Berlim, Alemanha
  ],
};

// Componente principal do globo interativo
export function Globe({ className, config = GLOBE_CONFIG }) {
  let phi = 0; // Ângulo de rotação horizontal
  let width = 0; // Largura do canvas
  const canvasRef = useRef(null); // Referência para o elemento canvas
  const pointerInteracting = useRef(null); // Controla se o usuário está interagindo
  const pointerInteractionMovement = useRef(0); // Movimento do ponteiro

  // Hook para animação suave da rotação
  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1, // Massa da animação
    damping: 30, // Amortecimento
    stiffness: 100, // Rigidez da mola
  });

  // Função para atualizar o estado de interação do ponteiro
  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      // Muda o cursor baseado na interação
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  // Função para atualizar o movimento baseado na posição do mouse
  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      // Aplica o movimento com amortecimento para suavizar
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    // Função para redimensionar o canvas quando a janela muda de tamanho
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    // Adiciona listener para redimensionamento da janela
    window.addEventListener("resize", onResize);
    onResize(); // Executa uma vez para definir o tamanho inicial

    // Cria a instância do globo com as configurações
    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2, // Dobra a largura para alta resolução
      height: width * 2, // Dobra a altura para alta resolução
      onRender: (state) => {
        // Rotação automática quando não há interação
        if (!pointerInteracting.current) phi += 0.002;
        // Aplica a rotação com animação suave
        state.phi = phi + rs.get();
        // Atualiza as dimensões do estado
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    // Faz o canvas aparecer com fade-in
    setTimeout(() => (canvasRef.current.style.opacity = "1"), 0);
    
    // Cleanup: remove listeners e destrói o globo
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  // Renderiza o container do globo
  return (
    <div
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px]", // Container responsivo
        className
      )}
    >
      {/* Canvas onde o globo é renderizado */}
      <canvas
        className={twMerge(
          "size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]" // Canvas com fade-in
        )}
        ref={canvasRef}
        // Eventos de interação do mouse/touch
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
