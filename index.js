import App from './src/App.js';

const resizeCanvas = (canvas) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
};

const render = (rootContext, targetContext) => {
  rootContext.clearRect(0, 0, rootContext.canvas.width, rootContext.canvas.height);

  const targetWidth = targetContext.canvas.width * (rootContext.canvas.height / targetContext.canvas.height);

  rootContext.drawImage(
    targetContext.canvas,
    rootContext.canvas.width / 2 - targetWidth / 2,
    0,
    targetWidth,
    rootContext.canvas.height,
  );

  requestAnimationFrame(() => render(rootContext, targetContext));
};

const handleJoin = () => {
  document.getElementsByClassName('join')[0].addEventListener('click', () => {
    window.open(atob('aHR0cHM6Ly90Lm1lLytGLXpXalhMTlVJRm1OMlJp'));
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const rootCanvas = document.createElement('canvas');
  resizeCanvas(rootCanvas);

  const rootContext = rootCanvas.getContext('2d');

  if (!rootContext) {
    throw new Error('Canvas is not supported');
  }

  const targetContext = await App(rootContext);

  document.body.prepend(rootCanvas);

  render(rootContext, targetContext);

  handleJoin();
});
