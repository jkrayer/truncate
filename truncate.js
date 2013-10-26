//
(function(win){

  /**
   * Remove empty strings from an array
   * @param  {Array} arr
   * @return {Array} return an array with empty string removed
   */
  function filter(arr) {
    var i   = 0,
      count = arr.length,
      ret   = [];

    for (i; i < count; i += 1) {
      if (arr[i]) {
        ret.push(arr[i]);
      }
    }
    return ret;
  }

  /**
   * Truncate mixed text/html to a specified length and add a "more" indicator
   * to the end
   * @return {String} Return truncated string
   */
  function Trunc() {
    //match any character that is not "<" 1 or more times ||
    //match "<" followed by 0 or 1 "/" followed by 1 or more words not
    //ending in ">" 0 or more times followed by 0 or 1 "/" followed by ">"
    //Capturing Groups:
    //1 whole tag
    //2 closing "/" : </a>
    //3 tag name : a, h1, img
    //[^<]+|(<(/)?(\\w+)[^>]*/?>)
    var reg   = /[^<]+|(<(\/)?(\w+)[^>]*\/?>)/g,
    //match img, hr or br, do not capture
    selfClose = /^(?:img|[hb]r)$/,
    i         = 0,
    count     = 0,
    lastCount = 0,
    match     = [],
    openTags  = [],
    output    = "";

    // while count is less than the words option
    while (count < this.words) {
      //there is a match and the
      match = reg.exec(this.copy);
      //exit loop when match returns null
      //this can happend when the string to truncate is
      //shorter then the word count
      if (match === null) { break; }
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
      }
      //This is text, add it to the output and count
      else {
        //store the difference between total and current count
        lastCount = this.words - count;
        //add the number of words being added to count
        count += filter(match[0].split(/\s+/)).length;
        //have we exceeded the maximum?
        if (count > this.words) {
          //concat enough words to match words
          output += ' ' + filter(match[0].split(/\s+/))
            .slice(0, lastCount).join(' ');
        } else {
          //no, concat the result
          output += match[0];
        }
      }
    }
    //concat the more character
    output += this.more;
    //close all open tags : </a> || </a></h1></div>
    i = openTags.length;
    for (i; i > 0; i -= 1) {
      output += "</" + openTags[i] + ">";
    }
    //Return truncated copy
    return output;
  }


  /**
   * Handle arguments and run truncation
   * @param {Object} args:
   *   words (optional) {Number} number of words to truncate to
   *   more (optional) {String} indicator to concat to the end of truncated copy
   *   copy (required) {String} the text/html to be truncated
   * @return {Function} a new Trunc function
   */
  function Truncate (args) {

    this.words = args.words || 30;

    this.more = args.more || '&hellip;';

    if (args.copy === 'undefined' || typeof args.copy !== 'string') {
      return 'Nothing to truncate.';
    }

    this.copy = args.copy;

    return Trunc.apply(this,{});

  }

  win.truncate = Truncate;

}(this));
