export default function mobile() {
	const toggle = document.querySelector(".menu-button");
	const sideBar = document.querySelector(".nav-menu");

	toggle.addEventListener("click", () => {
		sideBar.classList.toggle("_expanded");
	});

	document.addEventListener("click", (e) => {
		if (!sideBar.contains(e.target) && !toggle.contains(e.target))
			sideBar.classList.remove("_expanded");
	});

	window.addEventListener("resize", () => {
		if (window.innerWidth > 575.98) {
			sideBar.classList.remove("_expanded");
		}
		if (document.querySelector("._page--chat")) {
			chatMobile();
		}
	});
	function chatMobile() {
		const mainContainer = document.querySelector(".main-container");
		const contactList = document.querySelector(".contact-list");

		// Atribuir vista mobile
		if (window.innerWidth <= 575.98) {
			mainContainer.classList.add("_mobile-view");
			contactList.classList.add("_select-bot-message");
		} else mainContainer.classList.remove("_mobile-view");

		// Tela de chat
		document.querySelector(".back-to-list").addEventListener("click", () => {
			contactList.classList.add("_select-bot-message");
		});
		document.querySelectorAll(".user-bot").forEach((element) => {
			element.addEventListener("click", () => {
				contactList.classList.remove("_select-bot-message");
			});
		});
	}
	if (document.querySelector("._page--chat")) chatMobile();
}
