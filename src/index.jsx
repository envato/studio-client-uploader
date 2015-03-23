import React from 'react';
import Dropzone from './vendor/dropzone';

var Uploader = React.createClass({
  componentDidMount: function() {
    window.z = Dropzone;
  },
   render: function() {
    return (
      <div>Uploader lol hello</div>
    );
  }
});

export default Uploader;
