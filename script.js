// Saldo dos usuários
let usuarios = {}; // nome -> saldo

// Jogadores cadastrados
let jogadores = [
  { name: "Courtois", overall: 89, pace: 59, def: 88, position: "GOL", selected:false, bids:[] },
  { name: "Nuno Mendes", overall: 86, pace: 92, def: 80, position: "LE", selected:false, bids:[] },
  { name: "Mbappé", overall: 91, pace: 97, def: 37, position: "ATA", selected:false, bids:[] }
];
let leilao = [];
let currentPlayerIndex = 0;
let isAdmin = false;

// Toast animado
function toast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = msg;
  t.classList.remove('hidden');
  setTimeout(()=> t.classList.add('hidden'), 1800);
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
    renderLeilaoSelect();
    renderUsuariosMoney();
  } else {
    show('auctionPanel');
    renderAuctionPlayer();
    isAdmin = false;
    toast(`Boa sorte, ${name.split(" ")[0]}!`);
  }
}
document.getElementById('btnLogout').onclick = () => location.reload();
function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

// ADM adiciona/atualiza saldo
document.getElementById('addUserForm').onsubmit = function(e){
  e.preventDefault();
  const nome = document.getElementById('admUserName').value.trim();
  const saldo = Number(document.getElementById('admUserMoney').value);
  if(!nome || saldo<1) { toast("Preencha nome e saldo!"); return;}
  usuarios[nome] = saldo;
  renderUsuariosMoney();
  document.getElementById('addUserForm').reset();
  toast(`Saldo de ${nome} definido: R$${saldo}`);
};
function renderUsuariosMoney(){
  const div = document.getElementById('userMoneyList');
  if(Object.keys(usuarios).length==0) return div.innerHTML="<em>Nenhum saldo definido.</em>";
  div.innerHTML = Object.entries(usuarios).map(([nome,valor]) =>
    `<div class="list-box-item"><span>${nome}</span><span>💰 R$${valor}</span></div>`
  ).join('');
}

// ADM adiciona jogador
document.getElementById('addPlayerForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('playerName').value.trim();
  const overall = Number(document.getElementById('playerOverall').value);
  const pace = Number(document.getElementById('playerPace').value);
  const def = Number(document.getElementById('playerDef').value);
  const position = document.getElementById('playerPosition').value || "MID";
  if (!name || overall < 50 || pace < 1 || def < 1 || !position) {
    toast("Preencha todos os campos corretamente!");
    return;
  }
  jogadores.push({ name, overall, pace, def, position, selected:false, bids:[] });
  renderAdminPlayers();
  renderLeilaoSelect();
  document.getElementById('addPlayerForm').reset();
  toast(`Jogador ${name} adicionado!`);
};

// Lista direta
function renderAdminPlayers(){
  const container = document.getElementById('adminPlayersList');
  if (jogadores.length === 0) {
    container.innerHTML = "<em>Nenhum jogador cadastrado...</em>";
    return;
  }
  container.innerHTML = jogadores.map((p,i) =>
    `<div class="list-box-item">
      <span><b>${p.name} (${p.position})</b> | OVR: ${p.overall} | Ritmo: ${p.pace} | Defesa: ${p.def}</span>
    </div>`
  ).join('');
}

// Seleção de jogadores para leilão
function renderLeilaoSelect(){
  const box = document.getElementById('leilaoSelectList');
  box.innerHTML = jogadores
    .map((p,i)=>`<div class="list-box-item">
      <span><b>${p.name} (${p.position})</b> | OVR: ${p.overall} | Ritmo: ${p.pace} | Defesa: ${p.def}</span>
      <button class="leilao-jogador-btn ${p.selected?'remover':''}" onclick="toggleLeilaoJogador(${i})">
        ${p.selected?'Remover':'Selecionar'}
      </button>
    </div>`)
    .join('');
}
window.toggleLeilaoJogador = function(idx){
  jogadores[idx].selected = !jogadores[idx].selected;
  renderLeilaoSelect();
}

// Iniciar leilão só com selecionados
window.iniciarLeilao = function(){
  leilao = jogadores.filter(p=>p.selected);
  if(leilao.length==0) { toast("Selecione jogadores para o leilão!"); return;}
  hide('adminPanel');
  show('auctionPanel');
  currentPlayerIndex = 0;
  renderAuctionPlayer();
  toast("Leilão iniciado!");
};

// Painel do leilão
function renderAuctionPlayer() {
  const p = leilao[currentPlayerIndex];
  const card = document.getElementById('auctionPlayerCard');
  if (!p) {
    card.innerHTML = "<em>Todos os leilões encerrados!</em>";
    document.getElementById('bidValue').disabled = true;
    document.getElementById('passBtn').disabled = true;
    toast("Fim dos leilões!");
    return;
  }
  document.getElementById('bidValue').disabled = false;
  document.getElementById('passBtn').disabled = false;
  card.innerHTML =
    `<div class="list-box-item" style="background:#ff660021;">
      <span style="font-weight:bold">${p.name} (${p.position})</span>
      <span>OVR: <b>${p.overall}</b> | Ritmo: <b>${p.pace}</b> | Defesa: <b>${p.def}</b></span>
    </div>
    <div style="margin-top:8px;font-size:1.08em;">
      Lance atual: <b style="color:#ff6600;">${p.bids.length ? 'R$'+Math.max(...p.bids) : '---'}</b>
    </div>`;
  renderBids();
}
window.placeBid = function(){
  const bidInput = document.getElementById('bidValue');
  const bid = Number(bidInput.value);
  const p = leilao[currentPlayerIndex];
  if (!p) {toast("Nenhum jogador disponível!"); return;}
  const minBid = p.bids.length ? Math.max(...p.bids)+1 : 10;
  if (bid >= minBid) {
    p.bids.push(bid);
    bidInput.value = '';
    toast(`Lance R$${bid} registrado!`);
    renderAuctionPlayer();
  } else {
    toast(`O lance deve ser maior que o atual/lance mínimo!`);
  }
};
window.passBid = function(){
  currentPlayerIndex++;
  if(currentPlayerIndex >= leilao.length) {
    document.getElementById('auctionPlayerCard').innerHTML = "<strong style='font-size:1.2em;color:#fd913d;'>Fim dos leilões!</strong>";
    document.getElementById('bidsList').innerHTML = "";
    document.getElementById('passBtn').style.display = "none";
    document.getElementById('bidValue').style.display = "none";
    toast("Leilão encerrado!");
  } else {
    renderAuctionPlayer();
    toast("Você passou este jogador!");
  }
};
function renderBids() {
  const p = leilao[currentPlayerIndex];
  document.getElementById('bidsList').innerHTML = p && p.bids.length
    ? "<ul style='padding-left:6px;'>" +
        p.bids.map((b,i) => `<li style="margin-bottom:6px;">Lance ${i+1}: <b style="color:#fd913d;">R$${b}</b></li>`).join('') +
      "</ul>"
    : "<p>Seja o primeiro a dar lance!</p>";
}
