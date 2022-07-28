import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function alunosPDF() {

    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const reportTitle = [
        {
            text: 'Aluno',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45]
        }
    ]

    const details = [
        {
            table: {
                headerRows: 1,
                widths: ['*', 55, '*', '*'],
                body: [
                    [
                        {text: 'Nome', style: 'tableHeader', fontSize: 12},
                        {text: 'Matrícula', style: 'tableHeader', fontSize: 12},
                        {text: 'Unidade', style: 'tableHeader', fontSize: 12},
                        {text: 'Email', style: 'tableHeader', fontSize: 12 }
                    ],
                    [
                        {text: 'Mateus', fontSize: 12},
                        {text: '000001', fontSize: 12},
                        {text: 'Hub Academy', fontSize: 12},
                        {text: 'teste@mail.com', fontSize: 12 }
                    ],
                    [
                        {text: 'Mateus', fontSize: 12},
                        {text: '000001', fontSize: 12},
                        {text: 'Hub Academy', fontSize: 12},
                        {text: 'teste@mail.com', fontSize: 12 }
                    ],
                    [
                        {text: 'Mateus', fontSize: 12},
                        {text: '000001', fontSize: 12},
                        {text: 'Hub Academy', fontSize: 12},
                        {text: 'teste@mail.com', fontSize: 12 }
                    ],
                    [
                        {text: 'Mateus', fontSize: 12},
                        {text: '000001', fontSize: 12},
                        {text: 'Hub Academy', fontSize: 12},
                        {text: 'teste@mail.com', fontSize: 12 }
                    ],
                    [
                        {text: 'Mateus', fontSize: 12},
                        {text: '000001', fontSize: 12},
                        {text: 'Hub Academy', fontSize: 12},
                        {text: 'teste@mail.com', fontSize: 12 }
                    ],
                    [
                        {text: 'Mateus', fontSize: 12},
                        {text: '000001', fontSize: 12},
                        {text: 'Hub Academy', fontSize: 12},
                        {text: 'teste@mail.com', fontSize: 12 }
                    ],
                    
                ]
            },
            layout: 'headerLineOnly'
        }
    ]   

    function Rodape(currentPage, pageCount) {
        return(
            {
                text: `${currentPage} / ${pageCount}`,
                fontSize: 12,
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

export default alunosPDF