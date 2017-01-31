/*

 ============================================
 License for Application
 ============================================

 This license is governed by United States copyright law, and with respect to matters
 of tort, contract, and other causes of action it is governed by North Carolina law,
 without regard to North Carolina choice of law provisions.  The forum for any dispute
 resolution shall be in Wake County, North Carolina.

 Redistribution and use in source and binary forms, with or without modification, are
 permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice, this list
 of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright notice, this
 list of conditions and the following disclaimer in the documentation and/or other
 materials provided with the distribution.

 3. The name of the author may not be used to endorse or promote products derived from
 this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
 WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
 AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 */

/* Set of functions for handling modal behavior */

function showModal(obj) {
    jQuery('#main-page').prop({'aria-hidden': true}); // mark the main page as hidden
    jQuery('#modal-overlay').css('display', 'block'); // insert an overlay to prevent clicking and make a visual change to indicate the main apge is not available
    jQuery('#modal').css('display', 'block'); // make the modal window visible
    jQuery('#modal').prop({'aria-hidden': false, 'hidden': false}); // mark the modal window as visible

    // attach a listener to redirect the tab to the modal window if the user somehow gets out of the modal window
    jQuery('body').on('focusin','#main-page',function() {
        setFocusToFirstItemInModal(jQuery('#modal'));
    });
    // save current focus
    focusedElementBeforeModal = jQuery(':focus');
    setFocusToFirstItemInModal(obj);
}

function setFocusToFirstItemInModal(obj){
    // get list of all children elements in given object
    var o = obj.find('*');

    // set the focus to the first keyboard focusable item
    o.filter(focusableElementsString).filter(':visible').first().focus();
}


function trapTabKey(obj, evt) {

    // get list of all children elements in given object
    var o = obj.find('*');

    // get list of focusable items
    var focusableItems;
    focusableItems = o.filter(focusableElementsString).filter(':visible');

    // get currently focused item
    var focusedItem;
    focusedItem = jQuery(':focus');

    // get the number of focusable items
    var numberOfFocusableItems;
    numberOfFocusableItems = focusableItems.length;

    // get the index of the currently focused item
    var focusedItemIndex;
    focusedItemIndex = focusableItems.index(focusedItem);

    if (evt.shiftKey) {
        //back tab
        // if focused on first item and user preses back-tab, go to the last focusable item
        if (focusedItemIndex === 0) {
            focusableItems.get(numberOfFocusableItems - 1).focus();
            evt.preventDefault();
        }

    } else {
        //forward tab
        // if focused on the last item and user preses tab, go to the first focusable item
        if (focusedItemIndex == numberOfFocusableItems - 1) {
            focusableItems.get(0).focus();
            evt.preventDefault();
        }
    }
}

function trapEscapeKey(obj, evt) {

    // get list of all children elements in given object
    var o = obj.find('*');

    // get list of focusable items
    var escElement;
    escElement = o.filter("#esc-btn");

    // close the modal window
    escElement.click();
    evt.preventDefault();
}

function handleSubmit() {
    // BEGIN logic for executing the Enter button action for the modal window
    alert('form submitted');
    // END logic for executing the Enter button action for the modal window
    hideModal();
}

function hideModal() {
    jQuery('#modal-overlay').css('display', 'none'); // remove the overlay in order to make the main screen available again
    jQuery('#modal').css('display', 'none'); // hide the modal window
    jQuery('#modal').prop({'aria-hidden': true, 'hidden': true}); // mark the modal window as hidden
    jQuery('#main-page').prop({'aria-hidden': false}); // mark the main page as visible

    // remove the listener which redirects tab keys in the main content area to the modal
    jQuery('body').off('focusin','#main-page');

    // set focus back to element that had it before the modal was opened
    focusedElementBeforeModal.focus();
}

/* End modal behavior functions */

// jQuery formatted selector to search for focusable items
var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

// store the item that has focus before opening the modal window
var focusedElementBeforeModal;

jQuery(function() {

    jQuery('#start-modal').click(function(e) {
        showModal(jQuery('#modal'));
    });

    jQuery('#cancel-btn').click(function(e) {
        hideModal();
    });
    jQuery('#enter-btn').click(function(e) {
        handleSubmit();
    });
    jQuery('#esc-btn').click(function(e) {
        hideModal();
    });
    jQuery('#modal').keydown(function(event) {
        // if tab or shift-tab pressed
        if (event.which === 9) {
            trapTabKey($(this), event);
        }
        // if escape pressed
        if (event.which === 27) {
            trapEscapeKey($(this), event);
        }
    });
});
