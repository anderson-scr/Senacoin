export const gerQrcodeTableSchema = [
  { Header: "Editar",
  },
  { Header: "Descrição",
    accessor: "descricao"
  },
  { Header: "Unidade",
    accessor: "id_unidade[0].nome"
  },
  { Header: "Status",
    accessor: "id_status.nome"
  },
]