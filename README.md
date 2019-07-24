# Laravel Elixir Handlebars

### Install

### Example

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-handlebars');

elixir(function (mix) {

    // Handlebar templates
    mix.templates([
        'templates/**/*.hbs' // Will search in 'resources/views/templates'
    ], 'My.Namespace', 'output/folder');
});
```
