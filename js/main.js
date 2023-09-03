let botonA = document.getElementById("botonAceptar");
botonA.addEventListener("click", edadMay);
function edadMay(event){
    event.preventDefault();
    let edad = document.getElementById("edad").value;
    let age = parseInt(edad);
    if (age <= 0){
        Swal.fire({
            icon: 'error',
            text: 'Ingrese una Edad Valida',
        })
        edadMay()
    }else if (age >= 18){
        Swal.fire('BIENVENIDO SELECCIONA LA CERVEZA DE TU GUSTO')
        comprar()
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sos menor de edad NO! podes comprar',
            })
        return
    }
}  

const beerCarrito = document.getElementById("carrito");
const modalContainer = document.getElementById("modal-container"); 

let carritoCliente=[];

function comprar(){
    fetch("data.json")
        .then(response =>response.json())
        .then(data => {
            const cerves = data.cerves;

            const birraContainer = document.getElementById("cerves-container");
            birraContainer.classList.add("cerves");

            cerves.forEach(birra => {
                const birraElement = document.createElement('div');
                birraElement.classList.add("card-product", "card-body");
                birraElement.innerHTML=`
                <img src="${birra.img}">
                <h2>${birra.sabor}</h2>
                <h3>${birra.presentacion}</h3>
                <p class="price">$ ${birra.precio}</p>
                `;
                birraContainer.appendChild(birraElement); 

                let comprar = document.createElement("button")
                comprar.innerText = "Comprar";
                comprar.className = "btn-comprar"
                birraElement.append(comprar);

                comprar.addEventListener("click",() =>{
                    carritoCliente.push({
                        sabor: birra.sabor,
                        present: birra.presentacion,
                        precio: birra.precio,
                    })
                    console.log(carritoCliente);
                    beerCarritoJson()
                })
            });
            beerCarrito.addEventListener("click", () =>{
                modalContainer.innerHTML = "";
                modalContainer.style.display = "flex";
                const modalHeader = document.createElement("div");
                modalHeader.className = "modal-header"
                modalHeader.innerHTML = `
                <h2 class="">Tu Beer Carrito</h2>
                `;
                modalContainer.append(modalHeader);

                const modalbutton = document.createElement("h4");
                modalbutton.innerText = "X";
                modalbutton.className = "modal-header-button";

                modalbutton.addEventListener("click", ()=> {
                    modalContainer.style.display = "none";

                })



                modalHeader.append(modalbutton);
                
                const carritoDesdeJson = JSON.parse(sessionStorage.getItem("carritodata"));
                carritoDesdeJson.forEach (beer =>{
                    let carritoContent = document.createElement("div");
                    carritoContent.className = "modal-carrito";
                    carritoContent.innerHTML = `
                        <h2>${beer.sabor}</h2>
                        <h3>${beer.present}</h3>
                        <p class="price">$ ${beer.precio}</p>
                    `;
                    modalContainer.append(carritoContent)
                })
                const total = carritoDesdeJson.reduce((acc, el)=>acc + el.precio, 0);
                const totalCompra = document.createElement("div")
                totalCompra.className = "totalcompra"
                totalCompra.innerHTML = `El Total de Tu Compra Es $ ${total}`;
                modalContainer.append(totalCompra);
            })
        })
        .catch(error => {
            console.error("Ha ocurrido un error", error);
        });
}    

    function beerCarritoJson(){
        const carritoJSON=JSON.stringify(carritoCliente)
        sessionStorage.setItem("carritodata",carritoJSON)
    }












