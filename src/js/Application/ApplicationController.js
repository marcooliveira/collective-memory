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
	'amd-utils/object/mixIn',
	'../Footer/FooterController',
	'../Header/HeaderController',
	'text!templates/Application/layout.html'
], function (Class, $, doT, mixIn, FooterController, HeaderController, layoutTemplate) {

	'use strict';

	var ApplicationController = {

		_config: {
			environment: 'dev',
			debug:        true
		},

		_bodyElement: null,

		_header: null,
		_footer: null,
		_content: null,

		/**
         * Constructor.
         * 
         * @param {object} config An object
         */
		initialize: function (config) {
			mixIn(this._config, config);

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
