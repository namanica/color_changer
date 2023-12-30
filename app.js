const columns = document.querySelectorAll('.column');

document.addEventListener('keydown', event => {
  if (event.code.toLowerCase() === 'space') {
    SetRandomColors();
  }
})

function GenerateRandomColor() {
  const codes = '123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += codes[Math.floor(Math.random() * codes.length)]
  }
  return '#' + color;
}

function SetRandomColors() {
  columns.forEach((column) => {
    const colorName = column.querySelector('h2');
    const button = column.querySelector('button');
    const generatedColor = GenerateRandomColor();

    colorName.textContent = generatedColor;
    column.style.background = generatedColor;

    setTextColor(colorName, generatedColor);
    setTextColor(button, generatedColor);
  })
}

SetRandomColors();

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? 'black' : 'white';
}