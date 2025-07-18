// Importa hooks e componentes necessários
import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import { useTranslation } from 'react-i18next';

// Componente funcional que representa a seção 'Sobre mim'
const About = () => {
  const { t } = useTranslation();
  // Referência para o container dos cards flutuantes
  const grid2Container = useRef();

  // Efeito de animação ao rolar a tela
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    // Seção principal com animação de scroll reveal
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 60 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="c-space section-spacing" id="about"
    >
      {/* Título da seção */}
      <h2 className="text-heading">{t('about.title')}</h2>
      {/* Grid principal responsiva dividida em 5 áreas temáticas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1: Apresentação e imagem de perfil */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">{t('about.greeting', 'Hi, I\'m Jonathas Felipe')}</p>
            <p className="subtext">{t('about.description')}</p>
          </div>
          {/* Gradiente decorativo no fundo */}
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2: Cards flutuantes com conceitos e tecnologias */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            {/* Texto centralizado de fundo */}
            <p className="flex items-end text-5xl text-gray-500">
              {t('about.codeIsCraft', 'CODE IS CRAFT')}
            </p>
            {/* Cards de conceitos e tecnologias, cada um com posição e rotação personalizada */}
            <Card
              style={{ rotate: "30deg", top: "30%", left: "25%" }}
              text={t('about.card1', 'Scalability')}
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-30deg", top: "60%", left: "45%" }}
              text={t('about.card2', 'SOLID')}
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "90deg", bottom: "30%", left: "72%" }}
              text={t('about.card3', 'Clean Architecture')}
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "55%", left: "0%" }}
              text={t('about.card4', 'Code Quality')}
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "20deg", top: "8%", left: "40%" }}
              text={t('about.card5', 'SRP')}
              containerRef={grid2Container}
            />
            {/* Ícones de tecnologias: React, TypeScript e Java */}
            <Card
              style={{ rotate: "30deg", top: "70%", left: "70%" }}
              image="assets/logos/react.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-45deg", top: "70%", left: "25%", width: "90px", height: "90px" }}
              image="assets/logos/typescript.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: "-35deg", top: "4%", left: "0%", width: "130px", height: "110px" }}
              image="assets/logos/java.svg"
              containerRef={grid2Container}
            />
          </div>
        </div>
        {/* Grid 3: Localização e globo interativo */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">{t('about.timezoneTitle', 'Time Zone')}</p>
            <p className="subtext">{t('about.timezoneDesc', "I'm based in Mars, and open to remote work worldwide")}</p>
          </div>
          {/* Globo 3D interativo */}
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>
        {/* Grid 4: Chamada para contato e botão de copiar e-mail */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              {t('about.cta', 'Do you want to start a project together?')}
            </p>
            {/* Botão para copiar o e-mail para a área de transferência */}
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5: Stack de tecnologias e frameworks */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">{t('about.stackTitle', 'Teck Stack')}</p>
            <p className="subtext">
              {t('about.stackDesc', 'I have advanced knowledge in several languages, frameworks and tools, which allows me to transform complex problems into elegant solutions.')}
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Exporta o componente para ser utilizado em outras partes do projeto
export default About;
