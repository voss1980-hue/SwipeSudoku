// Einfaches Sudoku-Board und Swipe-Logik

const sudokuBoard = [
  [5,3,'', '',7,'', '', '', ''],
  [6,'', '', 1,9,5, '', '', ''],
  ['',9,8, '', '', '', '',6,''],
  [8,'', '', '',6,'', '', '',3],
  [4,'', '', 8,'',3, '', '',1],
  [7,'', '', '',2,'', '', '',6],
  ['',6,'', '', '', '', 2,8,''],
  ['', '', '', 4,1,9, '', '',5],
  ['', '', '', '',8,'', '',7,9]
];

let selectedCell = null;

function drawBoard() {
  const sudoku = document.getElementById('sudoku');
  sudoku.innerHTML = '';
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const div = document.createElement('div');
      div.className = 'cell';
      div.textContent = sudokuBoard[r][c] || '';
      div.dataset.row = r;
      div.dataset.col = c;
      if (selectedCell && selectedCell.r === r && selectedCell.c === c) {
        div.classList.add('selected');
      }
      div.addEventListener('click', () => selectCell(r, c));
      div.addEventListener('touchstart', handleTouch);
      sudoku.appendChild(div);
    }
  }
}

function selectCell(r, c) {
  selectedCell = { r, c };
  drawBoard();
}

function handleTouch(event) {
  const startX = event.touches[0].clientX;
  const startY = event.touches[0].clientY;
  const cell = event.target;
  const r = Number(cell.dataset.row);
  const c = Number(cell.dataset.col);

  function onTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dx = endX - startX;
    const dy = endY - startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 25) {
      if (absDx > absDy) {
        // Horizontal swipe
        if (dx > 0 && c < 8) selectCell(r, c + 1); // Right
        if (dx < 0 && c > 0) selectCell(r, c - 1); // Left
      } else {
        // Vertical swipe
        if (dy > 0 && r < 8) selectCell(r + 1, c); // Down
        if (dy < 0 && r > 0) selectCell(r - 1, c); // Up
      }
    }
    cell.removeEventListener('touchend', onTouchEnd);
  }
  cell.addEventListener('touchend', onTouchEnd);
}

// Eingabe über Tastatur (für Desktop)
document.addEventListener('keydown', (e) => {
  if (!selectedCell) return;
  const { r, c } = selectedCell;
  if (e.key >= '1' && e.key <= '9') {
    sudokuBoard[r][c] = Number(e.key);
    drawBoard();
  } else if (e.key === 'Backspace' || e.key === 'Delete') {
    sudokuBoard[r][c] = '';
    drawBoard();
  } else if (e.key === 'ArrowUp' && r > 0) selectCell(r - 1, c);
  else if (e.key === 'ArrowDown' && r < 8) selectCell(r + 1, c);
  else if (e.key === 'ArrowLeft' && c > 0) selectCell(r, c - 1);
  else if (e.key === 'ArrowRight' && c < 8) selectCell(r, c + 1);
});

function resetBoard() {
  window.location.reload();
}

function solveBoard() {
  alert('Lösungsfunktion kann ergänzt werden!');
}

drawBoard();