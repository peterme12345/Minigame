const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const arrow = document.getElementById("arrow");

const sections = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
const colors = [
  "#FF0000",
  "#0000FF",
  "#008000",
  "#FFFF00",
  "#800080",
  "#FFA500",
];

let angle = 0;
let spinning = false;
let spinSpeed = 0;
let spinAcceleration = 20;
let spinDeceleration = 0.98;

function drawWheel() {
  const sectionAngle = (2 * Math.PI) / sections.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(150, 150);
  ctx.rotate((angle * Math.PI) / 180);

  for (let i = 0; i < sections.length; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 150, i * sectionAngle, (i + 1) * sectionAngle);
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.rotate(i * sectionAngle + sectionAngle / 2);
    ctx.translate(100, 10);
    ctx.fillText(sections[i], -ctx.measureText(sections[i]).width / 2, 0);
    ctx.restore();
  }

  ctx.restore();
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  spinSpeed = Math.random() * 20 + 30;
  requestAnimationFrame(animateSpin);
}

function animateSpin() {
  if (spinSpeed > 0.1) {
    angle += spinSpeed;
    spinSpeed *= spinDeceleration;
    drawWheel();
    requestAnimationFrame(animateSpin);
  } else {
    spinning = false;
    let finalAngle = angle % 360;

    const sectionAngle = 360 / sections.length;
    let adjustedAngle = (finalAngle + sectionAngle / 2) % 360;

    let sectionIndex = Math.floor(adjustedAngle / sectionAngle);

    document.getElementById("result").innerText =
      "You landed on: " + sections[sectionIndex];
  }
}

drawWheel();
