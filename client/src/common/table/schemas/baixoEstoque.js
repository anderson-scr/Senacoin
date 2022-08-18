export const baixoEstoqueTableSchema = [
  { Header: "Nome",
    accessor: "nome",
    className: "nome"
  },
  { Header: "Senacoins",
    accessor: "pontos",
    className: "senacoins"
  },
  { Header: 'Quantidade',
    accessor: 'quantidade',
    className: 'Quantidade'
  },
  { Header: "Categoria",
    accessor: "id_categoria.nome",
    className: "categoria"
  }
]