/*jslint browser:true, devel:true, nomen:true*/
/*global define*/

/**
 * DiscoveryView class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
	'classify/Class',
	'BaseView',
	'jquery',
	'doT',
	'text!templates/Discovery/structure.html'
], function (Class, BaseView, $, doT, structureTemplate) {

	'use strict';

	var DiscoveryView = {
		$name: 'DiscoveryView',
		$extends: BaseView,

		_searchElement: null,
		_mapElement: null,

		/**
		 * {@inheritDoc}
		 */
		initialize: function (element) {
			this.$super(element);

			this._element.addClass('discovery-module');
			this._element.html(doT.compile(structureTemplate)());

			this._searchElement = this._element.find('.search-module').eq(0);
			this._mapElement = this._element.find('.map-module').eq(0);
		},

		/**
		 *
		 */
		getSearchElement: function () {
			return this._searchElement;
		},

		/**
		 *
		 */
		getMapElement: function () {
			return this._mapElement;
		},

		/**
		 *
		 */
		destroy: function () {
			this._element.empty();

			this._element.removeClass('discovery-module');
		}
	}

	return new Class(DiscoveryView);
});