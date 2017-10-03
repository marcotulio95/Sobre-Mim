var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function(){
	atualizaTamnhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reset").click(reiniciaJogo);
	atualizaPlacar();

	$("#usuarios").selectize({
	    create: true,
	    sortField: 'text'
	});

	$(".tooltip").tooltipster({
		trigger: "custom"
	});
});

function atualizaTamnhoFrase(argument) {
	var frase = $(".frase").text();
	var numeroPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numeroPalavras);
}

function atualizaTempoInicial(tempo){
	tempoInicial = tempo;
	$("#tempo-digitacao").text(tempo);
}
function inicializaContadores() {
	campo.on("input", function(){
		var conteudo = campo.val();
		var qtdePalavras =  conteudo.split(/\S+/).length-1;
		$("#contador-palavras").text(qtdePalavras);

		var qtdeCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdeCaracteres);
	});
}

function inicializaCronometro() {
	campo.one("focus", function(){
		var tempoRestante = $("#tempo-digitacao").text();
		var idInterval = setInterval(function(){
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			
			if(tempoRestante < 1){
				clearInterval(idInterval);
				finalizaJogo();
			}
		}, 1000)
	});
}

function inicializaMarcadores(){
	campo.on("input", function(){
		var frase = $(".frase").text();
		var digitado = campo.val();
		var comparavel = frase.substr(0, digitado.length);
		if(digitado == comparavel){
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha")
		}else{
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
	});
}

function finalizaJogo(){
	campo.attr("disabled", true);
	campo.addClass("campo-desativado");
	inserePlacar();
}


function reiniciaJogo(){
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-caracteres").text("0");
	$("#contador-palavras").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	campo.removeClass("campo-desativado");
	campo.removeClass("borda-vermelha");
	campo.removeClass("borda-verde");
	inicializaCronometro();
}

