/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * Module/Class description.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 */
define(['classify/Class'], function (Class) {

	'use strict';

	var HeaderController = {

		/**
         * Constructor.
         */
		initialize: function (element) {
			console.log('header construct');
		}
	};

	return new Class(HeaderController);
});