window.JST = {}

window.JST['area/edit'] = _.template(
  """
    <div class='ios-head'>
      <a class='back'>Back</a>
      <h2><%= area.get('title') %></h2>
    </div>
    <ul id='validation-list'></ul>
    <input id="new-validation" type="submit" value="Add a validation"/>
  """
)

window.JST['area/add_polygon'] = _.template(
  """
    <div class='ios-head'>
      <a class='back'>Area</a>
      <h2>Add Validation</h3>
    </div>
    <form id="validation-attributes" onSubmit="return false;">
      <input type='hidden' name='area_id' value="<%= area.get('id') %>"/>
      <ul class="fields">
        <li>
          <select name="type">
            <option value="add">Add</option>
            <option value="delete">Delete</option>
          </select>
        </li>
      </ul>
      <input id="create-analysis" type="submit" value="Add">
    </form>
  """
)

window.JST['area/login'] = _.template(
  """
    <h3>Please login</h3>
    <div class='error'></div>
    <form id="login-form" onSubmit="return false;">
      <ul class="fields">
        <li>
          <span>Email</span>
          <input name="email" value="decio.ferreira@unep-wcmc.org"/>
        </li>
        <li>
          <span>Password</span>
          <input name="password" type="password" value="decioferreira"/>
        </li>
      </ul>
      <input id="login" type="submit" value="Login">
    </form>
  """
)

window.JST['area/area_index'] = _.template(
  """
    <div class='ios-head'>
      <h2>Areas</h2>
    </div>
    <ul id="area-list">
    </ul>
  """
)
window.JST['area/area'] = _.template(
  """
    <div class='headline'>
      <h3><%= area.get('title') %></h3>
      <a class="start-trip btn btn-small">Start trip</a>
    </div>
    <ul class='attributes'>
      <li>Last updated:<span>11/12/2012</span></li>
      <li>Data ready for trip:<span>√</span></li>
    </ul>
  """
)

window.JST['area/validation'] = _.template(
  """
    <%= validation.get('type') %> at 11/11/2013
  """
)
