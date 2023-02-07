function GetProducts(){
    fetch( `http://localhost:3000/product`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then( data =>{
            generarTabla(data);
        })
        .catch(err => console.log(err));
}
function generarTabla(data){
    for(let valor of data){
        document.querySelector("#tabla-products").innerHTML += `
            <tr>
                <th scope="row">${valor.idProduct}</th>
                <td>${valor.name}</td>
                <td>${valor.count}</td>
                <td>${valor.value}</td>
                <td>${valor.userId_fk}</td>
            </tr>
            
        `
    } 
}



function Register(){
    let registerForm = document.querySelector( '#registerForm' )

    const obj = {}
    new FormData( registerForm ).forEach( ( value, key ) => obj[ key ] = value )
    fetch( `http://localhost:3000/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( obj )
            })
            .then(res => res.json())
            .then( data =>{
                if(data.status == 401){
                    return document.querySelector("#message").innerHTML= `
                        <br>
                        <div class="alert alert-danger" role="alert">
                        ${data.mensaje}
                        </div>
                    `;
                }

                document.querySelector("#message").innerHTML= `
                <br>
                <div class="alert alert-primary" role="alert">
                  ${data.mensaje}
                </div>
                `; 
                
                localStorage.setItem('token', data.token)
                
            })
            .catch(err => console.log(err));
}


/* Register() */