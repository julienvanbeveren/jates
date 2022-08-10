"use strict";function e(e,t,s,a){if("a"===s&&!a)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!a:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===s?a:"a"===s?a.call(e):a?a.value:t.get(e)}var t,s,a,i,h,r;class c extends Date{constructor(){super(...arguments),t.add(this)}static setFormat(e,t){c.namedFormat[e]=t}static removeFormat(e){var t;null===(t=c.namedFormat)||void 0===t||delete t[e]}getMonthName(e="long"){return"short"==e?c.monthsShort[this.getMonth()]:c.months[this.getMonth()]}getDayName(e="long"){return"short"==e?c.daysShort[this.getDay()]:c.days[this.getDay()]}getDayOfYear(){const e=new c(this.getFullYear(),0,0).getTime(),t=this.getTime()-e;return Math.floor(t/864e5)}nformat(e){var t;return this.format((null===(t=c.namedFormat)||void 0===t?void 0:t[e])||"")}format(s=c.defaultFormat){let l=[],o="";for(let e=0;e<s.length;e++)if(s[e].match(/\W/)){if(["{","}"].includes(s[e])){if("{"==s[e]){o&&l.push(o),o="{";continue}if("}"==s[e]){o+="}",l.push(o),o="";continue}}o&&(l.push(o),o=""),l.push(s[e])}else o+=s[e],e>s.length-2&&l.push(o);let n="";for(const s of l)if(s.includes("{")&&s.includes("}"))n+=s.replace("{","").replace("}","");else if(s.match(/\W/))n+=s;else switch(s){case"yyyy":n+=e(this,t,"m",a).call(this,this.getFullYear(),4);break;case"yyy":n+=e(this,t,"m",a).call(this,this.getFullYear(),3);break;case"yy":n+=e(this,t,"m",a).call(this,this.getFullYear(),2);break;case"yo":n+=e(this,t,"m",i).call(this,this.getFullYear());break;case"y":n+=this.getFullYear();break;case"qqqqq":case"QQQQQ":case"q":case"Q":n+=this.getQuarter();break;case"qqqq":case"QQQQ":n+=e(this,t,"m",i).call(this,this.getQuarter())+"quarter";break;case"qqq":case"QQQ":n+="Q"+this.getQuarter();break;case"qq":case"QQ":n+=e(this,t,"m",a).call(this,this.getQuarter(),5);break;case"qo":case"Qo":n+=e(this,t,"m",i).call(this,this.getQuarter());break;case"LLLLL":case"MMMMM":n+=c.months[this.getMonth()][0];break;case"LLLL":case"MMMM":n+=c.months[this.getMonth()];break;case"LLL":case"MMM":n+=c.monthsShort[this.getMonth()];break;case"LL":case"MM":n+=e(this,t,"m",a).call(this,this.getMonthNumber());break;case"L":case"M":n+=this.getMonthNumber().toString();break;case"Lo":case"Mo":n+=e(this,t,"m",i).call(this,this.getMonthNumber());break;case"dd":n+=e(this,t,"m",a).call(this,this.getDate());break;case"do":n+=e(this,t,"m",i).call(this,this.getDate());break;case"d":n+=this.getDate();break;case"DDD":n+=e(this,t,"m",a).call(this,this.getDayOfYear(),3);break;case"DD":n+=e(this,t,"m",a).call(this,this.getDayOfYear(),2);break;case"Do":n+=e(this,t,"m",i).call(this,this.getDayOfYear());break;case"D":n+=e(this,t,"m",a).call(this,this.getDayOfYear(),1);break;case"EEEEEE":n+=c.days[this.getDay()-1].substring(0,2);break;case"EEEEE":n+=c.days[this.getDay()-1].substring(0,1);break;case"EEEE":n+=c.days[this.getDay()-1];break;case"EEE":case"EE":case"E":n+=c.days[this.getDay()-1].substring(0,3);break;case"aaaaa":n+=e(this,t,"m",h).call(this).charAt(0);break;case"aaaa":n+=e(this,t,"m",h).call(this).split("").join(",");break;case"aaa":n+=e(this,t,"m",h).call(this);break;case"aa":case"a":n+=e(this,t,"m",h).call(this).toUpperCase();break;case"hh":n+=e(this,t,"m",a).call(this,e(this,t,"m",r).call(this,this.getHours(),1,12));break;case"ho":n+=e(this,t,"m",i).call(this,e(this,t,"m",r).call(this,this.getHours(),1,12));break;case"h":n+=e(this,t,"m",r).call(this,this.getHours(),1,12);break;case"HH":n+=e(this,t,"m",a).call(this,e(this,t,"m",r).call(this,this.getHours(),0,23));break;case"Ho":n+=e(this,t,"m",i).call(this,e(this,t,"m",r).call(this,this.getHours(),0,23));break;case"H":n+=e(this,t,"m",r).call(this,this.getHours(),0,23);break;case"kk":n+=e(this,t,"m",a).call(this,e(this,t,"m",r).call(this,this.getHours(),1,24));break;case"ko":n+=e(this,t,"m",i).call(this,e(this,t,"m",r).call(this,this.getHours(),1,24));break;case"k":n+=e(this,t,"m",r).call(this,this.getHours(),1,24);break;case"mm":n+=e(this,t,"m",a).call(this,this.getMinutes());break;case"mo":n+=e(this,t,"m",i).call(this,this.getMinutes());break;case"m":n+=this.getMinutes();break;case"ss":n+=e(this,t,"m",a).call(this,this.getSeconds());break;case"so":n+=e(this,t,"m",i).call(this,this.getSeconds());break;case"s":n+=this.getSeconds();break;case"SSS":n+=e(this,t,"m",a).call(this,this.getMilliseconds(),3);break;case"SS":n+=e(this,t,"m",a).call(this,this.getMilliseconds());break;case"S":n+=this.getMilliseconds()}return n}add(a,i){e(this,t,"m",s).call(this,a,i)}subtract(a,i){e(this,t,"m",s).call(this,a,i,-1)}getMonthNumber(){return this.getMonth()+1>12?1:this.getMonth()+1}getQuarter(){return Math.ceil(this.getMonthNumber()/4)}}t=new WeakSet,s=function(e,t,s=1){const a=this.getTime();switch(t.toLowerCase()){case"d":case"day":case"days":this.setTime(a+s*(24*e*60*60*1e3));break;case"minute":case"minutes":case"min":case"mins":this.setTime(a+s*(60*e*1e3));break;case"h":case"hours":case"hour":this.setTime(a+s*(60*e*60*1e3));break;case"s":case"second":case"seconds":this.setTime(a+s*(1e3*e));break;case"ms":case"milliseconds":case"millisecond":this.setTime(a+s*e)}},a=function(e,t=2){const s=e.toString();return s.length>t-1?s:"0".repeat(t-s.length)+s},i=function(e){const t=e%10,s=e%100;return 1==t&&11!=s?e+"st":2==t&&12!=s?e+"nd":3==t&&13!=s?e+"rd":e+"th"},h=function(){return this.getHours()>12||11==this.getHours()&&(this.getMinutes()>0||this.getSeconds()>0||this.getMilliseconds()>0)?"am":"pm"},r=function(e,t,s){return e>s?t+(e-s-1):e<t?t:e},c.defaultFormat="",c.namedFormat={},c.months=["January","February","March","April","May","June","July","August","September","October","November","December"],c.monthsShort=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],c.days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],c.daysShort=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],module.exports=c;
