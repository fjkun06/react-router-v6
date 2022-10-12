"use strict";
exports.__esModule = true;
var react_router_dom_1 = require("react-router-dom");
function Contact() {
    var contact = {
        first: "Your",
        last: "Name",
        avatar: "https://placekitten.com/g/200/200",
        twitter: "your_handle",
        notes: "Some notes",
        favorite: true
    };
    return (React.createElement("div", { id: "contact" },
        React.createElement("div", null,
            React.createElement("img", { key: contact.avatar, src: contact.avatar || undefined, alt: contact.avatar })),
        React.createElement("div", null,
            React.createElement("h1", null,
                contact.first || contact.last ? (React.createElement(React.Fragment, null,
                    contact.first,
                    " ",
                    contact.last)) : (React.createElement("i", null, "No Name")),
                " ",
                React.createElement(Favorite, { contact: contact })),
            contact.twitter && (React.createElement("p", null,
                React.createElement("a", { target: "_blank", rel: "noreferrer", href: "https://twitter.com/" + contact.twitter }, contact.twitter))),
            contact.notes && React.createElement("p", null, contact.notes),
            React.createElement("div", null,
                React.createElement(react_router_dom_1.Form, { action: "edit" },
                    React.createElement("button", { type: "submit" }, "Edit")),
                React.createElement(react_router_dom_1.Form, { method: "post", action: "destroy", onSubmit: function (event) {
                        if (
                        // eslint-disable-next-line no-restricted-globals
                        !confirm("Please confirm you want to delete this record.")) {
                            event.preventDefault();
                        }
                    } },
                    React.createElement("button", { type: "submit" }, "Delete"))))));
}
exports["default"] = Contact;
var Favorite = function (_a) {
    var contact = _a.contact;
    // yes, this is a `let` for later
    var favorite = contact.favorite;
    return (React.createElement(react_router_dom_1.Form, { method: "post" },
        React.createElement("button", { name: "favorite", value: favorite ? "false" : "true", "aria-label": favorite
                ? "Remove from favorites"
                : "Add to favorites" }, favorite ? "★" : "☆")));
};
