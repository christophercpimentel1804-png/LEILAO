const jogadoresPosicoes = {
  "Goleiros": ["Courtois","Alisson","Marmadashivele","Chavalie","Magnan","Donnaruma","Pope","Pickford","Oblack","Joan Garcia","Ederson"],
  "Laterais Esquerdos": ["Nuno Mendes","Balde","Grimaldo","Hernandez","Davies","Cucurella","Gvardiol","Robertson","Robinson","Raum","Kerkez","Mendy","Ait-nouri","Aina","Raphael Guerreiro","Mittelstadt","Gaya","Digne","Carreras","Fran Garcia"],
  "Laterais Direitos": ["Kimmich","Hakimi","Kounde","Arnold","Carvajal","Llorente","Cancelo","Dumfries","Di Lorenzo","Fimpong","Laimer","Pedro Porro","Reece James","Trippier","Mazeaoui","Walker","Muñoz","Darmian","Doan","Stones","Araujo"],
  "Zagueiros": ["Van Dijk","Gabriel Magalhaes","Marquinhos","Jhonata Tah","Bastoni","Saliba","Rudiguer","Konaté","Ruben Dias","Pacho","Inigo Martinez","Ibanez","Murilo","Upamecano","Bremer","Schlotterbeck","De Vrij","Acerbi","Pavard","Éder Militao","Vivian Moreno","Aké","Gimenez","Le Normand","Hincapie","Konsa","Anton","Van de Ven"],
  "Meio Campo": ["Salah","Mbappe","Dembele","Rodri","Bellingham","Raphinha","Vini Jr","Valverde","Pedri","Vitinho","De Jong","Yamal","Saka","Musiala","Wirtz","De Bruyne","Odegaard","Barella","Rice","Mac Allister","Kvaratskhelia","Caicedo","Palmer","Messi","Çalhanoglu","Reijnders","Tonali","Bruno Gruimaraes","Olisie","Nico Williams","Benzema","Cristiano","Griezmann","Kante","Fabian Ruiz","Luis Dias","Phil Foden","Mbeumo","Rodrygo","Gravenberch","Doue","Joao Neves","Bernardo Silva","Pulisic","Rafael Leao","Tchouameni","Gakpo","Simons","Enzo Fernandez","Marmoush","Barcola","Modric","Mane","Diaby","Coman","Ayoze","Iñaki Williams","Merino","Eze","Matheus Cunha","Gordon","Camavinga","Ekitike","Savinha","Adeyemi"],
  "Atacantes": ["Haaland","Kane","Lewandowski","Lautaro","Isak","Guirassy","Osimhen","Gyokeres","Alvarez","Son","Thuram","Schick","Lukaku","Sorloth","Lookman","Openda","Mateta","David","Talisca","Kolo Muani","Rashford"]
};

// Formações táticas (de baixo para cima: GOL no fundo, ATA no ataque)
const formacoes = {
  '4-3-3': {
    grid: 'repeat(5, 1fr)',
    rows: 'repeat(5, 1fr)',
    posicoes: [
      { pos: 'ATA', col:'1', row:'1' },
      { pos: 'ATA', col:'3', row:'1' },
      { pos: 'ATA', col:'5', row:'1' },
      { pos: 'MC', col:'1', row:'2' },
      { pos: 'MC', col:'3', row:'2' },
      { pos: 'MC', col:'5', row:'2' },
      { pos: 'LE', col:'1', row:'4' },
      { pos: 'ZAG', col:'2', row:'4' },
      { pos: 'ZAG', col:'4', row:'4' },
      { pos: 'LD', col:'5', row:'4' },
      { pos: 'GOL', col:'3', row:'5' }
    ]
  },
  '4-4-2': {
    grid: 'repeat(5, 1fr)',
    rows: 'repeat(5, 1fr)',
    posicoes: [
      { pos: 'ATA', col:'2', row:'1' },
      { pos: 'ATA', col:'4', row:'1' },
      { pos: 'ME', col:'1', row:'2' },
      { pos: 'MC', col:'2', row:'2' },
      { pos: 'MC', col:'4', row:'2' },
      { pos: 'MD', col:'5', row:'2' },
      { pos: 'LE', col:'1', row:'4' },
      { pos: 'ZAG', col:'2', row:'4' },
      { pos: 'ZAG', col:'4', row:'4' },
      { pos: 'LD', col:'5', row:'4' },
      { pos: 'GOL', col:'3', row:'5' }
    ]
  },
  '3-5-2': {
    grid: 'repeat(5, 1fr)',
    rows: 'repeat(5, 1fr)',
    posicoes: [
      { pos: 'ATA', col:'2', row:'1' },
      { pos: 'ATA', col:'4', row:'1' },
      { pos: 'ME', col:'1', row:'2' },
      { pos: 'MC', col:'2', row:'2' },
      { pos: 'MC', col:'3', row:'2' },
      { pos: 'MC', col:'4', row:'2' },
      { pos: 'MD', col:'5', row:'2' },
      { pos: 'ZAG', col:'2', row:'4' },
      { pos: 'ZAG', col:'3', row:'4' },
      { pos: 'ZAG', col:'4', row:'4' },
      { pos: 'GOL', col:'3', row:'5' }
    ]
  },
  '4-2-3-1': {
    grid: 'repeat(5, 1fr)',
    rows: 'repeat(5, 1fr)',
    posicoes: [
      { pos: 'ATA', col:'3', row:'1' },
      { pos: 'ME', col:'1', row:'2' },
      { pos: 'MO', col:'3', row:'2' },
      { pos: 'MD', col:'5', row:'2' },
      { pos: 'MC', col:'2', row:'3' },
      { pos: 'MC', col:'4', row:'3' },
      { pos: 'LE', col:'1', row:'4' },
      { pos: 'ZAG', col:'2', row:'4' },
      { pos: 'ZAG', col:'4', row:'4' },
      { pos: 'LD', col:'5', row:'4' },
      { pos: 'GOL', col:'3', row:'5' }
    ]
  },
  '5-3-2': {
    grid: 'repeat(5, 1fr)',
    rows: 'repeat(5, 1fr)',
    posicoes: [
      { pos: 'ATA', col:'2', row:'1' },
      { pos: 'ATA', col:'4', row:'1' },
      { pos: 'MC', col:'2', row:'2' },
      { pos: 'MC', col:'3', row:'2' },
      { pos: 'MC', col:'4', row:'2' },
      { pos: 'LE', col:'1', row:'4' },
      { pos: 'ZAG', col:'2', row:'4' },
      { pos: 'ZAG', col:'3', row:'4' },
      { pos: 'ZAG', col:'4', row:'4' },
      { pos: 'LD', col:'5', row:'4' },
      { pos: 'GOL', col:'3', row:'5' }
    ]
  }
};

let jogadores = Object.entries(jogadoresPosicoes)
  .flatMap(([pos,arr])=>arr.map(n=>({name:n,pos,selected:false,bids:[],comprador:null})));
let users = [];
let chatMsgs = [];
let leilao = [];
let currentPlayerIndex = 0;
let isAdmin = false;
let nomeUsuarioAtual = "";

function entrarPainelADM(){
  const senha = document.getElementById('admSenhaInput').value.trim();
  if(senha==="1804"){
    hide('admSenhaSection');show('adminPanel');isAdmin=true;
    renderADMUsers();renderADMJogadoresPorPosicao();renderADMConfirmados();toast("Acesso liberado!");
  }else{
    toast("Senha incorreta!");
  }
}

function enterAuction(){
  const name=document.getElementById('userNameInput').value.trim();
  if(!name){toast("Digite o nome!");return;}
  nomeUsuarioAtual=name;
  hide('entrySection');show('btnLogout');
  if(name.toLowerCase()==="adm"){
    hide('entrySection');show('admSenhaSection');
  }else{
    let idx = users.findIndex(u=>u.name===name);
    if(idx===-1){
      users.push({name:name,jogadores:[],formacao:'4-3-3'});
    }
    setupFormationSelect();
    show('userLobby');renderUsersLobby();
    toast(`Bem-vindo, ${name.split(" ")[0]}!`);
    if(isAdmin)renderADMUsers();
  }
}

function setupFormationSelect(){
  const sel=document.getElementById('formationSelect');
  sel.innerHTML="";
  Object.keys(formacoes).forEach(f=>{
    const op=document.createElement('option');
    op.value=f;op.textContent=f;
    sel.appendChild(op);
  });
  let idx = users.findIndex(u=>u.name===nomeUsuarioAtual);
  if(idx!==-1){
    sel.value = users[idx].formacao;
  }
}

function trocarFormacao(){
  let idx = users.findIndex(u=>u.name===nomeUsuarioAtual);
  if(idx!==-1){
    users[idx].formacao=document.getElementById('formationSelect').value;
    renderUserFormation();
    toast("Formação alterada!");
  }
}

document.getElementById('btnLogout').onclick = ()=>location.reload();
function show(id){document.getElementById(id).classList.remove('hidden');}
function hide(id){document.getElementById(id).classList.add('hidden');}

function renderUsersLobby(){
  document.getElementById('userList').innerHTML=users.map(u=>`<li class="list-box-item">${u.name}</li>`).join('');
  renderUserFormation();
}

function renderADMUsers(){
  document.getElementById('admUserList').innerHTML=users.length==0 ?
    `<li class="list-box-item">Nenhum participante ainda</li>` :
    users.map(u=>`<li class="list-box-item">${u.name}</li>`).join('');
}

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
        ${nome}</span>`;
      }).join('')}
    </div>`;
  }
  document.getElementById('admJogadoresPorPosicao').innerHTML=html;
}

window.toggleLeilaoJogador=function(idx){
  jogadores[idx].selected=!jogadores[idx].selected;
  renderADMJogadoresPorPosicao();renderADMConfirmados();
}

function renderADMConfirmados(){
  document.getElementById('leilaoConfirmados').innerHTML=jogadores.filter(j=>j.selected)
    .map(j=>`<li class="list-box-item"><span style="color:#ff6600">${j.pos}</span>: ${j.name}</li>`).join('');
}

window.confirmarLeilao=function(){
  leilao=jogadores.filter(j=>j.selected);
  if(leilao.length==0){toast("Selecione jogadores para o leilão!");return;}
  hide('adminPanel');show('auctionPanel');
  currentPlayerIndex=0;renderAuctionPlayer();
  toast("Leilão confirmado e iniciado!");
};

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
    p.comprador = nome
