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
                widths: ['*', 55, '*', '*'],
                body: [
                    [
                        {text: 'Nome', style: 'tableHeader', fontSize: 12},
                        {text: 'Matrícula', style: 'tableHeader', fontSize: 12},
                        {text: 'Unidade', style: 'tableHeader', fontSize: 12},
                        {text: 'Email', style: 'tableHeader', fontSize: 12 }
                    ],
                    [
                        {text: 'Joãozinho Games', fontSize: 10},
                        {text: '000001', fontSize: 10},
                        {text: 'Hub Academy', fontSize: 10},
                        {text: 'joaozinho@games.com', fontSize: 10},
                    ],
                    [
                        {text: 'Atrobaldo', fontSize: 10},
                        {text: '000002', fontSize: 10},
                        {text: 'Hub Academy', fontSize: 10},
                        {text: 'astrobaldo.astronalta@mail.com', fontSize: 10},
                    ],
                    [
                        {text: 'Michael Jackson', fontSize: 10},
                        {text: '000003', fontSize: 10},
                        {text: 'Hub Academy', fontSize: 10},
                        {text: 'billie_jean@husbe.com', fontSize: 10},
                    ],
                    [
                        {text: 'Michael Jackson Jubilei Jubileu Jubileu', fontSize: 10},
                        {text: '000003', fontSize: 10},
                        {text: 'Hub Academy', fontSize: 10},
                        {text: 'billie_jean@husbe.com', fontSize: 10},
                    ],
                    [
                        {text: 'Michael Jackson', fontSize: 10},
                        {text: '000003', fontSize: 10},
                        {text: 'Hub Academy', fontSize: 10},
                        {text: 'billie_jean@husbe.com', fontSize: 10},
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

export default clientesPDF