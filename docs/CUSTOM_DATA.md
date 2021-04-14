# Custom Data

The component set allows you to optionally store files in the `custom` folder. Files in this folder are typically used to store information on how published articles should be post-processed towards their final destination. For example a script or a mapping file that understands how to convert the components in this specific component set to an article published in a web CMS or in an mobile app. Files can be organized in folders and sub-folders.

## Custom channel availability

The custom data will be available as a downloadable zip in the [custom channel](https://helpcenter.woodwing.com/hc/en-us/articles/360040134192--Configuring-Studio-for-publishing-to-a-custom-Publish-Channel) (SNS) publish message. The zip contains the contents of the `custom` folder. Alongside the url of the zip file, an eTag is provided. The eTag changes when the zip file is updated, which typically happens when the component set is updated. The eTag can be used to apply caching on the custom data zip in your application logic that processes the custom channel message.

Example of a partial publish message with custom data:

```json
{
    "customData": {
        "eTag": "\"d66341b18e411576ae3ec9fde350e0c3\"",
        "url": "https://aws-url/custom-data.zip?AWSAccessKeyId=[keyId]&Expires=[timestamp]&Signature=[signature]"
    }
}
```

Note: There is no `customData` property available in the publish message when the component set has no custom data.

## Limitations

The data inside the `custom` folder is not restricted to certain file types or sub-folders, you can store anything in any structure. There are also two limitations though:

-   Maximum number of files: 1000.
-   Maximum total file size (uncompressed): 10MB.
