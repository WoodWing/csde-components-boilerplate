# `doc-image`

Binds an image to an html element. For `IMG` tag elements the image url is bound to the `src` attribute:

    <img doc-image="key" src="bound-image-url">

For other html elements `background-image` is set as an inline style:

    <div doc-image="key" style="background-image: url('bound-image-url')></div>

Inside the editor the element with the doc-image directive is turned into a droppable zone for images. This allows the user to drag and drop images from the desktop or from the attachments panel for example.

## Changing the droppable zone
In some cases you may want to change the target html element for the droppable zone inside the editor. You can do this by adding `data-dropzone-target="key"` to the target element:

    <div data-dropzone-target="image">
        <div doc-image="image"></div>
    </div>

The value of this attribute must match the directive key.

For an example of the usage, see the `author` component in the boilerplate project.

## Hiding the droppable placeholder
A placeholder overlay is shown while dragging an image and hovering the mouse over the droppable target element of the directive, informing the user an image can be dropped and what type of images are accepted.

For some images this droppable placeholder is too big to display properly inside the editor. You can hide this placeholder by using the attribute `data-placeholder-style`. Currently only accepts the value `hidden`:

    <div doc-image="image" data-placeholder-style="hidden"></div>

For an example of the usage, see the `author` component in the boilerplate project.
