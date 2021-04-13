# `doc-editable`

Binds text to an html element.

```html
<p doc-editable="key">*rendered-text-content*</p>
```

Inside the editor the element with the doc-editable directive is made editable for the user, allowing to type content.

## Changing text color on empty image background

You can change the text color of the editable when the text is on top of an empty background image using the `data-doc-empty-bg-image-color` attribute. The value of this attribute must be a valid [color value](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).

```html
<p doc-editable="key" data-doc-empty-bg-image-color="black">*rendered-text-content*</p>
```

For an example of the usage, see the `hero` component in the boilerplate project.
