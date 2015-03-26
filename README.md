# react-studio-uploader

Usage:

```
npm install --save react-studio-uploader
```

Then:

```
Uploader = require('react-studio-uploader')

_onUpload: function(assetUuid) {
  console.log(assetUuid);
},
render: function() {
  return (<Uploader
    assetType="entry-asset"
    acceptedFiles="image/*"
    assetServiceUrl="http://ASSET_SERVICE_ENDPOINT.com"
    uploadUrl="http://UPLOAD_ENDPOINT.com"
    onUpload={this._onUpload}
    minWidth=500
    maxFiles=1 />);
}
```
