var J1 = true;
var partieGagnee = false;
var choix = '';
var cells = document.querySelectorAll('.cell');
var bouton = document.querySelector('button');
var scoreJ1 = 0;
var scoreJ2 = 0;


var afficherSymbole = function(cell) {
	var image = document.createElement('img');

	// 1 - verifier case remplie ou pas
	// 2 - poser symbole J1 ou j2
	//J1 = pirate, J2 = ninja
	if (cell.classList.contains('cell'))
	{
		if (cell.firstChild) {
			//Si cell à au moins un enfant
			//Ne rien faire
		} else if (J1) {
			cell.classList.add('pirate');
			image.setAttribute("src", "img/pirate.png");
			image.setAttribute("alt", "Pirate");
			cell.appendChild(image);
			// 4 - changer le joueur courant
			J1 = !J1;
		} else {
			cell.classList.add('ninja');
			image.setAttribute("src", "img/ninja.png");
			image.setAttribute("alt", "Pirate");
			cell.appendChild(image);
			// 4 - changer le joueur courant
			J1 = !J1;
		}
	}
};

var combinaisons = [
										[0,1,2], [3,4,5], [6,7,8], //combinaisons horizontales
										[0,3,6], [1,4,7], [2,5,8], //combinaisons verticales
										[0,4,8], [2,4,6]					 //combinaisons en diagonale
									 ];

var verifierCombinaisons = function() {
	// 3 - check combinaison gagnante
	combinaisons.forEach(function(combinaison) {
		if (
		cells[combinaison[0]].classList.value === cells[combinaison[1]].classList.value &&
		cells[combinaison[1]].classList.value === cells[combinaison[2]].classList.value &&
		cells[combinaison[0]].classList.value !== 'cell')
		{
			cells[combinaison[0]].classList.add('win');
			cells[combinaison[1]].classList.add('win');
			cells[combinaison[2]].classList.add('win');
			var currentPlayer;
			if (J1) {
				currentPlayer = 'team ninjas';
				scoreJ2 = scoreJ2 + 1;
			} else {
				currentPlayer = 'team pirates';
				scoreJ1 = scoreJ1 + 1;

			};
			alert('Bravo ' + currentPlayer + '!');
			partieGagnee = true;
		};
	});
};

var verifierEgalite = function() {
	if (cells[0].firstChild && cells[1].firstChild && cells[2].firstChild &&
			cells[3].firstChild && cells[4].firstChild && cells[5].firstChild &&
			cells[6].firstChild && cells[7].firstChild && cells[8].firstChild)
	{
		cells[0].classList.add('egalite');
		cells[1].classList.add('egalite');
		cells[2].classList.add('egalite');
		cells[3].classList.add('egalite');
		cells[4].classList.add('egalite');
		cells[5].classList.add('egalite');
		cells[6].classList.add('egalite');
		cells[7].classList.add('egalite');
		cells[8].classList.add('egalite');
		alert('Egalité!');
	};
};

//exécution
alert("Joueur 1 = Pirates\nJoueur 2 = Ninjas");

//Bouton clear
bouton.addEventListener('click', function() {
	cells.forEach(function(cell) {
		cell.classList.remove('pirate', 'ninja', 'win', 'egalite');
		if (cell.firstChild) {
			var image = document.querySelector('img');
			image.remove();
		};
	});
	partieGagnee = false;
	J1 = true;
});

//Cellules du morpion
cells.forEach(function(cell) {
	cell.addEventListener('click', function() {
		if (!partieGagnee) {
			afficherSymbole(cell);
			verifierCombinaisons();
			verifierEgalite();
			document.getElementById('scoreJ1').textContent = scoreJ1;
			document.getElementById('scoreJ2').textContent = scoreJ2;
		};
	});
});
