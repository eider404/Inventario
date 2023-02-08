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

    fetch( `http://localhost:3000/product/${obj.idProduct}`, {
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

                document.querySelector("#messageAgregar").innerHTML= `
                <br>
                <div class="alert alert-primary" role="alert">
                  ${data.mensaje}
                </div>
                `;                
                
            })
            .catch(err => console.log(err));
}
