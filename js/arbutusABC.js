var estados = [];

///////  FUNCIONES FETCH  /////////
////////////////////////////////////////////////////////

///FETCH GET BASICO LISTADO DE ESPECIES INICIAL
function fetch1() {
	fetch('http://localhost:3000/arbutus', {
		method: 'GET',
	}).then(res => res.json())
		.then(function (data) {
			var cont = ""
			data.arbutus.forEach(function (dato, index) {
				cont += '<tr><td scope="row">' + (index + 1) + '</td><td>' + dato.nombre + '</td><td><span class="d-inline-flex"><button type="button" class="btn btn-success edit" id="' + dato._id + '" >Editar</button><button type="button" class="btn btn-danger delete" id="' + dato._id + '" value="' + dato.nombre + '">Eliminar</button></span></td></tr>';
			});
			document.getElementById("espa").innerHTML = cont;
		}).catch(function (error) {
			console.log(error);
		});
}

///FETCH INSERTAR
function fetchinsert(datos) {
	fetch('http://localhost:3000/arbutus/add', {
		method: 'POST',
		body: datos,
		headers: {
			'Content-Type': 'application/json',
			"Accept": "application/json"
		}
	}).then(res => res.json())
		.then(function (data) {
			alert(data.message);
			fetch1();
			limpia();
			$('#insert').modal('hide');
		}).catch(function (error) {
			console.log(error);
		});
}

///FETCH ELIMINAR
function fetchdelete(c, v) {
	fetch('http://localhost:3000/arbutus/' + c + '/' + v, {
		method: 'DELETE'
	}).then(res => res.json())
		.then(function (data) {
			alert(data.message + ': ' + data.arBaja.nombre);
			fetch1();
		}).catch(function (error) {
			console.log(error);
		});
}

///FETCH ACTUALIZAR1 TRAER DATOS
function fetcheditar1(id) {
	fetch('http://localhost:3000/arbutus/_id/' + id, {
		method: 'GET',
	}).then(res => res.json())
		.then(function (data) {
			$('#id').val(data.arbutus[0]._id);
			$('#nom').val(data.arbutus[0].nombre);
			$('#hab').val(data.arbutus[0].habito);
			$('#cor1').val(data.arbutus[0].corteza_ramas);
			$('#cor2').val(data.arbutus[0].corteza_ramillas);
			$('#pec').val(data.arbutus[0].peciolos);
			$('#hoj').val(data.arbutus[0].hojas);
			$('#haz2').val(data.arbutus[0].haz);
			$('#env').val(data.arbutus[0].enves);
			$('#flo').val(data.arbutus[0].flores);

			let src1 = data.arbutus[0].imagenes.imagen1;
			let src2 = data.arbutus[0].imagenes.imagen2;
			let src3 = data.arbutus[0].imagenes.imagen3;

			$('#foto1').attr('src',"");
			$('#foto2').attr('src',"");
			$('#foto3').attr('src',"");

			if (src1) { $('#foto1').attr('src', src1); }
			if (src2) { $('#foto2').attr('src', src2); }
			if (src3) { $('#foto3').attr('src', src3); }

			let est = [];
			est = data.arbutus[0].ubicacion;

			for (let i = 0; i < est.length; i++) {
				$("#edit input[value='" + est[i] + "']").attr("checked", true);
			}
			$('#edit').modal('show');
		}).catch(function (error) {
			console.log(error);
		});
}

///FETCH ACTUALIZAR2 GUARDAR CAMBIOS
function fetcheditar2(id, datos) {
	fetch('http://localhost:3000/arbutus/_id/' + id, {
		method: 'PUT',
		body: datos,
		headers: {
			'Content-Type': 'application/json',
			"Accept": "application/json"
		}
	}).then(res => res.json())
		.then(function (data) {
			alert(data.message);
			fetcheditar1(id);
		}).catch(function (error) {
			console.log(error);
		});
}

///////	OTRAS FUNCIONES NECESARIAS ////////
////////////////////////////////////////////////////////

//FUNCION CONVERTIR IMGS A BASE64
function base64(file) {
	if (file != 0) {
		return new Promise(function (resolve, reject) {
			let fr = new FileReader();

			fr.onload = function () {
				resolve(fr.result);
			};
			fr.onerror = function () {
				reject(fr);
			};
			fr.readAsDataURL(file);
		});
	} else {
		return file;
	}
}

//FUNCION LIMPIAR FORMULARIO, CHECKBOXES Y VARIABLE ESTADOS
function limpia() {
	$('#formarbu').trigger('reset');
	$("#insert input[type=checkbox]").prop('checked', false);
}

///FUNCION OBTENER VALORES DE CHECKBOX ESTADOS INSERT
function arrayestados(opt) {
	estados = [];
	if (opt == 2) {
		$("#edit input[type=checkbox]:checked").each(function () {
			estados.push(this.value);
		});
	} else {
		$("#insert input[type=checkbox]:checked").each(function () {
			estados.push(this.value);
		});
	}
	if (estados.length == 0) {
		alert("Selecciona almenos un estado");
		return true;
	}
	return false;
}

///FUNCION Limitar input file a 3 archivos
$("#img").on("change", function () {
	if ($("#img")[0].files.length > 3) {
		alert("Solo se pueden seleccionar 3 imagenes como maximo");
		$("#inserta").prop('disabled', true);
	}
	else {
		$("#inserta").prop('disabled', false);
	}
});


///////	EVENTOS DE BOTONES ////////
////////////////////////////////////////////////////////

///LISTAR ESPECIES AL CARGAR PAGINA
$(document).ready(function () {
	fetch1();
});

//Boton Actualizar2 guardar cambios
$('#editar').click(function () {
	let reader2 = [];
	let foto1 = document.getElementById('img1').files;
	let foto2 = document.getElementById('img2').files;
	let foto3 = document.getElementById('img3').files;

	if (arrayestados(2)) { return false; }

	reader2[0] = foto1[0];
	reader2[1] = foto2[0];
	reader2[2] = foto3[0];

	if (foto1.length == 0) { reader2[0] = 0; }
	if (foto2.length == 0) { reader2[1] = 0; }
	if (foto3.length == 0) { reader2[2] = 0; }

	reader2[0] = base64(reader2[0]);
	reader2[1] = base64(reader2[1]);
	reader2[2] = base64(reader2[2]);

	Promise.all(reader2).then((values) => {
		let dato = new FormData(document.getElementById('formarbu2'));
		dato.append('ubicacion', estados);
		var img1 = values[0];
		var img2 = values[1];
		var img3 = values[2];

		if (img1 == 0) { img1 = $('#foto1').attr('src'); }
		if (img2 == 0) { img2 = $('#foto2').attr('src'); }
		if (img3 == 0) { img3 = $('#foto3').attr('src'); }

		dato.append('img1', img1);
		dato.append('img2', img2);
		dato.append('img3', img3);

		const entradas = Object.fromEntries(dato.entries());
		const datos = JSON.stringify(entradas);

		var id = $('#id').val();

		fetcheditar2(id, datos);
	});
});

//Boton Actualizar1 mostrar modal con datos
$('body').on('click', '.edit', function () {
	var id = $(this).prop('id');
	$("#edit :checkbox").attr("checked", false);
	fetcheditar1(id);
});

///BOTON INSERTAR
$('#inserta').click(function () {

	let imgs = document.getElementById('img').files;
	let readers = [];

	if (arrayestados()) { return false; }

	for (let i = 0; i < imgs.length; i++) {
		readers.push(base64(imgs[i]));
	}

	Promise.all(readers).then((values) => {
		let img1 = "", img2 = "", img3 = "";
		let dato = new FormData(document.getElementById('formarbu'));
		dato.append('ubicacion', estados);
		img1 = values[0];
		img2 = values[1];
		img3 = values[2];

		if (img1 === undefined) { img1 = ""; }
		if (img2 === undefined) { img2 = ""; }
		if (img3 === undefined) { img3 = ""; }

		dato.append('img1', img1); dato.append('img2', img2);
		dato.append('img3', img3);

		const entradas = Object.fromEntries(dato.entries());
		const datos = JSON.stringify(entradas);

		fetchinsert(datos);
	});
});

//BOTON ELIMINAR
$('body').on('click', '.delete', function () {
	var id = $(this).prop('id');
	var nombre = $(this).prop('value');
	var campo = "_id";
	var opcion = confirm("Esta seguro de eliminar: " + nombre);
	if (opcion) {
		fetchdelete(campo, id);
	}
});

///BOTON LIMPIAR FORMULARIO
$('#limpia').on('click', function () {
	limpia();
});

//BOTON ELIMINAR Imagen
$('.delimg').on('click', function () {
	var id = $('#id').val();
	var imgs=$(this).attr("id");
	if (arrayestados(2)) { return false; }
	let dato = new FormData(document.getElementById('formarbu2'));
	dato.append('ubicacion', estados);
	let img1 = $('#foto1').attr('src'); 
	let img2 = $('#foto2').attr('src');
	let img3 = $('#foto3').attr('src'); 
	switch (imgs) {
		case "1":
			img1="";
			break;
		case "2":
			img2="";
			break;
		case "3":
			img3="";
			break;
	}
		dato.append('img1', img1);
		dato.append('img2', img2);
		dato.append('img3', img3);

		const entradas = Object.fromEntries(dato.entries());
		const datos = JSON.stringify(entradas);
		fetcheditar2(id, datos);
});



//validar campos
	// function validar() {
	// 	$('input[type=text]').each(function (i, v) {
	// 		if (this.value.length < 1) {
	// 			vacio = 1;
	// 			return false;
	// 		}
	// 		vacio = 0;
	// 	});
	// }

	// function base64(file, callback) {
	// 	var reader = new FileReader();
	// 	reader.onload = function () { callback(JSON.stringify(reader.result)) };
	// 	reader.readAsText(file);
	// }
	// base64(imgs[0], function (img1) { 
	// 	console.log(img1);
	// });


	// for (var entrie of dato.entries()) {
	// 	console.log(entrie[0] + ': ' + entrie[1]);
	// }


	// validar();
	// if (vacio == 1) {
	// 	alert('Todos los campos son requeridos');
	// } else {	
	///fetchinsert(dato);
	// }

	//Generar base64
	// if (imgs.length > 0) {
	// 	var imageFile = imgs[0];
	// 	var fileReader = new FileReader();
	// 	fileReader.onload = function(fileLoadedEvent) {
	// 	  var srcData = fileLoadedEvent.target.result;
	// 	  var newImage = document.createElement('img');
	// 	  newImage.src = srcData;
	// 	  document.getElementById("dummy").innerHTML = newImage.outerHTML;
	// 	  document.getElementById("txt").value = document.getElementById("dummy").innerHTML;
	// 	}
	// 	fileReader.readAsDataURL(imageFile);
	//   }

	// Imprimir objeto data
	//for (var entrie of data.entries()) {
	// 		console.log(entrie[0]+ ': ' + entrie[1]); 
	// }
