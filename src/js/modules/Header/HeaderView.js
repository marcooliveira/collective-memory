/*jslint browser:true, devel:true, nomen:true*/
/*global define*/

/**
 * HeaderView class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseView',
    'jquery',
    'doT',
    'text!templates/Header/structure.html'
], function (Class, BaseView, $, doT, structureTemplate) {

    'use strict';

    var HeaderView = {
        $name: 'HeaderView',
        $extends: BaseView,

        /**
         *
         */
        initialize: function (element) {
            this.$super(element);

            this._element.html(doT.compile(structureTemplate)());
        },

        /**
         *
         */
        destroy: function () {

        }
    }

    return new Class(HeaderView);
});