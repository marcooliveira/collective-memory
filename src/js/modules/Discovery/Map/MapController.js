/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * MapController class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
	'classify/Class',
	'BaseController',
], function (Class, BaseController) {

	'use strict';

	var MapController = {
		$name: 'MapController',
		$extends: BaseController,

		/**
		 * Constructor.
		 */
		initialize: function (element) {
			console.log('map construct', element);
		},

		/**
		 *
		 */
		destroy: function () {

		}
	};

	return new Class(MapController);
});