// Generated by CoffeeScript 1.4.0
(function() {
  var _base,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.BlueCarbon || (window.BlueCarbon = {});

  (_base = window.BlueCarbon).Models || (_base.Models = {});

  BlueCarbon.Models.Validation = (function(_super) {

    __extends(Validation, _super);

    function Validation() {
      return Validation.__super__.constructor.apply(this, arguments);
    }

    Validation.prototype.url = 'http://bluecarbon.unep-wcmc.org/validations.json';

    Validation.prototype.schema = function() {
      return "coordinates TEXT, action TEXT, area_id INTEGER, user_id INTEGER, density TEXT, age TEXT, habitat TEXT, condition TEXT, species TEXT, recorded_at TEXT, notes TEXT, row_id INTEGER PRIMARY KEY";
    };

    Validation.prototype.toJSON = function(forRails) {
      var json;
      if (forRails == null) {
        forRails = true;
      }
      json = Validation.__super__.toJSON.apply(this, arguments);
      if (forRails) {
        return {
          validation: json
        };
      } else {
        return json;
      }
    };

    Validation.prototype.setGeomFromPoints = function(points) {
      var point;
      points = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = points.length; _i < _len; _i++) {
          point = points[_i];
          _results.push([point.lng, point.lat]);
        }
        return _results;
      })();
      points.push(points[0]);
      return this.set('coordinates', points);
    };

    Validation.prototype.geomAsLatLngArray = function() {
      var latLngs, point, _i, _len, _ref;
      latLngs = [];
      _ref = this.get('coordinates');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        latLngs.push(new L.LatLng(point[1], point[0]));
      }
      return latLngs;
    };

    return Validation;

  })(Backbone.SyncableModel);

}).call(this);
