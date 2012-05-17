/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * Module/Class description.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define(['classify/Class'], function (Class) {

	'use strict';

	var FooterController = {

		/**
		 * Constructor.
		 */
		initialize: function (element) {
			console.log('footer construct', element);
		}
	};

	return new Class(FooterController);
});