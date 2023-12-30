const columns = document.querySelectorAll('.column');

document.addEventListener('keydown', event => {
  event.preventDefault();
  if (event.code.toLowerCase() === 'space') {
    SetRandomColors();
  }
})

document.addEventListener('click', event => {
  const type = event.target.dataset.type;

  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  }
  else if (type === 'copy') {
    CopyByClick(event.target.textContent);
  }
})

function GenerateRandomColor() {
  const codes = '123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += codes[Math.floor(Math.random() * codes.length)];
  }
  return '#' + color;
}

function SetRandomColors() {
  columns.forEach((column) => {
    const isLocked = column.querySelector('i').classList.contains('fa-lock');
    const colorName = column.querySelector('h2');
    const button = column.querySelector('button');
    const generatedColor = GenerateRandomColor();

    if (isLocked) return;

    colorName.textContent = generatedColor;
    column.style.background = generatedColor;

    SetTextColor(colorName, generatedColor);
    SetTextColor(button, generatedColor);
  })
}

SetRandomColors();

function SetTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function CopyByClick(text) {
  return navigator.clipboard.writeText(text);
}