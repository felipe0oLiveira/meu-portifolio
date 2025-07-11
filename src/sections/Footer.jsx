import { mySocials } from "../constants";
// Componente funcional que representa o rodapé do site
const Footer = () => {
  return (
    // Container do rodapé com estilização
    <footer className="w-full py-4 bg-gray-900 text-white text-center">
      {/* Texto do rodapé */}
      <span>© 2024 Seu Nome. Todos os direitos reservados.</span>
    </footer>
  );
};

// Exporta o componente para ser utilizado em outras partes do projeto
export default Footer;
