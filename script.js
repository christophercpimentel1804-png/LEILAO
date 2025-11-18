// Lista dos jogadores (somente nomes, conforme enviado pelo usuário)
const jogadoresAll = [
  "Courtois","Alisson","Marmadashivele","Chavalie","Magnan","Donnaruma","Pope","Pickford","Oblack","Joan Garcia","Ederson",
  "Nuno Mendes","Balde","Grimaldo","Hernandez","Davies","Cucurella","Gvardiol","Robertson","Robinson","Raum","Kerkez",
  "Mendy","Ait-nouri","Aina","Raphael Guerreiro","Mittelstadt","Gaya","Digne","Carreras","Fran Garcia",
  "Kimmich","Hakimi","Kounde","Arnold","Carvajal","Llorente","Cancelo","Dumfries","Di Lorenzo","Fimpong",
  "Laimer","Pedro Porro","Reece James","Trippier","Mazeaoui","Walker","Muñoz","Darmian","Doan","Stones","Araujo",
  "Van Dijk","Gabriel Magalhaes","Marquinhos","Jhonata Tah","Bastoni","Saliba","Rudiguer","Konaté","Ruben Dias","Pacho",
  "Inigo Martinez","Ibanez","Murilo","Upamecano","Bremer","Schlotterbeck","De Vrij","Acerbi","Pavard","Éder Militao","Vivian Moreno",
  "Aké","Gimenez","Le Normand","Hincapie","Konsa","Anton","Van de Ven",
  "Salah","Mbappe","Dembele","Rodri","Bellingham","Raphinha","Vini Jr","Valverde","Pedri","Vitinho","De Jong",
  "Yamal","Saka","Musiala","Wirtz","De Bruyne","Odegaard","Barella","Rice","Mac Allister","Kvaratskhelia",
  "Caicedo","Palmer","Messi","Çalhanoglu","Reijnders","Tonali","Bruno Gruimaraes","Olisie","Nico Williams",
  "Benzema","Cristiano","Griezmann","Kante","Fabian Ruiz","Luis Dias","Phil Foden","Mbeumo","Rodrygo","Gravenberch",
  "Doue","Joao Neves","Bernardo Silva","Pulisic","Rafael Leao","Tchouameni","Gakpo","Simons","Enzo Fernandez",
  "Marmoush","Barcola","Modric","Mane","Diaby","Coman","Ayoze","Iñaki Williams","Merino","Eze","Matheus Cunha",
  "Gordon","Camavinga","Ekitike","Savinha","Adeyemi",
  "Haaland","Kane","Lewandowski","Lautaro","Isak","Guirassy","Osimhen","Gyokeres","Alvarez",
  "Son","Thuram","Schick","Lukaku","Sorloth","Lookman","Openda","Mateta","David","Talisca","Kolo Muani","Rashford"
];
let jogadores = jogadoresAll.map(n=>({name:n,selected:false,bids:[]})); // Array que será filtrado para leilão

let users = []; // participantes {name, money}
let chatMsgs = [];
let leilao = [];
let currentPlayerIndex = 0;
let isAdmin = false;
let nomeUsuarioAtual = "";

// Toast animado
function toast(msg) {
  const t = document.getElementById('toast');
  t.innerHTML = msg;
  t.classList.remove('hidden');
  setTimeout(()=> t.classList.add('hidden'), 1700);
}

// Entrada pelo nome
function enterAuction() {
  const name = document.getElementById('userNameInput').value.trim();
  if (!name) { toast("Digite o nome!"); return; }
  nomeUsuarioAtual = name;
  hide('entrySection');
  show('btnLogout');
  if (name.toLowerCase() === "adm") {
    isAdmin = true;
    show('adminPanel');
    renderADMUsers();
    renderADMJogadores();
    renderLeilaoSelect();
    toast("Bem-vindo, ADM!");
  } else {
    // Adiciona usuário e mostra lobby para todos
    users.push({name:name,money:0});
    show('userLobby');
    renderUsersLobby();
    toast(`Bem-vindo, ${name.split(" ")[0]}!`);
  }
}
document.getElementById('btnLogout').onclick = () => location.reload();

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

// PARTICIPANTES: lista na tela inicial
function renderUsersLobby() {
  // Usuários participantes
  document.getElementById('userList').innerHTML = users
    .map(u=>`<li class="list-box-item">${u.name}</li>`).join('');
  document.getElementById('userBalanceList').innerHTML = users
    .map(u=>`<li class="list-box-item">${u.name}: <span>💰 R$ ${u.money || 0}</span></li>`).join('');
}

// ADM vê todos participantes para definir saldo
function renderADMUsers() {
  document.getElementById('admUserList').innerHTML = users.length==0
    ? `<li class="list-box-item">Nenhum participante ainda</li>`
    : users.map(u=>`<li class="list-box-item">${u.name}: <span>💰 R$ ${u.money||0}</span></li>`).join('');
}
// ADM escolhe saldo do participante
document.getElementById('addUserMoneyForm').onsubmit = function(e){
  e.preventDefault();
  const nome = document.getElementById('admUserNameMoney').value.trim();
  const saldo = Number(document.getElementById('admUserMoney').value);
  if(!nome || saldo<1) { toast("Preencha nome e saldo!"); return;}
  let idx = users.findIndex(u=>u.name===nome);
  if(idx!==-1){
    users[idx].money = saldo;
    toast(`Saldo de ${nome} atualizado para R$${saldo}`);
  } else {
    users.push({name:nome,money:saldo});
    toast(`Usuário ${nome} e saldo adicionado!`);
  }
  renderADMUsers();
  renderUsersLobby();
  document.getElementById('addUserMoneyForm').reset();
};

// ADM: lista de jogadores para seleção
function renderADMJogadores(){
  document.getElementById('admJogadorList').innerHTML = jogadores
    .map((j,i)=>`<div class="list-box-item">
      <span>${j.name}</span>
    </div>`).join('');
}

// Seleção de jogadores para o leilão
function renderLeilaoSelect(){
  document.getElementById('leilaoSelectList').innerHTML = jogadores
    .map((p,i)=>`<div class="list-box-item">
      <span>${p.name}</span>
      <button class="leilao-jogador-btn ${p.selected?'remover':''}" onclick="toggleLeilaoJogador(${i})">
        ${p.selected?'Remover':'Selecionar'}
      </button>
    </div>`).join('');
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

// Painel de leilão + chat
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
      <span style="font-weight:bold">${p.name}</span>
    </div>
    <div style="margin-top:8px;">
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
    addChatMsg(nomeUsuarioAtual, `deu um lance de R$${bid} em ${p.name}`);
    renderChat();
  } else {
    toast(`O lance deve ser maior que o atual/lance mínimo!`);
  }
};
window.passBid = function(){
  addChatMsg(nomeUsuarioAtual, `passou o jogador ${leilao[currentPlayerIndex].name}`);
  currentPlayerIndex++;
  if(currentPlayerIndex >= leilao.length) {
    document.getElementById('auctionPlayerCard').innerHTML = "<strong style='font-size:1.2em;color:#fd913d;'>Fim dos leilões!</strong>";
    document.getElementById('bidsList').innerHTML = "";
    document.getElementById('passBtn').style.display = "none";
    document.getElementById('bidValue').style.display = "none";
    toast("Leilão encerrado!");
    addChatMsg("SISTEMA", "O leilão foi encerrado!");
    renderChat();
  } else {
    renderAuctionPlayer();
    toast("Você passou este jogador!");
    renderChat();
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

// Chat global do leilão
function addChatMsg(user, texto){
  chatMsgs.push({user,texto,horario:new Date().toLocaleTimeString()});
}
function renderChat(){
  document.getElementById('chatGlobal').innerHTML = chatMsgs
    .map(m=>`<div class="chat-msg"><b>${m.user}</b> <span style="color:#fd913d">@${m.horario}:</span> ${m.texto}</div>`)
    .join('');
}
