var author;
var lastId;

function chatFunc() {
	initLogin();
	$("#textInput").keypress(function(e) {
		if(e.which == 13 && $("#textInput").val() !== ""){
			sendMessage();
		}
	});
	$("#sendBtn").click(function() {
		if($("#textInput").val() !== ""){
			sendMessage();
		}
	});
}

function initLogin() {
	$("#loginChat").keypress(function(e) {
		if(e.which !== 13) {
			return;
		}
		loginCheck();
	});
	$("#okChat").click(function() {
		loginCheck();
	});
}
		
function loginCheck() {
	if ($("#loginChat").val() == ""){
		$("<div></div>", {class: "alert alert-warning text-center collapse"})
			.appendTo("#errorPar")
			.append($("<span/>").text("Please enter your "))
			.append($("<strong/>").text("name!"))
			.fadeTo(500, 0.9)
			.delay(5000)
			.fadeOut(500);
	} else {
		author = $("#loginChat").val();
		$("<div></div>", {class: "alert alert-success text-center collapse"})
			.appendTo("#errorPar")
			.append($("<span/>").text("Welcome, "))
			.append($("<strong/>").text(author + "!"))
			.fadeTo(500, 0.9)
			.delay(5000)
			.fadeOut(500);
		$("#page2part1").fadeOut(500);
		$("#page2part2").delay(500).fadeTo(500, 0.9);
		setInterval(fetchChat, 5000);
	}
}

function fetchChat() {
	link = !lastId? "https://dubati.dubrov.ski/chat?login="+author+"&load=100" : "https://dubati.dubrov.ski/chat?lastid="+lastId;
	$.get(link, function(){})
		.done (function(data) {
			data.forEach(function(row) {
				if (row.id <= lastId){
					return;
				}
				lastId = row.id;
				$("<div></div>", {class: "chatText"})
					.appendTo("#textOutput")
					.append($("<strong/>").text(row.author))
					.append($("<span/>").text(": " + row.body));
				$("#textOutput").animate({ scrollTop: $('#textOutput').prop("scrollHeight")}, 500);
			});
		});
}

function sendMessage() {
	let newMessage = $("#textInput").val();
	let postObject = {author: author, message: newMessage};
	$.post("https://dubati.dubrov.ski/chat", postObject, function(){
		$("#textInput").val("");
		$("#textInput").focus();
		fetchChat();	
	});
}
