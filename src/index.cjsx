React = require('react')
Dropzone = require('./dropzone')

Uploader = React.createClass
  displayName: 'Uploader'

  componentDidMount: ->
    window.z = Dropzone

  render: ->
    <div>Uploader lol</div>

module.exports = Uploader
