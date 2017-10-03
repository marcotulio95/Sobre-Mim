$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(argument) {
	$("#spinner").toggle();
	$.get("http://localhost:3000/frases", trocaFraseAleatoria)
	.fail(function(){
		setTimeout(function(){
			$("#erro").toggle();
		}, 2000);
	})
	.always(function(){
		$("#spinner").toggle();
	});
}

function trocaFraseAleatoria(data){
	var frase = $(".frase");
	var random = Math.floor(Math.random() * data.length);
	frase.text(data[random].texto);
	atualizaTamnhoFrase();
	atualizaTempoInicial(data[random].tempo);
}

function buscaFrase(){
	$("#spinner").toggle();
	var fraseId = $("#frase-id").val();
	var dados = {id : fraseId}; 
	$.get("http://localhost:3000/frases", dados, trocaFrase)
	.fail(function(){
		setTimeout(function(){
			$("#erro").toggle();
		}, 2000);
	})
	.always(function(){
		$("#spinner").toggle();
	});
}

function trocaFrase(data){
	var frase = $(".frase");
	frase.text(data.texto);
	atualizaTamnhoFrase();
	atualizaTempoInicial();
}