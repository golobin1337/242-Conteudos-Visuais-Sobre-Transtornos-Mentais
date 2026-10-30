/* ================================================================
   CONFIGURAÇÃO — edite apenas este bloco
   ================================================================ */

// Link do checkout. TODOS os botões da página apontam para cá.
window.CHECKOUT_URL = "#";

// Imagens finais (mockups, páginas internas e selo).
// Deixe "" para manter o placeholder desenhado em CSS.
// Ex.: hero: "assets/mockup-principal.webp"
window.IMAGES = {
  // hero: imagem definida direto no index.html (assets/hero_1.webp)
  bonus1:    "", // Dobra 6 — Guia Visual de Diagnóstico Diferencial (4:3)
  bonus2:    "", // Dobra 6 — Checklist de Anamnese e Exame Mental (4:3)
  bonus3:    "", // Dobra 6 — Guia Visual de Psicofármacos (4:3)
  bonus4:    "", // Dobra 6 — 50 Casos Clínicos Comentados (4:3)
  bonus5:    "", // Dobra 6 — Revisão Expressa de Saúde Mental (4:3)
  seal:      ""  // Dobra 8 — selo de garantia de 7 dias (1:1)
};

(function(){
// Todos os CTAs → CHECKOUT_URL
var url = window.CHECKOUT_URL || "#";
document.querySelectorAll("[data-checkout]").forEach(function(a){ a.href = url; });

// Troca placeholders por imagens reais quando configuradas em IMAGES
var imgs = window.IMAGES || {};
document.querySelectorAll("[data-slot]").forEach(function(fig){
  var src = imgs[fig.dataset.slot];
  if (!src) return;
  var img = new Image();
  img.src = src;
  img.alt = fig.dataset.alt || "";
  img.decoding = "async";
  if (fig.hasAttribute("data-eager")) img.fetchPriority = "high"; else img.loading = "lazy";
  fig.appendChild(img);
  fig.classList.add("has-img");
});

// FAQ accordion
document.querySelectorAll(".faq-btn").forEach(function(btn){
  btn.addEventListener("click", function(){
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    btn.closest(".faq-item").classList.toggle("open", !open);
  });
});
})();
