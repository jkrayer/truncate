Truncate
========

Truncate mixed blocks of text and html to a defined amount of words with
Javascript and jQuery.

This will add the function ``truncate()`` to the window object. If jQuery is
present is will also add a jQuery plugin ``$.fn.truncate()``.

window.truncate(args)
------

returns a truncated string

``args`` {object}

``args.words`` {Number/optional/Default:30} Number of words to truncate
args.copy to.

``args.more`` {String/optional/Default:&amp;hellip;} Indicator to concat to the
end of return string.

``args.copy`` {String/required} The text/html to be truncated.

$().truncate(args)
------

replaces ``.html()`` of the item(s) passed as ``$('#id').truncate()``

``args`` {object}

``args.words`` {Number/optional/Default:30} number of words to truncate
args.copy to

``args.more`` {String/optional/Default:&amp;hellip;} Indicator to concat to the
end of return string.

Test push to many and one
