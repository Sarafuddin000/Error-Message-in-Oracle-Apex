1. Copy codes in Validation.js and paste in Page level Function and Global Variable Declaration.
2. Change Page items and error message as your need.
3. Copy codes Div below to page level Header Text

<div id="error-container" style="position: fixed; display: none; top: 50px; right: 20px; z-index: 100; background-color: #f8d7da; color: #721c24; padding: 10px; border: 1px solid #f5c6cb; border-radius: 5px; width: 300px;">
    <span id="error-icon" style="font-size: 18px; margin-right: 10px;">&#9888;</span> <!-- Warning icon -->
    <span id="error-messages"></span>
    <!-- Progress Bar -->
    <div id="progress-bar" style="height: 5px; background-color: #f5c6cb; margin-top: 10px; border-radius: 3px;">
        <div id="progress-bar-inner" style="height: 100%; background-color: #721c24; width: 0%; transition: width 3s;"></div>
    </div>
</div>

4. Use Dynamic Action to call validation where you need by calling function name  validateForm().
