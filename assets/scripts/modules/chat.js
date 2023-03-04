export default function chat() {
	// Cria uma conexão WebSocket com o servidor de chat
	const socket = new WebSocket("wss://exemplo.com/chat");

	// Manipulador de eventos para quando a conexão é aberta
	socket.onopen = function (event) {
		console.log("Conexão aberta");
	};

	// Manipulador de eventos para quando uma mensagem é recebida do servidor
	socket.onmessage = function (event) {
		const data = JSON.parse(event.data);
		if (data.type === "mensagem") {
			console.log("Mensagem recebida:", data.message);
		} else if (data.type === "arquivo") {
			console.log("Arquivo recebido:", data.filename);
			// Faz algo com o arquivo recebido, como exibir uma imagem ou fazer o download
		}
	};

	// Manipulador de eventos para quando há um erro de conexão
	socket.onerror = function (error) {
		console.log("Erro de conexão:", error);
	};

	// Função para enviar uma mensagem ao servidor
	function enviarMensagem(mensagem) {
		socket.send(
			JSON.stringify({
				type: "mensagem",
				message: mensagem,
			})
		);
	}

	// Função para enviar um arquivo ao servidor
	function enviarArquivo(arquivo) {
		const reader = new FileReader();
		reader.onload = function (event) {
			socket.send(
				JSON.stringify({
					type: "arquivo",
					filename: arquivo.name,
					filedata: event.target.result,
				})
			);
		};
		reader.readAsDataURL(arquivo);
	}

	// Manipulador de eventos para enviar uma mensagem quando o formulário é enviado
	const form = document.querySelector("form");
	form.addEventListener("submit", function (event) {
		event.preventDefault();
		const input = form.querySelector("input[type=text]");
		const mensagem = input.value.trim();
		if (mensagem) {
			enviarMensagem(mensagem);
			input.value = "";
		}
	});

	// Manipulador de eventos para enviar um arquivo quando o usuário seleciona um arquivo
	const fileInput = document.querySelector("input[type=file]");
	fileInput.addEventListener("change", function (event) {
		const arquivo = event.target.files[0];
		if (arquivo) {
			enviarArquivo(arquivo);
			fileInput.value = "";
		}
	});




// Alterar categoria
	document.querySelectorAll(".filter-container .__filter").forEach((el) => {
		el.addEventListener("click", () => {
			if (document.querySelector(".filter-container ._selected"))
				document
					.querySelector(".filter-container ._selected")
					.classList.remove("_selected");
			el.classList.add("_selected");

			if(el.classList.contains('_unviewed'))
			document.querySelector('.list-of-users').classList.add('_filter-on')
			if(el.classList.contains('_all'))
			document.querySelector('.list-of-users').classList.remove('_filter-on')
		});
	});

	// Alterar usuário
	document.querySelectorAll(".list-of-users .user-bot").forEach((el) => {
		el.addEventListener("click", () => {
			if (document.querySelector(".list-of-users ._current"))
				document
					.querySelector(".list-of-users ._current")
					.classList.remove("_current");
			el.classList.add("_current");
			el.classList.remove('_new-message')
		});
	});
}
