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

// since <num> never exceeds 15^2, the computational complexity of these
// naive implementations vs faster implementations is negligible. 

function nextPrime(num : number) {
	num++;

	while (!isPrime(num)) {
		num++;
	}

	return num;
}

function isPrime(num : number) {
	for (var i = 2; i < num; i++) {
		if (num % i === 0) return false;
	}

	return num !== 1;
}

function primesInRange(start : number, end : number) {
	var count = 0;

	for (var i = start; i <= end; i++) {
		if (isPrime(i)) {
			count++;
		}
	}

	return count;
}