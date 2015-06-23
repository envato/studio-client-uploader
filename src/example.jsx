import React from 'react'

import { Uploader, AssetPreview, UploaderPreview } from './index'

var Application = React.createClass({
  _onUpload: function(asset) {
    console.log(asset);
  },
  render: function() {
    return (
      <div>
        Uploader:
        <Uploader id="test-uploader" assetType="message-asset" assetServiceUrl="http://studio-asset-api.lancerdev.com" uploadUrl="https://api2.transloadit.com/assemblies" onUpload={this._onUpload}>
          <div className="button button--muted">Upload a file</div>
        </Uploader>
        <UploaderPreview uploaderId="test-uploader" previewComponent={AssetPreview} />
      </div>
    )
  }
});

React.render(<Application />, document.getElementById('app'));
