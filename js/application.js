window.Search = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_TRANSITIONS_INTERNAL: true
});

Search.Adapter = {
	ajax: function(searchParam) {
		var options = {
			type: 'POST',
			dataType: 'JSON',
			data: JSON.stringify(searchParam)
		};
		return ic.ajax.request("/json", options);
	}
};

// Initialize Global Data
Search.Satcat = [];
Search.Decay = [];
