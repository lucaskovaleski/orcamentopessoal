import React, { useState } from "react";
import Receitas from "../../components/receitas";
import Despesas from "../../components/despesas";
import Chart from "../../components/chart";

const Dashboard = () => {
  const [receitas, setReceitas] = useState<string[]>([]);
  const [despesas, setDespesas] = useState<string[]>([]);
  const [dadosGrafico, setDadosGrafico] = useState<{ receitas: number; despesas: number; saldo: number } | null>(null);
  const [editandoReceitaIndex, setEditandoReceitaIndex] = useState<number | null>(null); // Controla a receita que está sendo editada
  const [editandoDespesaIndex, setEditandoDespesaIndex] = useState<number | null>(null); 

  // Função para adicionar ou editar uma receita
  const handleReceitaSubmit = (novaReceita: string) => {
    if (editandoReceitaIndex !== null) {
      const receitasAtualizadas = [...receitas];
      receitasAtualizadas[editandoReceitaIndex] = novaReceita;
      setReceitas(receitasAtualizadas);
      setEditandoReceitaIndex(null); // Sai do modo de edição
    } else {
      setReceitas([...receitas, novaReceita]);
    }
  };

  // Função para adicionar uma nova despesa
  const handleDespesaSubmit = (novaDespesa: string) => {
    if (editandoDespesaIndex !== null) {
      const despesasAtualizadas = [...despesas]; // Corrigido para usar despesas
      despesasAtualizadas[editandoDespesaIndex] = novaDespesa;
      setDespesas(despesasAtualizadas); // Corrigido para atualizar despesas
      setEditandoDespesaIndex(null); // Sai do modo de edição
    } else {
      setDespesas([...despesas, novaDespesa]);
    }
  };
  
  // Função para excluir uma receita pelo índice
  const handleExcluirReceita = (index: number) => {
    const novasReceitas = receitas.filter((_, i) => i !== index);
    setReceitas(novasReceitas);
  };

  // Função para editar uma receita
  const handleEditarReceita = (index: number) => {
    setEditandoReceitaIndex(index); // Define qual receita está sendo editada
  };

  // Função para editar uma despesa
  const handleEditarDespesa = (index: number) => {
    setEditandoDespesaIndex(index); // Define qual receita está sendo editada
  };

  // Função para excluir uma despesa pelo índice
  const handleExcluirDespesa = (index: number) => {
    const novasDespesas = despesas.filter((_, i) => i !== index);
    setDespesas(novasDespesas);
  };

  // Função para calcular a soma das receitas e despesas
  const calcularTotal = (valores: string[]) => {
    return valores.reduce((total, valorAtual) => {
      const valorNumerico = parseFloat(valorAtual.replace(/[^\d,-]/g, "").replace(",", "."));
      return total + (isNaN(valorNumerico) ? 0 : valorNumerico);
    }, 0);
  };

  const totalReceitas = calcularTotal(receitas);
  const totalDespesas = calcularTotal(despesas);
  const saldoTotal = totalReceitas - totalDespesas;

  const handleGerarGrafico = () => {
    setDadosGrafico({
      receitas: totalReceitas,
      despesas: totalDespesas,
      saldo: saldoTotal,
    });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Receitas 
        onReceitaSubmit={handleReceitaSubmit} 
        receitaParaEditar={editandoReceitaIndex !== null ? receitas[editandoReceitaIndex] : ""} // Passa a receita a ser editada
      />
      <div>
        {receitas.map((receitaItem, index) => (
          <div key={index}>
            <p>
              Receita {index + 1}: R${receitaItem}
              <button onClick={() => handleEditarReceita(index)}>Editar</button>
              <button onClick={() => handleExcluirReceita(index)}>Excluir</button>
            </p>
          </div>
        ))}
      </div>

      <Despesas onDespesaSubmit={handleDespesaSubmit}
     despesaParaEditar={editandoDespesaIndex !== null ? despesas[editandoDespesaIndex] : ""} // Passa a despesa a ser editada
      />
      <div>
        {despesas.map((despesaItem, index) => (
          <div key={index}>
            <p>
              Despesa {index + 1}: R${despesaItem}
              <button onClick={() => handleEditarDespesa(index)}>Editar</button>
              <button onClick={() => handleExcluirDespesa(index)}>Excluir</button>
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2>TOTAL</h2>
        <p>Total de receita: R${totalReceitas.toFixed(2)}</p>
        <p>Total de despesa: R${totalDespesas.toFixed(2)}</p>
        <p>Saldo: R${saldoTotal.toFixed(2)}</p>
      </div>
      <div>
        <button onClick={handleGerarGrafico}>Gerar Gráfico</button>

        {dadosGrafico && (
          <Chart
            saldoTotal={dadosGrafico.saldo}
            receitas={dadosGrafico.receitas}
            despesas={dadosGrafico.despesas}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
