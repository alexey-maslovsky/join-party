import GifPlayer from './GifPlayer.js';

const random = (max) => {
  return Math.floor(Math.random() * max);
};

const randomFromSource = (...source) => {
  return source[random(source.length)];
};

const loadGifs = () => {
  const gifCount = 15;

  const promises = Array.from({ length: gifCount }).map((_, index) => {
    return new Promise((resolve, reject) => {
      const gif = new GifPlayer();

      gif.load(`/images/${index + 1}.gif`);

      gif.onload = () => {
        if (index === 9) {
          gif.playSpeed = 0.01;
        }
        resolve(gif);
      };
    });
  });

  return Promise.all(promises);
};

const generateRandomImages = (gifs, x, y, width, height) => {
  return Array.from({ length: 1 }).map((_, index) => {
    return {
      gif: randomFromSource(...gifs),
      x: x + random(width),
      y: y + random(height),
    };
  });
};

const generateImages = (gifs, context) => {
  const step = 10;
  const stepX = context.canvas.width / step;
  const stepY = context.canvas.height / step;

  const map = Array.from({ length: step + 1 }).map((_, i) => {
    return Array.from({ length: step }).map((_, j) => {
      return generateRandomImages(gifs, stepX * j, stepY * (i - 1), stepX, stepY);
    });
  });

  return map.flat(2);
};

const render = (context, images) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  images.map(({ gif, x, y }) => {
    context.drawImage(gif.image, x, y, gif.width * 2, gif.height * 2);
  });

  requestAnimationFrame(() => render(context, images));
};

const App = async () => {
  const canvas = document.createElement('canvas');
  canvas.width = 3000;
  canvas.height = 1080;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas is not supported');
  }

  const gifs = await loadGifs();

  const images = generateImages(gifs, context);

  requestAnimationFrame(() => render(context, images));

  return context;
};

export default App;
