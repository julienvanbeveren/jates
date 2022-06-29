function t(t,e,s,a){if("a"===s&&!a)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!a:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===s?a:"a"===s?a.call(t):a?a.value:e.get(t)}var e,s,a;class r extends Date{constructor(){super(...arguments),e.add(this),this.months=["January","February","March","April","May","June","July","August","September","October","November","December"],this.monthsShort=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],this.days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],this.daysShort=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}getMonthName(t="long"){return"short"==t?this.monthsShort[this.getMonth()]:this.months[this.getMonth()]}getDayName(t="long"){return"short"==t?this.daysShort[this.getDay()]:this.days[this.getDay()]}getDayOfYear(){const t=new r(this.getFullYear(),0,0).getTime(),e=this.getTime()-t;return Math.floor(e/864e5)}format(r){let h=[],i="";for(let t=0;t<r.length;t++)r[t].match(/\W/)?(i&&(h.push(i),i=""),h.push(r[t])):(i+=r[t],t>r.length-2&&h.push(i));let n="";for(const r of h)if(r.match(/\W/))n+=r;else switch(r){case"MMMMM":n+=this.months[this.getMonth()][0];break;case"MMMM":n+=this.months[this.getMonth()];break;case"MMM":n+=this.monthsShort[this.getMonth()];break;case"MM":n+=t(this,e,"m",s).call(this,this.getMonthNumber());break;case"M":n+=this.getMonthNumber().toString();break;case"Mo":n+=t(this,e,"m",a).call(this,this.getMonthNumber());break;case"dd":n+=t(this,e,"m",s).call(this,this.getDate());break;case"do":n+=t(this,e,"m",a).call(this,this.getDate());break;case"d":n+=this.getDate();break;case"DDD":n+=t(this,e,"m",s).call(this,this.getDayOfYear(),3);break;case"DD":n+=t(this,e,"m",s).call(this,this.getDayOfYear(),2);break;case"Do":n+=t(this,e,"m",a).call(this,this.getDayOfYear());break;case"D":n+=t(this,e,"m",s).call(this,this.getDayOfYear(),1);break;case"EEEEEE":n+=this.days[this.getDay()-1].substring(0,2);break;case"EEEEE":n+=this.days[this.getDay()-1].substring(0,1);break;case"EEEE":n+=this.days[this.getDay()-1];break;case"EEE":case"EE":case"E":n+=this.days[this.getDay()-1].substring(0,3);break;case"qqqqq":case"QQQQQ":case"q":case"Q":n+=this.getQuarter();break;case"qqqq":case"QQQQ":n+=t(this,e,"m",a).call(this,this.getQuarter())+"quarter";break;case"qqq":case"QQQ":n+="Q"+this.getQuarter();break;case"qq":case"QQ":n+=t(this,e,"m",s).call(this,this.getQuarter(),5);break;case"qo":case"Qo":n+=t(this,e,"m",a).call(this,this.getQuarter())}return n}getMonthNumber(){return this.getMonth()+1>12?1:this.getMonth()+1}getQuarter(){return Math.ceil(this.getMonthNumber()/4)}}e=new WeakSet,s=function(t,e=2){const s=t.toString();return s.length>e-1?s:"0".repeat(e-s.length)+s},a=function(t){return 1==parseInt(t.toString().slice(-1))?t.toString()+"st":2==parseInt(t.toString().slice(-1))?t.toString()+"nd":3==parseInt(t.toString().slice(-1))?t.toString()+"rd":4==parseInt(t.toString().slice(-1))||5==parseInt(t.toString().slice(-1))?t.toString()+"th":6==parseInt(t.toString().slice(-1))?t.toString()+"st":parseInt(t.toString().slice(-1))>6&&parseInt(t.toString().slice(-1))<10||t>10&&t<20||t%10==0?t.toString()+"th":void 0};let h=new r;console.log(h.format("QQ"));export{r as default};
