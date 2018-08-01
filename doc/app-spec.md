# Application Specification

We have created this short spec to help you create an awesome and consistent todo app. Make sure to not only read it but
to understand it as well.

## Template Application

Our [template](../client/index.html) should be used as the base when implementing the todo app.

## Structure

### Directory Structure

Recommended file structure:

```
client/
└── index.html
└── index.js
└── css/
│   └── app.css
└── js/
    ├── controllers/
    └── models/
```

Try to use this structure as much as possible while still following the framework’s best practices.

Components should be split into separate files and placed into folders where it makes the most sense.

Example:

```
js/
├── controllers/
│   └── todos.js
└── models/
    └── todo.js
```

Keep in mind that the framework’s best practices on how to structure your app comes first.

### Code

Please try to keep the HTML as close to the template as possible. If you need to change some styles, use the `app.css`
file, but try to keep changes to a minimum.

Make sure to follow these:

- Use npm packages for your third-party dependencies.
- Use a constant instead of the keyCode directly: `var ENTER_KEY = 13;`

## Functionality

### No todos

When there are no todos, `#main` and `#footer` should be hidden.

### New todo

New todos are entered in the input at the top of the app. The input element should be focused when the page is loaded,
preferably by using the `autofocus` input attribute. Pressing Enter creates the todo, appends it to the todo list,
and clears the input. Make sure to `.trim()` the input and then check that it's not empty before creating a new todo.

### Mark all as complete

This checkbox toggles all the todos to the same state as itself. Make sure to clear the checked state after the
"Clear completed" button is clicked. The "Mark all as complete" checkbox should also be updated when single todo items
are checked/unchecked. Eg. When all the todos are checked it should also get checked.

### Item

A todo item has three possible interactions:

1. Clicking the checkbox marks the todo as complete by updating its `completed` value and toggling the class `completed`
on its parent `<li>`

2. Double-clicking the `<label>` activates editing mode, by toggling the `.editing` class on its `<li>`

3. Hovering over the todo shows the remove button (`.destroy`)

### Editing

When editing mode is activated it will hide the other controls and bring forward an input that contains the todo title,
which should be focused (`.focus()`). The edit should be saved on both blur and enter, and the `editing` class should
be removed. Make sure to `.trim()` the input and then check that it's not empty. If it's empty the todo should instead
be destroyed. If escape is pressed during the edit, the edit state should be left and any changes be discarded.

### Counter

Displays the number of active todos in a pluralized form. Make sure the number is wrapped by a `<strong>` tag.
Also make sure to pluralize the `item` word correctly: `0 items`, `1 item`, `2 items`. Example: **2** items left

### Clear completed button

Removes completed todos when clicked. Should be hidden when there are no completed todos.

### Persistence

Your app should dynamically persist the todos to our API located at `/api/`, you can find the documentation at `/api/doc/`

### Routing

Routing is required. If you don't know what to use, use the [Flatiron Director](https://github.com/flatiron/director)
routing library. The following routes should be implemented: `#/` (all - default), `#/active` and `#/completed`
(`#!/` is also allowed). When the route changes, the todo list should be filtered on a model level and the `selected`
class on the filter links should be toggled. When an item is updated while in a filtered state, it should be updated
accordingly. E.g. if the filter is `Active` and the item is checked, it should be hidden. Make sure the active filter
is persisted on reload.
