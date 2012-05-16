/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * ApplicationController.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
	'jquery',
	'../Footer/FooterController',
	'../Header/HeaderController'
], function ($, FooterController, HeaderController) {

	'use strict';

	var ApplicationController = {

		_bodyElement: null,

		_header: null,
		_footer: null,
		_content: null,

		/**
         * Constructor.
         */
		initialize: function () {
			this._bodyElement = $(document.body);

			this._header = new HeaderController();
			this._footer = new FooterController();

			this._readHash();
		},

		/**
		 *
		 */
		_readHash: function () {
			// TODO: read hash and initialize the modules according to the routing


		}
	};

	return new Class(ApplicationController);
});
