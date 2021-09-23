# Custom Styles

The component set can be configured to provide the Digital Editor user the capability to define custom styles which are available in the [custom publish channel](https://helpcenter.woodwing.com/hc/en-us/articles/360040134192--Configuring-Studio-for-publishing-to-a-custom-Publish-Channel) when publishing the article. These can be used as input for styling the article properly, specific for the publish channel. Editing can be done through the style editor in the Look and Feel panel. Currently, the only supported format is JSON. Optionally, default content for the custom style can be set through the component set.

```javascript
{
    "customStyles": [
        {
            // Currently must be "JSON"
            "type": "JSON",

            // The label that will be shown as tab header in the Look and Feel panel
            "label": "Apple News",

            // The basename that will be used for the filename of style in the publish package
            "key": "apple-news",

            // Optional. Style content provided by the component set that will be shown by default in the
            // Look and Feel panel when editing the custom style and which will be sent in the publish as content
            // by default when publishing the article. The path can point to anywhere in the component set.
            "default": "custom-styles/apple-news/styles.json"
        }
    ]
}
```
