window.onerror = (message, url, linenumber) ->
  console.log "JavaScript error: #{message} on line #{linenumber} for #{url}"
  alert "JavaScript error: #{message} on line #{linenumber} for #{url}"

$.support.cors = true
$.ajaxSetup(
  data:
    auth_token: ''
)

window.Wcmc ||= {}
window.BlueCarbon ||= {}
window.BlueCarbon.bus = _.extend({}, Backbone.Events)
window.BlueCarbon.Models ||= {}
window.BlueCarbon.Controllers ||= {}
window.BlueCarbon.Views ||= {}
window.BlueCarbon.Routers ||= {}

class BlueCarbon.App
  _.extend @::, Backbone.Events

  # Application Constructor
  constructor: (options)->

    @on('mapReady', =>
      @controller = new BlueCarbon.Controller(app:@)
    )

    # Show logged in details
    BlueCarbon.bus.on('user:loggedIn', (user) =>
      $("#user-area").html("""
        #{user.get('email')} <a id="logout-user" class="btn btn-small">Logout</a>
      """)

      $('#logout-user').click( =>
        if navigator.connection.type == Connection.NONE
          alert('You cannot logout while offline, please go online before switching user')
          return false

        r=confirm("Are you sure you wish to logout?")
        if (r==true)
          user.logout(
            success: =>
              $("#user-area").html('')
              @controller.transitionToAction(@controller.loginUser)
          )
      )
    )

    # Setup ajax calls to use auth tokens
    BlueCarbon.bus.on('user:gotAuthToken', (token) ->
      if token != ''
        console.log("logged in, using auth token #{token}")
      else
        console.log("logged out, unsetting auth token")

      # Session persistence
      $.ajaxSetup(
        data:
          auth_token: token
        beforeSend: (xhr, settings) ->
          if (settings.type == 'POST')
            try
              settings.data = JSON.parse settings.data
              settings.data.auth_token = token
              settings.data = JSON.stringify settings.data
      )
    )

    document.addEventListener "deviceready", @start, false

  start: =>
    window.BlueCarbon.SQLiteDb = window.sqlitePlugin.openDatabase("BlueCarbon.db", "1.0", "Test", 10000000)

    @map = new L.Map("map",
      center: new L.LatLng(24.2870, 54.3274)
      zoom: 10
      doubleClickZoom: false
    )
    @addBaseLayer()

    @map.addControl(new L.Control.ShowLocation())
    L.control.scale().addTo(@map)
    

  addBaseLayer: ->
    window.requestFileSystem LocalFileSystem.PERSISTENT, 0, (fileSystem) =>
      window.fs = fileSystem

    tileLayerUrl = 'res/tiles/{z}/{x}/{y}.png'
    tileLayer = new L.TileLayer(tileLayerUrl, {
      maxZoom: 18
    }).addTo(@map)

    @trigger('mapReady')
