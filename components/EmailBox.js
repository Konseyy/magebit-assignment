import React from 'react';

var EmailBox = function EmailBox() {
    return React.createElement(
        "div",
        null,
        "Yes"
    );
};
React.ReactDOM.render(React.createElement(EmailBox, null), document.getElementById("emailBoxContainer"));