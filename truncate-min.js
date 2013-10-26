/*! Truncate (v2.0) Jim Krayer<jameskrayer@yahoo.com> The MIT License */
(function(win){function filter(arr){var i=0,count=arr.length,ret=[];for(i;i<count;i+=1){if(arr[i]){ret.push(arr[i]);}}return ret;}function Trunc(){var reg=/[^<]+|(<(\/)?(\w+)[^>]*\/?>)/g,selfClose=/^(?:img|[hb]r)$/,i=0,count=0,lastCount=0,match=[],openTags=[],output="";while(count<this.words){match=reg.exec(this.copy);if(match===null){break;}if(match[1]){output+=match[0];if(!selfClose.test(match[3])){if(match[2]){openTags.pop();}else{openTags.push(match[3]);}}}else{lastCount=this.words-count;count+=filter(match[0].split(/\s+/)).length;if(count>this.words){output+=' '+filter(match[0].split(/\s+/)).slice(0,lastCount).join(' ');}else{output+=match[0];}}}output+=this.more;i=openTags.length;for(i;i>0;i-=1){output+="</"+openTags[i]+">";}return output;}function Truncate(args){this.words=args.words||30;this.more=args.more||'&hellip;';if(args.copy==='undefined'||typeof args.copy!=='string'){return'Nothing to truncate.';}this.copy=args.copy;return Trunc.apply(this,{});}if(typeof jQuery!=="undefined"){jQuery.fn.truncate=function(options){var defaults={words:30,more:'&hellip;'};options=jQuery.extend(true,{},defaults,options);return this.each(function(){options.copy=jQuery(this).html();jQuery(this).html(Trunc.apply(options,{}));});}}return win.truncate=Truncate;}(this));