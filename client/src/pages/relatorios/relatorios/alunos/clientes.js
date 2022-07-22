import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdf/build/vsf_fonts'

function clientesPDF(clientes) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const reportTitle = []
    const details = []
    const rodape = []
    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        header: [reportTitle],
        content: [details],
        footer: [rodape],

    }

    pdfMake.createPdf(docDefinitions).download()
}

export default clientesPDF