/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * BaseController class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 */
define(['classify/AbstractClass', '../event/EventsEmitter'], function (AbstractClass, EventsEmitter) {

	'use strict';

	var BaseController = {
		$name: 'BaseController',
		$borrows: EventsEmitter
	};

	return new AbstractClass(BaseController);
});