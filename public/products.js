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
                    return document.querySelector("#messageAgregar").innerHTML= `
                        <br>
                        <div class="alert alert-danger" role="alert">
                        ${data.mensaje}
                        </div>
                    `;
                }

                document.querySelector("#messageAgregar").innerHTML= `
                <br>
                <div class="alert alert-primary" role="alert">
                  ${data.mensaje}
                </div>
                `;                
                
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
                    return document.querySelector("#messageAgregar").innerHTML= `
                        <br>
                        <div class="alert alert-danger" role="alert">
                        ${data.mensaje}
                        </div>
                    `;
                }

                if(data.rows.affectedRows == 0){
                    return document.querySelector("#messageAgregar").innerHTML= `
                        <br>
                        <div class="alert alert-danger" role="alert">
                            No existe esa id del producto
                        </div>
                    `;
                }    

                document.querySelector("#messageAgregar").innerHTML= `
                <br>
                <div class="alert alert-primary" role="alert">
                  ${data.mensaje}
                </div>
                `;                
                
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
                    return document.querySelector("#messageAgregar").innerHTML= `
                        <br>
                        <div class="alert alert-danger" role="alert">
                        ${data.mensaje}
                        </div>
                    `;
                }

                if(data.rows.affectedRows == 0){
                    return document.querySelector("#messageAgregar").innerHTML= `
                        <br>
                        <div class="alert alert-danger" role="alert">
                            No existe esa id del producto
                        </div>
                    `;
                }                

                document.querySelector("#messageAgregar").innerHTML= `
                <br>
                <div class="alert alert-primary" role="alert">
                  ${data.mensaje}
                </div>
                `;                
                
            })
            .catch(err => console.log(err));
}
