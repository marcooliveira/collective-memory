/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * SearchController class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
	'classify/Class',
	'BaseController',
], function (Class, BaseController) {

	'use strict';

	var SearchController = {
		$name: 'SearchController',
		$extends: BaseController,

		/**
		 * Constructor.
		 */
		initialize: function (element) {
			console.log('search construct', element);
		},

		/**
		 *
		 */
		destroy: function () {

		}
	};

	return new Class(SearchController);
});