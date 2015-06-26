import React from 'react'

import { Uploader, AssetPreview, UploaderPreview, UploadStore, UploadActionCreators } from './index'

var Application = React.createClass({
  getInitialState: function() {
    return { uploads: UploadStore.getByUploaderId("test-uploader"), uploadsDone: UploadStore.uploadsDone("test-uploader") };
  },
  componentDidMount: function() {
    UploadStore.addListener('change', this._onChange);
  },
  componentWillUnmount: function() {
    UploadStore.removeListener('change', this._onChange);
  },
  _onChange: function() {
    this.setState(this.getInitialState());
  },
  _onUpload: function(asset) {
    console.log(asset);
  },
  _clear: function() {
    UploadActionCreators.clearUploads("test-uploader");
  },
  render: function() {
    var self = this;
    console.log(Object.keys(this.state.uploads).map(function(upload) { return self.state.uploads[upload].status }));

    if (this.state.uploadsDone == true) {
      var done = "ALL DONE";
    } else {
      var done = "NOPE";
    }

    return (
      <div>
        Uploader:
        <Uploader id="test-uploader" minWidth={1000} assetType="message-asset" assetServiceUrl="http://studio-asset-api.lancerdev.com" uploadUrl="https://api2.transloadit.com/assemblies" onUpload={this._onUpload}>
          <div className="button button--muted">Upload a file</div>
        </Uploader>
        <UploaderPreview uploads={this.state.uploads} previewComponent={AssetPreview} />
        <button onClick={this._clear}>Clear Uploads!</button>
        All files uploaded? {done}
      </div>
    )
  }
});

React.render(<Application />, document.getElementById('app'));
