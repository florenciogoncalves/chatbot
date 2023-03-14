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
			newElement.textContent = textarea.value;
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


}
