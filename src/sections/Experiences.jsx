// Importa o componente Timeline, responsável por exibir a linha do tempo
import { Timeline } from "../components/Timeline";
// Importa o array de experiências que será exibido na linha do tempo
import { experiences } from "../constants";

// Componente funcional que representa a seção de experiências
const Experiences = () => {
  return (
    // Container que ocupa toda a largura disponível
    <div className="w-full">
      {/* Renderiza a linha do tempo passando os dados de experiências */}
      <Timeline data={experiences} />
    </div>
  );
};

// Exporta o componente para ser utilizado em outras partes do projeto
export default Experiences;
