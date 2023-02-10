let valorAnterior = [];
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
    //if(data.length != valorAnterior.length){
        let token = localStorage.getItem('token')
        if((token.length > 149) && (token)){
            document.querySelector('#mensajeLogueo').innerHTML = `
            <div class="alert alert-dark" role="alert" style="padding: 5px; margin: 0px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                </svg>
                Usuario Logueado
            </div>
            `
        }

        document.querySelector("#tabla-products").innerHTML= '';

        for(let valor of data){
            document.querySelector("#tabla-products").innerHTML += `
                <tr>
                    <th scope="row">${valor.idProduct}</th>
                    <td>${valor.name}</td>
                    <td>${valor.count}</td>
                    <td>${valor.value}</td>
                    <td>${valor.username}</td>
                </tr>
                
            `
        }

     //   valorAnterior = data;
    //}
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
                    return document.querySelector("#messageRegister").innerHTML= `
                        <br>
                        <div class="alert alert-danger" role="alert">
                        ${data.mensaje}
                        </div>
                    `;
                }

                document.querySelector("#messageRegister").innerHTML= `
                <br>
                <div class="alert alert-primary" role="alert">
                  ${data.mensaje}
                </div>
                `; 
                
                localStorage.setItem('token', data.token)
                
            })
            .catch(err => console.log(err));
}





function Login(){
    let loginForm = document.querySelector( '#loginForm' )

    const obj = {}
    new FormData( loginForm ).forEach( ( value, key ) => obj[ key ] = value )
    fetch( `http://localhost:3000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( obj )
            })
            .then(res => res.json())
            .then( data =>{
                if(data.status == 401){
                    return document.querySelector("#messageLogin").innerHTML= `
                        <br>
                        <div class="alert alert-danger" role="alert">
                        ${data.mensaje}
                        </div>
                    `;
                }

                document.querySelector("#messageLogin").innerHTML= `
                <br>
                <div class="alert alert-primary" role="alert">
                  ${data.mensaje}
                </div>
                `; 
                
                localStorage.setItem('token', data.token)
                
            })
            .catch(err => console.log(err));
}