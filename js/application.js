window.Search = Ember.Application.create({
	LOG_TRANSITIONS: true
});

Search.Adapter = {
	ajax: function(searchParam) {
		var options = {
			type: 'POST',
			dataType: 'json',
			data: searchParam
		};
		return ic.ajax.request("testapi.txt", options);
	}
};
