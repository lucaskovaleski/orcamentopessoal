import React, { useState } from 'react'
import Cookies from "js-cookie";

const Home = () => {
    const username = Cookies.get("username");
    return (
        <>
            <div>
                <h1>Ola {username ? username : "Visitante"}, seja bem vindo! </h1>
                <p> Este projeto é uma aplicação de gerenciamento financeiro pessoal, onde o usuário pode adicionar e controlar suas receitas e despesas mensais. Através de uma interface simples e intuitiva, o usuário pode visualizar suas entradas de receita e saídas de despesas, calcular o saldo total e acompanhar seus hábitos financeiros ao longo do tempo. </p>
                <p>Funcionalidades Principais</p>
                <ul>
                    <li>Inserção de receitas e despesas categorizadas.</li>
                    <li>Exibição de um saldo total baseado nos dados inseridos.</li>
                    <li>Gráficos dinâmicos para representar visualmente o balanço financeiro.</li>
                    <li>Opção de excluir ou editar receitas e despesas.</li>
                    <li>Armazenamento seguro de informações de login utilizando cookies.</li>
                </ul>
            </div>
        </>
    );

}
export default Home;

