import React from 'react';
import Dropzone from './vendor/dropzone';
import StudioAssetService from 'studio-asset-service-client-js';

var Uploader = React.createClass({
  componentDidMount: function() {
    var client = new StudioAssetService('https://studio-asset-api.envato.com');
    client.getAsset("e030de73-f951-48c9-a157-3d41e13b72f1", function(err, assets) {
      console.log('asset: ', err, assets.getVariant(":original"));
    });
  },
   render: function() {
    return (
      <div className="asset-uploader">
        HELLO
      </div>
    );
  }
});

export default Uploader;
