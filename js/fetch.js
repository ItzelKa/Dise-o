$(document).ready(function() {
    
    function arbutusConsulta(dato) {
		fetch('http://localhost:3000/arbutus', {
            method: 'GET',
           /* body: JSON.stringify(dato),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
    }*/
		}).then(res => res.json())
		.then(function(data) {
			var cont="";
			console.log(data);
			alert("post arbutus", data.arbutus.length);
			data.arbutus.forEach(function(dato){ 
				cont+='<p>'+dato.nombre+'</p>';	
			});
			document.getElementById("divArbutus").innerHTML=cont;
			
		}).catch(function(error) {
            console.log(error);
		});
    }

    $('#buscarArbutus').on('click',function(event) {
        var input= $('#inputArbutus').val();
        var obj={};
        obj.ubicacion=input;
        arbutusConsulta(obj);
        //console.log(obj);
    });
});