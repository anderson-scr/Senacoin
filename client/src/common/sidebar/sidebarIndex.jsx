import React from 'react'

export const sidebarIndex = () => {
  return (
    <>
      <nav className='sidebar'>
        <div className='logoContent'>
          <div className='logo'>                
            <img src="./simbolSenacoinFront.png" alt="Senacoin" width="50px"/>
            <img src="./logotipoSenacoin.png" alt="Senacoin" width="150px"/>
          </div>
          <i class="bi bi-list" id="btnMenu"></i>
        </div>        
          <ul class="list">
            <li>
              <a href="#">
                <i class="bi bi-columns-gap"></i>
                <span>Dashboard</span>
              </a>                
              <span class="tooltip">Dashboard</span>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-person-plus"></i>
                <span>Cadastrar Usuário</span>
              </a>
              <span class="tooltip">Cadastrar Usuário</span>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-plus-square"></i>
                <span>Cadastros</span>
              </a>
              <span class="tooltip">Cadastros</span>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-qr-code"></i>
                <span>QR Code</span>
              </a>
              <span class="tooltip">QR Code</span>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-people"></i>
                <span>Usuários</span>
              </a>
              <span class="tooltip">Usuários</span>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-file-earmark-bar-graph"></i>
                <span>Relatórios</span>
              </a>
              <span class="tooltip">Relátórios</span>
            </li>
            <li>
              <a href="">
                <i class="bi bi-percent"></i>
                <span>Promoções</span>
              </a>
              <span class="tooltip">Promoções</span>
            </li>
          </ul>
          <div class="profileContent">
            <div class="profile">
              <div class="profileDetails">
                <img src="./profile.jpg" alt="Mateus"/>
                <div class="name_job">
                  <div class="name">Mateus Borges</div>
                  <div class="job">Desenvolvedor</div>
                </div>
              </div>
              <i class="bi bi-box-arrow-left" id="logout"></i>
            </div>
          </div>        
      </nav>
    </>
  )
}
