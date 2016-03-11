# studio-client-uploader

## Usage:

```bash
npm install --save studio-client-uploader
```

Then:

```javascript
import React from 'react'

import { Uploader, AssetPreview, UploaderPreview } from 'studio-client-uploader'

var Application = React.createClass({
  _onUpload: function(asset) {
    console.log(asset);
  },
  render: function() {
    return (
      <div>
        Uploader:
        <Uploader id="test-uploader" assetType="message-asset" assetServiceUrl="http://STUDIO_ASSET_SERVICE.com" uploadUrl="https://UPLOAD_ENDPOINT.com" onUpload={this._onUpload}>
          <div className="button button--muted">Upload a file</div>
        </Uploader>
        <UploaderPreview uploaderId="test-uploader" previewComponent={AssetPreview} />
      </div>
    )
  }
});

React.render(<Application />, document.getElementById('app'));

```

## Release:
```bash
./scripts/release
```
