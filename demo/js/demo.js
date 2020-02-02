import 'quill/dist/quill.snow.css'
import QuillBetterTable from 'src/quill-better-table'

window.onload = () => {
  const quill = new Quill('#editor-wrapper', {
    theme: 'snow',
    readOnly: false,
    modules: {
      table: true
    }
  })

  let tableModule = quill.getModule('table')
  document.body.querySelector('#insert-table')
    .onclick = () => {
      tableModule.insertTable(3, 3)
    }

  document.body.querySelector('#get-table')
    .onclick = () => {
      console.log(tableModule.getTable())
    }

  document.body.querySelector('#get-contents')
    .onclick = () => {
      console.log(quill.getContents())
    }
}
