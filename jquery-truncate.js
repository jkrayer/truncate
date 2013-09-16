/*!
 * Truncate 1.0
 *
 * Truncate the content in a block to a set amount while preserving HTML.
 *
 * Copyright (c) 2013 James Krayer <jameskrayer@yahoo.com>
 * 
 * Licensed under the MIT license
 * http://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt
 *
 * Github site: http://github.com/motordev/truncate
*/
; (function ($) {

  $.fn.truncate = function (options) {

    var defaults = {
      words : 30,
      more  : '&hellip;'
    };
    //combine and store default and user options
    options = $.extend(true, {}, defaults, options);
    //store plugin methods
    var methods = {
          truncArray : function (arr) {
            return $.grep(arr, function (n) {
              return n !== "";
            });
          }
        };

    return this.each(function () {
      /* match any character that is not "<" 1 or more times ||
       * match "<" followed by 0 or 1 "/" followed by 1 or more words not
       * ending in ">" 0 or more times followed by 0 or 1 "/" followed by ">"
       * Capturing Groups:
       * 1 whole tag
       * 2 closing "/" : </a>
       * 3 tag name : a, h1, img
      */
      var reg       = new RegExp('[^<]+|(<(/)?(\\w+)[^>]*/?>)', 'g'),
        selfClose = /^(?:img|[hb]r)$/, //match img, hr or br, do not capture
        $t        = $(this), //reference to calling object
        count     = 0,  //count up to the provided options.words limit
        lastCount = 0,  //store the previous count
        match     = [], //store reg.exec result
        openTags  = [], //store open tags, used to complete html
        i         = 0,  //for iteration
        output    = ""; //store final output

      // while count is less than the words option
      while (count < options.words) {
        //there is a match and the
        match = reg.exec($t.html());
        //match[1] means this string is HTML, do not count HTML
        if (match[1]) {
          //Add HTML tag to output
          output += match[0];
          // If this is not a self-closing tag
          if (!selfClose.test(match[3])) {
            //This is a closing tag
            if (match[2]) {
              //remove the closing tag from the openTags array
              openTags.pop();
            } else {
              //add the opening tag to the openTags array
              openTags.push(match[3]);
            }
          }
        } else { //This is text, add it to the output and count
          //store the difference between total and current count
          lastCount = options.words - count;
          //add the number of words being added to count
          count += methods.truncArray(match[0].split(/\s+/)).length;
          //have we exceeded the maximum?
          if (count > options.words) {
            //concat enough words to match options.words
            output += ' ' + methods.truncArray(match[0].split(/\s+/))
              .slice(0, lastCount).join(' ');
          } else {
            //no, concat the result
            output += match[0];
          }
        }
      }
      //concat the more character
      output += options.more;
      //close all open tags : </a> || </a></h1></div>
      for (i = openTags.length - 1; i >= 0; i -= 1) {
        output += "</" + openTags[i] + ">";
      }
      //replace DOM text with truncated copy
      $t.html(output);
    }); //end return
  }; //end function
}(jQuery)); //end module
