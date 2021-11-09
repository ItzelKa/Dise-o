$(document).ready(function () {
	var vacio = 0;

	//Boton limpiar
	$('#limpia').on('click', function () {
		$('#formcoma').trigger('reset');
	});

	//validar campos
	function validar() {
		$('input[type=text]').each(function (i, v) {
			if (this.value.length < 1) {
				vacio = 1;
				return false;
			}
			vacio = 0;
		});
	}

	///Limitar input file a 3 archivos
	$("#img").on("change", function () {
		if ($("#img")[0].files.length > 3) {
			alert("Solo se pueden seleccionar 3 imagenes como maximo");
			$("#inserta").prop('disabled', true);
		}
		else {
			$("#inserta").prop('disabled', false);
		}
	});

	///FETCH GET
	function fetch1() {
		fetch('http://localhost:3000/comarosta', {
			method: 'GET',
		}).then(res => res.json())
			.then(function (data) {
				var cont = ""
				data.comarosta.forEach(function (dato, index) {
					cont += '<tr><td scope="row">' + (index + 1) + '</td><td>' + dato.nombre + '</td><td><span class="d-inline-flex"><button type="button" class="btn btn-success edit" id="' + dato._id + '" >Editar</button><button type="button" class="btn btn-danger delete" id="' + dato._id + '" value="' + dato.nombre + '">Eliminar</button></span></td></tr>';
				});

				console.log(data.comarosta);
				document.getElementById("espa").innerHTML = cont;
			}).catch(function (error) {
				console.log(error);
			});
	}

	///FETCH INSERT
	function fetchinsert(datos) {

		fetch('http://localhost:3000/comarosta/add', {
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
				$('#insert').modal('hide');
			}).catch(function (error) {
				console.log(error);
			});
	}

	///FETCH ACTUALIZAR
	function fetcheditar1(id) {

		fetch('http://localhost:3000/comarosta/_id/' + id, {
			method: 'GET',
		}).then(res => res.json())
			.then(function (data) {
				$('#id').val(data.comarosta[0]._id);
				$('#nom').val(data.comarosta[0].nombre);
				$('#hab').val(data.comarosta[0].habito);
				$('#margen2').val(data.comarosta[0].margen);
				$('#inflorescencia2').val(data.comarosta[0].inflorescencia);
				$('#peciolosr2').val(data.comarosta[0].peciolos_ramillas);
				$('#hoj').val(data.comarosta[0].hojas);
				$('#haz2').val(data.comarosta[0].haz);
				$('#env').val(data.comarosta[0].enves);
				$('#flo').val(data.comarosta[0].flores);

				let src1 = data.comarosta[0].imagenes.imagen1;
				let src2 = data.comarosta[0].imagenes.imagen2;
				let src3 = data.comarosta[0].imagenes.imagen3;

				if (src1) { $('#foto1').attr('src', src1); }
				if (src2) { $('#foto2').attr('src', src2); }
				if (src3) { $('#foto3').attr('src', src3); }

				let estados = [];
				estados = data.comarosta[0].ubicacion;

				for (let i = 0; i < estados.length; i++) {
					$("#ubi option[value='" + estados[i] + "']").attr("selected", true);
				}

				$('#edit').modal('show');
			}).catch(function (error) {
				console.log(error);
			});
	}

	///FETCH EDITAR2 
	function fetcheditar2(id, datos) {

		fetch('http://localhost:3000/comarosta/_id/' + id, {
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

	///FETCH ELIMINAR
	function fetchdelete(c, v) {
		fetch('http://localhost:3000/comarosta/' + c + '/' + v, {
			method: 'DELETE'
		}).then(res => res.json())
			.then(function (data) {
				alert(data.message + ': ' + data.comaBaja.nombre);
				fetch1();
			}).catch(function (error) {
				console.log(error);
			});
	}

	fetch1();


	//FUNCION CONVERTIR IMGS A BASE64

	function base64(file) {
		if(file!=0){
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
		}else{
			return file;
		}
	}


	//Boton Insertar
	$('#inserta').click(function () {

		var imgs = document.getElementById('img').files;
		let readers = [];

		for (let i = 0; i < imgs.length; i++) {
			readers.push(base64(imgs[i]));
		}

		Promise.all(readers).then((values) => {
			let img1 = "", img2 = "", img3 = "";
			let dato = new FormData(document.getElementById('formcoma'));
			var estados = $('#ubicacion').val();
			dato.append('ubicacion', estados);
			img1 = values[0];
			img2 = values[1];
			img3 = values[2];

			if (img1 === undefined) { img1 = ""; }
			if (img2 === undefined) { img2 = ""; }
			if (img3 === undefined) { img3 = ""; }

			dato.append('img1', img1);
			dato.append('img2', img2);
			dato.append('img3', img3);

			const entradas = Object.fromEntries(dato.entries());
			const datos = JSON.stringify(entradas);

			fetchinsert(datos);
		});
	});

	//Boton Actualizar mostrar modal con datos
	$('body').on('click', '.edit', function () {
		var id = $(this).prop('id');
		fetcheditar1(id);
	});

	//Boton Actualizar registro
	$('#editar').click(function () {

		let reader2 = [];
		var foto1 = document.getElementById('img1').files;
		var foto2 = document.getElementById('img2').files;
		var foto3 = document.getElementById('img3').files;

		reader2[0]=foto1[0];
		reader2[1]=foto2[0];
		reader2[2]=foto3[0];

		if (foto1.length == 0) {reader2[0]=0; }
		if (foto2.length == 0) { reader2[1]=0; }
		if (foto3.length == 0) { reader2[2]=0; }

		reader2[0]=base64(reader2[0]);
		reader2[1]=base64(reader2[1]);
		reader2[2]=base64(reader2[2]);

		Promise.all(reader2).then((values) => {
			let dato = new FormData(document.getElementById('formcoma2'));
			var estados = $('#ubi').val();
			dato.append('ubicacion', estados);
			var img1=values[0];
			var img2=values[1];
			var img3=values[2];

			if(img1==0){img1 = $('#foto1').attr('src');}
			if(img2==0){img2 = $('#foto2').attr('src');}
			if(img3==0){img3 = $('#foto3').attr('src');}

			dato.append('img1', img1);
			dato.append('img2', img2);
			dato.append('img3', img3);

			const entradas = Object.fromEntries(dato.entries());
			const datos = JSON.stringify(entradas);

			var id = $('#id').val();

			fetcheditar2(id, datos);
		});
	});

	//Boton Eliminar
	$('body').on('click', '.delete', function () {
		var id = $(this).prop('id');
		var nombre = $(this).prop('value');
		var campo = "_id";
		var opcion = confirm("Esta seguro de eliminar: " + nombre);
		if (opcion) {
			fetchdelete(campo, id);
		}
	});

});