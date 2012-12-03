(function() {
  var _base,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.BlueCarbon || (window.BlueCarbon = {});

  (_base = window.BlueCarbon).Views || (_base.Views = {});

  BlueCarbon.Views.AreaEditView = (function(_super) {

    __extends(AreaEditView, _super);

    function AreaEditView() {
      AreaEditView.__super__.constructor.apply(this, arguments);
    }

    AreaEditView.prototype.template = JST['area/edit'];

    AreaEditView.prototype.events = {
      "touchstart #new-polygon": "fireAddPolygon"
    };

    AreaEditView.prototype.fireAddPolygon = function() {
      return this.trigger('addPolygon');
    };

    AreaEditView.prototype.render = function() {
      console.log(this.template());
      this.$el.html(this.template());
      return this;
    };

    return AreaEditView;

  })(Backbone.View);

}).call(this);
