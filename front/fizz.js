function fizzFunc () {
	$("#input").keyup(function(){
		if ($("#input").val() !== ""){
			var link = "https://dubati.dubrov.ski/api?number="+$("#input").val();
			$.get(link, function(){})
				.done (function(data){
					$("#test").html(data.answer);
				})
				.fail (function(xhr, status){
					if (xhr.status == "" || xhr.status > 400){
						$("#test").html("Server down...");
					} else {
						$("#test").html("");
						$("<div></div>", {class: "alert alert-danger text-center collapse"}).appendTo("#errorPar").html("<strong>Error! </strong>Parameter is NaN!").fadeTo(500, 0.9).delay(5000).fadeOut(500);
					}
				});		
		} else {
			$("#test").html("");
		}		
	});
}

function onlyNumbers(evt) {
	var e = event || evt;
	var charCode = e.which || e.keyCode;
	return !(charCode > 31 && (charCode <48 || charCode > 57));
}