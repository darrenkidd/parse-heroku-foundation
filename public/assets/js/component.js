angular.module("ngSegment",[]),angular.module("ngSegment").constant("segmentDefaultConfig",{apiKey:null,autoload:!0,loadDelay:0,condition:null,debug:!1,methods:["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"],tag:"[ngSegment] "}),function(a){function b(a){this.hasLoaded=a||!1,this.load=function(a,b){if(window.analytics.initialized&&console.warn("Warning: Segment analytics has already been initialized. Did you already load the library?"),this.hasLoaded)throw new Error("Attempting to load Segment twice.");if(!a)throw new Error("Cannot load Analytics.js without an API key.");this.hasLoaded=!0,window.setTimeout(function(){var b=document.createElement("script");b.type="text/javascript",b.async=!0,b.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+a+"/analytics.min.js",b.onerror=function(){console.error("Error loading Segment library.")};var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)},b)}}function c(){b.call(this),this.$get=function(){return new b(this.hasLoaded)}}a.provider("segmentLoader",c)}(angular.module("ngSegment")),function(a){function b(a){this.config=a,this.factory=function(a){var b=this;return function(){return b.config.condition&&!b.config.condition(a,arguments)?void b.debug("Not calling method, condition returned false.",{method:a,arguments:arguments}):(b.debug("Calling method "+a+" with arguments:",arguments),window.analytics[a].apply(d,arguments))}}}function c(a){this.config=angular.copy(a),this.queue=[],this.factory=function(a){var b=this.queue;return function(){b.push({method:a,arguments:arguments})}},this.init(),this.setKey=function(a){return this.config.apiKey=a,this.validate("apiKey"),this},this.setLoadDelay=function(a){return this.config.loadDelay=a,this.validate("loadDelay"),this},this.setCondition=function(a){return this.config.condition=a,this.validate("condition"),this},this.setEvents=function(a){return this.events=a,this},this.setConfig=function(a){if(!angular.isObject(a))throw new Error(this.config.tag+"Config must be an object.");angular.extend(this.config,a);var b=this;return Object.keys(a).forEach(function(a){b.validate(a)}),this},this.setAutoload=function(a){return this.config.autoload=!!a,this},this.setDebug=function(a){return this.config.debug=!!a,this};var c={apiKey:function(a){if(!angular.isString(a.apiKey)||!a.apiKey)throw new Error(a.tag+"API key must be a valid string.")},loadDelay:function(a){if(!angular.isNumber(a.loadDelay))throw new Error(a.tag+"Load delay must be a number.")},condition:function(a){if(!(angular.isFunction(a.condition)||angular.isArray(a.condition)&&angular.isFunction(a.condition[a.condition.length-1])))throw new Error(a.tag+"Condition callback must be a function or array.")}};this.validate=function(a){"function"==typeof c[a]&&c[a](this.config)},this.createService=function(a,c){if(a.has("segmentConfig")){var d=a.get("segmentConfig");if(!angular.isObject(d))throw new Error(this.config.tag+"Config constant must be an object.");angular.extend(this.config,d),this.debug("Found segment config constant");var e=this;Object.keys(d).forEach(function(a){e.validate(a)})}if(this.config.autoload&&(this.debug("Autoloading Analytics.js"),this.config.apiKey?c.load(this.config.apiKey,this.config.loadDelay):this.debug(this.config.tag+" Warning: API key is not set and autoload is not disabled.")),"function"==typeof this.config.condition||"array"==typeof this.config.condition&&"function"==typeof this.config.condition[this.config.condition-1]){var f=this.config.condition;this.config.condition=function(b,c){return a.invoke(f,f,{method:b,params:c})}}var g=new b(angular.copy(this.config));return this.events&&(g.events=angular.copy(this.events)),g.init(),this.queue.forEach(function(a){g[a.method].apply(g,a.arguments)}),g},this.$get=["$injector","segmentLoader",this.createService]}var d=window.analytics=window.analytics||[];d.invoked?console.error("Segment or ngSegment included twice."):d.invoked=!0,d.factory=function(a){return function(){var b=Array.prototype.slice.call(arguments);return b.unshift(a),d.push(b),d}},b.prototype={init:function(){for(var a=0;a<this.config.methods.length;a++){var b=this.config.methods[a];d[b]||(d[b]=d.factory(b)),this[b]=this.factory(b)}},debug:function(){return this.config.debug?(arguments[0]=this.config.tag+arguments[0],console.log.apply(console,arguments),!0):void 0}},c.prototype=Object.create(b.prototype),a.provider("segment",["segmentDefaultConfig",c])}(angular.module("ngSegment"));