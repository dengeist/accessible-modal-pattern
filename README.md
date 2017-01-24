# The Incredible Accessible Modal Window

## Table of Contents
* [What is this?](#what-is-this)
* [Recent changes](#recent-changes)
    * [In version 4](#in-version-4)
    * [In version 4.0.1](#in-version-4.0.1)
* [Features](#features)
* [How to implement](#how-to-implement)
* [Configurations tested as of version 4.0](#configurations-tested-as-of-version-4.0)
* [How to contribute](#how-to-contribute)

## What is this?

This pattern demonstrates how to make a modal window as accessible as possible to assistive technology users. Modal windows are especially problematic for screen reader users. Often times the user is able to "escape" the window and interact with other parts of the page when they should not be able to. This is partially due to the way screen reader software interacts with the Web browser.

Credit for the original pattern (and code an documentation up to version 4) to [Greg Krauss](https://github.com/gdkraus). Much of the documentation below is his, with edits by me.

## Recent changes
This section records Krauss's notes on version 4 for posterity, and for comparison to my minor changes in his code.
### In version 4

* Due to high demand, the `role="document"` is added back to the contents of the modal. This makes it so NVDA automatically switches into document reading mode inside of the modal. NVDA had previously let you toggle the reading mode, but since many modals contain items that require document browsing mode, I've added this back in as the default.
* There is now a check that when the modal window is open, detects any time the #mainPage or any of its contents receives focus and will redirect the focus to the modal window. This was necessary because of the modal window was open and you went to the address bar, if you started tabbing again you would interact with the main page.

### In version 4.0.1
* The graphical escape button has been reconfigured as an `input type="image"` rather than as an `img` wrapped in a `button`.
* The event listeners for keyboard input have been simplified.
* The variables in the JavaScript file have been given better names, to reduce potential reader confusion.
* This readme now has a table of contents for better usability.
* The copy in the example modal and this readme have been edited for clarity.

## Features

This pattern does the following:

* Divides the page into three sections:
  1. `<div id="mainPage></div>`
  2. `<div id="modal" role="dialog"></div>`
  3. `<div id="modalOverlay"></div>`
* Places an overlay above the `mainPage` when the modal is open, so the `mainPage`is:
  1. visually grayed out, to indicate that the user can't interact with what is behind the window
  2. not clickable with the mouse
* Marks the `mainPage` with `aria-hidden="true"` when the modal is open, to prevent screen readers from interacting with what is behind the modal. Additionally, the `mainPage` gets an event listener for any time it or any of its children receive focus. When they do receive focus, the user's focus is redirected to the modal window.
* Ensures the modal has proper keyboard navigability once it is open by:
    1. "Trapping" the keyboard in the modal, preventing unwanted escape.
    2. Looping the tab key through the keyboard-focusable items within the modal window by determining what is in the DOM when the tab key is pressed.
    3. Mapping the escape key to the function to close the modal window.
    4. Mapping the enter key to the submit function of the modal window.
* Identifies the title of the modal dialog through the `aria-labelledby` attribute.
* Marks beginning of the modal with an `h1`.
* Uses `aria-describedby` to provide offscreen instructions that describe the modal dialog and how to interact with it.
    * **Note:** Only NVDA and ChromeVox automatically announce the `aria-described` by contents
* Wraps the contents of the modal in `role="document"`. This is to aid NVDA users so they can more easily browse the contents of the modal. NVDA previously added support for fully browsing the contents of the modal, but it requires the user to switch browsing modes in NVDA. Using `role="document"` automatically puts the user in the mode where they can fully browse the contents.
  * **Note:** `role="document" `is optional and the modal window is still fully functional to all users even when this attribute is left off.

## How to implement
The quickest way to use this pattern is to copy the modal from the HTML file of this repo and fill it with your own content. Be sure not to change the structure of the three divs that the modal relies on to function, but you can customize the submit, cancel, and close buttons to your liking, as long as they keep the same ID attributes.

CSS styling is, of course, arbitrary. You can customize this modal to fit the design language of your project.

The JavaScript interactivity of this modal relies on jQuery, which is included here for your convenience.

## Configurations Tested as of Version 4.0  
* JAWS 16.0.1925 in IE 11.0.9600.18036 in Windows 8.1: Passed - although `aria-describedby` is not read automatically
* NVDA 2015.3 in Firefox 40.0.3 in Windows 8.1: Passed
* Window Eyes 9.2.1.0 in 11.0.9600.18036 in Windows 8.1: Passed - although the title of the modal window and the `aria-describedby` is not read automatically
* VoiceOver in Safari 8.0.8 (9537.71) in OS X 10.10.5: Passed - although `aria-describedby` is not read automatically
* ChromeVox 45.0.2428.0 in Chrome 45.0.2454.101 in OS X 10.10.5: Passed
* Orca 3.10.3 in Firefox 39.0 in Ubuntu 14.04: Partial Functionality - does not support aria-hidden and does not announce the `aria-describedby`

## How to contribute
This project strives to be fully WCAG 2.0 and §509 compliant. Please make note of bugs and accessibility failures on [this project's issues page]().
