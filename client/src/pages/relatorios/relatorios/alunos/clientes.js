import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdf/build/vsf_fonts'

function clientesPDF(clientes) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;    
}

export default clientesPDF