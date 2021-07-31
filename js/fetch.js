$(document).ready(function() {
    
    function arbutusConsulta(dato) {
		fetch('http://localhost:3000/arbutus', {
            method: 'GET',
		}).then(res => res.json())
		.then(function(data) {
			var cont="";
			console.log(data);
			//alert("post arbutus", data.arbutus.length);
			data.arbutus.forEach(function(dato){ 
				cont+='<p>'+dato.nombre+'</p>';	
			});
			document.getElementById("divArbutus").innerHTML=cont;
			
		}).catch(function(error) {
            console.log(error);
		});
    }

    $('#buscarArbutus').on('click',function(event) {
        var obj={};
        arbutusConsulta(obj);
        //console.log(obj);
    });

    function comarostaConsulta(dato) {
		fetch('http://localhost:3000/comarosta', {
            method: 'GET',
		}).then(res => res.json())
		.then(function(data) {
			var cont="";
			console.log(data);
			//alert("post arbutus", data.comarosta.length);
			data.comarosta.forEach(function(dato){ 
				cont+='<p>'+dato.nombre+'</p>';	
			});
			document.getElementById("divComarosta").innerHTML=cont;
			
		}).catch(function(error) {
            console.log(error);
		});
    }

    $('#buscarComarosta').on('click',function(event) {
        var obj={};
        comarostaConsulta(obj);
        //console.log(obj);
    });
    
});