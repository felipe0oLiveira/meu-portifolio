import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
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

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={35} radius={130}>
        {mainSkills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={90} reverse speed={2}>
        {secondarySkills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
