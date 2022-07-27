export const routes = {
  colaborador: {
    login: 'colaborador/login',
    novo: 'colaborador/register',
    ativo: 'colaborador/active',
    todos: 'colaborador/all'
  },

  unidade: {
    novo: 'unidade/add',
    ativo: 'unidade/active',
    todos: 'unidade/all'
  },

  area: {
    novo: "area/add",
    ativo: "area/active",
    todos: "area/all"
  },

  perfil: {
    novo: 'perfil/add',
    ativo: 'perfil/active',
    todos: 'perfil/all'
  },

  subcategoria: {
    novo: 'subcategoria/add',
    ativo: 'subcategoria/active',
    todos: 'subcategoria/all'
  },
  
  items: {
    todos: 'item/all/',
    ativo: 'item/active/'
  },

  produto: {
    novo: /* Id antes */ 'item/produto/add',
    ativo: /* Id antes */ 'item/produto/active',
    todos: /* Id antes */ 'item/produto/all'
  },
  
  evento: {
    novo: /* Id antes */ 'item/evento/add',
    ativo: /* Id antes */ 'item/evento/active',
    todos: /* Id antes */ 'item/evento/all'
  },
  
  servico: {
    novo: /* Id antes */ 'item/servico/add',
    ativo: /* Id antes */ 'item/servico/active',
    todos: /* Id antes */ 'item/servico/all'
  },

  qrcode: {
    novo: 'qrcode/add',
    ativo: 'qrcode/active',
    todos: 'qrcode/all'
  }
}