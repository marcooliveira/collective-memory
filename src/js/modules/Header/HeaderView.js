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
    'order!jquery',
    'order!jquery-ui',
    'doT',
    'text!templates/Header/structure.html'
], function (Class, BaseView, $, _, doT, structureTemplate) {

    'use strict';

    var HeaderView = {
        $name: 'HeaderView',
        $extends: BaseView,
        $binds: '_handleSlideChange',

        $constants: {
            EVENT_TIME_FILTER_CHANGE: 'time_filter_change'
        },

        _timeSpanElement: null,

        /**
         *
         */
        initialize: function (element) {
            this.$super(element);

            this._element.html(doT.compile(structureTemplate)());

            this._timeSpanElement = this._element.find('.time-span');
            this._timeSpanElement.slider({
                orientation: 'horizontal',
                range: true,
                // TODO: the date below should come from the backend
                min: (new Date()).getFullYear() - 100,
                max: (new Date()).getFullYear(),
                values: [(new Date()).getFullYear() - 20, (new Date()).getFullYear() - 5],
                slide: this._handleSlideChange
            });
        },

        /**
         * {@inheritDoc}
         */
        destroy: function () {
            this._timeSpanElement.slider('destroy');

            //this._element.empty();

            this.$super();
        },

        /**
         *
         */
        _handleSlideChange: function () {
            this._fireEvent(this.$self().EVENT_TIME_FILTER_CHANGE, this._timeSpanElement.slider('values'));
        }
    };

    return new Class(HeaderView);
});