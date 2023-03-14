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
			sideBar.classList.remove('_expanded')
		}
	});
}
