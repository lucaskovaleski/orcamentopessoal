import React from "react";
import { Pie } from "react-chartjs-2";
import { ChartProps } from "../../@types/chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "chart.js/auto";
import "./styles.css";

// Registrar os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart: React.FC<ChartProps> = ({ saldoTotal, receitas, despesas }) => {
  const data = {
    labels: ["Receitas", "Despesas", "Saldo Total"],
    datasets: [
      {
        label: "Valores",
        data: [receitas, despesas, saldoTotal],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        className: "piechart-dataset", // Aplicando estilo dos datasets
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Para permitir controle de tamanho
  };

  return (
    <div className="chart-container piechart-background">
      <Pie data={data} options={options} />
    </div>
  );
};

export default Chart;
