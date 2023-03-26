// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Al presionar 'Agregar al carrito'
  listaCursos.addEventListener('click', agregarCurso);

  // Elimina elementos del carrito
  carrito.addEventListener('click', eliminarCurso);

  document.addEventListener('DOMContentLoaded', () => {
    console.log(JSON.parse(localStorage.getItem('carrito')));
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHTML();
  })

  // Vaciar todo el carrito
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];
    limpiarHTML();
  });

}


///////// FUNCIONES ///////////
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
    carritoHTML();
  }

}

// Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');

    // Elimina del arreglo de articulos usando el data-id
    articulosCarrito = articulosCarrito.filter( curso => curso.id !==cursoId);
    carritoHTML(); //refresca el carrito

  }
}

// Leer datos del curso seleccionado
function leerDatosCurso(curso) {
  console.log(curso);

  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  // Comprovar si el elemento ya existe en el carrito
  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
  if (existe) {
    // Actualizar la cantidad
    const cursos = articulosCarrito.map(curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; //retorna el objeto actualizado
      } else {
        return curso;// retorna los objetos sin duplicados
      }
    });
    
  }else {
  // Agregar elementos al arreglo carrito
  articulosCarrito = [...articulosCarrito, infoCurso];
  }

}

// Agrega el elemento html al carrito
function carritoHTML() {

  limpiarHTML();
  
  articulosCarrito.forEach( curso => {
    const {imagen, titulo, precio, cantidad, id} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
    `;

    contenedorCarrito.appendChild(row);
  })

  sincronizarStorage();
}

function sincronizarStorage(){
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Limpia el arreglo
function limpiarHTML() {
  //forma lenta
  // contenedorCarrito.innerHTML = '';

  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}