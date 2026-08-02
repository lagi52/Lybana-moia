const button = document.getElementById("start");
const second = document.querySelector(".second-screen");

button.addEventListener("click", () => {
    document.querySelector(".intro").style.opacity = "0";
    setTimeout(() => {
        document.querySelector(".intro").style.display = "none";
        second.classList.add("show");
    }, 1000);
});
