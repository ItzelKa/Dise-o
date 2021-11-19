$(document).ready(function () {

	//VARIABLES
	var obj = {};
	var gen = "";

	/////FETCH LLENAR TABLA ARBUTUS
	function fetch1() {
		fetch('http://localhost:3000/arbutus', {
			method: 'GET'
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
				cont1 = cont;
				document.getElementById("tarbutus").innerHTML = cont;
			}).catch(function (error) {
				console.log(error);
			});
	}
	/////FETCH LLENAR TABLA COMAROSTA
	function fetch2() {
		fetch('http://localhost:3000/comarosta', {
			method: 'GET'
		}).then(res => res.json())
			.then(function (data) {
				var cont = "";
				data.comarosta.forEach(function (dato, index) {
					cont += '<tr><td scope="col">' + (index + 1) + '</td><td scope="col">'
						+ dato.nombre + '</td><td scope="col">' +
						'<button type="button" id="' + dato.nombre + '"class="btn btn-primary verc">Ver mas</button>'
						+ '</td></tr>';
				});
				cont1 = cont;
				document.getElementById("tcomaros").innerHTML = cont;
			}).catch(function (error) {
				console.log(error);
			});
	}

	/////FETCH FILTRO
	function fetchpost(dato) {
		if ($('#Arbutus').prop('checked') == true) {
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
					data.arbutus.forEach(function (dato, index) {
						cont += '<tr><td scope="col">' + (index + 1) + '</td><td scope="col">'
							+ dato.nombre + '</td><td scope="col">' +
							'<button type="button" id="' + dato.nombre + '" class="btn btn-primary vera">Ver mas</button>'
							+ '</td></tr>';
					});
					document.getElementById("tarbutus").innerHTML = cont;
				}).catch(function (error) {
					alert('No hay especies que cumplan con la solicitud, modifica tu seleccion');
					//console.log(error);
				});
		}
		if ($('#Comarostaphylis').prop('checked') == true) {
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
					data.comarosta.forEach(function (dato, index) {
						cont += '<tr><td scope="col">' + (index + 1) + '</td><td scope="col">'
							+ dato.nombre + '</td><td scope="col">' +
							'<button type="button" id="' + dato.nombre + '"class="btn btn-primary verc">Ver mas</button>'
							+ '</td></tr>';
					});
					document.getElementById("tcomaros").innerHTML = cont;
				}).catch(function (error) {
					alert('No hay especies que cumplan con la solicitud, modifica tu seleccion');
					//console.log(error);
				});
		}
	}

	/////FETCH MODAL ARBUTUS
	function fetchfinala(nombre) {
		fetch('http://localhost:3000/arbutus/nombre/' + nombre, {
			method: 'GET',
		}).then(res => res.json())
			.then(function (data) {
				//console.log(data);
				$('#nom').html(data.arbutus[0].nombre);
				$('#hab').html(data.arbutus[0].habito);
				$('#cr').html(data.arbutus[0].corteza_ramas);
				$('#crs').html(data.arbutus[0].corteza_ramillas);
				$('#pec').html(data.arbutus[0].peciolos);
				$('#hoj').html(data.arbutus[0].hojas);
				$('#ha').html(data.arbutus[0].haz);
				$('#en').html(data.arbutus[0].enves);
				$('#flo').html(data.arbutus[0].flores);
				$('#ub').html(data.arbutus[0].ubicacion.join(', '));
				$('#imga1').attr('src',"");
				$('#imga2').attr('src',"");
				$('#imga3').attr('src',"");
				$('#imga1').attr('src',data.arbutus[0].imagenes.imagen1);
				$('#imga2').attr('src',data.arbutus[0].imagenes.imagen2);
				$('#imga3').attr('src',data.arbutus[0].imagenes.imagen3);
			}).catch(function (error) {
				console.log(error);
			});
	}

	/////FETCH MODAL COMAROSTA
	function fetchfinalc(nombre) {
		fetch('http://localhost:3000/comarosta/nombre/' + nombre, {
			method: 'GET',
		}).then(res => res.json())
			.then(function (data) {
				//console.log(data);
				$('#nom2').html(data.comarosta[0].nombre);
				$('#hab2').html(data.comarosta[0].habito);
				$('#pr').html(data.comarosta[0].peciolos_ramillas);
				$('#ho').html(data.comarosta[0].hojas);
				$('#mar').html(data.comarosta[0].margen);
				$('#h').html(data.comarosta[0].haz);
				$('#env2').html(data.comarosta[0].enves);
				$('#inf').html(data.comarosta[0].inflorescencia);
				$('#fl').html(data.comarosta[0].flores);
				$('#ubi').html(data.comarosta[0].ubicacion.join(', '));
				$('#imgc1').attr('src',"");
				$('#imgc2').attr('src',"");
				$('#imgc3').attr('src',"");
				$('#imgc1').attr('src',data.comarosta[0].imagenes.imagen1);
				$('#imgc2').attr('src',data.comarosta[0].imagenes.imagen2);
				$('#imgc3').attr('src',data.comarosta[0].imagenes.imagen3);
			}).catch(function (error) {
				console.log(error);
			});

	}

	//FUNCION LIMPIEZA DE OBJETO
	function reset() {
		delete obj.habito;
		delete obj.haz;
		delete obj.enves;
		delete obj.flores;
		delete obj.ubicacion;
		delete obj.inflorescencia;
		delete obj.margen;
		delete obj.corteza_ramillas;
		delete obj.corteza_ramas;
		delete obj.peciolos;
		delete obj.peciolos_ramillas;
		delete obj.hojas;
		$('.btn').removeClass('btn-dark');
	}

	//FUNCION CAMBIO DE COLOR BOTONES FILTRO
	function color(btn, opt) {
		if (opt == 1) {
			$(btn).addClass('btn-dark');
		}
		if (opt == 0) {
			$(btn).removeClass('btn-dark');
		}
	}

	//FUNCION CAMBIO DE COLOR BOTONES FILTRO
	function selecciones() {
		document.getElementById("selecciones").innerHTML = "";
		Object.entries(obj).map(([token, value]) => {
			if (value != "") {
				document.getElementById("selecciones").innerHTML += `
				<li><b>${token} :</b> ${value}</b>\n	`;
			}
		});
	}

	//MOSTRAR FILTROS DEPENDIENDO GENERO

	$('.genero').on('click', function () {
		$('#generos').prop('hidden', true);
		reset();
		$('#filtro').prop('hidden', false);
		$('.collapse').collapse('hide');
		$('input[type=checkbox]').not(this).prop('checked', false);
		gen = $(this).prop('id');
		if (gen == "Arbutus") {
			fetch1();
			$('#titu').html(gen);
			$('#tablaarb').prop('hidden', false);
			$('#tablacoma').prop('hidden', true);
			$('#btn-comaros').prop('hidden', true);
			$('#btn-arbutus').prop('hidden', false);
		}
		if (gen == "Comarostaphylis") {
			fetch2();
			$('#titu').html(gen);
			$('#tablacoma').prop('hidden', false);
			$('#tablaarb').prop('hidden', true);
			$('#btn-arbutus').prop('hidden', true);
			$('#btn-comaros').prop('hidden', false);
		}
		if ($('#Arbutus').prop('checked') == false && $('#Comarostaphylis').prop('checked') == false) {
			$('#filtro').prop('hidden', true);
			$('.tables').prop('hidden', true);
		}

	});

	///FUNCION QUE OCULTA LOS DEMAS FILTROS
	$('.collapse').on('show.bs.collapse', function () {
		$('.collapse').not(this).collapse('hide');
	});

	/////////////////CHECKBOXES

	//HABITO
	$('.habito2').on('click', function () {
		var habito = $(this).prop('name');
		$('.habito2').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			color('#btnhab', 0);
			obj.habito = "";
			setTimeout(fetch1, 500); setTimeout(fetch2, 500);
		} else {
			color('#btnhab', 1);
			obj.habito = habito;
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	//CORTEZA RAMAS
	$('.corm').on('click', function () {
		var corm = $(this).prop('name');
		$('.corm').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			color('#btncortrm', 0);
			obj.corteza_ramas = "";
		} else {
			color('#btncortrm', 1);
			obj.corteza_ramas = corm;
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	//CORTEZA RAMILLAS
	$('.corll').on('click', function () {
		var corll = $(this).prop('name');
		$('.corll').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			color('#btncortrll', 0);
			obj.corteza_ramillas = "";
		} else {
			color('#btncortrll', 1);
			obj.corteza_ramillas = corll;
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	//PECIOLOS Y PECIOLOS RAMILLAS
	$('.peci').on('click', function () {
		var peci = $(this).prop('name');
		$('.peci').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			color('.btnpec', 0);
			if ($('#Arbutus').prop('checked') == true) { obj.peciolos = "" } else {
				obj.peciolos_ramillas = "";
			}
		} else {
			color('.btnpec', 1);
			if ($('#Arbutus').prop('checked') == true) { obj.peciolos = peci } else {
				obj.peciolos_ramillas = peci;
			}
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	//MARGEN
	$('.marg').on('click', function () {
		var marg = $(this).prop('name');
		$('.marg').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			color('#btnmarg', 0);
			obj.margen = "";
		} else {
			color('#btnmarg', 1);
			obj.margen = marg;
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	//INFLORESCENCIA
	$('.inflo').on('click', function () {
		var inflo = $(this).prop('name');
		$('.inflo').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			color('#btninflo', 0);
			obj.inflorescencia = "";
		} else {
			color('#btninflo', 1);
			obj.inflorescencia = inflo;
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	//HOJAS
	$('.hoja').on('click', function () {
		var hoja = $(this).prop('name');
		$('.hoja').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			color('.btnhoj', 0);
			obj.hojas = "";
		} else {
			color('.btnhoj', 1);
			obj.hojas = hoja;
			selecciones();
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	//HAZ
	$('.has').on('click', function () {
		var has = $(this).prop('name');
		$('.has').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			color('.btnhaz', 0);
			obj.haz = "";
		} else {
			color('.btnhaz', 1);
			obj.haz = has;
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	//ENVES
	$('.env').on('click', function () {
		var env = $(this).prop('name');
		$('.env').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			color('.btnenv', 0);
			obj.enves = "";
		} else {
			color('.btnenv', 1);
			obj.enves = env;
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	//UBICACION
	$('.ubi').on('click', function () {
		var ubi = $(this).prop('name');
		$('.ubi').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			obj.ubicacion = "";
			color('#btnubi', 0);
		} else {
			color('#btnubi', 1);
			obj.ubicacion = ubi;
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	//FLORES
	$('.flor').on('click', function () {
		var flores = $(this).prop('name');
		$('.flor').not(this).prop('checked', false);
		if ($(this).prop('checked') == false) {
			color('.btnflo', 0);
			obj.flores = "";
		} else {
			color('.btnflo', 1);
			obj.flores = flores;
			setTimeout(fetchpost, 500, obj);
		}
		selecciones();
		console.log(obj);
	});

	///BOTONES GENEROS
	$('#btngeneros').on('click', function () {
		$('input[type=checkbox]').prop('checked', false);
		$('#filtro').prop('hidden', true);
		$('#generos').prop('hidden', false);
		$('.tables').prop('hidden', true);
		$('#selecciones').html("");
		reset();
	});

	///BOTON REINICIAR
	$('#reiniciar').on('click', function () {
		$('.collapse :checkbox').prop('checked', false);
		$('.collapse').collapse('hide');
		if ($('#Arbutus').prop('checked') == true) { fetch1() }
		if ($('#Comarostaphylis').prop('checked') == true) { fetch2() }
		$('#selecciones').html("");
		reset();
	});

	///BOTONES VER MAS
	$('body').on('click', '.vera', function () {
		var id = $(this).prop('id');
		//2milis
		setTimeout(fetchfinala, 500, id);
		$('#ver1').modal('show');
	});

	$('body').on('click', '.verc', function () {
		var id = $(this).prop('id');
		setTimeout(fetchfinalc, 500, id);
		$('#ver2').modal('show');
	});

});

