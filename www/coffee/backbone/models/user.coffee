window.BlueCarbon ||= {}
window.BlueCarbon.Models ||= {}

class BlueCarbon.Models.User extends Backbone.Model
  # Takes success and error callback options, tries 
  # to login with model attributes
  login: (options) ->
    # Test for existing login
    $.ajax(
      type: 'GET'
      url: 'http://bluecarbon.unep-wcmc.org/admins/me.json'
      success: options.success
      error: (data)->
        if data.error?
          # Not logged in, login
          $.ajax(
            type: 'POST'
            url: 'http://bluecarbon.unep-wcmc.org/my/admins/sign_in.json'
            data:
              admin:
                email: "decio.ferreira@unep-wcmc.org"
                password: "decioferreira"
                remember_me: 1
            dataType: "text"
            success: options.success
            error: options.error
          )
        else
          options.error(data)
    )
