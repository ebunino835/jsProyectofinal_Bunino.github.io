// Declaro la clase
// la idea respecto al practico a sido la misma desde el principio pero no en su integridad. 
class Persona{
    constructor(apellido, nombre, dni){
        this.apellido = apellido;
        this.nombre = nombre;
        this.dni = dni;
        this.carrera = 0;
        this.duracion = 0;
        this.posicion= -1;
        this.observacion="";
    }
}


// Declaro una clase menú, que para el final quiero transformar en una navbar. Por lo pronto creo que funciona 
class Menu{
    constructor(id, nombre){
        this.id = id,
        this.nombre = nombre
    }
}

// Distintas opciones del menu
const opcion1 = new Menu(1, "Registrar Persona")
const opcion2 = new Menu(2, "Mostrar Personas")
const opcion3 = new Menu(3, "Registrar Carrera")
const opcion4 = new Menu(4, "Eliminar Persona")
const opcion5 = new Menu(5, "Limpiar Pantalla")

// Arreglo que contiene todas las opciones de menú
const MENUS = [opcion1, opcion2, opcion3, opcion4, opcion5]


// Funcion que como su nombre lo indica renderiza el menu
function renderizarMenu(menuAMostrar){
    const cardMenu = document.getElementById("cardMenu")
    menuAMostrar.forEach((opcion =>{
        let divCar = document.createElement("div")
        divCar.id = opcion.id
        divCar.innerHTML = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${opcion.nombre}</h5>
                <input type="button" class="btn btn-primary" value="Ingresar" onclick="cargarMenu(${opcion.id})">
            </div>
        </div>    
            
        `
        cardMenu.append(divCar)
    }))
}

// Funcion que realiza lo que en el menú se seleccione
function cargarMenu(opcion){
    if(opcion == 1){
        const divCarrera = document.getElementById("divCarga")
        divCarrera.innerHTML = `
            <form id="cargadorPersona">
                <h4>Cargando Persona</h4>
                <input type="text" id="apellido" placeholder="Apellido">
                <input type="text" id="nombre" placeholder="Nombre">
                <input type="text" id="dni" placeholder="Nº DNI">
                <input type="submit" value="Cargar Datos">
            </form>
        `
        document.getElementById("cargadorPersona").addEventListener("submit", (e)=>{
            e.preventDefault()
            let infoEvent = e.target
            let apellido = infoEvent.querySelector('#apellido')
            apellido = apellido.value
            let nombre = infoEvent.querySelector('#nombre')
            nombre = nombre.value
            let dni = infoEvent.querySelector('#dni')
            dni = dni.value

            let persona = new Persona(apellido, nombre, dni)
            personasLS.push(persona)
            Toastify({
                text: "Registro Exitoso!",
                duration: 3000,
                gravity: "top", 
                position: "left", 
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            lStorage("Persona", JSON.stringify(personasLS))
    
            divCarga.innerHTML=``

        } )
    }
    if(opcion == 2){
        if(personasLS.length > 0){
            renderizarPersona(personasLS)
        }else{
            /* const divCarga = document.getElementById("divCarga")
            divCarga.innerHTML = `<h3>NO EXISTEN ELEMENTOS PARA MOSTRAR</h3>` */
            swal.fire({
                icon: 'error',
                text: 'No existen personas cargadas',
                timer: 2000,
                showConfirmButton: false
            })
        }

    }
    if(opcion == 3){
        if(personasLS.length > 0){
            const divMuestra = document.getElementById("divMuestra")
            personasLS.forEach((persona =>{
                if(persona.carrera == 0){
                    let divCar = document.createElement("div")
                    divCar.id = persona.dni
                    divCar.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${persona.apellido} ${persona.nombre}</h5>
                                <p class="card-text">DNI: ${persona.dni}</p>
                                <input type="button" class="btn btn-primary" value="Cargar Carrera" onclick="cargarCarrera(${persona.dni})">
                            </div>
                        </div>    
                        `
                        divMuestra.append(divCar)
                        
                }  
            }))
        }else{
            /* const divCarga = document.getElementById("divCarga")
            divCarga.innerHTML = `<h3>NO EXISTEN PERSONAS A QUIENES REGISTRARLE CARRERA</h3>` */
            swal.fire({
                icon: 'error',
                text: 'No existen personas cargadas',
                timer: 2000,
                showConfirmButton: false
            })
        }
    }
    if(opcion == 4){
        if(personasLS.length > 0){
            const divCarga = document.getElementById("divCarga")
            divCarga.innerHTML = ``
            divCarga.innerHTML = `
                    <form id="eliminarPersona">
                        <h4>Persona a Eliminar</h4>
                        <input type="text" id="dni" placeholder="DNI a Eliminar">
                        <input type="submit" value="Eliminar">
                    </form>
                `
                document.getElementById("eliminarPersona").addEventListener("submit", (e)=>{
                    e.preventDefault()
                    let infoEvent = e.target
                    let dni = infoEvent.querySelector('#dni')
                    dni = parseInt(dni.value)
                    let cont = 0
                    while (dni != personasLS[cont].dni){
                        cont = cont + 1
                    } 
                    while(cont < (personasLS.length - 1)){
                        personasLS[cont].nombre=personasLS[cont+1].nombre;
                        personasLS[cont].apellido=personasLS[cont+1].apellido;
                        personasLS[cont].dni=personasLS[cont+1].dni;
                        personasLS[cont].carrera=personasLS[cont+1].carrera;
                        personasLS[cont].duracion=personasLS[cont+1].duracion;
                        personasLS[cont].posicion=personasLS[cont+1].posicion;
                        personasLS[cont].observacion=personasLS[cont+1].observacion;
                        cont = cont + 1
                    }
                    personasLS.pop()
                    swal.fire({
                        icon: 'success',
                        text: 'Registro Eliminado!!',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    lStorage("Persona", JSON.stringify(personasLS))

                    divCarga.innerHTML=``
                } )
        }else{
            /* const divCarga = document.getElementById("divCarga")
            divCarga.innerHTML = `<h3>NO EXISTEN ELEMENTOS A ELIMINAR</h3>` */
            swal.fire({
                icon: 'error',
                text: 'No existen personas a eliminar',
                timer: 2000,
                showConfirmButton: false
            })
        }
    }
    
    if (opcion == 5){
        const divCarga = document.getElementById("divCarga")
        const divMuestra = document.getElementById("divMuestra")
        divCarga.innerHTML = ``
        divMuestra.innerHTML = ``
    }
}

// Funcion que "efectivamente" muestra las personas cargadas, si tiene una carrera cargada muestra la misma y su tiempo, caso contrario muestra un 
// botton para cargar la misma (Esta funcion muestra todo, a quienes tienen y no, carreras cargadas)
function renderizarPersona(personasAMostrar){
    const divMuestra = document.getElementById("divMuestra")
    personasAMostrar.forEach((persona =>{
        if(persona.carrera == 0){
            let divCar = document.createElement("div")
            divCar.id = persona.dni
            divCar.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${persona.apellido} ${persona.nombre}</h5>
                        <p class="card-text">DNI: ${persona.dni}</p>
                        <input type="button" class="btn btn-primary" value="Cargar Carrera" onclick="cargarCarrera(${persona.dni})">
                    </div>
                </div>    
                `
                divMuestra.append(divCar)
        }else{
            let tiempo = persona.duracion
            let horas = 0
            let minutos = 0
            while( tiempo  > 60){
                horas = horas + 1
                tiempo = tiempo - 60
            }
            minutos = tiempo
            let divCar = document.createElement("div")
            divCar.id = persona.dni
            divCar.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${persona.apellido} ${persona.nombre}</h5>
                        <p class="card-text">DNI: ${persona.dni}</p>
                        <p class="card-text">Carrera: ${persona.carrera}</p>
                        <p class="card-text">Realizado en : ${horas} hs y ${minutos} minutos</p>
                    </div>
                </div>    
                `
                divMuestra.append(divCar)
        }
        
        
    }))
}
// En este caso solo muestra las personas que no tienen carrera cargada, para que se realice la carga de la correspondiente carrera
function cargarCarrera(dni){
    let corredorSeleccionado = personasLS.find(e => e.dni == dni)
    if(corredorSeleccionado.carrera != NaN){
        const divCarga = document.getElementById("divCarga")
        const divMuestra = document.getElementById("divMuestra")
        divMuestra.innerHTML=``
        divCarga.innerHTML = `
            <form id="cargadorCarrera">
                <h4>Cargando Carrera a ${corredorSeleccionado.apellido} ${corredorSeleccionado.nombre}</h4>
                <input type="number" id="carreranro" placeholder="1 - 10">
                <input type="number" id="horas" placeholder="Horas">
                <input type="number" id="minutos" placeholder="Minutos">
                <input type="submit" value="Cargar Tiempo">
            </form>
        `
        document.getElementById("cargadorCarrera").addEventListener("submit", (e)=>{
            e.preventDefault()
            let infoEvent = e.target
            let nroCarrera = infoEvent.querySelector('#carreranro')
            nroCarrera = carreranro.value
            let nrohoras = infoEvent.querySelector('#horas')
            nrohoras = parseInt(horas.value)
            let nrominutos = infoEvent.querySelector('#minutos')
            nrominutos = parseInt(minutos.value)
    
            let tiempo = (nrohoras * 60) + nrominutos
            corredorSeleccionado.carrera = nroCarrera 
            corredorSeleccionado.duracion = tiempo
            Toastify({
                text: "Carrera Cargada!!",
                duration: 3000,
                gravity: "top", 
                position: "left", 
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
            lStorage("Persona", JSON.stringify(personasLS))
            divCarga.innerHTML=``
    
        } )
    }
}

// Funcion que guarda la info en el local Storage
function lStorage (clave, valor){
    localStorage.setItem(clave, valor)
}


let personasLS = JSON.parse(localStorage.getItem("Persona"))
const PERSONAS = []

document.addEventListener("DOMContentLoaded", ()=>{
    if(!personasLS){
        personasLS = PERSONAS
    } 
    renderizarMenu(MENUS)
})