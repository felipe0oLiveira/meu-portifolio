// Componente responsável por exibir as principais tecnologias e ferramentas em formato de carrossel/orbita animada.
// As tecnologias são separadas em dois círculos: principais (externo) e secundárias (interno), para melhor visualização.

import { OrbitingCircles } from "./OrbitingCircles";

// Array de tecnologias principais (círculo externo)
const mainSkills = [
  "react",
  "postgresql",
  "nodejs",
  "typescript",
  "python",
  "java",
  "javascript",
  "git",
  "expo",
];

// Array de tecnologias secundárias (círculo interno)
const secondarySkills = [
  "vitejs",
  "wordpress",
  "microsoft",
  "sqlite",
  "csharp",
  "html5",
  "csharp",
];

export function Frameworks() {
  // Parâmetros para cálculo dinâmico do raio
  const iconSize = 40; // Tamanho do ícone em px
  const minSpacing = 70; // Espaçamento mínimo desejado entre ícones (em px)
  const iconCount = mainSkills.length;
  // Circunferência mínima necessária para evitar sobreposição
  const minCircumference = iconCount * (iconSize + minSpacing);
  // Raio dinâmico com limites mínimo e máximo
  const dynamicRadius = Math.min(220, Math.max(100, minCircumference / (2 * Math.PI)));

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      {/* Círculo externo: tecnologias principais */}
      <OrbitingCircles iconSize={iconSize} radius={dynamicRadius}>
        {mainSkills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      {/* Círculo interno: tecnologias secundárias */}
      <OrbitingCircles iconSize={20} radius={80} reverse speed={2}>
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
