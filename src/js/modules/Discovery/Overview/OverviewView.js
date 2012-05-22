/*jslint browser:true, devel:true, nomen:true*/
/*global define*/

/**
 * OverviewView class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseView',
    'jquery',
    'doT',
    'text!templates/Discovery/Overview/structure.html'
], function (Class, BaseView, $, doT, structureTemplate) {

    'use strict';

    var OverviewView = {
        $name: 'OverviewView',
        $extends: BaseView,

        /**
         *
         */
        initialize: function (element) {
            this.$super(element);

            this._element.html(doT.compile(structureTemplate)());
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            //this._element.empty();

            this.$super();
        }
    };

    return new Class(OverviewView);
});