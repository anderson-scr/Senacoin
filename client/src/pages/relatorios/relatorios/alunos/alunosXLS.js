
const xl = require('excel4node')
const wb = xl.Workbook()
const ws = wb.addWorksheet('Planilha_Teste')

function testeXLXS() {

    const data = [
        {
            'name': 'Nome Teste',
            'email': 'teste@mail.com',
            'telefone': '67999999999'
        },
        {
            'name': 'Nome Teste2',
            'email': 'teste@mail.com',
            'telefone': '67999999999'
        },
        {
            'name': 'Nome Teste3',
            'email': 'teste@mail.com',
            'telefone': '67999999999'
        }
    ]
    
    const headColumnNames = [
        'nome',
        'email',
        'telefone'
    ]
    
    let contHead = 1
    headColumnNames.forEach(heading => {
        ws.cell(1, headColumnNames++).string(heading)
    })
    
    let rowIndex = 2
    data.forEach(record => {
        let columnIndex = 1
        Object.keys(record).forEach(columnName => {
            ws.cell(rowIndex, columnIndex++).string(record[columnName])
        })
        rowIndex++
    })
    
    wb.write('Teste.xlxs')
    
}

export default testeXLXS