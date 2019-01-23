#!/usr/bin/env node

require('dotenv').config();
const http_request = require("request");

http_request.get("https://api.corrently.io/core/gsi?plz="+process.env.PLZ,function(e,r,b) {
  let gsi = JSON.parse(b);
  if(typeof gsi.forecast != "undefined") {
    let current_gsi = gsi.forecast[0];
    let min_green = { eevalue:100 };
    let max_green = { eevalue:0 };
    for(let i=0;i<gsi.forecast.length;i++) {
        if(gsi.forecast[i].timeStamp < new Date().getTime()) {
          current_gsi = gsi.forecast[i];
        } else {
            if(min_green.eevalue>gsi.forecast[i].eevalue) min_green=gsi.forecast[i];
            if(max_green.eevalue<gsi.forecast[i].eevalue) max_green=gsi.forecast[i];
        }
    }
    if(typeof process.env.IDX_current_gsi != "undefined") {
        console.log(process.env.DOMOTICZ_JSON_URL+"?type=command&param=udevice&idx="+process.env.IDX_current_gsi+"&nvalue=0&svalue="+current_gsi.eevalue);
        http_request.get(process.env.DOMOTICZ_JSON_URL+"?type=command&param=udevice&idx="+process.env.IDX_current_gsi+"&nvalue=0&svalue="+current_gsi.eevalue,function(a,b,c) {
        });
      }
    if(typeof process.env.IDX_current_alert != "undefined") {
        let alert_level = 1;
        if(current_gsi.eevalue<80) alert_level=2;
        if(current_gsi.eevalue<40) alert_level=3;
        if(current_gsi.eevalue<20) alert_level=4;

        http_request.get(process.env.DOMOTICZ_JSON_URL+"?type=command&param=udevice&idx="+process.env.IDX_current_alert+"&nvalue="+alert_level+"&svalue="+current_gsi.eevalue+escape(" ab ")+escape(new Date(current_gsi.timeStamp).toLocaleString()),function(a,b,c) {
        })
    }
    if(typeof process.env.IDX_green_alert != "undefined") {
        http_request.get(process.env.DOMOTICZ_JSON_URL+"?type=command&param=udevice&idx="+process.env.IDX_green_alert+"&nvalue=1&svalue="+new Date(max_green.timeStamp).toLocaleString()+" "+max_green.eevalue+"",function(a,b,c) {
        })
    }
    if(typeof process.env.IDX_red_alert != "undefined") {
        http_request.get(process.env.DOMOTICZ_JSON_URL+"?type=command&param=udevice&idx="+process.env.IDX_red_alert+"&nvalue=4&svalue="+new Date(min_green.timeStamp).toLocaleString()+" "+min_green.eevalue+"",function(a,b,c) {
        })
    }    
  }
});
