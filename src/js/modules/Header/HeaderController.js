/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * HeaderController classl.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
	'classify/Class',
	'BaseController',
], function (Class, BaseController) {

	'use strict';

	var HeaderController = {
		$name: 'HeaderController',
		$extends: BaseController,

		/**
		 * Constructor.
		 */
		initialize: function (element) {
			console.log('header construct', element);
		},

		/**
		 *
		 */
		destroy: function () {

		}
	};

	return new Class(HeaderController);
});