"use strict";function t(t,e,s,a){if("a"===s&&!a)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!a:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===s?a:"a"===s?a.call(t):a?a.value:e.get(t)}var e,s,a,r;class i extends Date{constructor(){super(...arguments),e.add(this),this.months=["January","February","March","April","May","June","July","August","September","October","November","December"],this.monthsShort=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],this.days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],this.daysShort=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}getMonthName(t="long"){return"short"==t?this.monthsShort[this.getMonth()]:this.months[this.getMonth()]}getDayName(t="long"){return"short"==t?this.daysShort[this.getDay()]:this.days[this.getDay()]}getDayOfYear(){const t=new i(this.getFullYear(),0,0).getTime(),e=this.getTime()-t;return Math.floor(e/864e5)}format(i){let h=[],n="";for(let t=0;t<i.length;t++)if(i[t].match(/\W/)){if(["{","}"].includes(i[t])){if("{"==i[t]){n&&h.push(n),n="{";continue}if("}"==i[t]){n+="}",h.push(n),n="";continue}}n&&(h.push(n),n=""),h.push(i[t])}else n+=i[t],t>i.length-2&&h.push(n);let c="";for(const i of h)if(i.includes("{")&&i.includes("}"))c+=i.replace("{","").replace("}","");else if(i.match(/\W/))c+=i;else switch(i){case"LLLLL":case"MMMMM":c+=this.months[this.getMonth()][0];break;case"LLLL":case"MMMM":c+=this.months[this.getMonth()];break;case"LLL":case"MMM":c+=this.monthsShort[this.getMonth()];break;case"LL":case"MM":c+=t(this,e,"m",s).call(this,this.getMonthNumber());break;case"L":case"M":c+=this.getMonthNumber().toString();break;case"Lo":case"Mo":c+=t(this,e,"m",a).call(this,this.getMonthNumber());break;case"dd":c+=t(this,e,"m",s).call(this,this.getDate());break;case"do":c+=t(this,e,"m",a).call(this,this.getDate());break;case"d":c+=this.getDate();break;case"DDD":c+=t(this,e,"m",s).call(this,this.getDayOfYear(),3);break;case"DD":c+=t(this,e,"m",s).call(this,this.getDayOfYear(),2);break;case"Do":c+=t(this,e,"m",a).call(this,this.getDayOfYear());break;case"D":c+=t(this,e,"m",s).call(this,this.getDayOfYear(),1);break;case"EEEEEE":c+=this.days[this.getDay()-1].substring(0,2);break;case"EEEEE":c+=this.days[this.getDay()-1].substring(0,1);break;case"EEEE":c+=this.days[this.getDay()-1];break;case"EEE":case"EE":case"E":c+=this.days[this.getDay()-1].substring(0,3);break;case"qqqqq":case"QQQQQ":case"q":case"Q":c+=this.getQuarter();break;case"qqqq":case"QQQQ":c+=t(this,e,"m",a).call(this,this.getQuarter())+"quarter";break;case"qqq":case"QQQ":c+="Q"+this.getQuarter();break;case"qq":case"QQ":c+=t(this,e,"m",s).call(this,this.getQuarter(),5);break;case"qo":case"Qo":c+=t(this,e,"m",a).call(this,this.getQuarter());break;case"aaaaa":c+=t(this,e,"m",r).call(this).charAt(0);break;case"aaaa":c+=t(this,e,"m",r).call(this).split("").join(",");break;case"aaa":c+=t(this,e,"m",r).call(this);break;case"aa":case"a":c+=t(this,e,"m",r).call(this).toUpperCase()}return c}getMonthNumber(){return this.getMonth()+1>12?1:this.getMonth()+1}getQuarter(){return Math.ceil(this.getMonthNumber()/4)}}e=new WeakSet,s=function(t,e=2){const s=t.toString();return s.length>e-1?s:"0".repeat(e-s.length)+s},a=function(t){return 1==parseInt(t.toString().slice(-1))?t.toString()+"st":2==parseInt(t.toString().slice(-1))?t.toString()+"nd":3==parseInt(t.toString().slice(-1))?t.toString()+"rd":4==parseInt(t.toString().slice(-1))||5==parseInt(t.toString().slice(-1))?t.toString()+"th":6==parseInt(t.toString().slice(-1))?t.toString()+"st":parseInt(t.toString().slice(-1))>6&&parseInt(t.toString().slice(-1))<10||t>10&&t<20||t%10==0?t.toString()+"th":void 0},r=function(){return this.getHours()>12||11==this.getHours()&&(this.getMinutes()>0||this.getSeconds()>0||this.getMilliseconds()>0)?"am":"pm"},module.exports=i;
