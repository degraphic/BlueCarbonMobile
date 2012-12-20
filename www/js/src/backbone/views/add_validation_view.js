// Generated by CoffeeScript 1.4.0
(function() {
  var _base,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.BlueCarbon || (window.BlueCarbon = {});

  (_base = window.BlueCarbon).Views || (_base.Views = {});

  BlueCarbon.Views.AddValidationView = (function(_super) {

    __extends(AddValidationView, _super);

    function AddValidationView() {
      this.showAttributesForAction = __bind(this.showAttributesForAction, this);

      this.showAttributesForHabitat = __bind(this.showAttributesForHabitat, this);

      this.createAnalysis = __bind(this.createAnalysis, this);

      this.removeLastMarker = __bind(this.removeLastMarker, this);

      this.updatePolygonDrawHelpText = __bind(this.updatePolygonDrawHelpText, this);
      return AddValidationView.__super__.constructor.apply(this, arguments);
    }

    AddValidationView.prototype.template = JST['area/add_polygon'];

    AddValidationView.prototype.events = {
      "touchend #create-analysis": 'createAnalysis',
      "touchend .ios-head .back": "fireBack",
      "touchend #undo-last-marker": "removeLastMarker",
      "change [name=habitat]": "showAttributesForHabitat",
      "change [name=action]": "showAttributesForAction"
    };

    AddValidationView.prototype.initialize = function(options) {
      var _this = this;
      this.area = options.area;
      this.map = options.map;
      this.validation = new BlueCarbon.Models.Validation();
      this.map.on('draw:polygon:add-vertex', this.updatePolygonDrawHelpText);
      return this.map.on('draw:poly-created', function(e) {
        _this.validation.setGeomFromPoints(e.poly.getLatLngs());
        _this.mapPolygon = new L.Polygon(e.poly.getLatLngs());
        _this.mapPolygon.addTo(_this.map);
        return _this.showForm();
      });
    };

    AddValidationView.prototype.render = function() {
      this.polygonDraw = new L.Polygon.Draw(this.map, {});
      this.polygonDraw.enable();
      this.$el.html(this.template({
        area: this.area
      }));
      this.addMapLayers(this.area, this.map);
      this.addLayerControl(this.map);
      return this;
    };

    AddValidationView.prototype.undoBtnHtml = "<br/><a id='undo-last-marker' class='btn'><img src='css/images/undo_selected.png'/>Undo last point</a>";

    AddValidationView.prototype.updatePolygonDrawHelpText = function() {
      var markerCount, text;
      markerCount = this.polygonDraw._markers.length;
      if (markerCount > 2) {
        text = 'Tap the first point to close this shape.';
        text += this.undoBtnHtml;
      } else if (markerCount > 0) {
        text = 'Tap another point to continue drawing shape.';
        text += this.undoBtnHtml;
      } else {
        text = 'Draw your polygon by tapping on the map';
      }
      return $('#draw-polygon-notice').html(text);
    };

    AddValidationView.prototype.removeLastMarker = function() {
      this.polygonDraw.removeLastMarker();
      return this.updatePolygonDrawHelpText();
    };

    AddValidationView.prototype.createAnalysis = function() {
      var _this = this;
      this.clearUnselectedFields();
      this.validation.set($('form#validation-attributes').serializeObject());
      return this.validation.localSave(this.validation.attributes, {
        success: function() {
          console.log('successfully saved:');
          console.log(_this.validation);
          return _this.trigger('validation:created', {
            area: _this.area
          });
        },
        error: function(a, b, c) {
          console.log('error saving validation:');
          return console.log(arguments);
        }
      });
    };

    AddValidationView.prototype.fireBack = function() {
      return this.trigger('back', {
        area: this.area
      });
    };

    AddValidationView.prototype.showForm = function() {
      $('#draw-polygon-notice').slideUp();
      return $('#validation-attributes').slideDown();
    };

    AddValidationView.prototype.showAttributesForHabitat = function(event) {
      var habitatSelected;
      habitatSelected = $(event.srcElement).val();
      $('.conditional').slideUp();
      if (habitatSelected === '') {
        return $('#create-analysis').slideUp();
      } else {
        $(".conditional." + habitatSelected).slideDown();
        if ($('[name=action]').val() !== '') {
          return $('#create-analysis').slideDown();
        }
      }
    };

    AddValidationView.prototype.showAttributesForAction = function(event) {
      var actionSelected;
      actionSelected = $(event.srcElement).val();
      if (actionSelected === 'add') {
        $('#validation-details').slideDown();
        if ($('[name=habitat]').val() !== '') {
          return $('#create-analysis').slideDown();
        }
      } else if (actionSelected === 'delete') {
        $('#validation-details').slideUp();
        if ($('[name=habitat]').val() !== '') {
          return $('#create-analysis').slideDown();
        }
      } else {
        $('#validation-details').slideUp();
        return $('#create-analysis').slideUp();
      }
    };

    AddValidationView.prototype.clearUnselectedFields = function() {
      $('.conditional:hidden input').val('');
      return $('.conditional:hidden select').val([]);
    };

    AddValidationView.prototype.close = function() {
      this.polygonDraw.disable();
      this.map.off('draw:poly-created');
      this.map.off('draw:polygon:add-vertex');
      if (this.mapPolygon != null) {
        this.map.removeLayer(this.mapPolygon);
      }
      this.removeLayerControl(this.map);
      return this.removeTileLayers(this.map);
    };

    return AddValidationView;

  })(Backbone.View);

  _.extend(BlueCarbon.Views.AddValidationView.prototype, BlueCarbon.Mixins.AreaMapLayers);

}).call(this);
