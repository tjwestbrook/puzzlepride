new p5();
const img = [], facts = [];
function preload() {
  img.push(loadImage("./pride-flags/Pride-Flag.png"))
  facts.push("This is the LGBTQ+ pride flag.\nL = Lesbian: a woman attracted to other women.\nG = Gay: a man/person attracted to other men/the same sex.\nB = Bisexual: a person attracted to both men and women.\nT = Transgender: a person whose gender identity doesn't match their assigned sex at birth.\nQ = Questioning: someone who is questioning their sexuality and/or gender identity.")
  img.push(loadImage("./pride-flags/Transgender-Pride-Flag.png"))
  facts.push("This is the transgender pride flag.\nTrans or transgender means one's gender identity does not match their assigned sex at birth.\nFtM (female-to-male): A man who was born female.\nMtF (male-to-female): A woman who was born male.")
  img.push(loadImage("./pride-flags/Bisexual-Pride-Flag.png"))
  facts.push("This is the bisexual pride flag.\nBisexual means being attracted to both sexes.")
  img.push(loadImage("./pride-flags/Pansexual-Pride-Flag.png"))
  facts.push("This is the pansexual pride flag.\nPansexual means being attracted toward all sexes and genders, or lack there of.")
  img.push(loadImage("./pride-flags/Asexual-Pride-Flag.png"))
  facts.push("This is the asexual pride flag.\nAsexual means having no sexual attraction towards anyone.\nAnother term called aromantic means having no romantic attraction towards anyone.\nAnother term called agender means identifying with no gender.")
  img.push(loadImage("./pride-flags/Genderqueer-Pride-Flag.png"))
  facts.push("This is the genderqueer pride flag.\nGenderqueer means identifying with neither, both, or a combination of male and female genders.")
  img.push(loadImage("./pride-flags/Nonbinary-Pride-Flag.png"))
  facts.push("This is the non-binary pride flag.\nNon-binary, similar to genderqueer, means identifying with a gender that isn't exclusively male or female.")
  img.push(loadImage("./pride-flags/Genderfluid-Pride-Flag.png"))
  facts.push("This is the genderfluid pride flag.\nGenderfluid means identifying with a gender which can vary over time\nEx: In one instance, a person could identify as a man, and in another, a woman.")
  img.push(loadImage("./pride-flags/Bigender-Pride-Flag.png"))
  facts.push("This is the bigender pride flag.\nBigender means identifying with two genders, either simultaneously or varying between the two.\nEx: Someone who identifies as both a man and woman at the same time. ")
  img.push(loadImage("./pride-flags/Bear-Pride-Flag.png"))
  facts.push("This is the bear pride flag.\nA bear is a large, hairy, masuline, gay man.")
  img.push(loadImage("./pride-flags/Lipstick-Pride-Flag.png"))
  facts.push("This is the lipstick lesbian pride flag.\nA lipstick lesbian is a feminine, gay woman.")
  img.push(loadImage("./pride-flags/Twink-Pride-Flag.png"))
  facts.push("This is the twink pride flag.\nA twink is a young, thin, feminine, gay man with little body hair.")
  img.push(loadImage("./pride-flags/Intersex-Pride-Flag.png"))
  facts.push("This is the intersex pride flag.\nIntersex means being born both male and female physically in some aspect.")
  img.push(loadImage("./pride-flags/Straight-Ally-Pride-Flag.png"))
  facts.push("This is the cis/straight ally pride flag.\nAn ally is a supporter of the LGBTQ+ community.")
}

const width = () => windowWidth, height = () => max(800,windowHeight);
let lvl = getItem('level') || 1, tiles = getItem('tiles'), tile = [];
const len = () => 0.09*width(), rad = 2, last_lvl = 14;
let [row, col] = [6,7], [btilex, btiley] = [row-1,0];
let play = false, newGame = tiles ? false : true;
const bgcolor = () => color('rgba(0,0,0,0.33)');
const blank = (x=btilex,y=btiley) => { [btilex, btiley] = [x,y]; return bgcolor() };
const dWidth = () => width()>500;
const imgw = () => max(200,0.2*width()), imgh = () => max(120,0.12*width());
const imgx = () => dWidth()?width()-1.2*imgw():(width()-imgw())/2;
const imgy = 14, bw = 25*9, bh = 25*3;
const bx = () => width()/2, by = () => 0.93*height();
const textx = (a=0) => a?dWidth()?(textAlign(LEFT), 5):(textAlign(CENTER), 15)
: dWidth()?(textAlign(LEFT), 5):(textAlign(CENTER), width()/2)
const texty = (a=0,b=lvl!==1) => a&&!dWidth()?b?164:211:dWidth()?144:244;
const reset = () => { play = false; newGame = true; redraw() };
const restart = () => { clearStorage(); lvl = 1; reset() };

function resetGame() {
  clear(); background(bgcolor());
  image(img[lvl-1], imgx(), imgy, imgw(), imgh());
  instructions(); drawButtons(); initializeTiles(tile);
}

function instructions() {
  strokeWeight(1); stroke(2);
  fill(Green); textSize(25);
  text("Level "+lvl+": Solve this flag!", textx(), texty()-90);
  fill(Red_LL); textSize(25);
  if (lvl === 1) text("Use the arrow keys or mouse to move tiles into the blank space which always ends on the bottom.\nAt the bottom, click on the 'Shuffle' button to restart the same level or 'Restart' to start from Level 1.", textx(), texty()-60);
}

function drawButtons() {
  fill(White); textAlign(LEFT);
  rect(bx()-1.1*bw, by(), bw, bh);
  rect(bx()+0.1*bw, by(), bw, bh);
  fill(Black); textSize(40); strokeWeight(0);
  text('Shuffle', bx()-0.9*bw, by()+2*bh/3);
  text('Restart', bx()+0.3*bw, by()+2*bh/3);
}

function displayFact() {
  strokeWeight(1); stroke(0);
  fill(Blue);
  textWrap(WORD); textSize(25);
  text(facts[lvl-1], textx(1), texty(1), 0.9*width()); textAlign(LEFT);
  if (lvl < last_lvl) { fill(Black); textSize(25);
    text(`You won! Click the flag to play level ${lvl+1}.`, width()/2-200, 0.92*height());
  } else { clearStorage(); fill(Black); stroke(0); textSize(25);
    text("Congratulations! You beat the game!", (width()/2)-200, 0.92*height());
  }
}

function setup() {
  createCanvas(width(), height());
  noLoop();
}

function draw() {
  if (!play && lvl <= last_lvl) {
    play = !play; resetGame()
    newGame ? scramble() : restoreTiles()
  } else if (userWon()) { displayFact(); play = !play };
}

windowResized = () => {
  resizeCanvas(width(), height(), 1);
  tiles = tile; tile = []; resetGame(); restoreTiles()
  if (userWon()) displayFact()
}

mousePressed = () => {
  if (play) {
    let [x, y] = move(mousePressMove(mouseX, mouseY))
    if (x>=0 && x<col && y>=0 && y<row) swapTiles(x, y)
    redraw()
  } else if (mouseX > imgx() && mouseY < imgy+imgh()) {
    if (lvl < last_lvl)  lvl += 1; reset()
  }
  if (by() < mouseY && mouseY < by()+bh) {
    if (bx() < mouseX) {
      if (mouseX < bx()+bw) restart()
    } else if (mouseX > bx()-bw) reset()
  }
}

function mousePressMove(x, y) {
  let bx = tile[btilex][btiley].x
  let by = tile[btilex][btiley].y
  let l = len()
  if (y < by && y > by-l && x > bx && x < bx+l) return 1 //up
  if (y > by+l && y < by+2*l && x > bx && x < bx+l) return 0 //down
  if (x < bx && x > bx-l && y > by && y < by+l) return 3 // left
  if (x > bx+l && x < bx+2*l && y > by && y < by+l) return 2 // right
  return 4
}

keyPressed = () => {
  if (play) {
    let [x, y] = move((() => {
      return {
        ArrowUp: 0,
        ArrowDown: 1,
        ArrowLeft: 2,
        ArrowRight: 3
      }[key]
    })());
    if (x>=0 && x<col && y>=0 && y<row) swapTiles(x, y)
    redraw()
  }
}

function move(d=floor(random(0,4)), x=btilex, y=btiley) {
  switch(d) {
    case 0: return [x, y -= 1] // up
    case 1: return [x, y += 1] // down
    case 2: return [x += 1, y] // left
    case 3: return [x -= 1, y] // right
    default: return [-1, -1]
  }
}

function swapTiles(x, y) { // swap tile[x][y] and blank tile
  tile[btilex][btiley].color = tile[x][y].color;
  tile[x][y].color = blank(x,y);
}

function scramble(t=3000) {
  for (let i = 0; i < t; i++) {
    let [x, y] = [-1, -1]
    while (x<0 || x>=col || y<0 || y>=row) { [x, y] = move() }
    swapTiles(x, y)
  }
}

function restoreTiles() {
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      tile[x][y].color = color(tiles[x][y]._color.levels);
      if (!tile[x][y].not()) blank(x,y)
    }
  }
}

function userWon() { // not blank or flag color ? break : cont
  return tile.every(row => {
    return row.every(t => {
      return t.not() && t.not(t.flagColor) ? false : true
    })
  })
}
function initializeTiles(tile) {
  tile.length = 0;
  row = // col = 7
    lvl===1 ? 6
    : lvl===2 ? 5
    : lvl===3 ? 5
    : lvl===4 ? 6
    : lvl===5 ? 4
    : lvl===6 ? 6
    : lvl===7 ? 4
    : lvl===8 ? 5
    : lvl===12 ? 6
    : lvl===14 ? 6
    : 7
  let space = len()+rad;
  let xtile = 0.5*(width()-col*space);
  let ytile = height()+row*space;
  lvl===1 && !dWidth() ? ytile *= 0.6 : ytile *= 0.5
  for (let x = 0; x < col; x++) {
    let tileColumn = [];
    for (let y = 0; y < row; y++) {
      tileColumn.push(new Tile(xtile, ytile-space * y))
    }
    tile.push(tileColumn);
    xtile += space;
  }
  lvl === 14 ? blank(3,0) : blank(row-1,0);
  colorTiles();
}
class Tile {
  constructor(x=0,y=0,l=len(),r=rad) {
    this.x = x
    this.y = y
    this.len = l
    this.rad = r
  }
  draw(scale) { square(this.x, this.y, this.len, this.rad) }
  delete(scale) { erase(); this.draw(scale); noErase() }
  not(c=blank()) {  return !this._color.levels.every((x, i) =>
    x !== c.levels[i] ? false : true) }
  get flagColor() { return this._flagColor }
  get color() { return this._color }
  set flagColor(c) { this.color = this._flagColor = c }
  set color(c) { this._color = c; this.render() }
  render(scale=1) {
    this.delete(scale); strokeWeight(1);
    !this.not() ? stroke(White) : stroke(Black)
    fill(this._color); this.draw(scale);
    clearStorage();
    storeItem('tiles', tile);
    storeItem('level', lvl);
  };
}

// flag colors sourced from flagcolorcodes.com
//pride-rainbow
const Red = color(209, 34, 41) // #D12229
const Orange = color(246, 138, 30) // #F68A1E
const Yellow = color(253, 224, 26) // #FDE01A
const Green = color(0, 121, 64) // #007940
const Indigo = color(36, 64, 142) // #24408E
const Violet = color(115, 41, 130) // #732982
//transgender
const Light_Blue = color(91, 206, 250) // #5BCEFA
const Pink = color(245, 169, 184) // #F5A9B8
const White = color(255, 255, 255) // #FFFFFF
//bisexual
const Pink_BS = color(214, 2, 112) // #D60270
const Purple = color(155, 79, 150) // #9B4F96
const Blue = color(0, 56, 168) // #0038A8
//pansexual
const Magenta = color(255, 33, 140) // #FF218C
const Yellow_PS = color(255, 216, 0) // #FFD800
const Cyan = color(33, 177, 255) // #21B1FF
//asexual
const Black = color(0, 0, 0) // #000000
const Grey = color(163, 163, 163) // #A3A3A3
// const White = color(255, 255, 255) // #FFFFFF
const Purple_AS = color(128, 0, 128) // #800080
// //polysexual
// const Pink_PS = color(247, 20, 186) // #F714BA
// const Green_PS = color(1, 214, 106) // #01D66A
// const Blue_PS = color(21, 148, 246) // #1594F6
//genderqueer
const Lavender = color(181, 126, 220) // #B57EDC
// const White = color(255, 255, 255) // #FFFFFF
const Green_GQ = color(74, 129, 35) // #4A8123
//nonbinary
const Yellow_NB = color(252, 244, 52) // #FCF434
// const White = color(255, 255, 255) // #FFFFFF
const Purple_NB = color(156, 89, 209) // #9C59D1
const Black_NB = color(44, 44, 44) // #2C2C2C
//genderfluid
const Pink_GF = color(255, 118, 164) // #FF76A4
// const White = color(255, 255, 255) // #FFFFFF
const Purple_GF = color(192, 17, 215) // #C011D7
// const Black = color(0, 0, 0) // #000000
const Blue_GF = color(47, 60, 190) // #2F3CBE
//bigender
const Pink_BG = color(196, 121, 162) // #C479A2
const Light_Pink = color(237, 165, 205) // #EDA5CD
const Purple_BG = color(214, 199, 232) // #D6C7E8
const Light_Blue_BG = color(154, 199, 232) // #9AC7E8
const Blue_BG = color(109, 130, 209) // #6D82D1
//intersex
// const Yellow_PS = color(255, 216, 0) // #FFD800
const Violet_IS = color(121, 2, 170) // #7902AA
//international-bear-brotherhood
const Dark_Brown = color(97, 55, 4) // #613704
const Orange_BB = color(212, 99, 0) // #D46300
const Golden_Yellow = color(253, 220, 98) // #FDDC62
const Tan = color(253, 229, 183) // #FDE5B7
const Gray = color(84, 84, 84) // #545454
//lipstick-lesbian
const Dark_Pink = color(163, 2, 98) // #A30262
const Dusty_Pink = color(181, 86, 144) // #B55690
const Pink_LL = color(209, 98, 164) // #D162A4
const Lavender_LL = color(228, 172, 207) // #E4ACCF
const Red_LL = color(197, 78, 84) // #C54E54
const Brown = color(138, 30, 4) // #8A1E04
//twink
const Twink_Pink = color(255, 176, 255) // #FFB0FF
const Twink_Yellow = color(255, 255, 128) // #FFFF80
//straight-ally
const str8_Red = color(240, 0, 0) // #F00000
const str8_Orange = color(254, 126, 0) // #FE7E00
const str8_Yellow = color(255, 255, 0) // #FFFF00
const str8_Green = color(0, 122, 65) // #007A41
const str8_Indigo = color(64, 65, 254) // #4041FE
const str8_Violet = color(160, 1, 190) // #A001BE

function colorTiles() {
  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      tile[x][y].flagColor = (
        lvl===1 ? //gay pride flag
          y===0 ? Violet
          : y===1 ? Indigo
          : y===2 ? Green
          : y===3 ? Yellow
          : y===4 ? Orange : Red
        : lvl===2 ? //transgender pride flag
          y===0 || y===4 ? Light_Blue
          : y===1 || y===3 ? Pink : White
        : lvl===3 ? //bisexual pride flag
          y===0 || y===1 ? Blue
          : y===2 ? Purple : Pink_BS
        : lvl===4 ? //pansexual pride flag
          y===0 || y===1 ? Cyan
          : y===2 || y===3 ? Yellow_PS : Magenta
        : lvl===5 ? //asexual/demisexual pride flag
          y===0 ? Purple_AS
          : y===1 ? White
          : y===2 ? Grey : Black
        : lvl===6 ? //genderqueer pride flag
          y===0 || y===1 ? Green_GQ
          : y===2 || y===3 ? White : Lavender
        : lvl===7 ? //non-binary pride flag
          y===0 ? Black_NB
          : y===1 ? Purple_NB
          : y===2 ? White : Yellow_NB
        : lvl===8 ? //genderfluid pride flag
          y===0 ? Blue_GF
          : y===1 ? Black
          : y===2 ? Purple_GF
          : y===3 ? White : Pink_GF
        : lvl===9 ? //bigender pride flag
          y===0 ? Blue_BG
          : y===1 ? Light_Blue_BG
          : y===2 || y===4 ? Purple_BG
          : y===3 ? White
          : y===5 ? Light_Pink : Pink_BG
        : lvl===10 ? //bear pride flag
          y===0 ? Black
          : y===1 ? Gray
          : y===2 ? White
          : y===3 ? Tan
          : y===4 ? Golden_Yellow
          : y===5 ? Orange_BB : Dark_Brown
        : lvl===11 ? //lipstick lesbian pride flag
          y===0 ? Brown
          : y===1 ? Red_LL
          : y===2 ? Lavender_LL
          : y===3 ? White
          : y===4 ? Pink_LL
          : y===5 ? Dusty_Pink : Dark_Pink
        : lvl===12 ? //twink pride flag
          y===0 || y===1 ? Twink_Yellow
          : y===2 || y===3 ? White : Twink_Pink
        : lvl===13 ? //intersex pride flag
          ((y===1 || y===5) && (x>1 && x<5)) ||
          ((y>1 && y<5) && (x===1 || x===5)) ?
          Violet_IS : Yellow_PS
        : //lvl===14 ? //straight ally pride flag
          y===0 ? x>1 && x<5 ? White : str8_Violet
          : y===1 ? x===0 || x===3 || x===6 ? Black : str8_Indigo
          : y===2 ? x>0 && x<6 ? str8_Green : White
          : y===3 ? x>1 && x<5 ? str8_Yellow : Black
          : y===4 ? x>1 && x<5 ? str8_Orange : White
          : x===3 ? str8_Red : Black
      )
    }
  }
}