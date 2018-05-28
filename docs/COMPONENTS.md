# Components

## Definition
Components use the following definition:
```
{
    // Unique identifer of component
    "name": "component-identifier",
    // Name shown in UI for component
    "label": "Component",
    // Icon url
    "icon": "path-in-set",

    // List of properties available for this component
    // Refers to the identifiers in the componentProperties section.
    "properties":[
        ...
    ],

    // How this component is selectable
    // By default the user can click inside the component to select it
    "selectionMethod": "default" | "handle",

    // Whether or not to count components by default towards article statistics (characters, words, paragraphs).
    // Defaults to false.
    "countStatistics": true | false,

    // Allows nesting the component in containers.
    // Defaults to "yes".
    "allowNesting": "yes" | "no" | "one-level",

    // Restricts children of this component to the listed ones.
    // Can be further filtered down to also have content.
    "restrictChildren": {
        "image-comp": { "withContent": "image" }
    }
}
```

The component definitions are complemented by templates used for rendering.

## HTML template
HTML templates are used for rendering the editor content, but also for html output to publish channels. In base it's possible to add anything to the html template, however interactivity with the editor is provided through a fixed set of directives the integrator can set on html elements as attributes. The syntax of such a directive is:

```
<TAG doc-<directive-name>=<content-key>>
```

For example, the default body component applies the doc-editable directive to make the contents of the element editable:

```
<p class="text body" doc-editable="text">
  Body Placeholder Text
</p>
```

The content-key is used as key in the digital article format. It's also used in the conversion rules to automatically map text fields from one to another.

The full table of available directives is:

| Directive | Behavior |
| ------------- | ------------- |
| doc-editable | Binds editable text to an element |
| doc-image | Binds image text to an element |
| doc-container | Turns the element into a container, allowing component nesting |
| doc-html | Replaces content of element with the raw html, allowing to embed content |
| doc-slideshow | Adds slideshow functionality to element |
| doc-link | Turns the element into a link. A property must be added to the component to configure the url |
| doc-media | Allows rendering social media in the element |
| doc-interactive | Directive for interactive component feature |

### Styling
Each component should also contain one scss file as styling. Each file should contain one css for one class named after the component.

For example, the body component styling may look like:
```
/* Body component style */
.body {
    font-weight: 400;
    font-size: 18px;
    font-style: normal;
    line-height: 1.6;
    color: #606060;
    margin: 12px auto;
}
```

## PSV Template
Custom channels support the option to receive the rendered article in [PSV format](http://www.prismstandard.org/specifications/psv/1.0/PSV_specification_1.0.htm). When using this option, you must define a template for each component to have a PSV rendition.

## Facebook Instant Articles template
Publishing to Facebook Instant Articles requires a html markup template for each component you wish to support.
You should use the same directives to bind content to the template as used in the HTML template.
For more information please visit the [Facebook Instant Articles documentation](https://developers.facebook.com/docs/instant-articles/guides/format-overview).
