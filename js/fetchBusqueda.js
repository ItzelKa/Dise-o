$(document).ready(function () {

	//Funcion para ocultar tabla en caso de no resultados.
	function validar(err1, err2) {
		if (err1 == 1) {
			$('#tabla1').prop('hidden', true);
		}
		if (err2 == 1) {
			$('#tabla2').prop('hidden', true);
		}
		if (err1 == 1 && err2 == 1) {
			$('#tabla2').prop('hidden', true);
			$('#tabla1').prop('hidden', true);
			$('#next').prop('disabled', true);
			alert('No hay especies que cumplan con la solicitud, modifica tu seleccion');
		}
	}
	function mostrartablas() {
		//Rectiva el boton next
		$('#next').prop('disabled', false);
		//Se muestran las tablas
		$('#tabla2').prop('hidden', false);
		$('#tabla1').prop('hidden', false);
	}

	/////FUNCIONES FETCH

	function fetch1() {
		fetch('http://localhost:3000/arbutus', {
			method: 'GET',
			//body: JSON.stringify(data)
		}).then(res => res.json())
			.then(function (data) {
				var cont = "";
				//console.log(data);
				data.arbutus.forEach(function (dato, index) {
					cont += '<tr><td scope="col">' + (index + 1) + '</td><td scope="col">'
						+ dato.nombre + '</td><td scope="col">' +
						'<button type="button" id="' + dato.nombre + '" class="btn btn-primary vera">Ver mas</button>'
						+ '</td></tr>';
				});
				$('#tabla1').prop('hidden', false);
				document.getElementById("arbutus").innerHTML = cont;
			}).catch(function (error) {
				console.log(error);
			});
	}

	function fetch2() {
		fetch('http://localhost:3000/comarosta', {
			method: 'GET',
			//body: JSON.stringify(data)
		}).then(res => res.json())
			.then(function (data) {
				var cont = "";
				//console.log(data);
				data.comarosta.forEach(function (dato, index) {
					cont += '<tr><td scope="col">' + (index + 1) + '</td><td scope="col">'
						+ dato.nombre + '</td><td scope="col">' +
						'<button type="button" id="' + dato.nombre + '"class="btn btn-primary verc">Ver mas</button>'
						+ '</td></tr>';
				});
				$('#tabla1').prop('hidden', false);
				document.getElementById("comaros").innerHTML = cont;
			}).catch(function (error) {
				console.log(error);
			});
	}

	function fetchpost(dato) {
		var err1 = 0;
		var err2 = 0;
		fetch('http://localhost:3000/arbutus', {
			method: "POST",
			body: JSON.stringify(dato),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(function (data) {
				var cont = "";
				//console.log(data);
				data.arbutus.forEach(function (dato, index) {
					cont += '<tr><td scope="col">' + (index + 1) + '</td><td scope="col">'
						+ dato.nombre + '</td><td scope="col">' +
						'<button type="button" id="' + dato.nombre + '" class="btn btn-primary vera">Ver mas</button>'
						+ '</td></tr>';
				});
				$('#tabla1').prop('hidden', false);
				document.getElementById("arbutus").innerHTML = cont;
			}).catch(function (error) {
				err1 = 1;
				validar(err1, err2);
				//console.log(error);
			});

		fetch('http://localhost:3000/comarosta', {
			method: "POST",
			body: JSON.stringify(dato),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
			.then(function (data) {
				var cont = "";
				//console.log(data);
				data.comarosta.forEach(function (dato, index) {
					cont += '<tr><td scope="col">' + (index + 1) + '</td><td scope="col">'
						+ dato.nombre + '</td><td scope="col">' +
						'<button type="button" id="' + dato.nombre + '"class="btn btn-primary verc">Ver mas</button>'
						+ '</td></tr>';
				});
				$('#tabla2').prop('hidden', false);
				document.getElementById("comaros").innerHTML = cont;
			}).catch(function (error) {
				err2 = 1;
				validar(err1, err2);
				//console.log(error);
			});
	}

	function fetchfinala(nombre) {
		fetch('http://localhost:3000/arbutus/nombre/' + nombre, {
			method: 'GET',
		}).then(res => res.json())
			.then(function (data) {
				//console.log(data);
				document.getElementById("nom").innerHTML = data.arbutus[0].nombre;
				document.getElementById("hab").innerHTML = data.arbutus[0].habito;
				document.getElementById("cr").innerHTML = data.arbutus[0].corteza_ramas;
				document.getElementById("crs").innerHTML = data.arbutus[0].corteza_ramillas;
				document.getElementById("pec").innerHTML = data.arbutus[0].peciolos;
				document.getElementById("hoj").innerHTML = data.arbutus[0].nombre;
				document.getElementById("ha").innerHTML = data.arbutus[0].haz;
				document.getElementById("en").innerHTML = data.arbutus[0].enves;
				document.getElementById("flo").innerHTML = data.arbutus[0].flores;
				document.getElementById("ub").innerHTML = data.arbutus[0].ubicacion;
			}).catch(function (error) {
				console.log(error);
			});
	}

	function fetchfinalc(nombre) {
		fetch('http://localhost:3000/comarosta/nombre/' + nombre, {
			method: 'GET',
		}).then(res => res.json())
			.then(function (data) {
				//console.log(data);
				document.getElementById("nom2").innerHTML = data.comarosta[0].nombre;
				document.getElementById("hab2").innerHTML = data.comarosta[0].habito;
				document.getElementById("pr").innerHTML = data.comarosta[0].peciolos_ramillas;
				document.getElementById("ho").innerHTML = data.comarosta[0].hojas;
				document.getElementById("mar").innerHTML = data.comarosta[0].margen;
				document.getElementById("h").innerHTML = data.comarosta[0].haz;
				document.getElementById("env2").innerHTML = data.comarosta[0].enves;
				document.getElementById("inf").innerHTML = data.comarosta[0].inflorescencia;
				document.getElementById("fl").innerHTML = data.comarosta[0].flores;
				document.getElementById("ubi").innerHTML = data.comarosta[0].ubicacion;
			}).catch(function (error) {
				console.log(error);
			});

	}

	//Ejecucion inicial para llenado de tablas;
	fetch1();
	fetch2();

	//VARIABLES
	var obj = {};
	var cont = "";
	var nex = "";
	var prev = "";
	var cont1 = "";
	var cont2 = "";

	//CHECKBOXES

	$('.habito2').on('click', function () {
		var habito = $(this).prop('id');
		$('.habito2').not(this).prop('checked', false);
		mostrartablas();
		if ($(this).prop('checked') == false) {
			obj.habito = "";
			fetch1(); fetch2();
		} else {
			obj.habito = habito;
			fetchpost(obj);
		}
		console.log(obj);
	});

	$('.hoja').on('click', function () {
		var hoja = $(this).prop('id');
		$('.hoja').not(this).prop('checked', false);
		mostrartablas();
		if ($(this).prop('checked') == false) {
			obj.hojas = "";
			if ($('#tabla1').prop('hidden')==true) {
				$('#arbutus').html(cont1);
			}
			if ($('#tabla2').prop('hidden')==true) {
				$('#comaros').html(cont2);
			}
			//fetch1();fetch2();
		} else {
			obj.hojas = hoja;
			fetchpost(obj);
		}
		console.log(obj);
	});

	$('.has').on('click', function () {
		var has = $(this).prop('id');
		$('.has').not(this).prop('checked', false);
		mostrartablas();
		if ($(this).prop('checked') == false) {
			obj.haz = "";
			if ($('#tabla1').prop('hidden')==true) {
				$('#arbutus').html(cont1);
			}
			if ($('#tabla2').prop('hidden')==true) {
				$('#comaros').html(cont2);
			}
			//fetch1();fetch2();
		} else {
			obj.haz = has;
			fetchpost(obj);
		}
		console.log(obj);
	});

	$('.env').on('click', function () {
		var env = $(this).prop('id');
		$('.env').not(this).prop('checked', false);
		mostrartablas();
		if ($(this).prop('checked') == false) {
			obj.enves = "";
			if ($('#tabla1').prop('hidden')==true) {
				$('#arbutus').html(cont1);
			}
			if ($('#tabla2').prop('hidden')==true) {
				$('#comaros').html(cont2);
			}
			//fetch1();fetch2();
		} else {
			obj.enves = env;
			fetchpost(obj);
		}
		console.log(obj);
	});

	$('.ubi').on('click', function () {
		var ubi = $(this).prop('id');
		$('.ubi').not(this).prop('checked', false);
		mostrartablas();
		if ($(this).prop('checked') == false) {
			obj.ubicacion = "";
			if ($('#tabla1').prop('hidden')==true) {
				$('#arbutus').html(cont1);
			}
			if ($('#tabla2').prop('hidden')==true) {
				$('#comaros').html(cont2);
			}
			//fetch1();fetch2();
		} else {
			obj.ubicacion = ubi;
			fetchpost(obj);
		}
		console.log(obj);
	});

	$('.flor').on('click', function () {
		var flores = $(this).prop('id');
		$('.flor').not(this).prop('checked', false);
		mostrartablas();
		if ($(this).prop('checked') == false) {
			obj.flores = "";
			if ($('#tabla1').prop('hidden')==true) {
				$('#arbutus').html(cont1);
			}
			if ($('#tabla2').prop('hidden')==true) {
				$('#comaros').html(cont2);
			}
			//fetch1();fetch2();
		} else {
			obj.flores = flores;
			fetchpost(obj);
		}
		console.log(obj);
	});

	//Botones de navegacion
	function mostrar() {
		$('.filtro').each(function (index, element) {
			if ($(this).prop('hidden') == false) {
				prev = $(this).prev().attr('id');
				cont = $(this).attr('id');
				nex = $(this).next().attr('id');
			}
		});
		if (prev == null) { prev = 0; }
		if (nex == null) { nex = 0; }

		return cont, nex, prev;
	}

	$('#next').on('click', function () {
		cont1 = $('#arbutus').html();
		cont2 = $('#comaros').html();
		$('#prev').prop('hidden', false);
		$('#reinicio').prop('hidden', false);
		mostrar();
		if (nex != 0) {
			$('#' + cont).prop('hidden', true);
			$('#' + nex).prop('hidden', false);
		}
	});

	$('#prev').on('click', function () {
		mostrar();
		if (prev != 0) {
			$('#' + cont).prop('hidden', true);
			$('#' + prev).prop('hidden', false);
		}
		if (prev == "habito") {
			$('#reinicio').prop('hidden', true);
			$('#prev').prop('hidden', true);
		}
	});

	$('#reinicio').on('click', function () {
		$('input[type=checkbox]').prop('checked', false);
		delete obj.habito;
		delete obj.haz;
		delete obj.enves;
		delete obj.flores;
		delete obj.ubicacion;
		delete obj.hojas;
		$('.filtro').prop('hidden', true);
		$('#habito').prop('hidden', false);
		$('#prev').prop('hidden', true);
		$('#reinicio').prop('hidden', true);
		mostrartablas();
		fetch1();
		fetch2();
	});

	///BOTON VER MAS
	$('body').on('click', '.vera', function () {
		var id = $(this).prop('id');
		fetchfinala(id);
		$('#ver1').modal('show');
	});

	$('body').on('click', '.verc', function () {
		var id = $(this).prop('id');
		fetchfinalc(id);
		$('#ver2').modal('show');
	});

});

