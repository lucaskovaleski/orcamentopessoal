import React, { useState } from 'react'
import Eu from "./eu.jpg"

const Sobre = () => {
    return (
        <>
        <div>
            <div>
                <h1>Quem sou eu?</h1>
                <img  src={Eu} alt="Minha Figura" width={200} height={250}></img>
                <h2> Me chamo Lucas, desenvolvedor frontend! </h2>
            </div>
            <div>
                <p>Atualmente estudante de engenharia de software na FAG, cursando o sexto período, realizei este <br/>
                projeto na matéria de Programação Web. <br/>
                Utilizando a estrutura ensinada em sala de aula, dei sequencia a um projeto de Orcamento de finanças pessoais.<br/>
                Neste projeto, foi utilizado a tecnologia REACT e TYPESCRIPT, assim como foi adicionado bibliotecas React, como <br/>
                 ChartJS e react-cookies para complementar o projeto. <br/>
                 No momento estou procurando oportunidades para iniciar na área de desenvolvimento, tenho experiência em TI e <br/>
                 sonho em trabalhar na área de programação de software!</p>
                 Você pode acompanhar meus demais projetos em: <a href='https://www.github.com/lucaskovaleski' target='blank'>aqui</a>!
                 
            </div>
        </div>
        </>
    );

}
export default Sobre;