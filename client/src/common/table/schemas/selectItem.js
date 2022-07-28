export const selectItemTableSchema = [
  { Header: "Nome",
    accessor: "nome",
    className: "nome"
  },
  { Header: "Senacoins",
    accessor: "pontos",
    className: "senacoins"
  },
  {
    Header: "Categoria",
    accessor: "id_categoria.nome",
    className: "categoria"
  },
  {
    Header: "Subcategoria",
    accessor: "id_subcategoria.nome",
    className: "subcategoria"
  }
]