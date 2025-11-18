const jogadoresPosicoes = {
  "Goleiros": [
    "Courtois","Alisson","Marmadashivele","Chavalie","Magnan","Donnaruma","Pope","Pickford","Oblack","Joan Garcia","Ederson"
  ],
  "Laterais Esquerdos": [
    "Nuno Mendes","Balde","Grimaldo","Hernandez","Davies","Cucurella","Gvardiol","Robertson","Robinson","Raum","Kerkez",
    "Mendy","Ait-nouri","Aina","Raphael Guerreiro","Mittelstadt","Gaya","Digne","Carreras","Fran Garcia"
  ],
  "Laterais Direitos": [
    "Kimmich","Hakimi","Kounde","Arnold","Carvajal","Llorente","Cancelo","Dumfries","Di Lorenzo","Fimpong",
    "Laimer","Pedro Porro","Reece James","Trippier","Mazeaoui","Walker","Muñoz","Darmian","Doan","Stones","Araujo"
  ],
  "Zagueiros": [
    "Van Dijk","Gabriel Magalhaes","Marquinhos","Jhonata Tah","Bastoni","Saliba","Rudiguer","Konaté","Ruben Dias","Pacho",
    "Inigo Martinez","Ibanez","Murilo","Upamecano","Bremer","Schlotterbeck","De Vrij","Acerbi","Pavard","Éder Militao","Vivian Moreno",
    "Aké","Gimenez","Le Normand","Hincapie","Konsa","Anton","Van de Ven"
  ],
  "Meio Campo": [
    "Salah","Mbappe","Dembele","Rodri","Bellingham","Raphinha","Vini Jr","Valverde","Pedri","Vitinho","De Jong",
    "Yamal","Saka","Musiala","Wirtz","De Bruyne","Odegaard","Barella","Rice","Mac Allister","Kvaratskhelia",
    "Caicedo","Palmer","Messi","Çalhanoglu","Reijnders","Tonali","Bruno Gruimaraes","Olisie","Nico Williams",
    "Benzema","Cristiano","Griezmann","Kante","Fabian Ruiz","Luis Dias","Phil Foden","Mbeumo","Rodrygo","Gravenberch",
    "Doue","Joao Neves","Bernardo Silva","Pulisic","Rafael Leao","Tchouameni","Gakpo","Simons","Enzo Fernandez",
    "Marmoush","Barcola","Modric","Mane","Diaby","Coman","Ayoze","Iñaki Williams","Merino","Eze","Matheus Cunha",
    "Gordon","Camavinga","Ekitike","Savinha","Adeyemi"
  ],
  "Atacantes": [
    "Haaland","Kane","Lewandowski","Lautaro","Isak","Guirassy","Osimhen","Gyokeres","Alvarez",
    "Son","Thuram","Schick","Lukaku","Sorloth","Lookman","Openda","Mateta","David","Talisca","Kolo Muani","Rashford"
  ]
};

let jogadores = Object.entries(jogadoresPosicoes)
  .flatMap(([pos,arr])=>arr.map(n=>({name:n,pos,selected:false,bids:[],comprador:null})));
let users = []; // [{name, jogadores:[...] }]
let chatMsgs = [];
let leilao = [];
let currentPlayerIndex = 0;
let isAdmin = false;
let nomeUsuarioAtual = "";

// Painel ADM com senha
function entrarPainelADM(){
  const senha = document.getElementById('admSenhaInput').value.trim();
  if(senha==="1804"){
    hide('admSenhaSection');show('adminPanel');isAdmin=true;
    renderADMUsers();renderADMJogadoresPorPosicao();renderADMConfirmados();toast("Acesso ADM liberado!");
  }else{
    toast("Senha incorreta!");
  }
}

// Entrada pelo nome
function enterAuction(){
  const name=document.getElementById('userNameInput').value.trim();
  if(!name){toast("Digite o nome!");return;}
  nomeUsuarioAtual=name;
  hide('entrySection');show('btnLogout');
  if(name.toLowerCase()==="adm"){
    hide('entrySection');show('admSenhaSection'); // Pede senha ADM
  }else{
    // Adiciona usuário e mostra lobby para todos
    let idx = users.findIndex(u=>u.name===name);
    if(idx===-1){
      users.push({name:name,jogadores:[]});
      if(isAdmin)renderADMUsers();
    }
    show('userLobby');renderUsersLobby();
    toast(`Bem-vindo, ${name.split(" ")[0]}!`);
  }
}
document.getElementById('btnLogout').onclick = ()=>location.reload();
function show(id){document.getElementById(id).classList.remove('hidden');}
function hide(id){document.getElementById(id).classList.add('hidden');}

// Usuários no lobby
function renderUsersLobby(){
  document.getElementById('userList').innerHTML=users.map(u=>`<li class="list-box-item">${u.name}</li>`).join('');
  renderUserFormation();
}

// ADM vê todos participantes
function renderADMUsers(){
  document.getElementById('admUserList').innerHTML=users.length==0 ?
    `<li class="list-box-item">Nenhum participante ainda</li>` :
    users.map(u=>`<li class="list-box-item">${u.name}</li>`).join('');
}
// Jogadores agrupados por posição
function renderADMJogadoresPorPosicao(){
  let html="";
  for(const [pos,arr] of Object.entries(jogadoresPosicoes)){
    html+=`<div style="margin-bottom:9px;">
      <div style="font-weight:bold;color:#ff6600;margin-bottom:3px;">${pos}:</div>
      ${arr.map(nome=>{
        let idx = jogadores.findIndex(j=>j.name===nome);
        return `<span style="display:inline-block;margin:3px;">
        <button class="leilao-jogador-btn ${jogadores[idx].selected?'remover':''}" onclick="toggleLeilaoJogador(${idx})">
        ${jogadores[idx].selected?'✓':'+'}</button>
        ${nome} </span>`;
      }).join('')}
    </div>`;
  }
  document.getElementById('admJogadoresPorPosicao').innerHTML=html;
}
// Seleção p/leilão
window.toggleLeilaoJogador=function(idx){
  jogadores[idx].selected=!jogadores[idx].selected;
  renderADMJogadoresPorPosicao();renderADMConfirmados();
}
function renderADMConfirmados(){
  document.getElementById('leilaoConfirmados').innerHTML=jogadores.filter(j=>j.selected)
    .map(j=>`<li class="list-box-item"><span style="color:#ff6600">${j.pos}</span>: ${j.name}</li>`).join('');
}
// Confirma e inicia leilão
window.confirmarLeilao=function(){
  leilao=jogadores.filter(j=>j.selected);
  if(leilao.length==0){toast("Selecione jogadores para o leilão!");return;}
  hide('adminPanel');show('auctionPanel');
  currentPlayerIndex=0;renderAuctionPlayer();
  toast("Leilão confirmado e iniciado!");
};

// Leilão + chat + formação dos jogadores comprados
function renderAuctionPlayer(){
  const p=leilao[currentPlayerIndex];
  const card=document.getElementById('auctionPlayerCard');
  if(!p){
    card.innerHTML="<em>Todos os leilões encerrados!</em>";
    document.getElementById('bidValue').disabled=true;
    document.getElementById('passBtn').disabled=true;
    toast("Fim dos leilões!");return;
  }
  document.getElementById('bidValue').disabled=false;
  document.getElementById('passBtn').disabled=false;
  card.innerHTML=
    `<div class="list-box-item" style="background:#ff660021;">
      <span style="font-weight:bold">${p.pos}: ${p.name}</span>
    </div>
    <div style="margin-top:8px;">
      Lance atual: <b style="color:#ff6600;">${p.bids.length?'R$'+Math.max(...p.bids.map(b=>b.valor)):'---'}</b>
    </div>`;
  renderBids();
}
window.placeBid=function(){
  const bidInput=document.getElementById('bidValue');
  const bid=Number(bidInput.value);
  const p=leilao[currentPlayerIndex];
  if(!p){toast("Nenhum jogador disponível!");return;}
  const minBid=p.bids.length?Math.max(...p.bids.map(b=>b.valor))+1:10;
  if(bid>=minBid){
    p.bids.push({valor:bid,usuario:nomeUsuarioAtual});
    bidInput.value='';
    toast(`Lance R$${bid} registrado!`);renderAuctionPlayer();
    addChatMsg(nomeUsuarioAtual,`deu lance de R$${bid} em ${p.name}`);
    renderChat();
    // Ao final, define comprador:
    p.comprador = nomeUsuarioAtual;
    let idxUser = users.findIndex(u=>u.name===nomeUsuarioAtual);
    if(idxUser!==-1){
      users[idxUser].jogadores = users[idxUser].jogadores||[];
      users[idxUser].jogadores.push(p);
      renderUserFormation();
    }
  }else{toast(`Lance deve ser maior que o atual/min!`);}
};
window.passBid=function(){
  addChatMsg(nomeUsuarioAtual,`passou o jogador ${leilao[currentPlayerIndex].name}`);
  currentPlayerIndex++;
  if(currentPlayerIndex>=leilao.length){
    document.getElementById('auctionPlayerCard').innerHTML="<strong style='font-size:1.2em;color:#fd913d;'>Fim dos leilões!</strong>";
    document.getElementById('bidsList').innerHTML="";
    document.getElementById('passBtn').style.display="none";
    document.getElementById('bidValue').style.display="none";
    toast("Leilão encerrado!");addChatMsg("SISTEMA","Leilão encerrado!");renderChat();
  }else{
    renderAuctionPlayer();toast("Você passou esse jogador!");renderChat();
  }
};
function renderBids(){
  const p=leilao[currentPlayerIndex];
  document.getElementById('bidsList').innerHTML=p&&p.bids.length
    ?"<ul style='padding-left:6px;'>"+p.bids.map((b,i)=>
      `<li style="margin-bottom:6px;">${b.usuario}: <b style="color:#fd913d;">R$${b.valor}</b></li>`).join('')+"</ul>"
    :"<p>Seja o primeiro a dar lance!</p>";
}
// Chat global
function addChatMsg(user,texto){
  chatMsgs.push({user,texto,horario:new Date().toLocaleTimeString()});
}
function renderChat(){
  document.getElementById('chatGlobal').innerHTML=chatMsgs.map(m=>
    `<div class="chat-msg"><b>${m.user}</b> <span style="color:#fd913d">@${m.horario}:</span> ${m.texto}</div>`).join('');
}

// Formação (grid 4-3-3) do usuário participante
function renderUserFormation(){
  let idx = users.findIndex(u=>u.name===nomeUsuarioAtual);
  if(idx===-1)return;
  const jogs = users[idx].jogadores || [];
  let formMap = [
    {name:"GOL",col:2,row:1},
    {name:"ZAG",col:1,row:2},{name:"ZAG",col:3,row:2},
    {name:"LE",col:1,row:3},{name:"MD",col:2,row:3},{name:"LD",col:3,row:3},
    {name:"MC",col:2,row:4},{name:"MC",col:3,row:4},{name:"MC",col:1,row:4},
    {name:"ATA",col:2,row:5},{name:"ATA",col:3,row:5},{name:"ATA",col:1,row:5}
  ];
  let grid = document.getElementById('userFormation');
  grid.innerHTML="";
  let formJogs = jogs.slice(0,11);
  let idxGrid = 0;
  for(let i=0;i<4*4;i++){
    let cell = document.createElement("div");
    cell.className = "formation-cell";
    let jogador = formJogs[idxGrid]?formJogs[idxGrid].name:"";
    cell.textContent = jogador || "";
    grid.appendChild(cell);
    idxGrid++;
    if(idxGrid>=formJogs.length){break;}
  }
}

// Toast animado
function toast(msg){
  const t=document.getElementById('toast');
  t.innerHTML=msg;t.classList.remove('hidden');
  setTimeout(()=>t.classList.add('hidden'),1700);
}
