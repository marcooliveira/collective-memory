/*jslint browser:true, devel:true, nomen:true*/
/*global define*/

/**
 * ApplicationView class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 */
define([
	'classify/Class',
	'jquery',
	'doT',
	'text!templates/Application/layout.html'
], function (Class,  $, doT, layoutTemplate) {

	'use strict';

	var ApplicationView = {

		_element: null,
		_headerElement: null,
		_contentElement: null,
		_footerElement: null,

		/**
		 * Constructor.
		 */
		initialize: function (element) {
			this._element = $(element);
			this._element.html(doT.compile(layoutTemplate)());

			this._headerElement = $('#header');
			this._footerElement = $('#footer');
			this._contentElement = $('#content');
		},

		/**
		 *
		 */
		getElement: function () {
			return this._element;
		},

		/**
		 *
		 */
		getHeader: function () {
			return this._headerElement;
		},

		/**
		 *
		 */
		getFooter: function () {
			return this._footerElement;
		},

		/**
		 *
		 */
		getContent: function () {
			return this._contentElement;
		}
	};

	return new Class(ApplicationView);
});