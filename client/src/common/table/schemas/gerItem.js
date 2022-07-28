export const gerItemTableSchema = [
  { Header: "Editar",
  },
  { Header: "Nome",
    accessor: "nome",
    className: "nome"
  },
  { Header: "Senacoins",
    accessor: "pontos",
    className: "senacoins"
  },
  { Header: "Subcategoria",
    accessor: "id_subcategoria.nome",
    className: "senacoins"
  },
  { Header: "Area",
    accessor: "id_area.nome",
    className: "senacoins"
  },
  { Header: "Categoria",
    accessor: "id_categoria.nome",
    className: "categoria"
  },
  { Header: "Status",
    accessor: "id_status.nome"
  }
]