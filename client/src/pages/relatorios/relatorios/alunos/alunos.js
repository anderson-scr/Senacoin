import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { useState } from "react";
import { useEffect } from "react";

function alunosPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const reportTitle = [
        {
            text: 'Alunos',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45]
        }
    ]

    const [students, setStudents] = useState([])

    useEffect(() => {
      async function getAllStudents() {
        const response = await 
        setStudents(response.data)
      }
      getAllStudents()
    })

    const register = students.map((student) => {
        return(
          [
            {text: student.nome, fontSize: 10, margin: [0, 2, 0, 2]},
            {text: student.matricula, fontSize: 10, margin: [0, 2, 0, 2]},
            {text: student.unidade, fontSize: 10, margin: [0, 2, 0, 2]},
            {text: student.unidade, fontSize: 10, margin: [0, 2, 0, 2]},
          ]
        )
      })

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
                    ...register
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

export default alunosPDF