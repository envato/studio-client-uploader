import React, { Component } from 'react';

class AssetPreview extends Component {
  _progress() {
    if (this.props.asset.progress < 100) {
      return Math.floor(this.props.asset.progress) + "%";
    }
  }

  render() {
    return (
      <div className="asset-uploader__previews__item">
        <span className="asset-uploader__previews__item__icon"></span>
        <span className="asset-uploader__previews__item__filename"></span>
        <div className="dz-progress asset-uploader__previews__item__mask">
          <span className="asset-uploader__previews__item__mask__bar dz-upload" style={{ width: this._progress() }}></span>
        </div>
        <span>{this._progress()}</span>
        <img className="asset-uploader__previews__item__image" src={this.props.asset.thumbnail} />
        <span>{this.props.asset.error}</span>
      </div>
    );
  }
}

export default AssetPreview;
