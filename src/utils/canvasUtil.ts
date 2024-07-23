export function drawCircle(
  canvas: HTMLCanvasElement,
  circleProperties: Record<string, number>,
) {
  const ctx = canvas.getContext("2d");
  //   const width = canvas.width;
  const height = canvas.height;
  const { n1, n2, i, r } = circleProperties;

  // 设置圆的半径

  const rx = r * (3 + n2 * 2);
  const ry = r * (3 + n1 * 3);
  // 计算旋转和偏移
  //   const translateX = -(i + 10) * 18;
  const translateY = n2 * 300;
  if (!ctx) {
    return;
  }

  // 保存当前状态，以便稍后恢复
  ctx.save();

  // 设置描边颜色
  const hue = Math.floor(i * 0.35);
  const color = `hsl(${hue}, 90%, 70%)`;
  ctx.strokeStyle = color;
  const backgroundColor = "transparent";
  ctx.fillStyle = backgroundColor;
  ctx.lineWidth = 0.2;
  // 画圆
  ctx.beginPath();
  ctx.ellipse(
    -r * 2.5 + i * r * 0.15,
    height / 2 + translateY,
    rx,
    ry,
    n2 * 270 * (Math.PI / 180),
    0,
    2 * Math.PI,
  );
  ctx.stroke();
  ctx.fill();

  // 恢复之前的状态
  ctx.restore();
}
