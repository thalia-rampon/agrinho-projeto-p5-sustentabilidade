// Variáveis gerais
let tela = 'abertura'; // Mude a tela inicial para 'abertura'
const larguraBotao = 300;
const alturaBotao = 60;

// Variáveis para partículas de brilho
let particles = [];

//Variáveis Jogo 1: Colheita Feliz
let alimentos = [];
const velocidadeQueda = 3;
let personagemX;
let pontosColheita = 0;
let verdesColetados = 0;
let vermelhosColetados = 0;
const LIMITE_VERDES = 20;
const LIMITE_VERMELHOS = 5;
const PONTOS_ARA_VITORIA_COLHEITA = 150;

const emojiPersonagem = '👩🏽‍🌾'; 
const emojisVerdes = ['🍎', '🥦', '🥕', '🍇', '🌽', '🍓', '🥑']; 
const emojisVermelhosAjustados = ['🍾', '🗑️', '🔋', '⚙️', '💊', '☠️'];

//Variáveis Jogo 2: Corrida Sustentável
let tratorX;
let obstaculos = [];
let pontosCorrida = 0;
let tempoObstaculo = 0;
const velocidadeObstaculo = 13;
const PONTOS_PARA_VITORIA_CORRIDA = 200;

const emojiTrator = '🚜';
const emojisLixo = ['🗑️', '🍾', '🔋', '⚙️', '🍕', '🥤', '🚬', '🔪','🛹','🪨', '💉']; 

//Variáveis Jogo 3: Memória Verde
let cartas = [];
let paresEncontrados = 0;
let cartasViradas = [];
let memoriaJogando = true;
let tempoRestanteMemoria = 30;
let timerMemoriaAtivo = false;
let tempoInicialMemoria;
let gameOverMemoriaPorTempo = false;
const imagensMemoria = ['🍃', '🌱', '🌿', '🍀', '🍁', '🌾', '🌻', '🌸', '🌳', '💧', '🌍', '🌞']; 

//Variáveis Jogo 4: Quiz Ambiental
const perguntas = [ 
  {
    pergunta: "Qual é a principal causa do aquecimento global?",
    opcoes: ["Desmatamento", "Emissão de gases de efeito estufa", "Uso de energia solar", "Reciclagem"],
    correta: 1
  },
  {
    pergunta: "Qual dessas ações ajuda a economizar água?",
    opcoes: ["Deixar a torneira aberta", "Tomar banhos longos", "Consertar vazamentos", "Lavar a calçada com mangueira"],
    correta: 2
  },
  {
    pergunta: "O que significa 'reciclar'?",
    opcoes: ["Jogar o lixo fora", "Reutilizar materiais para fazer novos produtos", "Queimar o lixo", "Enterrar o lixo"],
    correta: 1
  },
  {
    pergunta: "Qual fonte de energia é considerada renovável?",
    opcoes: ["Petróleo", "Carvão mineral", "Gás natural", "Energia solar"],
    correta: 3
  },
  {
    pergunta: "Por que é importante separar o lixo para reciclagem?",
    opcoes: ["Para que a lixeira fique mais organizada", "Para facilitar o trabalho dos coletores", "Para reduzir a poluição e economizar recursos", "Não é importante separar o lixo"],
    correta: 2
  },
  {
    pergunta: "Qual é um dos principais benefícios da compostagem?",
    opcoes: ["Aumentar o volume do lixo", "Gerar adubo natural para plantas", "Atrair insetos para o jardim", "Criar gases poluentes"],
    correta: 1
  },
  {
    pergunta: "O que é pegada de carbono?",
    opcoes: ["O tamanho do seu pé", "A quantidade de carbono no seu corpo", "A quantidade de gases de efeito estufa emitidos por atividades humanas", "Um tipo de pegada de animal"],
    correta: 2
  },
  {
    pergunta: "Qual material leva mais tempo para se decompor na naturezas?",
    opcoes: ["Papel", "Casca de banana", "Plástico", "Madeira"],
    correta: 2
  },
  {
    pergunta: "O que é desmatamento?",
    opcoes: ["Plantar árvores", "Cortar árvores ilegalmente ou em larga escala", "Cuidar da floresta", "Pesquisar sobre a vida das árvores"],
    correta: 1
  },
  {
    pergunta: "Como podemos ajudar a reduzir o consumo de energia em casa?",
    opcoes: ["Deixando as luzes acesas", "Tomando banhos demorados", "Desligando aparelhos eletrônicos quando não estiverem em uso", "Abrindo a geladeira frequentemente"],
    correta: 2
  }
];
let perguntaAtual = 0;
let respostaSelecionada = -1;
let pontosQuiz = 0;
let errosQuiz = 0;
let quizFinalizado = false;
let podeClicarQuiz = true;

// Variáveis para fundo estrelado/partículas no fundo
let stars = [];
let backgroundShine = [];

//Setup p5.js
function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  personagemX = width / 2;
  tratorX = width / 2;
  setupStars(200);
  setupBackgroundShine(50);
  colorMode(HSB, 360, 100, 100, 100);
}

//Draw p5.js
function draw() {
  for (let i = backgroundShine.length - 1; i >= 0; i--) {
    backgroundShine[i].update();
    backgroundShine[i].display();
    if (backgroundShine[i].isDead()) {
      backgroundShine.splice(i, 1);
      backgroundShine.push(new BackgroundShineParticle());
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  switch (tela) {
    case 'abertura': aberturaDoJogo(); break;
    case 'menuInicial': menuInicial(); break;
    case 'instrucoesGerais': instrucoesGerais(); break;
    case 'menuJogos': menuJogos(); break;
    case 'startJogo1': startJogo1(); break;
    case 'instrucoesJogo1': instrucoesJogo1(); break;
    case 'jogo1': jogarColheitaFeliz(); break;
    case 'startJogo2': startJogo2(); break;
    case 'instrucoesJogo2': instrucoesJogo2(); break;
    case 'jogo2': jogarCorrida(); break;
    case 'startJogo3': startJogo3(); break;
    case 'instrucoesJogo3': instrucoesJogo3(); break;
    case 'jogo3': jogarMemoria(); break;
    case 'startJogo4': startJogo4(); break;
    case 'instrucoesJogo4': instrucoesJogo4(); break;
    case 'jogo4': jogarQuiz(); break;
    case 'parabens': telaParabens(); break;
    case 'gameover': telaGameOver(); break;
  }
}

//CLASSE PARTICLE para brilho
class Particle {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.vx = random(-2.5, 2.5);
    this.vy = random(-5, -2);
    this.alpha = 100;
    this.radius = random(5, 15);
    this.type = type;
    if (type === 'good') {
      this.hue = random(80, 180);
      this.sat = random(70, 100);
      this.bri = 100;
    } else if (type === 'bad') {
      this.hue = random(0, 30);
      this.sat = random(80, 100);
      this.bri = random(70, 100);
    } else {
        this.hue = frameCount % 360;
        this.sat = 100;
        this.bri = 100;
    }
    this.life = 1.0;
    this.decay = random(0.02, 0.05);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.alpha -= this.decay * 10;
    this.radius *= 0.95;
    this.life -= this.decay;
    if (this.type !== 'bad') {
        this.hue = (this.hue + 3) % 360;
    }
  }

  display() {
    noStroke();
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(this.hue, this.sat, this.bri, 30);
    fill(this.hue, this.sat, this.bri, this.alpha);
    ellipse(this.x, this.y, this.radius * 2);
    drawingContext.shadowBlur = 0;
  }

  isDead() {
    return this.life < 0 || this.alpha < 0 || this.radius < 1;
  }
}

//CLASSE BackgroundShineParticle
class BackgroundShineParticle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.radius = random(1, 4);
    this.alpha = random(30, 70);
    this.hue = random(200, 300);
    this.sat = random(70, 100);
    this.bri = 100;
    this.speed = random(0.02, 0.08);
    this.offset = random(TWO_PI);
  }

  update() {
    this.x += sin(frameCount * this.speed * 0.5 + this.offset) * 0.3;
    this.y += cos(frameCount * this.speed * 0.5 + this.offset) * 0.3;
    this.alpha = map(sin(frameCount * this.speed + this.offset), -1, 1, 30, 80);
    this.hue = (this.hue + 0.5) % 360;
    if (this.x < -this.radius) this.x = width + this.radius;
    if (this.x > width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = height + this.radius;
    if (this.y > height + this.radius) this.y = -this.radius;
  }

  display() {
    noStroke();
    fill(this.hue, this.sat, this.bri, this.alpha);
    ellipse(this.x, this.y, this.radius * 2);
  }

  isDead() { return false; }
}

function setupBackgroundShine(num) {
  for (let i = 0; i < num; i++) {
    backgroundShine.push(new BackgroundShineParticle());
  }
}

//Funções para o fundo estrelado
function setupStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: random(width), y: random(height), alpha: random(50, 100),
      radius: random(1.5, 3.5), speed: random(0.02, 0.07), offset: random(TWO_PI),
      hue: random(40, 60), sat: random(60, 100), bri: 100
    });
  }
}

function drawStars() {
  for (let star of stars) {
    star.alpha = map(sin(frameCount * star.speed + star.offset), -1, 1, 20, 80);
    star.hue = (star.hue + 0.2) % 360;
    fill(star.hue, star.sat, star.bri, star.alpha);
    noStroke();
    beginShape();
    for (let i = 0; i < 5; i++) {
      let angle = TWO_PI * i / 5 - HALF_PI;
      let x = star.x + cos(angle) * star.radius;
      let y = star.y + sin(angle) * star.radius;
      vertex(x, y);
      angle += TWO_PI / 10;
      x = star.x + cos(angle) * (star.radius / 2);
      y = star.y + sin(angle) * (star.radius / 2);
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}

//Funções auxiliares
function drawGradient(x, y, w, h, c1Hue, c1Sat, c1Bri, c2Hue, c2Sat, c2Bri, axis) {
  noFill();
  if (axis === 'Y') {
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let hu = lerp(c1Hue, c2Hue, inter);
      let sa = lerp(c1Sat, c2Sat, inter);
      let br = lerp(c1Bri, c2Bri, inter);
      stroke(hu, sa, br);
      line(x, i, x + w, i);
    }
  } else if (axis === 'X') {
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let hu = lerp(c1Hue, c2Hue, inter);
      let sa = lerp(c1Sat, c2Sat, inter);
      let br = lerp(c1Bri, c2Bri, inter);
      stroke(hu, sa, br);
      line(i, y, i, y + h);
    }
  }
  noStroke();
}

function desenharBotao(x, y, largura, altura, texto) { // TEXTO DO BOTÃO E PARÂMETRO
  let baseHue = (frameCount * 0.5) % 360;
  let corFundo = color(baseHue, 80, 70);
  let corTexto = color(baseHue, 20, 100);
  let raioBorda = 20;
  let elevacao = 0;
  let sombraOffset = 8;
  let sombraBlur = 15;
  let hoverScale = 1.0;

  if (mouseX > x && mouseX < x + largura && mouseY > y && mouseY < y + altura) {
    corFundo = color(baseHue, 90, 85);
    raioBorda = 25;
    elevacao = -3;
    sombraOffset = 4;
    sombraBlur = 10;
    hoverScale = 1.05;
    cursor(HAND);
    if (frameCount % 5 === 0) {
        particles.push(new Particle(mouseX + random(-largura/3, largura/3), mouseY + random(-altura/3, altura/3), 'diva'));
    }
  } else {
    cursor(ARROW);
  }

  push();
  translate(x + largura / 2, y + altura / 2 + elevacao);
  scale(hoverScale);

  drawingContext.shadowOffsetX = sombraOffset;
  drawingContext.shadowOffsetY = sombraOffset;
  drawingContext.shadowBlur = sombraBlur;
  drawingContext.shadowColor = color(0, 0, 0, 40);

  fill(corFundo);
  strokeWeight(3);
  stroke(baseHue, 50, 90);
  rect(-largura / 2, -altura / 2, largura, altura, raioBorda);

  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 0;

  fill(corTexto);
  textSize(24); 
  textStyle(BOLD); 
  drawingContext.shadowOffsetX = 1;
  drawingContext.shadowOffsetY = 1;
  drawingContext.shadowBlur = 3;
  drawingContext.shadowColor = color(0,0,0, 50);
  text(texto, 0, 0); 
  pop();

  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
  drawingContext.shadowBlur = 0;
  textStyle(NORMAL); 
}

function clicouBotao(x, y, largura, altura) {
  return mouseX > x && mouseX < x + largura && mouseY > y && mouseY < y + altura;
}

//Tela de Abertura
function aberturaDoJogo() {
  drawGradient(0, 0, width, height, 280, 80, 30, 330, 90, 50, 'Y');
  drawStars();

  textSize(64); 
  textStyle(BOLD); 
  let titleHue = (frameCount * 1.5) % 360;
  fill(titleHue, 100, 100);
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = 5;
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = color(titleHue, 100, 50, 50);
  text('Eco Aventuras', width / 2, height / 2 - 80 + sin(frameCount * 0.05) * 5);
  drawingContext.shadowBlur = 0; drawingContext.shadowOffsetX = 0; drawingContext.shadowOffsetY = 0;

  textSize(28); 
  textStyle(NORMAL); 
  fill(0, 0, 100); // Branco para contraste com fundo HSB
  text('Aprenda e Divirta-se com a Sustentabilidade!', width / 2, height / 2); 
  desenharBotao(width / 2 - larguraBotao / 2, height / 2 + 100, larguraBotao, alturaBotao, 'Iniciar Jornada'); 
}

//Menu Inicial
function menuInicial() {
  drawGradient(0, 0, width, height, 180, 80, 70, 200, 90, 85, 'Y'); // Gradiente suave 
  drawStars();

  textSize(36);
  fill( (frameCount * 1) % 360, 90, 100); // Cor vibrante para o título
  textStyle(BOLD); 
  drawingContext.shadowOffsetX = 3;
  drawingContext.shadowOffsetY = 3;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = color(0,0,0,30);
  text('Eco Jogos', width / 2, 100 + sin(frameCount * 0.08) * 3); 
  textStyle(NORMAL); 
  drawingContext.shadowBlur = 0; drawingContext.shadowOffsetX = 0; drawingContext.shadowOffsetY = 0;

  desenharBotao(width / 2 - larguraBotao / 2, 250, larguraBotao, alturaBotao, 'Instruções');
  desenharBotao(width / 2 - larguraBotao / 2, 350, larguraBotao, alturaBotao, 'Jogos'); 
  desenharBotao(width - 160, height - 60, 140, 40, 'Tela Inicial'); 
}

//Tela de Instruções Gerais
function instrucoesGerais() {
  drawGradient(0, 0, width, height, 120, 70, 80, 160, 80, 90, 'Y'); // Verde-água claro
  drawStars();
  textSize(32); 
  fill( (frameCount*0.8) % 360, 100, 100);
  textStyle(BOLD); 
  text('Sua Missão Eco-Aventura!', width / 2, 80); 
  textStyle(NORMAL);

  textSize(18); 
  textAlign(LEFT, TOP); 
  // fill(50); 
  fill(0,0,100); 
  let textoInstrucoesOriginal =
    'Bem-vindo(a) ao Eco Aventuras, o lugar onde a diversão encontra a sustentabilidade!\n\n' +
    'Aqui, cada clique te leva a um novo desafio para desvendar os segredos do nosso planeta e aprender a cuidar dele de uma forma superengajadora. Nossos jogos são a sua porta de entrada para um mundo mais verde, onde suas escolhas fazem a diferença.\n\n' +
    'Explore cenários vibrantes, colete tesouros da natureza, desvie de poluentes e teste seu conhecimento em um quiz que vai te transformar em um verdadeiro guardião ambiental.\n\n' +
    'Você vai usar o mouse para navegar pelos menus e fazer suas escolhas. E, em alguns desafios, as setas do teclado serão suas ferramentas para mover seus personagens e superar obstáculos.\n\n' +
    'Pronto para essa aventura verde? Mergulhe de cabeça, aprenda, divirta-se e ajude a construir um futuro mais sustentável!';

  fill(0,0,0, 20);
  stroke( (frameCount*0.8) % 360, 100, 100, 70);
  strokeWeight(3);
  rect(40, 140, width - 80, height - 230, 20);
  noStroke();

  fill(0, 0, 100);
  text(textoInstrucoesOriginal, 50, 150, width - 100, height - 250); 
  textAlign(CENTER, CENTER); 
  desenharBotao(width / 2 - larguraBotao / 2, height - 60, larguraBotao, alturaBotao, 'Voltar ao Menu');
}

// --- Menu de Jogos ---
const jogos = ['Colheita Feliz', 'Corrida Sustentável', 'Memória Verde', 'Quiz Ambiental']; // NOMES ORIGINAIS
function menuJogos() {
  drawGradient(0, 0, width, height, 150, 80, 70, 180, 90, 85, 'Y'); // Tons de verde 
  drawStars();
  textSize(32); 
  fill((frameCount * 1.2) % 360, 100, 100);
  textStyle(BOLD); 
  text('Escolha um jogo', width / 2, 80 + sin(frameCount * 0.07) * 2); 
  textStyle(NORMAL); 

  for (let i = 0; i < jogos.length; i++) {
    desenharBotao(width / 2 - larguraBotao / 2, 150 + i * 80, larguraBotao, alturaBotao, jogos[i]);}

  desenharBotao(width - 160, height - 60, 140, 40, 'Voltar'); 
}

//Jogo 1: Colheita Feliz
function startJogo1() {
  drawGradient(0, 0, width, height, 80, 90, 50, 130, 100, 70, 'Y');
  drawStars();
  textSize(36); fill((frameCount*0.7)%360, 100,100); textStyle(BOLD);
  text('Colheita Feliz', width / 2, 150); textStyle(NORMAL); 
  textSize(20); fill(0,0,100);
  text('Ajude o fazendeiro a coletar os alimentos bons e evitar o lixo!', width / 2, 220);

  desenharBotao(width / 2 - larguraBotao / 2, 300, larguraBotao, alturaBotao, 'Play'); 
  desenharBotao(width / 2 - larguraBotao / 2, 400, larguraBotao, alturaBotao, 'Como Jogar'); 
  desenharBotao(width - 160, height - 60, 140, 40, 'Voltar'); 
}

function instrucoesJogo1() {
  drawGradient(0, 0, width, height, 80, 90, 40, 130, 100, 60, 'Y');
  drawStars();
  textSize(28); fill(0,0,100); textStyle(BOLD);
  text('Como Jogar: Colheita Feliz', width / 2, 80); textStyle(NORMAL); 
  
  fill(0,0,0,20); rect(40, 130, width - 80, height - 240, 20);
  textSize(18); textAlign(LEFT, TOP); fill(0,0,100);
  text('Use as setas para a esquerda e direita para mover a fazendeira (👩🏽‍🌾) e posicioná-la abaixo dos itens que caem.\n\n' + 
    'Colete alimentos bons (🍎🥦🥕🍇🌽) para ganhar pontos e aumentar sua colheita. Cada alimento bom vale 10 pontos.\n\n' +
    'Evite objetos ruins (🍾🗑️🔋⚙️) para não perder pontos e não estragar sua plantação. Cada objeto ruim te faz perder 5 pontos.\n\n' + 
    'Objetivo: Coletar 20 alimentos bons e alcançar no mínimo 150 pontos para vencer. Cuidado para não coletar mais de 5 objetos ruins, ou será Game Over!', 
    50, 150, width - 100); 
  textAlign(CENTER, CENTER);
  desenharBotao(width / 2 - larguraBotao / 2, height - 100, larguraBotao, alturaBotao, 'Voltar ao Menu do Jogo');
}

function iniciarColheitaFeliz() {
  alimentos = []; pontosColheita = 0; verdesColetados = 0; vermelhosColetados = 0;
  personagemX = width / 2;
}

function jogarColheitaFeliz() {
  drawGradient(0, 0, width, height, 90, 100, 60, 140, 90, 40, 'Y');

  textSize(28); fill(0,0,100); textStyle(BOLD);
  text('Colheita Feliz', width / 2, 40); textStyle(NORMAL); 

  textSize(20); fill(0,0,100);
  text(`Pontos: ${pontosColheita}`, width / 4, 80); 
  text(`Alimentos Bons: ${verdesColetados}/${LIMITE_VERDES}`, width / 2, 80); 
  text(`Objetos Ruins: ${vermelhosColetados}/${LIMITE_VERMELHOS}`, width * 3 / 4, 80); 

  if (frameCount % 60 === 0) {
    const tipo = random() < 0.7 ? 0 : 1; 
    let emoji;
    if (tipo === 0) emoji = random(emojisVerdes);
    else emoji = random(emojisVermelhosAjustados);
    alimentos.push({ x: random(30, width - 30), y: -30, tipo, emoji, hue: random(360) });
  }

  textSize(40); // Tamanho do personagem
  let personagemOffsetY = sin(frameCount * 0.08) * 3; // Animação
  text(emojiPersonagem, personagemX, height - 35 + personagemOffsetY); 

  for (let i = alimentos.length - 1; i >= 0; i--) {
    const a = alimentos[i];
    a.y += velocidadeQueda + sin(frameCount*0.1 + a.x * 0.02) * 0.5; 

    textSize(30); // Tamanho dos itens
    let itemHue = (a.hue + frameCount*2) % 360;
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = color(itemHue, 100, 100, 50);
    text(a.emoji, a.x, a.y + sin(frameCount * 0.1 + a.x * 0.01) * 2); // Animação do item
    drawingContext.shadowBlur = 0;
    
    if (a.y > height - 60 && dist(a.x, a.y, personagemX, height - 35) < 40) {
      if (a.tipo === 0) {
        pontosColheita += 10; verdesColetados++;
        for (let j = 0; j < 10; j++) particles.push(new Particle(a.x, a.y, 'good'));
      } else {
        pontosColheita -= 5; vermelhosColetados++;
        for (let j = 0; j < 8; j++) particles.push(new Particle(a.x, a.y, 'bad'));
      }
      alimentos.splice(i, 1);
    } else if (a.y > height + 50) {
      alimentos.splice(i, 1);
    }
  }

  if (verdesColetados >= LIMITE_VERDES && pontosColheita >= PONTOS_ARA_VITORIA_COLHEITA) tela = 'parabens';
  else if (vermelhosColetados >= LIMITE_VERMELHOS) tela = 'gameover';

  if (keyIsDown(LEFT_ARROW)) personagemX -= 7; // Velocidade 
  if (keyIsDown(RIGHT_ARROW)) personagemX += 7; // Velocidade 
  personagemX = constrain(personagemX, 25, width - 25); // Restrição 

  desenharBotao(width - 160, height - 60, 140, 40, 'Menu'); 
}

//Jogo 2: Corrida Sustentável
function startJogo2() {
  drawGradient(0, 0, width, height, 0, 80, 50, 40, 90, 70, 'Y');
  drawStars();
  textSize(36); fill((frameCount*0.9)%360,100,100); textStyle(BOLD);
  text('Corrida Sustentável', width / 2, 150); textStyle(NORMAL); 
  textSize(20); fill(0,0,100);
  text('Desvie do lixo com seu trator para limpar a cidade!', width / 2, 220); 
  desenharBotao(width / 2 - larguraBotao / 2, 300, larguraBotao, alturaBotao, 'Play'); 
  desenharBotao(width / 2 - larguraBotao / 2, 400, larguraBotao, alturaBotao, 'Como Jogar'); 
  desenharBotao(width - 160, height - 60, 140, 40, 'Voltar'); 
}

function instrucoesJogo2() {
  drawGradient(0, 0, width, height, 0, 80, 40, 40, 90, 60, 'Y');
  drawStars();
  textSize(28); fill(0,0,100); textStyle(BOLD);
  text('Como Jogar: Corrida Sustentável', width / 2, 80); textStyle(NORMAL); 

  fill(0,0,0,20); rect(40, 130, width - 80, height - 240, 20);
  textSize(18); textAlign(LEFT, TOP); fill(0,0,100);
  text('Use as setas para a esquerda e direita para mover o trator (🚜) e desviar dos objetos de lixo que caem do topo da tela (🗑️🍾🔋⚙️🍕🥤).\n\n' + // Emojis originais
    'A cada lixo desviado com sucesso, você ganha 5 pontos.\n\n' +
    'Objetivo: Alcançar 200 pontos para deixar a cidade limpa! Se você colidir com algum lixo, o jogo termina.', 
    50, 150, width - 100); 
  textAlign(CENTER, CENTER);
  desenharBotao(width / 2 - larguraBotao / 2, height - 100, larguraBotao, alturaBotao, 'Voltar ao Menu do Jogo'); 
}

function iniciarCorrida() {
  tratorX = width / 2; obstaculos = []; pontosCorrida = 0; tempoObstaculo = 0;
}

function jogarCorrida() {
  drawGradient(0, 0, width, height, 10, 100, 60, 50, 90, 40, 'Y');

  textSize(28); fill(0,0,100); textStyle(BOLD);
  text('Corrida Sustentável', width / 2, 40); textStyle(NORMAL); 
  textSize(20); fill(0,0,100); text(`Pontos: ${pontosCorrida}`, 100, 30); 

  textSize(50); // Tamanho do trator
  let tratorOffsetY = sin(frameCount * 0.08) * 3; // Animação 
  text(emojiTrator, tratorX, height - 55 + tratorOffsetY); // Emoji 

  tempoObstaculo++;
  if (tempoObstaculo > 70) { // Frequência 
    tempoObstaculo = 0;
    let emojiLixoAleatorio = random(emojisLixo); // Emojis 
    obstaculos.push({ x: random(50, width - 50), y: -40, emoji: emojiLixoAleatorio, hue: random(360) });
  }

  for (let i = obstaculos.length - 1; i >= 0; i--) {
    let o = obstaculos[i];
    o.y += velocidadeObstaculo + sin(frameCount*0.08 + o.y*0.01)*1; 

    textSize(35); // Tamanho dos obstáculos
    let obsHue = (o.hue + frameCount) % 360;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(obsHue, 80, 70, 40);
    text(o.emoji, o.x, o.y + sin(frameCount * 0.1 + o.x * 0.01) * 2); // Animação 
    drawingContext.shadowBlur = 0;
    
    if (o.y + 35 > height - 80 && o.y < height - 20 && abs(o.x - tratorX) < 40) { // Condição 
      tela = 'gameover';
      for (let j = 0; j < 30; j++) {
        particles.push(new Particle(tratorX + random(-20, 20), height - 55 + random(-10, 10), 'bad'));
      }
      return;
    } else if (o.y > height + 50) {
      obstaculos.splice(i, 1);
      pontosCorrida += 5;
      for (let j = 0; j < 3; j++) {
        particles.push(new Particle(o.x, o.y-20, 'good'));
      }
    }
  }

  if (pontosCorrida >= PONTOS_PARA_VITORIA_CORRIDA) tela = 'parabens';
  if (keyIsDown(LEFT_ARROW)) tratorX -= 7; // Velocidade 
  if (keyIsDown(RIGHT_ARROW)) tratorX += 7; // Velocidade 
  tratorX = constrain(tratorX, 40, width - 40); // Restrição 

  desenharBotao(width - 160, height - 60, 140, 40, 'Menu'); 
}


//Jogo 3: Memória Verde
function startJogo3() {
  drawGradient(0, 0, width, height, 240, 80, 50, 290, 90, 70, 'Y');
  drawStars();
  textSize(36); fill((frameCount*1.1)%360,100,100); textStyle(BOLD);
  text('Memória Verde', width / 2, 150); textStyle(NORMAL); 
  textSize(20); fill(0,0,100);
  text('Teste sua memória e encontre os pares de elementos da natureza!', width / 2, 220); 

  desenharBotao(width / 2 - larguraBotao / 2, 300, larguraBotao, alturaBotao, 'Play'); 
  desenharBotao(width / 2 - larguraBotao / 2, 400, larguraBotao, alturaBotao, 'Como Jogar'); 
  desenharBotao(width - 160, height - 60, 140, 40, 'Voltar'); 
}

function instrucoesJogo3() {
  drawGradient(0, 0, width, height, 240, 80, 40, 290, 90, 60, 'Y');
  drawStars();
  textSize(28); fill(0,0,100); textStyle(BOLD);
  text('Como Jogar: Memória Verde', width / 2, 80); textStyle(NORMAL); // TEXTO ORIGINAL

  fill(0,0,0,20); rect(40, 130, width - 80, height - 240, 20);
  textSize(18); textAlign(LEFT, TOP); fill(0,0,100);
  text('Neste jogo, você verá várias cartas viradas para baixo. Clique nas cartas para virá-las e revelar o que está por trás.\n\n' +
    'O objetivo é encontrar pares de cartas iguais para removê-las do jogo. Se as cartas viradas não formarem um par, elas se virarão novamente, então tente memorizar suas posições!\n\n' +
    'Você tem 30 segundos para encontrar todos os pares.\n\n' +
    'Objetivo: Encontrar todos os 6 pares (total de 12 cartas) antes que o tempo acabe para vencer!', 
    50, 150, width - 100); 
  textAlign(CENTER, CENTER);
  desenharBotao(width / 2 - larguraBotao / 2, height - 100, larguraBotao, alturaBotao, 'Voltar ao Menu do Jogo'); 
}

function iniciarMemoria() {
  cartas = []; paresEncontrados = 0; memoriaJogando = true; cartasViradas = [];
  tempoRestanteMemoria = 30; timerMemoriaAtivo = true; tempoInicialMemoria = millis();
  gameOverMemoriaPorTempo = false;

  let temp = imagensMemoria.slice(0, 6); 
  temp = temp.concat(temp);
  temp = embaralharArray(temp);

  let cols = 4; let rows = 3; let cardWidth = 100; let cardHeight = 100;
  let spacing = 20; let totalWidth = cols * cardWidth + (cols - 1) * spacing;
  let totalHeight = rows * cardHeight + (rows - 1) * spacing;
  let startX = (width - totalWidth) / 2;
  let startY = (height - totalHeight) / 2 + 20;

  for (let i = 0; i < 12; i++) {
    let linha = floor(i / cols);
    let coluna = i % cols;
    cartas.push({
      x: startX + coluna * (cardWidth + spacing), y: startY + linha * (cardHeight + spacing),
      w: cardWidth, h: cardHeight, conteudo: temp[i], virada: false, encontrada: false,
      scale: 1, hue: random(360), beingFlipped: false
    });
  }
}

function jogarMemoria() {
  drawGradient(0, 0, width, height, 250, 90, 50, 300, 80, 30, 'Y');

  textSize(28); fill(0,0,100); textStyle(BOLD);
  text('Memória Verde', width / 2, 60); textStyle(NORMAL);
  textSize(20); fill(0,0,100);
  text(`Pares encontrados: ${paresEncontrados}`, 140, 30); 

  if (timerMemoriaAtivo && memoriaJogando) {
    let tempoDecorrido = (millis() - tempoInicialMemoria) / 1000;
    tempoRestanteMemoria = max(0, 30 - floor(tempoDecorrido));
    if (tempoRestanteMemoria <= 0 && !gameOverMemoriaPorTempo) {
      timerMemoriaAtivo = false; gameOverMemoriaPorTempo = true; tela = 'gameover'; return;
    }
  }
  let timerHue = map(tempoRestanteMemoria, 0, 30, 0, 120);
  if (tempoRestanteMemoria <=10) timerHue = (frameCount*3) % 60;
  fill(timerHue, 100, 100);
  text(`Tempo: ${tempoRestanteMemoria}s`, width - 150, 30); 
  fill(0,0,100);

  for (let carta of cartas) {
    push();
    translate(carta.x + carta.w / 2, carta.y + carta.h / 2);
    
    if ((carta.virada || carta.encontrada) && carta.scale < 1.1 && carta.beingFlipped) carta.scale += 0.05;
    else if (!carta.virada && carta.scale > 1 && carta.beingFlipped) carta.scale -= 0.05;
    else if (carta.scale !== 1 && !carta.beingFlipped) {
        if (carta.scale < 1) carta.scale = min(1, carta.scale + 0.05);
        if (carta.scale > 1) carta.scale = max(1, carta.scale - 0.05);
    }
    if (carta.encontrada && carta.scale > 0.7) carta.scale -=0.03;
    if (carta.encontrada && carta.scale <=0.7) carta.scale = 0.7;
    scale(carta.scale);

    drawingContext.shadowOffsetX = 4; drawingContext.shadowOffsetY = 4;
    drawingContext.shadowBlur = 10; drawingContext.shadowColor = color(0,0,0,30);

    if (carta.encontrada) { fill(carta.hue, 60, 80, 30); } 
    else { fill(carta.hue, 80, carta.virada ? 90 : 70); }
    stroke(carta.hue, 100, 100); strokeWeight(3);
    rect(-carta.w/2, -carta.h/2, carta.w, carta.h, 15);

    drawingContext.shadowBlur = 0; drawingContext.shadowOffsetX = 0; drawingContext.shadowOffsetY = 0;

    fill(0,0,100); textSize(50); 
    if (carta.virada || carta.encontrada) {
      text(carta.conteudo, 0, 0 + sin(frameCount * 0.05 + carta.x * 0.01) * 2); // Animação 
    } else {
      textSize(30); fill(50); // Tamanho e cor da interrogação
      text('?', 0, 0);
    }
    pop();
  }
  desenharBotao(width - 160, height - 60, 140, 40, 'Menu');
}

//Jogo 4: Quiz Ambiental
function startJogo4() {
  drawGradient(0, 0, width, height, 180, 70, 50, 220, 80, 70, 'Y');
  drawStars();
  textSize(36); fill((frameCount*1.3)%360,100,100); textStyle(BOLD);
  text('Quiz Ambiental', width / 2, 150); textStyle(NORMAL); 
  textSize(20); fill(0,0,100);
  text('Teste seus conhecimentos sobre o meio ambiente!', width / 2, 220); 

  desenharBotao(width / 2 - larguraBotao / 2, 300, larguraBotao, alturaBotao, 'Play'); 
  desenharBotao(width / 2 - larguraBotao / 2, 400, larguraBotao, alturaBotao, 'Como Jogar'); 
  desenharBotao(width - 160, height - 60, 140, 40, 'Voltar'); 
}

function instrucoesJogo4() {
  drawGradient(0, 0, width, height, 180, 70, 40, 220, 80, 60, 'Y');
  drawStars();
  textSize(28); fill(0,0,100); textStyle(BOLD);
  text('Como Jogar: Quiz Ambiental', width / 2, 80); textStyle(NORMAL); 
  
  fill(0,0,0,20); rect(40, 130, width - 80, height - 240, 20);
  textSize(18); textAlign(LEFT, TOP); fill(0,0,100);
  text('Serão apresentadas 10 perguntas sobre sustentabilidade e meio ambiente. Para cada pergunta, você terá quatro opções de resposta.\n\n' +
    'Clique na opção que você considera correta. Após sua escolha, a resposta correta será destacada em verde e a errada em vermelho, e o jogo avançará para a próxima pergunta automaticamente.\n\n' +
    'Objetivo: Você precisa acertar pelo menos 70% das perguntas (7 de 10) para vencer o quiz e mostrar que é um verdadeiro expert ambiental!', 
    50, 150, width - 100); 
  textAlign(CENTER, CENTER);
  desenharBotao(width / 2 - larguraBotao / 2, height - 100, larguraBotao, alturaBotao, 'Voltar ao Menu do Jogo'); 
}

function iniciarQuiz() {
  perguntaAtual = 0; respostaSelecionada = -1; pontosQuiz = 0; errosQuiz = 0;
  quizFinalizado = false; podeClicarQuiz = true;
}

function jogarQuiz() {
  drawGradient(0, 0, width, height, 190, 90, 60, 230, 80, 40, 'Y');

  textSize(28); fill(0,0,100); textStyle(BOLD);
  text('Quiz Ambiental', width / 2, 60); textStyle(NORMAL); 

  if (!quizFinalizado) {
    let p = perguntas[perguntaAtual]; 
    textSize(18); fill(0,0,100); textStyle(BOLD); // Tamanho e estilo da pergunta
    
    //Alinhamento e largura da pergunta
    textAlign(BASELINE); // texto centralizado
    text(p.pergunta, width / 2, 120, width * 0.8); // Centraliza a pergunta
    textAlign(CENTER, CENTER); //
    textStyle(NORMAL);

    const opcaoLargura = 500; // Largura 
    const opcaoAltura = 70; // Altura 
    const opcaoX = width / 2 - opcaoLargura / 2;

    for (let i = 0; i < p.opcoes.length; i++) {
      let yOpcao = 170 + i * (opcaoAltura + 10); // Posição da opção
      let opcaoHue = (180 + i * 40) % 360;
      let opcaoSat = 70; let opcaoBri = 80;

      if (respostaSelecionada !== -1) {
        if (i === p.correta) { opcaoHue = 120; opcaoSat = 100; opcaoBri = 90; } 
        else if (i === respostaSelecionada) { opcaoHue = 0; opcaoSat = 100; opcaoBri = 85; } 
        else { opcaoSat = 50; opcaoBri = 60; }
      } else if (mouseX > opcaoX && mouseX < opcaoX + opcaoLargura && mouseY > yOpcao - (opcaoAltura / 2) && mouseY < yOpcao + (opcaoAltura / 2)) { // Hitbox original
        opcaoSat = 90; opcaoBri = 95;
      }

      let corFundoOpcao;
      if (respostaSelecionada !== -1) {
        if (i === p.correta) corFundoOpcao = color(120, 100, 80, 80); // Verde suave
        else if (i === respostaSelecionada) corFundoOpcao = color(0, 100, 80, 80); // Vermelho suave 
        else corFundoOpcao = color(0,0,100,80); // Branco suave
      } else {
          corFundoOpcao = color(0,0,100,80); // Branco suave para opções não selecionadas
      }
      
      if (mouseX > opcaoX && mouseX < opcaoX + opcaoLargura && mouseY > yOpcao - (opcaoAltura / 2) && mouseY < yOpcao + (opcaoAltura / 2) && respostaSelecionada === -1) {
          fill(opcaoHue, opcaoSat, opcaoBri, 90);
      } else {
          fill(corFundoOpcao);
      }

      stroke(150); strokeWeight(2); // Borda 
      rect(opcaoX, yOpcao - (opcaoAltura / 2), opcaoLargura, opcaoAltura, 8); // Desenho 

      fill(0,0,0); // Cor do texto da opção (preto)
      noStroke();
      textStyle(BOLD); // Estilo do texto da opção
      textSize(16); // Tamanho do texto da opção
      text(p.opcoes[i], opcaoX + 10, yOpcao - (opcaoAltura / 2) + 10, opcaoLargura - 20, opcaoAltura - 20); 
      textStyle(NORMAL);
    }
  } else {
    textSize(24); fill(0,0,100); textStyle(BOLD);
    text(`Quiz finalizado!`, width / 2, 150); 
    text(`Acertos: ${pontosQuiz}`, width / 2, 200); 
    text(`Erros: ${errosQuiz}`, width / 2, 240); 
    textStyle(NORMAL);
    desenharBotao(width / 2 - 100, 300, 200, 50, 'Voltar ao Menu'); 
  }
  
  desenharBotao(width - 160, height - 60, 140, 40, 'Menu'); 
}

//Telas de Parabéns e Game Over
function telaParabens() {
  let h1 = frameCount % 360; let h2 = (frameCount + 120) % 360;
  drawGradient(0, 0, width, height, h1, 100, 100, h2, 100, 80, 'Y');
  drawStars();
  if (frameCount % 2 === 0) { particles.push(new Particle(random(width), random(height * 0.3), 'diva')); }

  textSize(48); // Tamanho 
  textStyle(BOLD); // Estilo 
  let parHue = (frameCount * 2) % 360;
  fill(parHue, 100, 100);
  drawingContext.shadowOffsetX = 5; drawingContext.shadowOffsetY = 5;
  drawingContext.shadowBlur = 20; drawingContext.shadowColor = color(parHue, 100, 50, 70);
  text('PARABÉNS!', width / 2, height / 2 - 50 + sin(frameCount * 0.06) * 7); // TEXTO e animação 
  drawingContext.shadowBlur = 0; drawingContext.shadowOffsetX = 0; drawingContext.shadowOffsetY = 0;
  textStyle(NORMAL);

  textSize(24); // Tamanho 
  fill(0,0,100); // Cor para contraste
  let msg = "Você venceu!"; 
  if (quizFinalizado && pontosQuiz >= perguntas.length * 0.7) {
    msg = `Você acertou ${pontosQuiz} de ${perguntas.length} perguntas e é um expert ambiental!`;
  } else if (paresEncontrados === 6 && tela === 'parabens') { 
      msg = 'Você encontrou todos os pares e demonstrou sua memória verde!';
  } else if (verdesColetados >= LIMITE_VERDES && pontosColheita >= PONTOS_ARA_VITORIA_COLHEITA && tela === 'parabens') {
    msg = 'Você coletou todos os alimentos verdes e salvou a colheita!';
  } else if (pontosCorrida >= PONTOS_PARA_VITORIA_CORRIDA && tela === 'parabens') {
    msg = `Você alcançou ${pontosCorrida} pontos e deixou a cidade limpa!`;
  }
  
  // Ajuste da caixa de texto para a mensagem
  let msgBoxWidth = width * 0.8;
  let msgBoxX = width / 2 - msgBoxWidth / 2;
  let msgBoxY = height / 2 - 20;
  let msgBoxHeight = 100; 

  fill(parHue, 90, 30, 70);
  rect(msgBoxX, msgBoxY, msgBoxWidth, msgBoxHeight, 20);
  fill(0,0,100);
  text(msg, msgBoxX + 10, msgBoxY + 10, msgBoxWidth - 20, msgBoxHeight - 20); 
  textAlign(CENTER, CENTER); 

  desenharBotao(width / 2 - larguraBotao / 2, height - 100, larguraBotao, alturaBotao, 'Voltar ao Menu');
}

function telaGameOver() {
  drawGradient(0, 0, width, height, 0, 90, 40, 330, 80, 25, 'Y');
  for (let star of stars) {
      star.alpha = map(sin(frameCount * star.speed + star.offset), -1, 1, 5, 20);
      fill(0, 100, star.bri > 50 ? star.bri : 50 , star.alpha);
      noStroke(); ellipse(star.x, star.y, star.radius);
  }

  textSize(48); // Tamanho 
  fill(0, 100, 70); // Cor para Game Over
  textStyle(BOLD); // Estilo 
  drawingContext.shadowOffsetX = 3; drawingContext.shadowOffsetY = 3;
  drawingContext.shadowBlur = 10; drawingContext.shadowColor = color(0,0,0, 50);
  text('GAME OVER', width / 2, height / 2 - 80 + sin(frameCount * 0.06) * 5); // TEXTO e animação 
  drawingContext.shadowBlur = 0; drawingContext.shadowOffsetX = 0; drawingContext.shadowOffsetY = 0;
  textStyle(NORMAL);

  textSize(22); // Tamanho 
  fill(0,0,85); // Cor para contraste
  let msgOver = 'Game Over! Tente novamente.'; // Mensagem
  if (quizFinalizado && pontosQuiz < perguntas.length * 0.7) {
    msgOver = `Você acertou ${pontosQuiz} de ${perguntas.length} perguntas.\nTente novamente para se tornar um expert!`;
  } else if (gameOverMemoriaPorTempo) {
    msgOver = 'O tempo acabou!\nTente novamente para encontrar todos os pares antes que o tempo se esgote.';
  } else if (vermelhosColetados >= LIMITE_VERMELHOS && tela === 'gameover') {
    msgOver = 'Que pena! Muitos objetos ruins caíram na sua plantação.\nTente coletar mais alimentos bons e desviar dos ruins na próxima!';
  } else if (obstaculos.some(o => o.y + 35 > height - 80 && o.y < height - 20 && abs(o.x - tratorX) < 40) && tela === 'gameover') {
      msgOver = `Você colidiu com um obstáculo! A cidade ainda precisa da sua ajuda para ser limpa.\nSeus pontos: ${pontosCorrida}. Tente novamente!`;
  }

  // Ajuste da caixa de texto para a mensagem
  let msgOverBoxWidth = width * 0.8;
  let msgOverBoxX = width / 2 - msgOverBoxWidth / 2;
  let msgOverBoxY = height / 2 - 30;
  let msgOverBoxHeight = 120;

  fill(0, 90, 20, 70);
  rect(msgOverBoxX, msgOverBoxY, msgOverBoxWidth, msgOverBoxHeight, 20); // Ajuste de altura da caixa de texto
  fill(0,0,85);
  text(msgOver, msgOverBoxX + 10, msgOverBoxY + 10, msgOverBoxWidth - 20, msgOverBoxHeight - 20); 
  textAlign(CENTER, CENTER); 

  desenharBotao(width / 2 - larguraBotao / 2, height - 100, larguraBotao, alturaBotao, 'Voltar ao Menu');
}

//Funções Auxiliares do Jogo da Memória
function verificarVitoriaMemoria() {
  if (paresEncontrados === 6) {
    timerMemoriaAtivo = false;
    setTimeout(() => {
        if (paresEncontrados === 6) { tela = 'parabens'; }
    }, 800);
  }
}

//Mouse Pressed (Interação)
function mousePressed() {
  if (mouseButton === LEFT) {
    for (let k=0; k<3; k++) {
        particles.push(new Particle(mouseX + random(-5,5), mouseY + random(-5,5), 'diva'));
    }
  }

  switch (tela) {
    case 'abertura':
      if (clicouBotao(width / 2 - larguraBotao / 2, height / 2 + 100, larguraBotao, alturaBotao)) { // Posição do botão
        tela = 'menuInicial';
      }
      break;

    case 'menuInicial':
      if (clicouBotao(width / 2 - larguraBotao / 2, 250, larguraBotao, alturaBotao)) {
        tela = 'instrucoesGerais';
      } else if (clicouBotao(width / 2 - larguraBotao / 2, 350, larguraBotao, alturaBotao)) {
        tela = 'menuJogos';
      } else if (clicouBotao(width - 160, height - 60, 140, 40)) { // Posição 
        tela = 'abertura';
      }
      break;

    case 'instrucoesGerais':
      if (clicouBotao(width / 2 - larguraBotao / 2, height - 60, larguraBotao, alturaBotao)) { // Posição 
        tela = 'menuInicial';
      }
      break;

    case 'menuJogos':
      for (let i = 0; i < jogos.length; i++) {
        if (clicouBotao(width / 2 - larguraBotao / 2, 150 + i * 80, larguraBotao, alturaBotao)) { // Posição 
          tela = 'startJogo' + (i + 1);
          quizFinalizado = false; paresEncontrados = 0; gameOverMemoriaPorTempo = false; 
          verdesColetados = 0; vermelhosColetados = 0; pontosColheita = 0; pontosCorrida = 0;
          break;
        }
      }
      if (clicouBotao(width - 160, height - 60, 140, 40)) { // Posição 
        tela = 'menuInicial';
      }
      break;

    case 'startJogo1': case 'startJogo2': case 'startJogo3': case 'startJogo4':
      let jogoNum = parseInt(tela.charAt(tela.length -1));
      if (clicouBotao(width / 2 - larguraBotao / 2, 300, larguraBotao, alturaBotao)) { // Posição 
        if (jogoNum === 1) iniciarColheitaFeliz();
        else if (jogoNum === 2) iniciarCorrida();
        else if (jogoNum === 3) iniciarMemoria();
        else if (jogoNum === 4) iniciarQuiz();
        tela = 'jogo' + jogoNum;
      } else if (clicouBotao(width / 2 - larguraBotao / 2, 400, larguraBotao, alturaBotao)) { // Posição 
        tela = 'instrucoesJogo' + jogoNum;
      } else if (clicouBotao(width - 160, height - 60, 140, 40)) { // Posição original
        tela = 'menuJogos';
      }
      break;

    case 'instrucoesJogo1': case 'instrucoesJogo2': case 'instrucoesJogo3': case 'instrucoesJogo4':
      let instJogoNum = parseInt(tela.charAt(tela.length -1));
      if (clicouBotao(width / 2 - larguraBotao / 2, height - 100, larguraBotao, alturaBotao)) { // Posição 
        tela = 'startJogo' + instJogoNum;
      }
      break;

    case 'jogo1': case 'jogo2':
      if (clicouBotao(width - 160, height - 60, 140, 40)) { // Posição 
          tela = 'menuJogos';
          verdesColetados = 0; vermelhosColetados = 0; pontosColheita = 0;
          pontosCorrida = 0; obstaculos = [];
      }
      break;
    
    case 'jogo3':
      if (clicouBotao(width - 160, height - 60, 140, 40)) { // Posição 
        tela = 'menuJogos';
        timerMemoriaAtivo = false; gameOverMemoriaPorTempo = false; paresEncontrados = 0;
      } else if (memoriaJogando && cartasViradas.length < 2 && timerMemoriaAtivo) {
        for (let carta of cartas) {
          if (!carta.virada && !carta.encontrada && !carta.beingFlipped &&
            mouseX > carta.x && mouseX < carta.x + carta.w &&
            mouseY > carta.y && mouseY < carta.y + carta.h) {
            
            carta.virada = true; carta.beingFlipped = true; 
            cartasViradas.push(carta);
            setTimeout(() => { if(cartasViradas.length < 2) carta.beingFlipped = false; }, 250);

            if (cartasViradas.length === 2) {
              memoriaJogando = false; 
              if (cartasViradas[0].conteudo === cartasViradas[1].conteudo) {
                cartasViradas[0].encontrada = true; cartasViradas[1].encontrada = true;
                paresEncontrados++;
                for (let j = 0; j < 10; j++) { // Partículas 
                  particles.push(new Particle( (cartasViradas[0].x + cartasViradas[1].x)/2 + carta.w/2, (cartasViradas[0].y + cartasViradas[1].y)/2 + carta.h/2, 'good'));
                }
                cartasViradas[0].beingFlipped = false; cartasViradas[1].beingFlipped = false;
                cartasViradas = []; memoriaJogando = true;
                verificarVitoriaMemoria();
              } else {
                setTimeout(() => {
                  if (cartasViradas.length === 2) { 
                      cartasViradas[0].virada = false; cartasViradas[1].virada = false;
                      cartasViradas[0].beingFlipped = false; cartasViradas[1].beingFlipped = false;
                      cartasViradas = [];
                  }
                  memoriaJogando = true;
                }, 1000); 
              }
            }
            break; 
          }
        }
      }
      break;

    case 'jogo4':
      if (quizFinalizado) {
        if (clicouBotao(width / 2 - 100, 300, 200, 50)) { // Posição 
          tela = 'menuJogos'; quizFinalizado = false; pontosQuiz = 0; errosQuiz = 0;
        }
      } else if (podeClicarQuiz) {
        let p = perguntas[perguntaAtual];
        const opcaoLargura = 500; // Largura 
        const opcaoAltura = 70; // Altura 
        const opcaoX = width / 2 - opcaoLargura / 2;

        for (let i = 0; i < p.opcoes.length; i++) {
          let yOpcao = 170 + i * (opcaoAltura + 10); // Posição 
          if (mouseX > opcaoX && mouseX < opcaoX + opcaoLargura &&
            mouseY > yOpcao - (opcaoAltura / 2) && mouseY < yOpcao + (opcaoAltura / 2)) { // Hitbox 

            if (respostaSelecionada === -1) {
              respostaSelecionada = i;
              if (i === p.correta) {
                pontosQuiz++;
                for (let j = 0; j < 5; j++) particles.push(new Particle(mouseX, mouseY, 'good')); // Partículas 
              } else {
                errosQuiz++;
                for (let j = 0; j < 5; j++) particles.push(new Particle(mouseX, mouseY, 'bad')); // Partículas 
              }
              podeClicarQuiz = false;
              setTimeout(() => {
                respostaSelecionada = -1; perguntaAtual++;
                if (perguntaAtual >= perguntas.length) {
                  quizFinalizado = true;
                  if (pontosQuiz >= perguntas.length * 0.7) tela = 'parabens';
                  else tela = 'gameover';
                }
                podeClicarQuiz = true;
              }, 1200); // Tempo de espera 
            }
            break;
          }
        }
          if (clicouBotao(width - 160, height - 60, 140, 40)) { // Posição 
              tela = 'menuJogos'; quizFinalizado = false; pontosQuiz = 0; errosQuiz = 0;
          }
      }
      break;

    case 'parabens': case 'gameover':
      if (clicouBotao(width / 2 - larguraBotao / 2, height - 100, larguraBotao, alturaBotao)) { // Posição 
        tela = 'menuJogos';
        quizFinalizado = false; paresEncontrados = 0; gameOverMemoriaPorTempo = false; 
        verdesColetados = 0; vermelhosColetados = 0; pontosColheita = 0; pontosCorrida = 0;
      }
      break;
  }
}

function embaralharArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}