(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.BlueCarbon || (window.BlueCarbon = {});

  (_base = window.BlueCarbon).Views || (_base.Views = {});

  BlueCarbon.Views.ValidationView = (function(_super) {

    __extends(ValidationView, _super);

    function ValidationView() {
      this.render = __bind(this.render, this);
      ValidationView.__super__.constructor.apply(this, arguments);
    }

    ValidationView.prototype.template = JST['area/validation'];

    ValidationView.prototype.tagName = 'li';

    ValidationView.prototype.initialize = function(options) {
      this.validation = options.validation;
      this.map = window.blueCarbonApp.map;
      return this.mapPolygon = new L.Polygon(this.validation.geomAsLatLngArray());
    };

    ValidationView.prototype.render = function() {
      this.$el.html(this.template({
        validation: this.validation
      }));
      this.mapPolygon.addTo(this.map);
      return this;
    };

    ValidationView.prototype.onClose = function() {
      return this.map.removeLayer(this.mapPolygon);
    };

    return ValidationView;

  })(Backbone.View);

}).call(this);