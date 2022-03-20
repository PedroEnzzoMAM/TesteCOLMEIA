const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const starefa = document.querySelector('#m-tarefa')
const sdescrição = document.querySelector('#m-descrição')
const sdata = document.querySelector('#m-data')
const buttonSalvar = document.querySelector('#buttonSalvar')
const url = "https://jsonplaceholder.typicode.com/todos"

let itens
let id

fetch(url)
  .then((response) => response.json())
  .then((json) => console.log(json));

function openModal(edit = false, index = 0) {
  
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title: '',
      body: '',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    starefa.value = itens[index].tarefa
    sdescrição.value = itens[index].descrição
    sdata.value = itens[index].data
    id = index
  } else {
    starefa.value = ''
    sdescrição.value = ''
    sdata.value = ''
  }

}

function editItem(index) {

  openModal(true, index)
  fetch(`${url}/`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: '',
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  
}

function deleteItem(index) {
  fetch(`${url}/`, {
    method: 'DELETE',
  });
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title: '',
      body: '',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.tarefa}</td>
    <td>${item.descrição}</td>
    <td>${item.data}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

buttonSalvar.onclick = e => {
  
  if (starefa.value == '' || sdescrição.value == '' || sdata.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].tarefa = starefa.value
    itens[id].descrição = sdescrição.value
    itens[id].data = sdata.value
  } else {
    itens.push({'tarefa': starefa.value, 'descrição': sdescrição.value, 'data': sdata.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()