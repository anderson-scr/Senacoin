import XLSX from 'xlsx'

const mockData = [
    {Nome: 'Mateus', Matricula: '000001', Unidade: 'Senac Hub Academy', Email: 'mateus@mail.com'},
    {Nome: 'Leandro', Matricula: '000002', Unidade: 'Senac Hub Academy', Email: 'leandro@mail.com'},
    {Nome: 'Odair', Matricula: '000003', Unidade: 'Senac Hub Academy', Email: 'odair@mail.com'},
    {Nome: 'Gaikko', Matricula: '000004', Unidade: 'Senac Hub Academy', Email: 'gaikko@mail.com'},
    {Nome: 'Pedro', Matricula: '000005', Unidade: 'Senac Hub Academy', Email: 'pedro@mail.com'},
]

function geraXLSX() {
    // console.log(mockData)
    let wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(mockData)
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1')
    XLSX.writeFile(wb, 'Retatório.xlsx')
}

export default geraXLSX
// export default mockData