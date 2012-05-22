/*jslint browser:true, devel:true, nomen:true*/
/*global define*/

/**
 * FooterView class.
 *
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Marco Oliveira <marcooliveira@ua.pt>
 */
define([
    'classify/Class',
    'BaseView',
    'jquery',
    'doT',
    'text!templates/Footer/template.html'
], function (Class, BaseView, $, doT, template) {

    'use strict';

    var FooterView = {
        $name: 'FooterView',
        $extends: BaseView,

        /**
         *
         */
        initialize: function (element) {
            this.$super(element);

            this._element = element;

            this._element.html(doT.compile(template)());
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            //this._element.empty();

            this.$super();
        }
    };

    return new Class(FooterView);
});