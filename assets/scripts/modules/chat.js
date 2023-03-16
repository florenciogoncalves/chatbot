export default function chat() {
	// Alterar categoria
	document.querySelectorAll(".filter-container .__filter").forEach((el) => {
		el.addEventListener("click", () => {
			if (document.querySelector(".filter-container ._selected"))
				document
					.querySelector(".filter-container ._selected")
					.classList.remove("_selected");
			el.classList.add("_selected");

			if (el.classList.contains("_unviewed"))
				document.querySelector(".list-of-users").classList.add("_filter-on");
			if (el.classList.contains("_all"))
				document.querySelector(".list-of-users").classList.remove("_filter-on");
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
			el.classList.remove("_new-message");
		});
	});

	// Caixa de mensagem
	const textarea = document.querySelector(".__write-message");
	document.querySelector(".__send-message").addEventListener("click", () => {
		sendMessage();
		textarea.focus();
	});

	function sendMessage() {
		if (textarea.value.length > 0) {
			const newElement = document.createElement("p");
			newElement.classList.add("__text-message", "_sended");
			let val = textarea.value
			newElement.innerText = val
			const chat = document.querySelector(".chat-body");
			chat.appendChild(newElement);
			textarea.value = "";
			chat.scrollTo(0, chat.scrollHeight);
			textarea.rows = 1;
		}
	}

	// impede que o enter insira uma quebra de linha
	textarea.addEventListener("keydown", function (event) {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
		}
		if (
			event.key === "Enter" &&
			!event.shiftKey &&
			!event.ctrlKey &&
			!event.altKey
		)
			sendMessage();
	});

	// atualiza a altura da textarea com base no número de linhas
	textarea.addEventListener("input", function () {
		const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
		const lines = textarea.value.split("\n").length;
		const maxLines = parseInt(textarea.getAttribute("maxrows"));
		const height = Math.min(lines * lineHeight, maxLines * lineHeight);
		textarea.style.height = height + "px";
		textarea.rows = Math.max(1, lines);
	});

	// Arquivo
	// Seleciona o elemento HTML onde a tag será adicionada
	const downloadLinkContainer = document.querySelector(".chat-body");

	// Função que envia o arquivo
	function sendFile(fileContent, fileName) {
		// Cria a tag HTML "a" com a função de download
		const downloadLink = document.createElement("a");
		downloadLink.classList.add('__text-message', '_sended')
		downloadLink.href =
			"data:text/plain;charset=utf-8," + encodeURIComponent(fileContent);
		downloadLink.download = fileName;
		downloadLink.textContent = fileName;
		downloadLinkContainer.appendChild(downloadLink);
	}

	// Seleciona o elemento HTML do input file
	const fileInput = document.querySelector("#__file");

	// Adiciona um evento de mudança ao input file
	fileInput.addEventListener("change", function () {
		// Lê o arquivo de entrada
		const file = fileInput.files[0];
		const reader = new FileReader();
		reader.onload = function (event) {
			// Se a leitura for bem-sucedida, chama a função "sendFile"
			sendFile(event.target.result, file.name);
		};
		reader.readAsText(file);
	});
	// Tamanhos de tela reduzidos
}
