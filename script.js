/* ================================================================
   CONFIGURAÇÃO — edite apenas este bloco
   ================================================================ */

// Link do checkout (botão "SIM, QUERO ACESSAR AGORA" da oferta).
// Os demais botões levam até a seção da oferta (#oferta).
// Uma página pode definir os próprios links antes de carregar este arquivo (ex.: index-b.html).
if (window.CHECKOUT_URL === undefined) window.CHECKOUT_URL = "https://pay.wiapy.com/_IZ1PImjYNET";

// Link do checkout com desconto (R$ 14,90) do popup de saída. Vazio ("") desliga o popup.
if (window.POPUP_URL === undefined) window.POPUP_URL = "https://pay.wiapy.com/2w7t-DqYFxj";

// Imagens finais (mockups, páginas internas e selo).
// Deixe "" para manter o placeholder desenhado em CSS.
// Ex.: hero: "assets/mockup-principal.webp"
window.IMAGES = {
  // hero: imagem definida direto no index.html (assets/hero_1.webp)
  seal:      ""  // Dobra 8 — selo de garantia de 7 dias (1:1)
};

(function(){
// Botão da oferta → CHECKOUT_URL
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

// Carrossel infinito: duplica as páginas para o loop não ter emenda
var track = document.querySelector(".gallery-track");
if (track) {
  Array.prototype.slice.call(track.children).forEach(function(fig){
    var clone = fig.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.querySelector("img").alt = "";
    track.appendChild(clone);
  });
}

// FAQ accordion
document.querySelectorAll(".faq-btn").forEach(function(btn){
  btn.addEventListener("click", function(){
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    btn.closest(".faq-item").classList.toggle("open", !open);
  });
});

// Popup de saída: aparece uma vez por sessão
// Desktop: mouse sai pelo topo da janela. Celular: rolagem rápida para cima após ler parte da página.
var pop = document.getElementById("exit-popup");
if (pop && window.POPUP_URL && typeof pop.showModal === "function") {
  pop.querySelector("[data-popup-checkout]").href = window.POPUP_URL;

  var KEY = "exitPopupShown";
  var shown = false;
  try { shown = sessionStorage.getItem(KEY) === "1"; } catch (e) {}
  var armed = false;
  setTimeout(function(){ armed = true; }, 5000);

  function showPopup(){
    if (shown || !armed || pop.open) return;
    shown = true;
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    pop.showModal();
    pop.focus();
  }

  // Quem já clicou para comprar não vê o popup
  document.querySelectorAll("[data-checkout]").forEach(function(a){
    a.addEventListener("click", function(){ shown = true; });
  });

  document.addEventListener("mouseout", function(e){
    if (!e.relatedTarget && e.clientY <= 0) showPopup();
  });

  var lastY = window.scrollY, lastT = Date.now();
  window.addEventListener("scroll", function(){
    var y = window.scrollY, t = Date.now();
    var speed = (lastY - y) / Math.max(t - lastT, 1);
    var depth = y / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    if (window.matchMedia("(pointer:coarse)").matches && speed > 2.5 && depth > 0.3) showPopup();
    lastY = y; lastT = t;
  }, { passive: true });

  pop.querySelectorAll("[data-exit-close]").forEach(function(b){
    b.addEventListener("click", function(){ pop.close(); });
  });
  // Clique fora da caixa (no fundo escuro) fecha
  pop.addEventListener("click", function(e){
    var r = pop.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) pop.close();
  });
}
})();
