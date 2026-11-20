class Slideshow {
  constructor(containerSelector, jsonUrl) {
    this.container = document.querySelector(containerSelector);
    this.jsonUrl = jsonUrl;
    this.slides = [];
    this.index = 0;
    this.timer = null;
    this.init();
  }

  async init() {
    try {
      const response = await fetch(this.jsonUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      this.slides = data.slides || [];
      this.autoplay = Boolean(data.autoplay);
      this.intervalMs = data.intervalMs || 5000;

      if (this.slides.length === 0) throw new Error("No slides found in JSON");

      this.build();
      this.show(0);
      if (this.autoplay) this.startAutoplay();
    } catch (err) {
      this.container.innerHTML =
        `<p class="error">Could not load slideshow: ${err.message}. ` +
        `If you opened the file directly, run a local server instead (see notes).</p>`;
    }
  }

  build() {
    this.container.innerHTML = `
      <div class="slide-frame">
        <img alt="">
        <div class="caption">
          <h2></h2>
          <p></p>
        </div>
      </div>
      <div class="controls">
        <button type="button" data-action="prev" aria-label="Previous slide">Previous</button>
        <div class="dots"></div>
        <button type="button" data-action="next" aria-label="Next slide">Next</button>
      </div>
    `;

    this.img = this.container.querySelector("img");
    this.title = this.container.querySelector("h2");
    this.text = this.container.querySelector("p");
    const dots = this.container.querySelector(".dots");

    this.dotButtons = this.slides.map((slide, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => this.goTo(i));
      dots.appendChild(dot);
      return dot;
    });

    this.container.querySelector('[data-action="prev"]')
      .addEventListener("click", () => this.prev());
    this.container.querySelector('[data-action="next"]')
      .addEventListener("click", () => this.next());

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });
  }

  show(i) {
    this.index = (i + this.slides.length) % this.slides.length;
    const slide = this.slides[this.index];

    this.img.src = slide.image;
    this.img.alt = slide.alt || slide.title || "";
    this.title.textContent = slide.title || "";
    this.text.textContent = slide.text || "";

    this.dotButtons.forEach((dot, n) => {
      dot.setAttribute("aria-current", String(n === this.index));
    });
  }

  next() { this.goTo(this.index + 1); }
  prev() { this.goTo(this.index - 1); }

  goTo(i) {
    this.show(i);
    if (this.autoplay) this.startAutoplay(); // restart the timer after manual navigation
  }

  startAutoplay() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.show(this.index + 1), this.intervalMs);
  }
}