import { mySocials } from "../constants";
import { useTranslation } from 'react-i18next';
// Componente funcional que representa o rodapé do site
const Footer = () => {
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  // Filtrar apenas as redes sociais desejadas
  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/felipe0oLiveira",
      icon: "/assets/logos/github.svg",
    },
    {
      name: "LinkedIn",
      //href: "https://www.linkedin.com/in/jonathas-felipe/",
      icon: "/assets/socials/linkedIn.svg",
    },
    {
      name: "Instagram",
      //href: "https://www.instagram.com/jonathas.felipe/",
      icon: "/assets/socials/instagram.svg",
    },
  ];
  return (
    <footer className="w-full py-4 text-white text-center flex flex-col items-center gap-2">
      <div className="flex gap-4 justify-center mb-1">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="group flex items-center justify-center rounded-full transition-transform hover:scale-110 focus:outline-none"
            style={{ width: 40, height: 40 }}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 group-hover:bg-white/10">
              <img
                src={social.icon}
                alt={social.name}
                className="w-7 h-7"
                style={
                  social.name === "GitHub"
                    ? { filter: "invert(1) brightness(2)" }
                    : {}
                }
              />
            </span>
          </a>
        ))}
      </div>
      <span>
        {t('footer.copyright', { year })}
      </span>
    </footer>
  );
};

// Exporta o componente para ser utilizado em outras partes do projeto
export default Footer;
