/**
 * Show the error container with a progress bar that gradually fills up
 * and hides the container after 5 seconds.
 */
function showErrorContainer() { 
    // Display the error container
    $('#error-container').show();

    // Animate the progress bar to fill up over 5 seconds
    $('#progress-bar-inner').css('width', '100%');

    // Hide the error container and reset the progress bar after 5 seconds
    setTimeout(function() {
        $('#error-container').hide();
        $('#progress-bar-inner').css('width', '0%'); // Reset progress bar for future errors
    }, 5000);
}

/**
 * Validate form fields and display error messages if any validation fails.
 * This function handles different validation checks and shows inline error
 * messages for respective page items.
 * @returns {boolean} - Returns false if there are validation errors, true otherwise.
 */
function validateForm() {
    var hasError = false; // Flag to check if any validation has failed
    var errorMessages = []; // Array to store error messages

    // Clear any existing error messages from APEX
    apex.message.clearErrors();

    // Define validation checks for different form fields
    var validations = [
        {
            // Check if Enquiry Number is not empty
            pageItem: 'P1_ENQ_NO',
            condition: function() {
                return $v('P1_ENQ_NO') !== '';
            },
            errorMessage: 'Enquiry number is empty, please select style again'
        },
        {
            // Validate if the first bundle number is less than the second bundle number
            pageItem: 'P1_BUNDLE_SL',
            condition: function() {
                var bundleValue = $v('P1_BUNDLE_SL');
                var match = bundleValue.match(/^(\d+)\s*-\s*(\d+)$/);

                if (match) {
                    var firstValue = parseInt(match[1], 10);
                    var secondValue = parseInt(match[2], 10);
                    return firstValue < secondValue;
                }
                return false;
            },
            errorMessage: 'You reached target quantity or select the size and Parts again'
        },
        {
            // Check if Part Name is not empty
            pageItem: 'P1_PART_NAME',
            condition: function() {
                return $v('P1_PART_NAME') !== ''; 
            },
            errorMessage: 'Part Name is empty, please select again'
        },
        {
            // Check if Group Shade is not empty
            pageItem: 'P1_GROUP_SHADE',
            condition: function() {
                return $v('P1_GROUP_SHADE') !== ''; 
            },
            errorMessage: 'Group cannot be empty'
        },
        {
            // Validate if the Received Quantity is a valid integer
            pageItem: 'P1_COUNT_IN_BUNDLE',
            condition: function() {
                return /^\d+$/.test($v('P1_COUNT_IN_BUNDLE'));
            },
            errorMessage: 'Received quantity must be a full number.'
        },
        {
            // Check if the bundle quantity plus received quantity is within the target quantity
            pageItem: 'P1_BUNDLE_SL',
            condition: function() {
                var COUNT_IN_BUNDLE = parseInt($v('P1_COUNT_IN_BUNDLE')) || 0; 
                var LAST_BUNDLE_SL = parseInt($v('P1_LAST_BUNDLE_SL')) || 0;
                var TARGET_QTY = parseInt($v('P1_TARGET_QTY')) || 0;
                return LAST_BUNDLE_SL + COUNT_IN_BUNDLE <= TARGET_QTY; 
            },
            errorMessage: "Can't process more than target quantity."
        }
    ];

    // Loop through each validation rule and check if it passes
    validations.forEach(function(validation) {
        var pageItem = validation.pageItem;
        var condition = validation.condition;
        var errorMessage = validation.errorMessage;

        // If the validation condition fails, display an error
        if (!condition()) {
            // Show inline error for the specific page item
            apex.message.showErrors({
                type: "error",
                location: "inline",
                pageItem: pageItem,
                message: errorMessage
            });

            // Add error message to the error messages array
            errorMessages.push('<p>' + errorMessage + '</p>');

            // Highlight the invalid field with a red border
            $('#' + pageItem).css('border', '1px solid red');

            // Set the error flag to true
            hasError = true;

            // Optionally display an alert for the error message (you can remove if unnecessary)
            alert(errorMessage);         
            
        } else {
            // Clear the red border if validation passes
            $('#' + pageItem).css('border', '');
        }
    });
    
    // If any validation failed, show the error container and messages
    if (hasError) {
        $('#error-messages').html(errorMessages.join('')); // Display error messages
        showErrorContainer(); // Show the error container with progress bar
    }

    // Set a hidden APEX item to indicate whether validation succeeded or failed
    $s('P1_VALIDATION_ERROR', hasError ? 'Y' : 'N');

    // Return false if there were validation errors, true otherwise
    return !hasError;
}
