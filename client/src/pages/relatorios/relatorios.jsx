import React from 'react'

const Relatorios = () => {
  return (
    <div>
      <h3>
        O que falta faze:
      </h3>
      <ul>
        <li>Tela de relatorio, obviamente</li>
        <li>Back ja ta verificando email duplicado no cadastro, falta muda a msg pro usario</li>
        <li>Responsividade em alguns lugares</li>
        <li><b>[IN PROGRESS]</b> Adaptar os modais de edicao por causa do erro de nao permitir dois componentes do mesmo tipo buildado ao mesmo tempo</li>
        <li>Disparar email com senha nova</li>
        <li>O filtro de tabela precisa de um botao para limpar os drops. E tbm os drops tem que combinar com a search bar</li>
        <hr />
        <li>Aplicar a logica de valores de proporcao no senacoin. </li>
        <li>Depois da logica, avisar o valor que o item vai ter na hora de cadastrar</li>
        <hr />
        <li><b>[DONE]</b> Trocar a rota da Dashboard de baixo estoque para qrcodes mais proximos de vencer</li>
        <li>Formata a data na tabela</li>
        <li>Finalizar a rota para preencher o calendario com as datas de vencimento</li>
        <hr />
        <li><b>[DONE]</b> Mudar o gitignore para nao deixar de upar a pasta uploads do back. Por causa disso ta quebrando os cads com imgs.</li>
      </ul>
    </div>
  )
}

export default Relatorios