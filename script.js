let players = [];
let currentPlayerIndex = 0;
let isAdmin = false;

// Função toast animado
function toast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = msg;
  t.classList.remove('hidden');
  setTimeout(()=> t.classList.add('hidden'), 1900);
}

// Entrada pelo nome
function enterAuction() {
  const name = document.getElementById('userNameInput').value.trim();
  if (!name) { toast("Digite o nome!"); return; }
  hide('entrySection');
  show('btnLogout');
  if (name.toLowerCase() === "adm") {
    show('adminPanel');
    isAdmin = true;
    toast("Bem-vindo, ADM!");
  } else {
    show('auctionPanel');
    renderAuctionPlayer();
    isAdmin = false;
    toast(`Boa sorte, ${name || "jogador"}!`);
  }
}

// Botão sair
document.getElementById('btnLogout').onclick = () => location.reload();

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

// ADM adiciona jogadores
document.getElementById('addPlayerForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('playerName').value.trim();
  const value = Number(document.getElementById('playerValue').value);
  if (!name || value < 1) { toast("Nome e valor obrigatórios!"); return;}
  players.push({ name, value, bids: [] });
  renderAdminPlayers();
  document.getElementById('addPlayerForm').reset();
  toast(`Jogador ${name} adicionado!`);
};

function renderAdminPlayers() {
  const container = document.getElementById('adminPlayersList');
  if (players.length === 0) {
    container.innerHTML = "<em>Nenhum jogador cadastrado...</em>";
    return;
  }
  container.innerHTML = players.map(
    (p,i) => `<div class="list-box-item">
      <b>${p.name}</b> <span>💲 <b>R$${p.value}</b></span>
      </div>`
  ).join('');
}

// Leilão de jogadores
function renderAuctionPlayer() {
  const p = players[currentPlayerIndex];
  const card = document.getElementById('auctionPlayerCard');
  if (!p) {
    card.innerHTML = "<em>Aguardando jogadores cadastrados...</em>";
    document.getElementById('bidValue').disabled = true;
    document.getElementById('passBtn').disabled = true;
    return;
  }
  document.getElementById('bidValue').disabled = false;
  document.getElementById('passBtn').disabled = false;

  card.innerHTML = `
    <div class="list-box-item" style="background:#ff660021;">
      <span style="font-size:1.18em;font-weight:bold;letter-spacing:1px; color:#fff;">
        Jogador: <span style="color:var(--orange);">${p.name}</span>
      </span>
      <span style="font-size:1.08em; margin-left:24px;">
        Valor base: <b style="color:#fd913d;">R$${p.value}</b>
      </span>
    </div>
    <div style="margin-top:8px;font-size:1.08em;">
      <span>Lance atual: <b style="color:#ff6600;">${p.bids.length ? 'R$'+Math.max(...p.bids) : '---'}</b></span>
    </div>
  `;
  renderBids();
}

function placeBid() {
  const bidInput = document.getElementById('bidValue');
  const bid = Number(bidInput.value);
  const p = players[currentPlayerIndex];
  if (!p) {toast("Nenhum jogador disponível!"); return;}
  const minBid = p.bids.length ? Math.max(...p.bids)+1 : p.value;
  if (bid >= minBid) {
    p.bids.push(bid);
    renderAuctionPlayer();
    bidInput.value = '';
    toast(`Lance R$${bid} registrado!`);
  } else {
    toast(`O lance deve ser maior que o atual!`);
  }
}
function passBid() {
  currentPlayerIndex++;
  if (currentPlayerIndex >= players.length) {
    document.getElementById('auctionPlayerCard').innerHTML = "<strong style='font-size:1.2em;color:#fd913d;'>Fim dos leilões!</strong>";
    document.getElementById('bidsList').innerHTML = "";
    document.getElementById('passBtn').style.display = "none";
    document.getElementById('bidValue').style.display = "none";
    toast("Leilão encerrado!");
  } else {
    renderAuctionPlayer();
    toast("Você passou este jogador!");
  }
}
function renderBids() {
  const p = players[currentPlayerIndex];
  document.getElementById('bidsList').innerHTML = p.bids.length
    ? "<ul style='padding-left:6px;'>" +
        p.bids.map((b,i) => `<li style="margin-bottom:6px;">Lance ${i+1}: <b style="color:#fd913d;">R$${b}</b></li>`).join('') +
      "</ul>"
    : "<p>Seja o primeiro a dar lance!</p>";
}
