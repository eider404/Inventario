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