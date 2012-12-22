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
/// <reference path="Util.ts"/>
/// <reference path="Primes.ts"/>

class Grid {
	static FONT_SIZE = 20;

	paper  : raphaeljs.Paper;   // does the drawing in Raphael
	rows   : number;
	cols   : number;
	nums   : number;            // largest number in the animation
	speed  : number;
	slider : raphaeljs.Element; // shows which multiplier is being used
	flagElements  = {};         // the red 'X's
	numElements = {};           // the numbers

	constructor(paper : raphaeljs.Paper, rows : number, cols : number) {
		this.paper = paper;
		this.resize(rows, cols);
		this.setSpeed(1);
	}

	resize(rows : number, cols : number) {
		this.rows = rows;
		this.cols = cols;
		this.nums = this.rows * this.cols;
	}

	setSpeed(speed : number) {
		this.speed = speed;
	}

	private removeElements() {
		for (var key in this.numElements) {
			if (this.numElements.hasOwnProperty(key)) {
				this.numElements[key].remove();
				delete this.numElements[key];
			}
		}

		for (var key in this.flagElements) {
			if (this.flagElements.hasOwnProperty(key)) {
				this.flagElements[key].remove();
				delete this.flagElements[key];
			}
		}

		if (this.slider) {
			this.slider.remove();
			this.slider = null;
		}
	}

	showNumbers(callback : Function) {
		// if the animation has ran before, we need to remove the SVG elements
		this.removeElements();

		// fade in numbers in the range [1, nums]
		this.showNumber(1, callback);
	}

	private showNumber(cur : number, callback : Function) {
		this.numElements[cur] = paper.text(this.getNumX(cur), this.getNumY(cur), String(cur))
			.attr({'font-family' : 'Lucida Console', 'font-size' : Grid.FONT_SIZE / 4, 'opacity' : 0, 'fill' : 'white'})
			.animate({'font-size' : Grid.FONT_SIZE, 'opacity' : cur === 1 ? 0.3 : 1}, 300 / this.speed);

		if (cur < this.nums) {
			timeout(this, this.showNumber, 10 / this.speed, cur + 1, callback);
		} else {
			callback();
		}
	}

	moveSlider(num : number, callback : Function) {
		if (this.slider) {
			// the slider has been created, so animate to the desired position
			this.slider.animate({'x' : this.getNumX(num) - Grid.FONT_SIZE, 'y' : this.getNumY(num) - Grid.FONT_SIZE}, 800 / this.speed, '<>', callback);
		} else {
			// the slider is undefined, so fade it in
			this.slider = paper.rect(this.getNumX(num) - Grid.FONT_SIZE, this.getNumY(num) - Grid.FONT_SIZE, 40, 40)
				.attr({'stroke' : 'rgb(200,180,50)', 'stroke-width' : 5, 'stroke-opacity' : 0, 'r' : 10, 'rx' : 10, 'ry' : 10})
				.animate({'stroke-opacity' : 1}, 800 / this.speed);

			setTimeout(callback, 800 / this.speed);
		}
	}

	hideSlider(callback : Function) {
		if (this.slider) {
			this.slider.animate({'opacity' : 0}, 800 / this.speed);
			setTimeout(callback, 800 / this.speed);
		} else {
			callback();
		}
	}

	flagMultiples(m : number, callback : Function) {
		// flag all numbers in the range [<m> * 2, <nums>]
		// that are multiples of <m>
		this.flagMultiple(m, m * m, callback);
	}

	private flagMultiple(m : number, cur : number, callback : Function) {
		if (String(cur) in this.flagElements) {
			// an 'X' has already been created for <cur>
			// make it flash instead of creating another 'X'
			this.flagElements[cur].attr({'font-size' : 50, 'opacity' : 1})
				.animate({'font-size' : 35, 'opacity' : 0.6}, 250 / this.speed);
		} else {
			// <cur> has not been flagged
			// make a new 'X'
			this.flagElements[cur] = paper.text(this.getNumX(cur), this.getNumY(cur), 'X')
				.attr({'fill' : '#BF0000', 'font-family' : 'cursive', 'font-size' : 50, 'opacity' : 1})
				.animate({'font-size' : 35, 'opacity' : 0.6}, 250 / this.speed);
		}

		if (cur + m <= this.nums) {
			timeout(this, this.flagMultiple, 100 / this.speed, m, cur + m, callback);
		} else {
			callback();
		}
	}

	hideNonPrimes(callback : Function) {
		this.hideNonPrime(1, callback);
	}

	private hideNonPrime(num : number, callback : Function) {
		for (var i = 1; i <= this.nums; i++) {
			if (!isPrime(i)) {
				this.numElements[i].animate({'opacity' : 0}, 200 / this.speed);
				if (i !== 1) {
					this.flagElements[i].animate({'opacity' : 0}, 200 / this.speed);
				}
			}
		}

		setTimeout(callback, 200 / this.speed);
	}

	alignPrimes(callback : Function) {
		var primes = primesInRange(2, this.nums);
		this.rows = Math.ceil(Math.sqrt(primes));
		this.cols = Math.ceil(Math.sqrt(primes));

		this.alignPrime(2, primes, callback);
	}

	private alignPrime(p : number, nump : number, callback : Function) {
		var n = primesInRange(2, p);
		this.numElements[p].animate({'x' : this.getNumX(n), 'y' : this.getNumY(n)}, 300 / this.speed, '<>');

		if (nextPrime(p) <= this.nums) {
			timeout(this, this.alignPrime, 50 / this.speed, nextPrime(p), nump, callback);
		} else {
			callback();
		}
	}

	private getNumX(num : number) {
		return (((num - 1) % this.cols) + 1) * (this.paper.width / (this.cols + 1));
	}

	private getNumY(num : number) {
		return (Math.floor((num - 1) / this.cols) + 1) * (this.paper.height / (this.rows + 1));
	}
}