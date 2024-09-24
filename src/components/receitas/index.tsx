import React, { useState } from "react";
import "./styles.css";
import { ReceitasProps } from "../../@types/receitas";

// Função para formatar o número como moeda brasileira
const formatarParaMoeda = (valor: string) => {
  const valorNumerico = parseFloat(valor.replace(/[^\d]/g, "")) / 100;
  if (isNaN(valorNumerico)) return "";
  return valorNumerico.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const Receitas: React.FC<ReceitasProps> = ({ onReceitaSubmit }) => {
  const [receita, setReceita] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valorDigitado = event.target.value;
    const valorFormatado = formatarParaMoeda(valorDigitado); // Aplica a formatação de moeda
    setReceita(valorFormatado);
  };

  const handleSubmit = () => {
    if (receita.trim()) {
      // Remove o "R$" antes de enviar
      const valorNumerico = receita.replace(/[^\d,-]/g, "");
      onReceitaSubmit(valorNumerico);
      setReceita(""); // Limpa o input após o envio
    }
  };

  return (
    <div>
      <h2>Receitas</h2>
      <p>Coloque o valor das suas receitas</p>
      <input
        type="text" 
        value={receita} 
        onChange={handleInputChange} 
        placeholder="Digite sua receita" 
      />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default Receitas;
