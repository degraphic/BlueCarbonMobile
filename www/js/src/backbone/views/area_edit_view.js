// Generated by CoffeeScript 1.4.0
(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.BlueCarbon || (window.BlueCarbon = {});

  (_base = window.BlueCarbon).Views || (_base.Views = {});

  BlueCarbon.Views.AreaEditView = (function(_super) {

    __extends(AreaEditView, _super);

    function AreaEditView() {
      this.render = __bind(this.render, this);

      this.drawLocation = __bind(this.drawLocation, this);

      this.getPosition = __bind(this.getPosition, this);
      return AreaEditView.__super__.constructor.apply(this, arguments);
    }

    AreaEditView.prototype.template = JST['area/edit'];

    AreaEditView.prototype.events = {
      "click #new-validation": "fireAddValidation",
      "click #upload-validations": "uploadValidations",
      "click .ios-head .back": "fireBack"
    };

    AreaEditView.prototype.initialize = function(options) {
      this.area = options.area;
      this.map = options.map;
      this.validationList = new BlueCarbon.Collections.Validations([], {
        area: this.area
      });
      this.validationList.on('reset', this.render);
      this.validationList.localFetch();
      this.subViews = [];
      return this.startLocating();
    };

    AreaEditView.prototype.fireAddValidation = function() {
      return this.trigger('addValidation', {
        area: this.area
      });
    };

    AreaEditView.prototype.fireBack = function() {
      return this.trigger('back');
    };

    AreaEditView.prototype.startLocating = function(options) {
      this.getPosition();
      return this.geoWatchId = setInterval(this.getPosition, 30000);
    };

    AreaEditView.prototype.getPosition = function() {
      return navigator.geolocation.getCurrentPosition(this.drawLocation, {}, {
        enableHighAccuracy: true
      });
    };

    AreaEditView.prototype.stopLocating = function() {
      if (this.geoWatchId != null) {
        clearInterval(this.geoWatchId);
        this.geoWatchId = null;
      }
      if (this.marker != null) {
        this.map.removeLayer(this.marker);
      }
      if (this.accuracyMarker != null) {
        return this.map.removeLayer(this.accuracyMarker);
      }
    };

    AreaEditView.prototype.drawLocation = function(position) {
      var GpsIcon, gpsIcon, latlng, radius;
      if (this.marker != null) {
        this.map.removeLayer(this.marker);
      }
      if (this.accuracyMarker != null) {
        this.map.removeLayer(this.accuracyMarker);
      }
      GpsIcon = L.Icon.extend({
        options: {
          iconUrl: 'css/images/gps-marker.png',
          iconSize: [16, 16]
        }
      });
      gpsIcon = new GpsIcon();
      latlng = [position.coords.latitude, position.coords.longitude];
      this.marker = L.marker(latlng, {
        icon: gpsIcon
      }).addTo(this.map);
      radius = position.coords.accuracy / 2;
      return this.accuracyMarker = L.circle(latlng, radius).addTo(this.map);
    };

    AreaEditView.prototype.uploadValidations = function() {
      return this.validationList.pushToServer();
    };

    AreaEditView.prototype.render = function() {
      var _this = this;
      this.$el.html(this.template({
        area: this.area,
        validationCount: this.validationList.models.length
      }));
      this.validationList.each(function(validation) {
        var validationView;
        validationView = new BlueCarbon.Views.ValidationView({
          validation: validation
        });
        $('#validation-list').append(validationView.render().el);
        return _this.subViews.push(validationView);
      });
      this.addMapLayers(this.area, this.map);
      this.addLayerControl(this.map);
      this.startLocating(this.map);
      return this;
    };

    AreaEditView.prototype.onClose = function() {
      var view, _i, _len, _ref;
      _ref = this.subViews;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        view.close();
      }
      this.removeTileLayers(this.map);
      this.removeLayerControl(this.map);
      return this.stopLocating();
    };

    return AreaEditView;

  })(Backbone.View);

  _.extend(BlueCarbon.Views.AreaEditView.prototype, BlueCarbon.Mixins.AreaMapLayers);

}).call(this);
