# Components

## Definition
Components use the following definition:
```
{
    // Unique identifier of component.
    "name": "component-identifier",
    // Name shown in UI for component.
    "label": "Component",
    // Path to icon image. Can be anything that is displayable by the browser.
    // It's recommended to use either SVG, PNG or JPG.
    "icon": "path-in-set",

    // List of properties available for this component.
    // Refers to the identifiers in the componentProperties section.
    "properties":[
        ...
    ],

    // How this component is selectable.
    // By "default" the user can click inside the component to select it.
    // The "handle" option adds a draggable bar with the component name at the right top of the component.
    // This option is useful for components that have non clickable content (such as iframes).
    "selectionMethod": "default" | "handle",

    // Whether or not to count components by default towards article statistics (characters, words, paragraphs).
    // Defaults to false.
    "countStatistics": true | false,

    // Allows nesting the component in containers.
    // Defaults to "yes".
    "allowNesting": "yes" | "no" | "one-level",

    // Restricts children of this component to the listed ones.
    // The "withContent" key can be used to filter down on the content of
    // a directive. For example this can be used to require that a doc-image
    // directive has an image applied by the user.
    "restrictChildren": {
        "image-comp": { "withContent": "image" }
    }
}
```

The component definitions are complemented by templates used for rendering.

## HTML template
HTML templates are used for rendering the editor content, but also for HTML output to publish channels. It's possible to add anything to the HTML template, however interactivity with the editor is provided through a fixed set of directives the integrator can set on HTML elements as attributes. The syntax of such a directive is:

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
| doc-html | Replaces content of element with the raw HTML, allowing to embed content |
| doc-slideshow | Adds slideshow functionality to element |
| doc-link | Turns the element into a link. A property must be added to the component to configure the url |
| doc-media | Allows rendering social media in the element |
| doc-interactive | Directive for interactive component feature |

### Styling
Each component should also contain one [SCSS](https://sass-lang.com/guide) file as styling. Each file should contain one CSS class for one class named after the component.

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
The component is skipped in the PSV output when it has no matching template.

## Facebook Instant Articles template
Publishing to Facebook Instant Articles requires an HTML markup template for each component you wish to support.
You should use the same directives to bind content to the template as used in the HTML template.
The component is skipped in the Facebook output when it has no matching template.
For more information please visit the [Facebook Instant Articles documentation](https://developers.facebook.com/docs/instant-articles/guides/format-overview).
