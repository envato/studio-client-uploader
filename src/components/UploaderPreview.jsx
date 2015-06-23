import React from 'react';
import UploadStore from '../stores/UploadStore'
import AssetPreview from './AssetPreview'

var UploaderPreview = React.createClass({
  getInitialState: function() {
    return { uploads: UploadStore.getByUploaderId(this.props.uploaderId) };
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
  render: function() {
    var assetPreviews = [];
    var uploadIds = Object.keys(this.state.uploads);
    for (var i = 0; i < uploadIds.length; i++) {
     assetPreviews.push(<this.props.previewComponent asset={this.state.uploads[uploadIds[i]]} key={uploadIds[i]} />);
    }

    return (
      <div>
        {assetPreviews}
      </div>
    );
  }
});

export default UploaderPreview;
