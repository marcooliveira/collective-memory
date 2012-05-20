/*jslint browser:true, devel:true, nomen:true*/
/*globals define*/

/**
 * BaseController class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 */
define([
	'classify/AbstractClass',
	'lib/event/EventsEmitter',
	'lib/event/Mediator'
], function (AbstractClass, EventsEmitter, Mediator) {

	'use strict';

	var BaseController = {
		$name: 'BaseController',
		$borrows: EventsEmitter,

		/**
		 *
		 */
		addBroadcastListener: function (name, func, context) {
			Mediator.getInstance().addListener.apply(Mediator.getInstance(), arguments);
		},

		/**
		 *
		 */
		removeBroadcastListener: function (name, func, context) {
			Mediator.getInstance().removeListener.apply(Mediator.getInstance(), arguments);
		},

		/**
		 *
		 */
		removeBroadcastListeners: function (name, func, context) {
			Mediator.getInstance().removeListeners.apply(Mediator.getInstance(), arguments);
		},

		/**
		 *
		 */
		fireBroadcastEvent: function (name, func, context) {
			Mediator.getInstance().fireEvent.apply(Mediator.getInstance(), arguments);
		},

		$abstracts: {

			/**
			 * Destroys the controller/module.
			 */
			destroy: function () {}
		}
	};

	return new AbstractClass(BaseController);
});