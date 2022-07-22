import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function clientesPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const reportTitle = [
        {
            text: 'Alunos',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45]
        }
    ]
    const details = [
        {
            table: {
                headerRows: 1,
                width: ['*', '*', '*', '*'],
                body: [
                    [
                        {text: 'Nome', style: 'tableHeader', fontSize: 10},
                        {text: 'Matrícula', style: 'tableHeader', fontSize: 10},
                        {text: 'Unidade', style: 'tableHeader', fontSize: 10},
                        {text: 'Email', style: 'tableHeader', fontSize: 10 }
                    ],
                    [
                        {text: 'Joãozinho Games', fontSize: 8},
                        {text: '000001', fontSize: 8},
                        {text: 'Hub Academy', fontSize: 8},
                        {text: 'Mateus', fontSize: 8},
                    ]
                ]
            },
            layout: 'headerLineOnly'
        }
    ]
    // const rodape = []

    function Rodape(currentPage, pageCount) {
        return(
            {
                text: `${currentPage} / ${pageCount}`,
                fontSize: 9,
                aligment: 'right',
                bold: true,
                margin: [0, 10, 20, 0]
            }
        )
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [reportTitle],
        content: [details],
        footer: Rodape,

    }
    pdfMake.createPdf(docDefinitions).download()
}

export default clientesPDF