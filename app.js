const columns = document.querySelectorAll('.column');

document.addEventListener('keydown', event => {
  event.preventDefault();
  if (event.code.toLowerCase() === 'space') setRandomColors();
});

document.addEventListener('click', event => {
  const {type} = event.target.dataset.type;

  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyByClick(event.target.textContent);
  }
})

function generateRandomColor() {
  const codes = '123456789ABCDEF';
  const colorLength = 6;
  let color = '';
  for (let i = 0; i < colorLength; i++) {
    const { length } = codes;
    const randomIndex = Math.floor(Math.random() * length);
    color += codes[randomIndex];
  }
  return '#' + color;
}

const colors = [];

function setRandomColors() {
  for (let column of columns) {
    const isLocked = column.querySelector('i').classList.contains('fa-lock');
    const colorName = column.querySelector('h2');
    const button = column.querySelector('button');
    const generatedColor = generateRandomColor();

    if (isLocked) {
      colors.push(colorName.textContent);
      return;
    } else colors.push(generatedColor);

    colorName.textContent = generatedColor;
    column.style.background = generatedColor;

    setTextColor(colorName, generatedColor);
    setTextColor(button, generatedColor);
  }

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyByClick(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorsHash() {
  document.location.hash = colors.map((column) => {
    return column.toString().substring(1);
  }).join('-');
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash.substring(1).split('-').map((generatedColor) => { '#' + generatedColor});
  }
  return [];
}

setRandomColors();
