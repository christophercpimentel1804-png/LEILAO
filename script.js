// Alternância entre claro e escuro
const themeToggle = document.getElementById('themeToggle');
themeToggle.onclick = () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};
// Simulação de login
function login() {
  const email = document.getElementById('loginEmail').value;
  // ADM = qualquer email que contenha "adm"
  if (email.includes('adm')) {
    show('adminDashboard');
    hide('loginSection');
    notify('Login ADM bem-sucedido!');
  } else {
    show('auctionSection');
    hide('loginSection');
    notify('Login usuário bem-sucedido!');
  }
}
function show(id){ document.getElementById(id).classList.remove('hidden'); }
function hide(id){ document.getElementById(id).classList.add('hidden'); }
// Notificação visual animada
function notify(msg) {
  const n = document.getElementById('notification');
  n.textContent = msg;
  n.classList.remove('hidden');
  setTimeout(() => n.classList.add('hidden'), 2000);
}

// Simulação de leilão de jogador
const players = [
  { name: "Astro", avatar: "https://randomuser.me/api/portraits/men/32.jpg", skills: ["Velocidade", "Drible"], value: 100 },
  { name: "Blaze", avatar: "https://randomuser.me/api/portraits/women/44.jpg", skills: ["Força", "Passe"], value: 120 }
];
let bids = [];
function renderAuctionCard() {
  const p = players[0];
  document.getElementById('playerAuctionCard').innerHTML =
    `<img src="${p.avatar}" alt="${p.name}" style="width:70px;border-radius:18px;border:2px solid var(--metal);" />
     <h3>${p.name}</h3>
     <p>Habilidades: <strong>${p.skills.join(', ')}</strong></p>
     <p>Valor atual: <strong>R$ ${bids.length ? Math.max(...bids) : p.value}</strong></p>`;
  renderBids();
}
function placeBid() {
  const bid = Number(document.getElementById('bidValue').value);
  if (bid > 0 && (!bids.length || bid > Math.max(...bids))) {
    bids.push(bid);
    notify("Lance registrado!");
    renderAuctionCard();
    document.getElementById('bidValue').value = '';
  } else {
    notify("Lance inválido ou menor que atual.");
  }
}
function renderBids() {
  document.getElementById('bidsList').innerHTML = bids.length ?
    "<ul>" + bids.map(b => `<li>R$ ${b}</li>`).join('') + "</ul>" :
    "<p>Seja o primeiro a dar lance!</p>";
}
function closeAuction() {
  show('rankingSection');
  hide('auctionSection');
  notify('Leilão encerrado!');
  renderTeamsRanking();
}
// Simulação de ranking
function renderTeamsRanking() {
  document.getElementById('teamsRanking').innerHTML =
    `<p><strong>Time Campeão:</strong> Astro + Blaze<br>
    Vitórias: <span style="color:var(--terroso);font-weight:bold;">${bids.length*3}</span></p>`;
}

// Ao iniciar, renderiza card do leilão
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById('playerAuctionCard')) renderAuctionCard();
});




