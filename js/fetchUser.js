$(document).ready(function () {

    function fetchinsert(datos) {
        fetch('http://localhost:3000/usuario/registro',{
            method: 'POST',
            body: datos,
            headers: {
				'Content-Type': 'application/json',
				"Accept": "application/json"
			}
        })
    }
    
    $('#registro').click(function () {
        let dato = new FormData(document.getElementById('formUser'));
        const entradas = Object.fromEntries(dato.entries());
        const datos = JSON.stringify(entradas);
        console.log(datos);
        fetchinsert(datos);
    });

});