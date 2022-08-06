//querySelector - retorna o primeiro element dentro do documento que corresponde
//                ao seletor ou grupo de seletores.
//       Se nenhuma correspondência, retorna NULL
const texto = document.querySelector('input')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

var itensDB = []

//onclick - atributo especifica algum script a ser executado quando 
//          o elemento é clicado.

btnDeleteAll.onclick = () => {
  itensDB = []
  updateDB()
}
//addEventListener - método da Event Target interface configura uma função
//                   que será chamada sempre que o evento especificado for entregue
//                   ao destino.
//                   addEventListener(type, listener)
texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
})

btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
}

function setItemDB() {
  if (itensDB.length >= 20) {
    alert('Limite máximo de 20 itens atingido!')
    return
  }

  itensDB.push({ 'item': texto.value, 'status': '' })
  updateDB()
}

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i)
  })
}
//createElement - método cria o elemento HTML especificado por tagName
//                ou HTMLUnknownElement se tagName não for reconhecido.
//                createElement(tagName, options)
//appendChild - método da Node intarface adiciona um nó ao final da lista
//              de filhos de um nó pai especificado.
function insertItemTela(text, status, i) {
  const li = document.createElement('li')
  
  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li)

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  }

  texto.value = ''
}
//.status - propriedade somente leitura da Response interface contém os 
//          códigos de status HTTP da resposta.
function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked' 
  } else {
    itensDB[i].status = '' 
  }

  updateDB()
}
//splice - método alerta o conteúdo de um array removendo ou substituindo elementos
//         existentes e/ou adicionando novos elementos no local. Para acessar parte 
//         de uma matriz sem modificá-la, consulte slice().
//         splice (start, deleteCount)
function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}

loadItens()