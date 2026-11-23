function roll(sides) {
    return Math.floor(Math.random() * sides) +1;
}

document.querySelectorAll("button[data-sides]").forEach((btn) =>{
    btn.addEventListener("click", () => {
        const result = roll(Number(btn.dataset.sides));
        document.getElementById(btn.dataset.target).textContent = result;
    });
});