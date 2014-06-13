var NESSUS = NESSUS || {};


NESSUS.Config = Backbone.Model.extend({});
NESSUS.Configs = Backbone.Collection.extend({
  model: NESSUS.Config
});

//Collection of Configs
NESSUS.configurations = new NESSUS.Configs();

//bind listener on collection so that every time a model is added it gets rendered
NESSUS.configurations.on("add", function(model, collection){
 var views = new NESSUS.ConfigView({ model: model });
});

NESSUS.ConfigView = Backbone.View.extend({
  el: '#configurations',
  initialize: function() {
    this.render();
  },
  render: function () {
    var variables = this.model.toJSON();
    //Compile the underscore template:
    var template = _.template( $( "#config-template" ).html(), variables );

    //load the compiled HTML
    this.$el.append( template );
  }
});


NESSUS.createModels = function(json) {
  var jsonp = json.configurations;
  var totalConfigs = jsonp.length;

  for (var i = 0; i < totalConfigs; i++){
    var data = jsonp[i];
    var configuration = new NESSUS.Config({ //create new model
            name : data.name,
            hostname : data.hostname,
            port : data.port,
            username : data.username
          });

    //add new model to configurations collection
    //this will also trigger the add prototype method and render this immediately
    NESSUS.configurations.add(configuration);
  } // //for totalConfigs
}// //createModels



NESSUS.loadconfigs = function(configNumber) {
    NESSUS.clearConfigurations();
    //hide the form - show the spinner
    $("form.configs input, form.configs button").hide();
    $(".loading").show();


    $.ajax({
        url: 'request.php?host=' + configNumber,
        type: 'POST',
        dataType: 'json',
        data: {},
        success: function(json) {
            NESSUS.createModels(json);

            //show the form - hide the spinner
            $("form.configs input, form.configs button").show();
            $(".loading").hide();
        } 
    });
};


NESSUS.clearConfigurations = function() {
    $("#configurations").empty();
}

$(function(){
    $(".load-configs").on("click", function(e){
        e.preventDefault();
        var numberInput = $("#numberOfConfigs");
        var numberOfConfigs = $(numberInput).val();
        
        NESSUS.loadconfigs(numberOfConfigs);
        if (numberOfConfigs >= 100) {
            $("#lots-of-records").show();
        } else {
            $("#lots-of-records").hide();
        }
        
    });

    
});