/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * ApplicationController.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
	'classify/Class',
	'jquery',
	'doT',
	'../Footer/FooterController',
	'../Header/HeaderController',
	'text!templates/Application/layout.html'
], function (Class, $, doT, FooterController, HeaderController, layoutTemplate) {

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

			this._bodyElement.html(doT.compile(layoutTemplate)());

			this._header = new HeaderController($('#header'));
			this._footer = new FooterController($('#footer'));

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
