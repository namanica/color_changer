const columns = document.querySelectorAll('.column');

document.addEventListener('keydown', (event) => {
  event.preventDefault();

  if (event.code.toLowerCase() === 'space') {
    setRandomColors();
  }
});

document.addEventListener('click', (event) => {
  const target = event.target;
  const type = target.dataset.type;

  if (type === 'lock') {
    const node = target.tagName.toLowerCase() === 'i' ? target : target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyByClick(target.textContent);
  }
});

function generateRandomColor() {
  const codes = '123456789ABCDEF';
  const codesLength = codes.length;
  const colorLength = 6;
  let color = '';

  for (let i = 0; i < colorLength; i++) {
    const randomIndex = Math.floor(Math.random() * codesLength);
    color += codes[randomIndex];
  }
  return '#' + color;
}

function copyByClick(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  for (let column of columns) {
    let index = 0;
    const isLocked = column.querySelector('i').classList.contains('fa-lock');
    const colorName = column.querySelector('h2');
    const button = column.querySelector('button');

    if (isLocked) {
      colors.push(colorName.textContent);
      return;
    }

    const color = isInitial ? (colors[index] ? colors[index] : chroma.random()) : chroma.random();
    if (!isInitial) {
      colors.push(color)
    }

    colorName.textContent = color;
    column.style.background = color;

    setTextColor(colorName, color);
    setTextColor(button, color);
    index++;
  }

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function updateColorsHash(colors = []) {
  document.location.hash = colors.map((column) => {
    return column.toString().substring(1);
  }).join('-');
}

function getColorsFromHash() {
  const hash = document.location.hash;
  if (hash.length > 1) {
    return hash.substring(1).split('-').map((color) => { '#' + color});
  }
  return [];
}

setRandomColors(true);
