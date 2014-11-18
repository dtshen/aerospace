Search.SearchpageController = Ember.ObjectController.extend({

	country: [
		{id: "" , name: "ALL COUNTRIES" },
		{id: "AB" , name: "ARAB SATELLITE COMMUNICATIONS ORGANIZATION" },
		{id: "AC" , name: "ASIASAT CORP" },
		{id: "ALG" , name: "ALGERIA" },
		{id: "ARGN" , name: "ARGENTINA" },
		{id: "ASRA" , name: "AUSTRIA" },
		{id: "AUS" , name: "AUSTRALIA" },
		{id: "AZER" , name: "AZERBAIJAN" },
		{id: "BEL" , name: "BELGIUM" },
		{id: "BELA" , name: "BELARUS" },
		{id: "BOL" , name: "BOLIVIA" },
		{id: "BRAZ" , name: "BRAZIL" },
		{id: "CA" , name: "CANADA" },
		{id: "CHBZ" , name: "PEOPLES REPUBLIC OF CHINA/BRAZIL" },
		{id: "CHLE" , name: "CHILE" },
		{id: "CIS" , name: "COMMONWEALTH OF INDEPENDENT STATES." },
		{id: "COL" , name: "COLOMBIA" },
		{id: "CZCH" , name: "CZECHOSLOVAKIA" },
		{id: "DEN" , name: "DENMARK" },
		{id: "ECU" , name: "ECUADOR" },
		{id: "EGYP" , name: "EGYPT" },
		{id: "ESA" , name: "EUROPEAN SPACE AGENCY" },
		{id: "ESRO" , name: "EUROPEAN SPACE RESEARCH ORGANIZATION" },
		{id: "EST" , name: "ESTONIA" },
		{id: "EUME" , name: "EUROPEAN ORGANIZATION FOR THE EXPLOITATION OF METEOROLOGICAL SATELLITES" },
		{id: "EUTE" , name: "EUROPEAN TELECOMMUNICATIONS SATELLITE ORGANIZATION (EUTELSAT)" },
		{id: "FGER" , name: "FRANCE/GERMANY" },
		{id: "FR" , name: "FRANCE" },
		{id: "FRIT" , name: "FRANCE/ITALY" },
		{id: "GER" , name: "GERMANY" },
		{id: "GLOB" , name: "GLOBALSTAR" },
		{id: "GREC" , name: "GREECE" },
		{id: "HUN" , name: "HUNGARY" },
		{id: "IM" , name: "INTERNATIONAL MARITIME SATELLITE ORGANIZATION (INMARSAT)" },
		{id: "IND" , name: "INDIA" },
		{id: "INDO" , name: "INDONESIA" },
		{id: "IRAN" , name: "IRAN" },
		{id: "IRAQ" , name: "IRAQ" },
		{id: "IRID" , name: "IRIDIUM" },
		{id: "ISRA" , name: "ISRAEL" },
		{id: "ISS" , name: "INTERNATIONAL SPACE STATION" },
		{id: "IT" , name: "ITALY" },
		{id: "ITSO" , name: "INTERNATIONAL TELECOMMUNICATIONS SATELLITE ORGANIZATION (INTELSAT)" },
		{id: "JPN" , name: "JAPAN" },
		{id: "KAZ" , name: "KAZAKHSTAN" },
		{id: "LTU" , name: "LITHUANIA" },
		{id: "LUXE" , name: "LUXEMBOURG" },
		{id: "MALA" , name: "MALAYSIA" },
		{id: "MEX" , name: "MEXICO" },
		{id: "NATO" , name: "NORTH ATLANTIC TREATY ORGANIZATION" },
		{id: "NETH" , name: "NETHERLANDS" },
		{id: "NICO" , name: "NEW ICO" },
		{id: "NIG" , name: "NIGERIA" },
		{id: "NKOR" , name: "NORTH KOREA" },
		{id: "NOR" , name: "NORWAY" },
		{id: "O3B" , name: "O3B NETWORKS" },
		{id: "ORB" , name: "ORBITAL TELECOMMUNICATIONS SATELLITE (GLOBALSTAR)" },
		{id: "PAKI" , name: "PAKISTAN" },
		{id: "PER" , name: "PERU" },
		{id: "POL" , name: "POLAND" },
		{id: "POR" , name: "PORTUGAL" },
		{id: "PRC" , name: "PEOPLES REPUBLIC OF CHINA" },
		{id: "RASC" , name: "REGIONAL AFRICAN SATELLITE COMMUNICATIONS ORG" },
		{id: "ROC" , name: "REPUBLIC OF CHINA (TAIWAN)" },
		{id: "ROM" , name: "ROMANIA" },
		{id: "RP" , name: "REPUBLIC OF PHILIPPINES" },
		{id: "SAFR" , name: "SOUTH AFRICA" },
		{id: "SAUD" , name: "SAUDI ARABIA" },
		{id: "SEAL" , name: "SEA LAUNCH DEMO" },
		{id: "SES" , name: "SOCIÉTÉ EUROPÉENNE DES SATELLITES" },
		{id: "SING" , name: "SINGAPORE" },
		{id: "SKOR" , name: "SOUTH KOREA" },
		{id: "SPN" , name: "SPAIN" },
		{id: "STCT" , name: "SINGAPORE/TAIWAN" },
		{id: "SWED" , name: "SWEDEN" },
		{id: "SWTZ" , name: "SWITZERLAND" },
		{id: "THAI" , name: "THAILAND" },
		{id: "TURK" , name: "TURKEY" },
		{id: "UAE" , name: "UNITED ARAB EMIRATES" },
		{id: "UK" , name: "UNITED KINGDOM" },
		{id: "UKR" , name: "UKRAINE" },
		{id: "URY" , name: "URUGUAY" },
		{id: "US" , name: "UNITED STATES OF AMERICA" },
		{id: "USBZ" , name: "UNITED STATES/BRAZIL" },
		{id: "VENZ" , name: "VENEZUELA" },
		{id: "VTNM" , name: "VIETNAM" }	],

	actions: {
		submit: function () {
			this.set('loading', true);
			$("#spinner").show();
			// Restrict max limit here
			var limit;
			if (this.get('limit') == '' || parseInt(this.get('limit')) > 50)
				limit = "50";
			else limit = this.get('limit');

			// Setup search parameters for Satcat and Decay
			var searchParamSatcat = {
				action: "query",
				class: "satcat",
				controller: "basicspacedata",
				limit: limit,
				predicates:{
					SATNAME: this.get('name'),
					COUNTRY: this.get('selectedCountry')
				}
			};

			this.set('satcat', []);

			// Post search parameters to API to get raw data
			// Adapter uses library ic-ajax here, which retuns a promise rather than raw data
			var controller = this;
			Search.Adapter.ajax(searchParamSatcat).then(function(satcatData) {
				// Construct ID list to fetch TLE data
				var idList = "";
				for (var i=0; i<satcatData.length; i++) {
					idList += satcatData[i].OBJECT_ID;
					if (i != satcatData.length-1)
						idList += ",";
				}
				// Query TLE data for each object
				var searchParamTLE = {
					action: "query",
					class: "tle_latest",
					controller: "basicspacedata",
					predicates:{
						OBJECT_ID: idList
					}
				};
				Search.Adapter.ajax(searchParamTLE).then(function(tleData) {
					// Use global to store data
					Search.Satcat = satcatData;
					Search.TLE = tleData;
					// Hide load spinner
					controller.set('loading', false);
					Search.reset();
					$('#spinner').hide();
				})
			});
		}
	}
});

Search.SearchpageTableController = Ember.ObjectController.extend({
});
