const alertPrimary = (data)=> document.querySelector("#messageAgregar").innerHTML= `
        <br>
        <div class="alert alert-primary" role="alert">
            ${data.mensaje}
        </div>
`;

const alertDanger = (data)=> document.querySelector("#messageAgregar").innerHTML= `
        <br>
        <div class="alert alert-danger" role="alert">
            ${data.mensaje}
        </div>
`;


const alertNoQuery = ()=> document.querySelector("#messageAgregar").innerHTML= `
    <br>
    <div class="alert alert-danger" role="alert">
        No existe esa id del producto
    </div>
`;



function Agregar(){
    let agregarForm = document.querySelector( '#agregarForm' )

    const obj = {}
    new FormData( agregarForm ).forEach( ( value, key ) => obj[ key ] = value )

    fetch( `http://localhost:3000/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify( obj )
            })
            .then(res => res.json())
            .then( data =>{
                if(data.status == 401){
                    return alertDanger(data);
                }

                alertPrimary(data);                
                
            })
            .catch(err => console.log(err));
}


function Actualizar(){
    let actualizarForm = document.querySelector( '#actualizarForm' )

    const obj = {}
    new FormData( actualizarForm ).forEach( ( value, key ) => obj[ key ] = value )

    fetch( `http://localhost:3000/product`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify( obj )
            })
            .then(res => res.json())
            .then( data =>{
                if(data.status == 401){
                    return alertDanger(data);
                }

                if(data.rows.affectedRows == 0){
                    return alertNoQuery();
                }    

                alertPrimary(data);                
                
            })
            .catch(err => console.log(err));
}

function Eliminar(){
    let eliminarForm = document.querySelector( '#eliminarForm' )

    const obj = {}
    new FormData( eliminarForm ).forEach( ( value, key ) => obj[ key ] = value )

    fetch( `http://localhost:3000/product`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify( obj )
            })
            .then(res => res.json())
            .then( data =>{
                if(data.status == 401){
                    return alertDanger(data);
                }

                if(data.rows.affectedRows == 0){
                    return alertNoQuery()
                }                

                alertPrimary(data);                
                
            })
            .catch(err => console.log(err));
}
