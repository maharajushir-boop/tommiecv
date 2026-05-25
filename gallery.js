/* Reads PROJECT_IMAGES from images.js, paints each project card's hero
   photo, and wires a click-to-open lightbox for projects with 2+ photos. */

(function () {
  const cards = document.querySelectorAll(".project[data-slug]");
  if (!cards.length || typeof PROJECT_IMAGES !== "object") return;

  cards.forEach((card) => {
    const slug = card.dataset.slug;
    const images = (PROJECT_IMAGES[slug] || []).slice();
    const slot = card.querySelector(".project-photo-slot");
    if (!slot) return;

    if (images.length === 0) {
      slot.classList.add("is-empty");
      return;
    }

    const hero = document.createElement("img");
    hero.className = "project-photo";
    hero.loading = "lazy";
    hero.alt = card.querySelector(".project-title")?.textContent || "";
    hero.src = `images/projects/${slug}/${images[0]}`;
    hero.onerror = () => {
      slot.classList.add("is-empty");
      slot.innerHTML = "";
    };
    slot.appendChild(hero);

    if (images.length > 1) {
      const badge = document.createElement("span");
      badge.className = "more-badge";
      badge.textContent = `+${images.length - 1}`;
      slot.appendChild(badge);
    }

    slot.classList.add("is-clickable");
    slot.setAttribute("role", "button");
    slot.setAttribute("tabindex", "0");
    slot.setAttribute("aria-label", `Open photos for ${hero.alt}`);
    const open = () => openLightbox(slug, images, hero.alt);
    slot.addEventListener("click", open);
    slot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });

  function openLightbox(slug, images, label) {
    let i = 0;
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = `
      <button class="lightbox-btn lightbox-close" aria-label="Close">×</button>
      <button class="lightbox-btn lightbox-prev" aria-label="Previous"
              ${images.length < 2 ? "hidden" : ""}>‹</button>
      <figure class="lightbox-figure">
        <img class="lightbox-img" alt="" />
        <figcaption class="lightbox-caption"></figcaption>
      </figure>
      <button class="lightbox-btn lightbox-next" aria-label="Next"
              ${images.length < 2 ? "hidden" : ""}>›</button>
    `;
    document.body.appendChild(overlay);
    document.body.classList.add("lightbox-open");

    const img = overlay.querySelector(".lightbox-img");
    const caption = overlay.querySelector(".lightbox-caption");

    function show() {
      img.src = `images/projects/${slug}/${images[i]}`;
      caption.textContent = `${label} — ${i + 1} / ${images.length}`;
    }
    function prev(e) {
      e?.stopPropagation();
      i = (i - 1 + images.length) % images.length;
      show();
    }
    function next(e) {
      e?.stopPropagation();
      i = (i + 1) % images.length;
      show();
    }
    function close() {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("lightbox-open");
      overlay.remove();
    }
    function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }

    overlay
      .querySelector(".lightbox-close")
      .addEventListener("click", close);
    overlay.querySelector(".lightbox-prev").addEventListener("click", prev);
    overlay.querySelector(".lightbox-next").addEventListener("click", next);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", onKey);

    show();
    requestAnimationFrame(() => overlay.classList.add("is-open"));
  }
})();
