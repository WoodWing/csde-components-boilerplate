# Components

## Definition

Components use the following definition:

```javascript
{
    // Unique identifier for the component.
    "name": "component-identifier",
    
    // Name that is shown in the UI for the component. 
    // See LOCALIZATION.md for information on localization.
    "label": "Component",
    
    // Path to the icon image for the compoonent. Can be anything that is displayable by the browser.
    // Recommended formats are SVG, PNG, or JPG.
    // The icons should be roughly square in size (for example 128 by 128 pixels).
    "icon": "path-in-set",

    // List of properties available for this component.
    // Refers to the identifiers in the componentProperties section.
    "properties":[
        ...
    ],

    // Method of selecting a component:
    // - default: by clicking inside the component
    // - handle: adds a handle to the top right corner of the component that can be clicked.
    //           This option is useful for components that have non-clickable content such as Containers.
    "selectionMethod": "default" | "handle",

    // Include textual content of components in the article statistics: total number of characters, words,
    // and paragraphs.
    // Default = false.
    "countStatistics": true | false,

    // Allow nesting the component in containers.
    // Default = yes.
    "allowNesting": "yes" | "no" | "one-level",

    // Define which types of components can be made a child of another component.
    // Use the "withContent" key to filter down on the content of a directive.
    // For example this can be used to require that a doc-image directive has an image
    // applied by the user.
    "restrictChildren": {
        "image-comp": { "withContent": "image" }
    },

    // (Optional) Override the default component that is added when pressing Enter (as defined in the global 
    // "defaultComponentOnEnter" property).
    // This can be useful for example in a Container when this behavior should be different compared to the main story.
    // Introduced in version 1.1.0.
    "defaultComponentOnEnter": "componentName"

    // (Optional) Configure options per directive
    "directiveOptions": {
        "directiveKey": {
            //
            // Autofill
            // (Introduced in version 1.1.0)
            // (Optional) Define if the content of a component should be filled automatically.
            // For example: automatically fill the caption of an image when an image is added to an article.
            // Currently only works with Enterprise metadata only.
            //
            // Set different trigger options: 
            // (Introduced in version 1.1.0, deprecated since version 1.2.0)
            //   Once - means that it will only be triggered the first time
            //   (in the case of filling a caption: when the image is added for the first time)
            // 
            "autofill": {
                "source": "sourceDirectiveKey",
                "metadataField": "ContentMetaData/Description" // Enterprise metadata format, case sensitive
            },

            // Groups
            // (Optional) Configure groups for container directives.
            // This allows overriding the components displayed in the Component window inside a Container.
            // For example, you could design a list-type component that only displays a list item component
            // inside its Container.
            // Introduced in version 1.1.0.
            "groups": [
                {
                    // Group definition, see GROUPS.md
                }
            ]
        }
    }
}
```

The component definitions are complemented by templates used for rendering.

## HTML template

HTML templates are used for rendering the editor content, but also for HTML output to publish channels. It's possible to add anything to the HTML template, however, interactivity with the editor is provided through a fixed set of directives that can be set on HTML elements as attributes. The syntax of such a directive is:

```html
<TAG doc-<directive-name>=<content-key>>
```

For example, the default body component applies the doc-editable directive to make the contents of the element editable:

```html
<p class="text body" doc-editable="text">
  Body Placeholder Text
</p>
```

The content-key is used as key in the digital article format. It's also used in the conversion rules to automatically map text fields from one to another.

The full table of available directives is:

| Directive | Behavior |
| ------------- | ------------- |
| [doc-editable](directives/EDITABLE.md) | Binds editable text to an element |
| [doc-image](directives/IMAGE.md) | Binds image to an element |
| doc-container | Turns the element into a container, allowing component nesting |
| doc-html | Replaces content of element with the raw HTML, allowing to embed content |
| [doc-slideshow](directives/SLIDESHOW.md) | Adds slideshow functionality to element |
| doc-link | Turns the element into a link. A property must be added to the component to configure the url |
| doc-media | Allows rendering social media in the element |
| doc-interactive | Directive for interactive component feature |

### Styling

Each component should also contain one [SCSS](https://sass-lang.com/guide) file as styling. Each file should contain one CSS class for one class named after the component. This class should be added to the root html element in the template.

For example, the body component styling may look like:

```css
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
