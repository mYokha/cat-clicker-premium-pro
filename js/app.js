$(function(){
	///////////////////////   MODEL   ///////////////////////
    var model = {
    	currentCat: null,
    	adminMode: false,
    	cats: [
    		 {
	        	name: "Betty",
	        	clickCount: 0,
	        	imgURL: "img/cat1.jpg"  
	        },
	        {
	        	name: "Oscar",
	        	clickCount: 0,
	        	imgURL: "img/cat2.jpg"  
	        },
	        {
	        	name: "Toby",
	        	clickCount: 0,
	        	imgURL: "img/cat3.jpg"  
	        },
	        {
	        	name: "Nico",
	        	clickCount: 0,
	        	imgURL: "img/cat4.jpg"  
	        },
	        {
	        	name: "Dude",
	        	clickCount: 0,
	        	imgURL: "img/cat5.jpg"  
	        }
    	]
    };
    
    ///////////////////////   CONTROLLER    ///////////////////////
    var octopus = {
    	init: function () {
    		model.currentCat = model.cats[0];

    		catListView.init();
    		adminPanelView.init();
    		catView.init();
    	},

    	getCats: function () {
    		return model.cats;
    	},

    	setCurrentCat: function (cat){
    		model.currentCat = cat;
    	},

    	getCurrentCat: function () {
    		return model.currentCat;
    	},

    	scoreIncrement: function (currCat){
    		model.currentCat.clickCount++;
    		catView.render();
    	},

    	adminModeSwitch: function () {
    		if (model.adminMode === true){
    			model.adminMode = false;
    		} else {
    			model.adminMode = true;
    		}
    		adminPanelView.render();
    	},

    	getAdminMode: function () {
    		return model.adminMode;
    	}
    };

///////////////////////   VIEWS    ///////////////////////
	var catListView = {
    	init: function () {
    		this.$listOfCats = $('#list-of-cats');
			this.render();
    	},
    	render: function () {
    		var catObjects = octopus.getCats();
    		var cat;
    		for (var i = 0; i < catObjects.length; i++){
    			cat = catObjects[i];
    			this.$listOfCats.append('<li class="cat' + i + '">' + 
    				cat.name + '</li>');
    			$('.cat'+ i).click((function(catCopy){
    				return function () {
	    				octopus.setCurrentCat(catCopy);
                    	catView.render();
    				}
    			})(cat));
    		}
    	}
    };

    var adminPanelView = {
    	init: function () {

    		this.$adminButton = $("#admin-button");
    		//this.$cancelButton = $("#cancel-button");
    		this.$saveButton = $("#save-button");
    		this.$adminForm = $("#admin-form");
    		this.$nameField = $("#adm-name-input");
    		this.$imgURLField = $("#adm-url-input");
    		this.$clicksField = $("#adm-clicks-input");

    		this.$adminButton.click(function () {
    			octopus.adminModeSwitch();
    		});
    		this.$saveButton.click((function(nameField, clicksField){
    			return function () {
	    			var cat = octopus.getCurrentCat();
	    			var nameValue = nameField.val();
	    			var clicksValue = clicksField.val();

	    			function isNumber(n) {
	    				return !isNaN(parseFloat(n)) && isFinite(n);
	    			};

	    			if (nameValue !== '') {
	    				cat.name = nameValue;
	    			} else {
	    				cat.name = cat.name;
	    			}

	    			if (clicksValue !== '' && isNumber(clicksValue)) {
	    				cat.clickCount = clicksValue;
	    			} else {
	    				cat.clickCount = cat.clickCount;
	    			}

	    			octopus.setCurrentCat(cat);

	    			nameField.val('');
	    			clicksField.val('');

	    			for(var i = 0; i < octopus.getCats().length; i++){
	    				if () {}
	    			}

	    			catView.render();
    			}
    		})(this.$nameField, this.$clicksField));

    		this.render();
    	},

    	render: function () {
    		if (octopus.getAdminMode() === true){
    			this.$adminForm.show();
    		} else {
    			this.$adminForm.hide();
    		};
    	}
    };

    var catView = {
    	init: function () {
    		this.$catImage = $('img');
    		this.$scoreElem = $('#score');
    		this.$nameElem = $('figcaption');

    		this.$catImage.click(function () {
    			octopus.scoreIncrement();
    		});

			this.render();
    	},

    	render: function () {
    		var currentCat = octopus.getCurrentCat();
    		this.$catImage.attr('src', currentCat.imgURL);
    		this.$nameElem.text(currentCat.name);
    		this.$scoreElem.text(currentCat.clickCount);

    		adminPanelView.$nameField.attr('placeholder', currentCat.name);
    		adminPanelView.$imgURLField.attr('placeholder', currentCat.imgURL);
    		adminPanelView.$clicksField.attr('placeholder', currentCat.clickCount);
    	}
    };

    //run it!!!
    octopus.init();
});