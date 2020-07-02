# Component Properties

Component properties are displayed in the side bar when a component is selected. They allow changing data of the directives (see below in HTML templates), style and inline style data.

The general definition of a property looks like:

```javascript
{
    // Property identifier.
    "name": "property",

    // Name displayed for property in side bar. See LOCALIZATION.md for information on
    // localization of options
    "label": "Property Name",

    // Type of UI control element.
    // See later sections for all available control types.
    "control": {
        ...
    }
    // Kind of data property.
    // When stored as "styles", the property value is added as css class to the main element.
    // When stored as "inlineStyles", the property value is directly used as inline style.
    // When stored as 'data", the property is free data.
    // When stored as a directive (for example, doc-media), the property can be used to modify
    // content data of a directive.
    "dataType": "styles" | "inlineStyles" | "data" | "<directive>:<content-key>",

    // Default value upon component creation.
    // Can only be used with data types "styles", "inlineStyles" and "data".
    // Only supports the control types "text", "select", "radio" and "checkbox".
    // The value must match the available values in the control types.
    "defaultValue": "value",

    // Optional css selector key, it may be used if property should be applied to some nested
    // html element instead of main component element.
    "selector": "css-selector",

    // Name of Enterprise Feature flag that should be present for the property to show up.
    // Always show if not specified.
    "featureFlag": "..."
}
```

## Data types

The data type of a property defines how the data is stored within the component.

### `styles`

Data added as a css class to the HTML of the component.
This css class must be defined in the component style.

### `inlineStyles`

Data applied as inline styles to the HTML of the component.

### `data`

Free style data. Does not affect the rendering of the article in the editor.

### `doc-<directive>`

Stores directive data as part of the content object of the component.

## Generic UI Controls

### `select`

Dropdown with options (see [Localization](LOCALIZATION.md) for information on localization of the caption). Each option has a value that's applied
to the `dataType`. One option must have an empty value, which is the default value.

Example of the `select` control type:

```json
    "control" {
        "type": "select",
        "options": [
            {
                "caption": "Default option"
            },
            {
                "caption": "Option Label 1",
                "value": "_value1"
            },
            {
                "caption": "Option Label 2",
                "value": "_value2"
            }
        ]
    }
```

### `checkbox`

Toggle between applying a value. Defaults to not having a value.

Example of the `checkbox` control type:

```json
    "control": {
        "type": "checkbox",
        "value": "_value"
    }
```

### `radio`

Adds radio buttons with options. One option must have an empty value, which is the default value. The radio buttons can be customized with icons.

Example of the `radio` control type:

```json
    "control": {
        "type": "radio",
        "options": [
            {
                "caption": "Default Option",
                "icon": "icons/properties/property-default-icon.svg"
            },
            {
                "caption": "Option 1",
                "icon": "icons/properties/property-option1-icon.svg",
                "value": "_value1"
            },
            {
                "caption": "Option 2",
                "icon": "icons/properties/property-option2-icon.svg",
                "value": "_value2"
            }
        ]
    }
```

### `text`

Allows text input from user. Regular expressions can be defined to restrict input.

Example of the `text` control type:

```json
    "control": {
        "type": "text",
        "pattern": "^.*$",
        "defaultValue": "",
        "inputPlaceholder": "Placeholder text"
    }
```

### `textarea`

Allows text input from user in a large field.

Example of the `textarea` control type:

```json
    "control": {
        "type": "textarea",
        "inputPlaceholder": "Placeholder text"
    }
```

### `url`

Allows url input from user.

Example of the `url` control type:

```json
    "control": {
        "type": "url",
        "inputPlaceholder": "Placeholder url"
    }
```

### `time`

Allows time input in three number boxes with hours, minutes and seconds. The data is stored as a string in the format `<hours>h<minutes>m<seconds>s`.

### `colorPicker`

Color picker with optional opacity slider. The data is stored as a string in the format `rgba(<red>,<green>,<blue>,<opacity>)`.

Example of the `colorPicker` control type:

```json
    "control": {
        "type": "colorPicker",
        "opacity": true
    }
```

## Specialized UI Controls

### `image-editor`

Adds a button that opens the image editing tools. These tools can be used to change the focus point.

Can only be used with doc-image directives and requires specifying the directive content key in the component properties list separated by a colon.

### `drop-capital`

Adds [drop cap](https://en.wiktionary.org/wiki/drop_cap) to all text in the component. This property is applied to all doc-editable directives in the component.

### `media-properties`

Adds social media or video properties to component. Can only be used with `dataType=doc-media`.
This property dynamically initializes a subproperties list based on the type of media.

Can only be used with doc-media directives and requires specifying the directive content key in the component properties list separated by a colon.

### `fitting`

Enables the fitting option for doc-image directives in the component. These are pre-configured options that change the behavior of an image using inline-styling. Only works for images that use `background-image`.

Can only be used with doc-image directives and requires specifying the directive content key in the component properties list separated by a colon.

Accepts default values `_fit-frame-height-to-content` and `_fit-frame-to-content`. If it is not set then `fit content to frame` rule will be applied.

### `slides`

Enables slides section and can only be used together with `dataType=doc-slideshow`. The slides section allows the user to reorder
slides, as well as change properties of the selected slide.

By default it shows all properties of the active slide component, but it can be filtered down by using the `include` and `exclude` attributes, which are defined as arrays with the names of properties to include or exclude.

Example of the `slides` control type:

```json
    "control": {
        "type": "slides",
        "include": [
            "edit-image"
        ]
    }
```
