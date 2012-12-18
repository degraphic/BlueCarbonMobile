// Generated by CoffeeScript 1.4.0
(function() {

  window.JST = {};

  window.JST['area/edit'] = _.template("<div class='ios-head'>\n  <a class='back'>Back</a>\n  <h2><%= area.get('title') %></h2>\n</div>\n<a id=\"new-validation\" class=\"btn btn-large\">New Validation</a>\n<ul id='validation-list'></ul>\n<% if (validationCount > 0) { %>\n  <a id=\"upload-validations\" class=\"btn\">\n    Upload validations\n  </a>\n<% } %>");

  window.JST['area/add_polygon'] = _.template("<div class='ios-head'>\n  <a class='back'>Area</a>\n  <h2>Add Validation</h3>\n</div>\n<form id=\"validation-attributes\" onSubmit=\"return false;\">\n  <input type='hidden' name='area_id' value=\"<%= area.get('id') %>\"/>\n  <ul class=\"fields\">\n    <li>\n      <label>Name</label>\n      <input type='text' name=\"name\">\n    </li>\n    <li>\n      <select name=\"action\">\n        <option value=\"add\">Add</option>\n        <option value=\"delete\">Delete</option>\n      </select>\n    </li>\n    <li>\n      <label>Knowledge</label>\n      <input type='text' name=\"knowledge\">\n    </li>\n    <li>\n      <label>Density</label>\n      <input name=\"density\">\n    </li>\n    <li>\n      <label>Age</label>\n      <input name=\"age\">\n    </li>\n    <li>\n      <select name=\"habitat\">\n        <option value=\"mangrove\">Mangrove</option>\n        <option value=\"seagrass\">Seagrass</option>\n        <option value=\"sabkha\">Sabkha</option>\n        <option value=\"salt marsh\">Salt Marsh</option>\n      </select>\n    </li>\n  </ul>\n  <input id=\"create-analysis\" type=\"submit\" value=\"Add\">\n</form>");

  window.JST['area/login'] = _.template("<h3>Please login</h3>\n<div class='error'></div>\n<form id=\"login-form\" onSubmit=\"return false;\">\n  <ul class=\"fields\">\n    <li>\n      <span>Email</span>\n      <input name=\"email\" value=\"decio.ferreira@unep-wcmc.org\"/>\n    </li>\n    <li>\n      <span>Password</span>\n      <input name=\"password\" type=\"password\" value=\"decioferreira\"/>\n    </li>\n  </ul>\n  <input id=\"login\" type=\"submit\" value=\"Login\">\n</form>");

  window.JST['area/area_index'] = _.template("<div class='ios-head'>\n  <h2>Areas</h2>\n</div>\n<div id=\"sync-status\"></div>\n<ul id=\"area-list\">\n</ul>");

  window.JST['area/area'] = _.template("<div class='area-attributes'>\n  <h3><%= area.get('title') %></h3>\n  <p>\n    <%\n    var downloadState = area.downloadState();\n    if (downloadState === 'out of date') {\n    %>\n      Habitat data is out of date\n    <% } else if (downloadState === 'no data') { %>\n      Habitat data not yet downloaded\n    <% } else { %>\n      Data downloaded at: <%= area.lastDownloaded() %>\n    <% } %>\n  </p>\n</div>\n<% if (false || downloadState === 'ready') { %>\n  <div class=\"area-actions start-trip\">\n    <img src=\"css/images/arrow_forward.png\"\>\n    <div>START TRIP</div>\n  </div>\n<% } else if (downloadState === 'out of date' || downloadState === 'no data') { %>\n  <div class=\"area-actions download-data\">\n    <img src=\"css/images/download_icon.png\"\>\n    <div>DOWNLOAD</div>\n  </div>\n<% } else if (downloadState === 'data generating') { %>\n  <div class='area-actions data-generating'>\n    <img src=\"css/images/timer.gif\"\>\n    <div>GENERATING</div>\n  </div>\n<% } %>");

  window.JST['area/validation'] = _.template("<%= validation.get('name') %> (<%= validation.get('action') %>)<img class='delete-validation' src=\"css/images/trash_can.png\"/>");

}).call(this);
