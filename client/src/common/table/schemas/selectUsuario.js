export const selectUsuarioTabelaSchema = [
  { Header: "Nome",
    accessor: "nome",
    className: "nome"
  },
  { Header: "CPF",
    accessor: "cpf",
    className: "senacoins"
  },
  {
    Header: "Matricula",
    accessor: "matricula"
  },
  {
    Header: "Unidade(s)",
    accessor: "id_unidade[0].nome",
    className: "categoria"
  },
  {
    Header: "Status",
    accessor: "id_status.nome",
    className: "categoria"
  }
]