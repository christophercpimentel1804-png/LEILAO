let players = [];
let currentPlayerIndex = 0;
let isAdmin = false;

// Entrada pelo nome
function enterAuction() {
  const name = document.getElementById('userNameInput').value.trim();
  if (!name) { alert("Digite o nome!"); return; }
  hide('entrySection');
  show('btnLogout');
  if (name.toLowerCase() === "adm") {
    show('adminPanel');
    isAdmin = true;
  } else {
    show('auctionPanel');
    renderAuctionPlayer();
    isAdmin = false;
  }
}

// Botão sair
document.getElementById('btnLogout').onclick = () => {
  location.reload();
};

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

// ADM adiciona jogadores
document.getElementById('addPlayerForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('playerName').value.trim();
  const value = Number(document.getElementById('playerValue').value);
  if (!name || value < 1) { alert("Nome e valor obrigatórios!"); return;}
  players.push({ name, value, bids: [] });
  renderAdminPlayers();
  document.getElementById('addPlayerForm').reset();
};

function renderAdminPlayers() {
  const container = document.getElementById('adminPlayersList');
  if (players.length === 0) return container.innerHTML = "<em>Nenhum jogador cadastrado...</em>";
  container.innerHTML = players.map(
    (p,i) => `<div style="margin:11px 0; border-bottom: 1px solid #ff6600;">
      <b>${p.name}</b> <span style="color:#ff6600;font-weight:bold;">R$${p.value}</span>
      </div>`
  ).join('');
}

// Leilão de jogadores
function renderAuctionPlayer() {
  const p = players[currentPlayerIndex];
  if (!p) return document.getElementById('auctionPlayerCard').innerHTML = "<em>Aguardando jogadores do ADM...</em>";
  document.getElementById('auctionPlayerCard').innerHTML =
    `<h3 style="color:#ff6600;">${p.name}</h3>
     <p style="font-size:1.1em;">Valor base: <strong>R$${p.value}</strong></p>
     <p>Lance atual: <strong>${p.bids.length ? 'R$'+Math.max(...p.bids) : '---'}</strong></p>`;
  renderBids();
}

function placeBid() {
  const bidInput = document.getElementById('bidValue');
  const bid = Number(bidInput.value);
  const p = players[currentPlayerIndex];
  if (!p) return;
  const minBid = p.bids.length ? Math.max(...p.bids)+1 : p.value;
  if (bid >= minBid) {
    p.bids.push(bid);
    renderAuctionPlayer();
    bidInput.value = '';
  } else {
    alert("O lance deve ser maior que o valor base/lance atual!");
  }
}
function passBid() {
  currentPlayerIndex++;
  if (currentPlayerIndex >= players.length) {
    document.getElementById('auctionPlayerCard').innerHTML = "<strong>Fim dos leilões!</strong>";
    document.getElementById('bidsList').innerHTML = "";
    document.querySelector('.passBtn').style.display = "none";
  } else {
    renderAuctionPlayer();
  }
}
function renderBids() {
  const p = players[currentPlayerIndex];
  document.getElementById('bidsList').innerHTML = p.bids.length
    ? "<ul>" + p.bids.map((b,i) => `<li>Usuário${i+1}: R$${b}</li>`).join('') + "</ul>"
    : "<p>Seja o primeiro a dar lance!</p>";
}
