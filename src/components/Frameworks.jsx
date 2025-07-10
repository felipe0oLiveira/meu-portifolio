// Componente responsável por exibir as principais tecnologias e ferramentas em formato de carrossel/orbita animada.
// As tecnologias são separadas em dois círculos: principais (externo) e secundárias (interno), para melhor visualização.

import { OrbitingCircles } from "./OrbitingCircles";

// Array de tecnologias principais (círculo externo)
const mainSkills = [
  "react",
  "typescript",
  "python",
  "java",
  "csharp",
  "javascript",
  "html5",
  "css3",
];

// Array de tecnologias secundárias (círculo interno)
const secondarySkills = [
  "git",
  "tailwindcss",
  "vitejs",
  "wordpress",
  "auth0",
  "blazor",
  "cplusplus",
  "microsoft",
  "sqlite",
];

export function Frameworks() {
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      {/* Círculo externo: tecnologias principais */}
      <OrbitingCircles iconSize={35} radius={130}>
        {mainSkills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      {/* Círculo interno: tecnologias secundárias */}
      <OrbitingCircles iconSize={30} radius={90} reverse speed={2}>
        {secondarySkills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

// Componente auxiliar para renderizar cada ícone
const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
