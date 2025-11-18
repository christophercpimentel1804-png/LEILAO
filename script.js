let players = [
  {
    name: "Courtois",
    value: 1000,
    overall: 89, img: "https://cdn.futbin.com/content/fifa26/img/players/200052.png",
    position: "GOL",
    stats: { REF: 86, MAOS: 87, POS: 88, VEL: 59, PES: 77 },
    bids: []
  },
  {
    name: "Nuno Mendes",
    value: 1100,
    overall: 86, img: "https://cdn.futbin.com/content/fifa26/img/players/234549.png",
    position: "LE",
    stats: { RIT: 92, DEF: 80, PAS: 83, DRI: 81, FIS: 82 },
    bids: []
  },
  {
    name: "Mbappé",
    value: 2000,
    overall: 91, img: "https://cdn.futbin.com/content/fifa26/img/players/231747.png",
    position: "ATA",
    stats: { RIT: 97, FIN: 91, PAS: 82, DRI: 93, FIS: 83 },
    bids: []
  }
];
let currentPlayerIndex = 0;
let arrematados = [];
let isAdmin = false;

// Toast animado
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
    renderAdminPlayers();
  } else {
    show('auctionPanel');
    renderAuctionPlayer();
    isAdmin = false;
    toast(`Boa sorte, ${name.split(" ")[0]}!`);
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
  const overall = Number(document.getElementById('playerOverall').value);
  const position = document.getElementById('playerPosition').value || "MID";
  // Stats dummy para cadastrar facilmente
  const pace = Number(document.getElementById('playerPace').value);
  if (!name || value < 1 || overall < 50 || !position) {
    toast("Preencha todos os campos corretamente!");
    return;
  }
  players.push({
    name, value, overall, img:"https://cdn.futbin.com/content/fifa26/img/players/unknown.png",
    position,
    stats: { Ritmo: pace },
    bids: []
  });
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
    (p,i) => `<div class="player-card-eafc">
      <img src="${p.img}" alt="${p.name}" class="card-avatar">
      <div class="card-info">
        <div>
          <span class="card-ovr">${p.overall}</span>
          <span class="card-name">${p.name}</span>
          <span class="card-pos">${p.position}</span>
        </div>
        <div class="card-stats">
          ${Object.entries(p.stats).map(([k,v]) => `<span>${k}: <b>${v}</b></span>`).join('')}
        </div>
        <div class="card-value">Valor base: R$ ${p.value}</div>
      </div>
    </div>`
  ).join('');
}

// Leilão de jogadores (cards EA FC)
function renderAuctionPlayer() {
  const p = players[currentPlayerIndex];
  const card = document.getElementById('auctionPlayerCard');
  if (!p) {
    card.innerHTML = "<em>Todos os leilões encerrados!</em>";
    document.getElementById('bidValue').disabled = true;
    document.getElementById('passBtn').disabled = true;
    hide("auctionPanel");
    show("teamSection");
    renderTeamGrid();
    toast("Leilão encerrado!");
    return;
  }
  document.getElementById('bidValue').disabled = false;
  document.getElementById('passBtn').disabled = false;
  card.innerHTML =
    `<div class="player-card-eafc">
      <img src="${p.img}" alt="${p.name}" class="card-avatar">
      <div class="card-info">
        <div>
          <span class="card-ovr">${p.overall}</span>
          <span class="card-name">${p.name}</span>
          <span class="card-pos">${p.position}</span>
        </div>
        <div class="card-stats">
          ${Object.entries(p.stats).map(([k,v]) => `<span>${k}: <b>${v}</b></span>`).join('')}
        </div>
        <div class="card-value">Valor base: R$ ${p.value}</div>
        <div>Lance atual: <b style="color:#ff6600;">${p.bids.length ? 'R$'+Math.max(...p.bids) : '---'}</b></div>
      </div>
    </div>`;
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
    bidInput.value = '';
    toast(`Lance R$${bid} registrado!`);
    arrematados.push(p);
    renderAuctionPlayer();
  } else {
    toast(`O lance deve ser maior que o atual!`);
  }
}
function passBid() {
  currentPlayerIndex++;
  if (currentPlayerIndex >= players.length) {
    hide("auctionPanel");
    show("teamSection");
    renderTeamGrid();
    toast("Leilão encerrado!");
  } else {
    renderAuctionPlayer();
    toast("Você passou este jogador!");
  }
}
function renderBids() {
  const p = players[currentPlayerIndex];
  document.getElementById('bidsList').innerHTML = p && p.bids.length
    ? "<ul style='padding-left:6px;'>" +
        p.bids.map((b,i) => `<li style="margin-bottom:6px;">Lance ${i+1}: <b style="color:#fd913d;">R$${b}</b></li>`).join('') +
      "</ul>"
    : "<p>Seja o primeiro a dar lance!</p>";
}

// Time dos sonhos pós-leilão
function renderTeamGrid() {
  const grid = document.getElementById('teamGrid');
  if (arrematados.length === 0) {
    grid.innerHTML = "<em>Você não conquistou nenhum jogador!</em>";
    return;
  }
  grid.innerHTML = `<div class="team-grid">
    ${arrematados.map(p =>
      `<div class="player-card-eafc">
        <img src="${p.img}" alt="${p.name}" class="card-avatar">
        <div class="card-info">
          <span class="card-ovr">${p.overall}</span>
          <span class="card-name">${p.name}</span>
          <span class="card-pos">${p.position}</span>
          <div>${Object.entries(p.stats).map(([k,v]) => `<span>${k}: <b>${v}</b></span>`).join('')}</div>
        </div>
      </div>`
    ).join('')}
    </div>`;
}
