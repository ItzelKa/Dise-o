$(document).ready(function() {

	for (var i = 1; i <=1; i++) {
		arbutusConsulta(i);
	}

    function arbutusConsulta(dato) {
		fetch('http://localhost:3000/arbutus',{method: 'GET'})
		.then(res => res.json())
		.then(function(data) {
			var cont="";
			var img="";
			console.log(data);
			data.arbutus.forEach(function(dato){ 
				cont=dato.nombre;
				img=dato.imagenes.imagen1;
				document.getElementById('divArbutus').innerHTML+=`
				<div class="col-6" data-aos="fade-up">
					<div class="cont-comarosta">
						<div class="comarosta-details">
							<h1>${cont}</h1>
							<ul>
								<li><strong>Enves: </strong>${dato.enves}</li>
								<li><strong>Flores: </strong>${dato.flores}</li>
								<li><strong>Habito: </strong>${dato.habito}</li>
								<li><strong>Haz: </strong>${dato.haz}</li>
							</ul>
						</div>
						<div class="comarosta-img">
							<img src="${img}" alt="">
							<div class="info text-center">
								<a type="button" data-toggle="modal" data-target="#exampleModalCenter">
									<h2>click para ver mas</h2>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalCenterTitle">${cont}</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<ul>
									<li><strong>Hojas: </strong>${dato.hojas}</li>
									<li><strong>Corteza ramas: </strong>${dato.corteza_ramas}</li>
									<li><strong>Corteza ramillas: </strong>${dato.corteza_ramillas}</li>
									<li><strong>Peciolos: </strong>${dato.peciolos}</li>
									<li><strong>Ubicacion: </strong>${dato.ubicacion}</li>
								</ul>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Cerrar</button>
							</div>
						</div>
					</div>
				</div>`;
			});	
							
		}).catch(function(error) {
            console.log(error);
		});
    }

	for (var i = 1; i <=1; i++) {
		comarostaConsulta(i);
	}

    function comarostaConsulta(dato) {
		fetch('http://localhost:3000/comarosta', {method: 'GET'})
		.then(res => res.json())
		.then(function(data) {
			var cont="";
			var img="";
			console.log(data);
			data.comarosta.forEach(function(dato){ 
				cont=dato.nombre;
				img=dato.imagenes.imagen1;
				document.getElementById('divComarosta').innerHTML+=`
				<div class="col-6" data-aos="fade-up">
					<div class="cont-comarosta">
						<div class="comarosta-details">
							<h1>${cont}</h1>
							<ul>
								<li><strong>Enves: </strong>${dato.enves}</li>
								<li><strong>Flores: </strong>${dato.flores}</li>
								<li><strong>Habito: </strong>${dato.habito}</li>
								<li><strong>Haz: </strong>${dato.haz}</li>
							</ul>
						</div>
						<div class="comarosta-img">
							<img src="${img}" alt="">
							<div class="info text-center">
								<a type="button" data-toggle="modal" data-target="#exampleModalCenter">
									<h2>click para ver mas</h2>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalCenterTitle">${cont}</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<ul>
									<li><strong>Hojas: </strong>${dato.hojas}</li>
									<li><strong>Infloresencia: </strong>${dato.inflorescencia}</li>
									<li><strong>Margen: </strong>${dato.margen}</li>
									<li><strong>Peciolos ramillas: </strong>${dato.peciolos_ramillas}</li>
									<li><strong>Ubicacion: </strong>${dato.ubicacion}</li>
								</ul>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Cerrar</button>
							</div>
						</div>
					</div>
				</div>`;
			});
		}).catch(function(error) {
            console.log(error);
		});
    }

});