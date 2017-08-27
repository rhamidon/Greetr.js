(function (global, $) {
	var Greetr = function (firstName, lastName, language) {
		return new Greetr.init(firstName, lastName, language);
	}

	var supportedLangs = ['en', 'es'];

	var greeting = {
		en: 'Hello',
		es: 'Hola'
	};

	var formalGreeting = {
		en: 'Greetings',
		es: 'Saludos'
	};

	var logMessages = {
		en: 'Logged in',
		es: 'Incio sesion'
	};

	Greetr.prototype = {
		fullName: function () {
			return this.firstName + ' ' + this.lastName;
		},
		validate : function () {
			if(supportedLangs.indexOf(this.language) === -1){
				throw "Invalid language";
			}
		},
		greeting: function () {
			return greeting[this.language] + ' ' + this.firstName + '!';
		},

		formalGreeting: function () {
			return formalGreeting[this.language] + ', ' + this.fullName();
		},
		greet: function (formal) {
			var msg;
			//if undefined or null it will be coerced to 'false'
			if(formal){
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}

			if(console){
				console.log(msg);
			}
			//'this' refers to the calling object at execution time
			//makes the method chainable
			return this;
		},
		log: function () {
			if(console){
				console.log(logMessages[this.language + ':' + this.fullName()]);
			}
			return this;
		},
		setLang: function (lang) {
			this.language = lang;
			this.validate();
			return this;
		},
		HTMLGreeting: function (selector, formal) {
			if(!$){
				throw 'jQuery not loaded'
			}
			if(!selector){
				throw 'Missing jQuery selector'
			}

			var mg;
			if(formal){
				mg = this.formalGreeting();
			} else {
				mg = this.greeting();
			}

			$(selector).html(mg);
			return this;
		}
	};


	//Actual object is created here, allowing us to 'new' an object without calling 'new'
	Greetr.init = function (firstName, lastName, language) {
		var self = this;
		self.firstName = firstName || '';
		self.lastName = lastName || '';
		self.language = language || 'en';
		self.validate();
	}

	//no need to use 'new', like in jQuery
	Greetr.init.prototype = Greetr.prototype;
	//attach our Greetr to the global object, and provide a shorthand '$G' for ease of access
	global.Greetr = global.G$ = Greetr;
}(window, jQuery));