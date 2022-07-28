import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

function unidadesPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    const reportTitle = [
        {
            text: 'Unidades',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45]
        }
    ]

    const details = [
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*'],
                body: [
                    [
                        {text: 'Nome', style: 'tableHeader', fontSize: 12},                        
                        {text: 'Cidade', style: 'tableHeader', fontSize: 12},
                        {text: 'Endereço', style: 'tableHeader', fontSize: 12 }
                    ],
                    [
                        {text: 'Senac Hub Academy', fontSize: 12},
                        {text: 'Campo Grande', fontSize: 12},
                        {text: 'Rua do Parque', fontSize: 12},
                    ]                    
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

export default unidadesPDF