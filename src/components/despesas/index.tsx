import React, { useState } from "react";
import "./styles.css";
import { DespesasProps } from "../../@types/despesas";

const formatarParaMoeda = (valor: string) => {
  const valorNumerico = parseFloat(valor.replace(/[^\d]/g, "")) / 100;
  if (isNaN(valorNumerico)) return "";
  return valorNumerico.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const Despesas: React.FC<DespesasProps> = ({ onDespesaSubmit }) => {
    const [despesa, setDespesa] = useState<string>("");
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const valorDigitado = event.target.value;
      const valorFormatado = formatarParaMoeda(valorDigitado); // Aplica a formatação de moeda
      setDespesa(valorFormatado);
    };
  
    const handleSubmit = () => {
      if (despesa.trim()) {
        // Remove o "R$" antes de enviar
        const valorNumerico = despesa.replace(/[^\d,-]/g, "");
        onDespesaSubmit(valorNumerico);
        setDespesa(""); // Limpa o input após o envio
      }
    };
  
    return (
      <div>
        <h2>Despesas</h2>
        <p>Coloque o valor das suas Despesas</p>
        <input 
          type="text" 
          value={despesa} 
          onChange={handleInputChange} 
          placeholder="Digite sua despesa" 
        />
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    );
  };
  
  export default Despesas;
