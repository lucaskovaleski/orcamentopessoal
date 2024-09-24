import React, { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig"; // Importe o auth do Firebase
import { onAuthStateChanged, signOut } from "firebase/auth"; // Importa métodos necessários do Firebase
import Dashboard from "../dashboard";
import Home from "../home";
import Sobre from "../sobre";
import Login from "../login";
import "./styles.css";

enum EnumPaginas {
  home = "home",
  dashboard = "dashboard",
  sobre = "sobre",
}

const Router: React.FC = () => {
  const [paginaAtual, setPaginaAtual] = useState<EnumPaginas | "login">("login");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Verifica o estado de autenticação ao carregar o componente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setPaginaAtual(EnumPaginas.home); // Redireciona para a página inicial após o login
      } else {
        setIsLoggedIn(false);
        setPaginaAtual("login");
      }
    });
    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setPaginaAtual("login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const renderizarCabecalho = () =>
    isLoggedIn && (
      <div className="header">
        <button className="btn-header" onClick={() => setPaginaAtual(EnumPaginas.home)}>
          Inicio
        </button>
        <button className="btn-header" onClick={() => setPaginaAtual(EnumPaginas.dashboard)}>
          DashBoard
        </button>
        <button className="btn-header" onClick={() => setPaginaAtual(EnumPaginas.sobre)}>
          Sobre
        </button>
        <button className="btn-header" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );

  const renderizarPagina = () => {
    if (!isLoggedIn) {
      return <Login />; // Não precisamos mais de onLogin aqui, o redirecionamento é automático
    }
    switch (paginaAtual) {
      case EnumPaginas.home:
        return <Home />;
      case EnumPaginas.dashboard:
        return <Dashboard />;
      case EnumPaginas.sobre:
        return <Sobre />;
      default:
        return (
          <div>
            <h1>Home</h1>
          </div>
        );
    }
  };

  return (
    <div>
      {renderizarCabecalho()}
      {renderizarPagina()}
    </div>
  );
};

export default Router;
