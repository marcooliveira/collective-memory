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
	'../BaseController',
	'jquery',
	'amd-utils/object/mixIn',
	'./ApplicationView',
	'../Header/HeaderController',
	'../Footer/FooterController',
], function (Class, BaseController, $, mixIn, ApplicationView, HeaderController, FooterController) {

	'use strict';

	var ApplicationController = {
		$name: 'ApplicationController',
		$extends: BaseController,
		
		_config: {
			environment: 'dev',
			debug:        true
		},

		_headerController: null,
		_footerController: null,

		_view: null,


		/**
		 * Constructor.
		 *
		 * @param {object} config An object
		 */
		initialize: function (config) {
			mixIn(this._config, config);

			this._view = new ApplicationView($(document.body));

			this._headerController = new HeaderController(this._view.getHeader());
			this._footerController = new FooterController(this._view.getFooter());

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