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

function timeout(scope : any, callback : Function, delay : number, ...args : any[]) {
	// mimic the behavior of setTimeout, but instead call the callback
	// function with a scope specified by <scope>

	setTimeout(function () {
		callback.apply(scope, args);
	}, delay);
}