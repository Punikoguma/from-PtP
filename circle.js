let Circles = [];
let Points = []; // 現在の目的地の点を格納する配列
const goalTime = 1; // 全員がゴールに到達するのに必要な時間（秒）
let startTime;
let shapeState = 0; // 0: 三角形, 1: 正方形, 2: 中央の点

window.config = {
  size: 450, // 図形の大きさ
  step: 9, // 正方形のグリッドステップ
  diameter: 10,// 点の直径
  ratio:50,
  bgC: [0, 0, 0], // 背景色、RGB形式の例
  CircleC: [255, 255, 255] // 円の色、RGB形式の例
};

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent('canvas-container');  
  config.centerX = width / 2;
  config.centerY = height / 2;
  startTime = millis(); // スタート時刻を記録
  resetDestination(); // 初期の目的地と円を設定
  noCursor();
}

function draw() {
  background(config.bgC);
  let currentTime = millis();
  let elapsedTime = (currentTime - startTime) / 1000; // 経過時間（秒）
  let interval = 1; // インターバル時間（秒）

  if (elapsedTime >= goalTime + interval) {
    switchShape(); // 図形を切り替え
    resetDestination();
    startTime = currentTime - (elapsedTime - (goalTime + interval)) * 1000; // 次の周期の開始時刻を設定
  }

  if (elapsedTime < goalTime) {
    for (let Circle of Circles) {
      Circle.update(elapsedTime);
    }
  }
  
  for (let Circle of Circles) {
    Circle.display();
  }
  // インターバル時間にテキストを表示し、Circles配列を調整
  if (elapsedTime >= goalTime && elapsedTime < goalTime + interval) {
    if (Circles.length > Points.length) {
      Circles.splice(0, Circles.length - Points.length);
    }
  }
}


function resetDestination() {
  Points = calculatePoints(); // Pointsを直接更新
  adjustCirclesArray(); // Pointsを直接adjustCirclesArrayに渡す
}

function adjustCirclesArray() {
  // CirclesとPointsの長さに応じてループを実行
  for (let i = 0; i < Math.max(Circles.length, Points.length); i++) {
    let CircleIndex = i % Circles.length; // Circlesのインデックスを計算
    let pointIndex = i % Points.length; // Pointsのインデックスを計算

    // 存在しない円を追加する場合
    if (i >= Circles.length) {
      Circles.push(new Circle(width / 2, height / 2, Points[pointIndex].x, Points[pointIndex].y, goalTime));
    } else {
      // 既存の円の目的地を更新
      Circles[CircleIndex].setNewDestination(Points[pointIndex].x, Points[pointIndex].y);
    }
  }
}

function switchShape() {
  shapeState = (shapeState + 1) % 4; // 図形の状態を更新
}

function calculatePoints() {
  let Points = [];
  if (shapeState === 0) {
    Points.push(createVector(config.centerX, config.centerY)); // 中央の点を追加
  } else if (shapeState === 1) {
    TrianglePos(Points); // 三角形の座標を計算
  } else if (shapeState === 2) {
    squarePos(Points); // 正方形の座標を計算
  } else if (shapeState === 3) {
    circlePos(Points); // 円の座標を計算
  }
  return Points;
}

function TrianglePos(Points) {
  let rows = floor(config.size / config.step + 0.5);
  let stepY = sqrt(3) / 2 * config.step;
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i <= row; i++) {
      Points.push(createVector(config.centerX - (row * config.step / 2) + (i * config.step), config.centerY - (rows - 1) * stepY / 2 + row * stepY));
    }
  }
}

function squarePos(Points) {
  let startX = config.centerX - config.size / 2 + config.diameter / 2;
  let startY = config.centerY - config.size / 2 + config.diameter / 2;
  for (let x = startX; x <= config.centerX + config.size / 2 - config.diameter / 2; x += config.step) {
    for (let y = startY; y <= config.centerY + config.size / 2 - config.diameter / 2; y += config.step) {
      Points.push(createVector(x, y));
    }
  }
}

function circlePos(Points) {
  // configオブジェクトから必要な値を取得
  let radius = config.size / 2; // 円の半径としてconfig.sizeの半分を使用
  for (let x = config.centerX - radius; x <= config.centerX + radius; x += config.step) {
    for (let y = config.centerY - radius; y <= config.centerY + radius; y += config.step) {
      let d = dist(x, y, config.centerX, config.centerY);
      if (d + config.diameter / 2 <= radius) {
        Points.push(createVector(x, y)); // 条件を満たす点をPointsに追加
      }
    }
  }
}
class Circle {
  constructor(startX, startY, destinationX, destinationY, goalTime) {
    this.x = startX;
    this.y = startY;
    this.startX = startX;
    this.startY = startY;
    this.destinationX = destinationX;
    this.destinationY = destinationY;
    this.goalTime = goalTime;
    this.ratio = 0;
  }

  update(elapsedTime) {
    let basicRatio = elapsedTime / this.goalTime;
    basicRatio = basicRatio > 1 ? 1 : basicRatio;
    const easedRatio = easeInOutBack(basicRatio);
    this.x = lerp(this.startX, this.destinationX, easedRatio);
    this.y = lerp(this.startY, this.destinationY, easedRatio);
  }
  
display() {
  // 中心座標からの現在の距離を計算
  let distance = dist(this.x, this.y, config.centerX, config.centerY);
  // 距離に応じた直径の減少を単純化（距離が増えると直径は線形に減少）
  let dynamicDiameter = config.diameter * (1 - distance / (config.size*0.6));
  
  // 減少割合を強調（直径が負にならないように最小値を設定）
  dynamicDiameter = Math.max(dynamicDiameter, config.diameter * config.ratio*0.01); // 最小直径を10%に保持

  fill(config.CircleC);
  noStroke();
  circle(this.x, this.y, dynamicDiameter);
}



  setNewDestination(x, y) {
    this.startX = this.x;
    this.startY = this.y;
    this.destinationX = x;
    this.destinationY = y;
    this.ratio = 0;
  }
}

function easeInOutBack(x) {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}