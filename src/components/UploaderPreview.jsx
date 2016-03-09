import React, { Component } from 'react';

class UploaderPreview extends Component {
  render() {
    var assetPreviews = [];
    var uploadIds = Object.keys(this.props.uploads);
    for (var i = 0; i < uploadIds.length; i++) {
      assetPreviews.push(<this.props.previewComponent asset={this.props.uploads[uploadIds[i]]} key={uploadIds[i]} />);
    }

    return (
      <div>
        {assetPreviews}
      </div>
    );
  }
};

export default UploaderPreview;
