Search.TableView = Ember.View.extend({
        didInsertElement: function() {
                console.log("Render data table");
                $("#satcat").text(JSON.stringify(Search.Satcat));
                $("#decay").text(JSON.stringify(Search.Decay));
        },
});
