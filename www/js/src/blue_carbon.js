// Generated by CoffeeScript 1.4.0
(function() {
  var _base, _base1, _base2, _base3,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.onerror = function(message, url, linenumber) {
    console.log("JavaScript error: " + message + " on line " + linenumber + " for " + url);
    return alert("JavaScript error: " + message + " on line " + linenumber + " for " + url);
  };

  $.support.cors = true;

  $.ajaxSetup({
    data: {
      auth_token: ''
    }
  });

  window.Wcmc || (window.Wcmc = {});

  window.BlueCarbon || (window.BlueCarbon = {});

  window.BlueCarbon.bus = _.extend({}, Backbone.Events);

  (_base = window.BlueCarbon).Models || (_base.Models = {});

  (_base1 = window.BlueCarbon).Controllers || (_base1.Controllers = {});

  (_base2 = window.BlueCarbon).Views || (_base2.Views = {});

  (_base3 = window.BlueCarbon).Routers || (_base3.Routers = {});

  BlueCarbon.App = (function() {

    _.extend(App.prototype, Backbone.Events);

    function App(options) {
      this.start = __bind(this.start, this);

      var _this = this;
      this.on('mapReady', function() {
        return _this.controller = new BlueCarbon.Controller({
          app: _this
        });
      });
      BlueCarbon.bus.on('user:loggedIn', function(user) {
        $("#user-area").html("" + (user.get('email')) + " <a id=\"logout-user\" class=\"btn btn-small\">Logout</a>");
        return $('#logout-user').click(function() {
          var r;
          if (navigator.connection.type === Connection.NONE) {
            alert('You cannot logout while offline, please go online before switching user');
            return false;
          }
          r = confirm("Are you sure you wish to logout?");
          if (r === true) {
            return user.logout({
              success: function() {
                $("#user-area").html('');
                return _this.controller.transitionToAction(_this.controller.loginUser);
              }
            });
          }
        });
      });
      BlueCarbon.bus.on('user:gotAuthToken', function(token) {
        if (token !== '') {
          console.log("logged in, using auth token " + token);
        } else {
          console.log("logged out, unsetting auth token");
        }
        return $.ajaxSetup({
          data: {
            auth_token: token
          },
          beforeSend: function(xhr, settings) {
            if (settings.type === 'POST') {
              try {
                settings.data = JSON.parse(settings.data);
                settings.data.auth_token = token;
                return settings.data = JSON.stringify(settings.data);
              } catch (_error) {}
            }
          }
        });
      });
      document.addEventListener("deviceready", this.start, false);
    }

    App.prototype.start = function() {
      window.BlueCarbon.SQLiteDb = window.sqlitePlugin.openDatabase("BlueCarbon.db", "1.0", "Test", 10000000);
      this.map = new L.Map("map", {
        center: new L.LatLng(24.2870, 54.3274),
        zoom: 10,
        doubleClickZoom: false
      });
      this.addBaseLayer();
      this.map.addControl(new L.Control.ShowLocation());
      return L.control.scale().addTo(this.map);
    };

    App.prototype.addBaseLayer = function() {
      var tileLayer, tileLayerUrl,
        _this = this;
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
        return window.fs = fileSystem;
      });
      tileLayerUrl = 'res/tiles/{z}/{x}/{y}.png';
      tileLayer = new L.TileLayer(tileLayerUrl, {
        maxZoom: 18
      }).addTo(this.map);
      return this.trigger('mapReady');
    };

    return App;

  })();

}).call(this);
