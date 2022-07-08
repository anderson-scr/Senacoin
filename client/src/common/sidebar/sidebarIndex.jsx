import React from 'react'
import {  } from "module";

export const sidebarIndex = () => {
  return (
    <>
          <nav classNameName="sidebar">
        <div classNameName="logoContent">
            <div className="logo">                
                <img src="../../assets/imgs/simboloSenacoinFront.png" alt="Senacoin" width="50px"/>
                <img src="../../assets/imgs/logoTipoSenacoin.png" alt="Senacoin" width="150px"/>                
            </div>
            <i classNameName="bi bi-list" id="btnMenu"></i>
        </div>
        <ul className="list">
            <li>
                <a href="#">
                    <i className="bi bi-columns-gap"></i>
                    <span className="linksName">Dashboard</span>
                </a>                
                <span className="tooltip">Dashboard</span>
            </li>
            <li>
                <a href="#">
                    <i className="bi bi-person-plus"></i>
                    <span className="linksName">Cadastrar Usuário</span>
                </a>
                <span className="tooltip">Cadastrar Usuário</span>
            </li>
            <li>
                <a href="#">
                    <i className="bi bi-plus-square"></i>
                    <span className="linksName">Cadastros</span>
                </a>
                <span className="tooltip">Cadastros</span>
            </li>
            <li>
                <a href="#">
                    <i className="bi bi-qr-code"></i>
                    <span className="linksName">QR Code</span>
                </a>
                <span className="tooltip">QR Code</span>
            </li>
            <li>
                <a href="#">
                    <i className="bi bi-people"></i>
                    <span className="linksName">Usuários</span>
                </a>
                <span className="tooltip">Usuários</span>
            </li>
            <li>
                <a href="#">
                    <i className="bi bi-file-earmark-bar-graph"></i>
                    <span className="linksName">Relatórios</span>
                </a>
                <span className="tooltip">Relátórios</span>
            </li>
            <li>
                <a href="#">
                    <i className="bi bi-percent"></i>
                    <span className="linksName">Promoções</span>
                </a>
                <span className="tooltip">Promoções</span>
            </li>
        </ul>
        <div className="profileContent">
            <div className="profile">
                <div className="profileDetails">
                    <img src="../../assets/imgs/profile.jpg" alt=""/>
                    <div className="name_job">
                        <div className="name">Mateus Borges</div>
                        <div className="job">Desenvolvedor</div>
                    </div>
                </div>
                <i className="bi bi-box-arrow-left" id="logout"></i>
                <span className="tooltip">logout</span>
            </div>
        </div>        
    </nav>
    </>
  )
}
