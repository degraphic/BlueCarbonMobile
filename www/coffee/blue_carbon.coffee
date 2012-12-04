window.onerror = (message, url, linenumber) ->
  console.log "JavaScript error: #{message} on line #{linenumber} for #{url}"
  alert "JavaScript error: #{message} on line #{linenumber} for #{url}"

window.Wcmc ||= {}
window.BlueCarbon ||= {}
window.BlueCarbon.Models ||= {}
window.BlueCarbon.Controllers ||= {}
window.BlueCarbon.Views ||= {}
window.BlueCarbon.Routers ||= {}

class BlueCarbon.App
  _.extend @::, Backbone.Events
  
  # Application Constructor
  constructor: (options)->
    waitForRemoteConsole = options.waitForRemoteConsole
    @localFileName = "bluecarbon.mbtiles"
    @remoteFile = "https://dl.dropbox.com/u/2324263/bluecarbon.mbtiles"
    @on('mapReady', =>
      @controller = new BlueCarbon.Controller(app:@)
    )

    #document.addEventListener "deviceready", @onDeviceReady, false)
    # This is for debugging in development, you can replace it with the above line for producion
    @ready=false
    if waitForRemoteConsole
      alert('waiting for remote console, start app with window.blueCarbonApp.onDeviceReady();')
      document.addEventListener "deviceready", (=> @ready = true), false
    else
      document.addEventListener "deviceready", (=>
        @ready = true
        @onDeviceReady()
      ), false
  
  onDeviceReady: =>
    unless @ready
      alert('not ready yet!')
      return false

    window.requestFileSystem LocalFileSystem.PERSISTENT, 0, (fileSystem) =>
      window.fs = fileSystem
      file = fs.root.getFile(@localFileName,
        create: false
      , @buildMap
      , @downloadBaseLayer)

  downloadBaseLayer: =>
    console.log "Downloading file..."
    ft = new FileTransfer()
    ft.download @remoteFile, fs.root.fullPath + "/" + @localFileName, @buildMap, (error) ->
      alert "Download failed, check error log"
      console.log error

  buildMap: =>
    db = window.sqlitePlugin.openDatabase(@localFileName, "1.0", "Tiles", 2000000)
    @map = new L.Map("map",
      center: new L.LatLng(24.2870, 54.3274)
      zoom: 10
    )
    tileLayer = new L.TileLayer.MBTiles(db,
      tms: true
    ).addTo(@map)

    @trigger('mapReady')

#var polygonDraw = new L.Polygon.Draw(map, {});
#polygonDraw.enable();

class BlueCarbon.Controller extends Wcmc.Controller
  constructor: (options)->
    @app = options.app
    @sidePanel = new Backbone.ViewManager('#side-panel')
    areaEditView = new BlueCarbon.Views.AreaEditView()
    @sidePanel.showView(areaEditView)

    @transitionToActionOn(areaEditView, 'addPolygon', @addValidation)

  addValidation: (options) =>
    validationView = new BlueCarbon.Views.AddValidationView(map: @app.map)
    @sidePanel.showView(validationView)
