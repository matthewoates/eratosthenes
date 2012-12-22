/* 
 * Author : Matthew Oates
 * Year   : 2012
 * 
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public license (v3) as published by the
 * Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 * 
 * see <www.gnu.org/licenses/gpl-3.0.html>
 */

/// <reference path="raphael.d.ts"/>
/// <reference path="Grid.ts"/>
/// <reference path="Primes.ts"/>

var paper;
var grid;
var rows = 10;
var cols = 10;
var speed = 1;
var restartButton;

function load() {
	restartButton =  document.getElementById('restart');

	document.getElementById('num_rows').addEventListener('change', userSetNumRows);
	document.getElementById('num_cols').addEventListener('change', userSetNumCols);
	document.getElementById('speed').addEventListener('change', userSetSpeed);
	restartButton.addEventListener('click', restartAnimation);

	paper = Raphael('animation', 600, 600);
	grid = new Grid(paper, 10, 10);

	start();
}

function start() {
	restartButton.disabled = true;
	grid.resize(rows, cols);
	grid.setSpeed(speed);

	grid.showNumbers(sieve);
}

function sieve(num : number) {
	if (this.grid.nums > 1) {
		num = num || 2;
		if (num > Math.sqrt(grid.nums)) {
			movePrimes();
		} else {
			grid.moveSlider(num, function () {
				grid.flagMultiples(num, function () {sieve(nextPrime(num))});
			});
		}
	} else {
		finish();
	}
}

function movePrimes() {
	grid.hideSlider(function () {
		grid.hideNonPrimes(
			function () {
				grid.alignPrimes(finish);
			}
		);
	});
}

function finish() {
	restartButton.disabled = false;
}

function userSetNumRows(event : Event) {
	rows = getValue(event);
}

function userSetNumCols(event : Event) {
	cols = getValue(event);
}

function userSetSpeed(event : Event) {
	speed = getValue(event);
}

function getValue(event : Event) {
    var result;
    if (event.srcElement) {
        result = parseFloat((<HTMLSelectElement>event.srcElement).value);
    } else {
        result = parseFloat((<HTMLSelectElement>event.target).value);
    }

    return result;
}

function restartAnimation(event : Event) {
	start();
}

window.addEventListener('load', load);
