// Importa o motion para animações
import { motion } from "motion/react";
import { useTranslation } from 'react-i18next';

// Componente que exibe os detalhes de um projeto em um modal
const ProjectDetails = ({
  title, // Título do projeto
  description, // Descrição principal
  subDescription, // Lista de descrições detalhadas
  image, // Imagem do projeto
  tags, // Tecnologias utilizadas
  href, // Link para o projeto
  closeModal, // Função para fechar o modal
}) => {
  const { t } = useTranslation();
  return (
    // Overlay escurecido e desfocado cobrindo toda a tela
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm p-4">
      {/* Modal animado com efeito de escala e opacidade */}
      <motion.div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Botão para fechar o modal */}
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500"
        >
          <img src="assets/close.svg" className="w-3 h-4" />
        </button>
        {/* Imagem principal do projeto */}
        {/* Para ajustar a altura, adicione uma classe Tailwind (ex: h-40) ou um style inline */}
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-64 md:h-80 rounded-t-2xl object-cover" // Altura responsiva
        />
        <div className="p-4 sm:p-5">
          {/* Título do projeto */}
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          {/* Descrição principal */}
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          {/* Lista de descrições detalhadas */}
          {subDescription.map((subDesc, index) => (
            <p className="mb-3 font-normal text-neutral-400" key={index}>{subDesc}</p>
          ))}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
            {/* Tecnologias utilizadas no projeto */}
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              {tags.map((tag) => (
                <img
                  key={tag.id}
                  src={tag.path}
                  alt={tag.name}
                  className="rounded-lg w-8 h-8 sm:w-10 sm:h-10 hover-animation"
                />
              ))}
            </div>
            {/* Link para visualizar o projeto */}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation text-sm sm:text-base"
            >
              {t('projects.viewProject', 'View Project')} <img src="assets/arrow-up.svg" className="w-3 h-3 sm:w-4 sm:h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Exporta o componente para ser utilizado em outras partes do projeto
export default ProjectDetails;
