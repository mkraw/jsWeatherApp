$( document ).ready(function() {
      
    
    
    
    if (navigator.geolocation){
       
       
        navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
        navigator.geolocation.getCurrentPosition(function(position){
            
        

            
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        
        //$("#geoloc").html("latitude: " + position.coords.latitude + "<br>longitude: "+ position.coords.longitude);//
        
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +lat +"," + long + "&key=AIzaSyBU7PaLmxh7GaX3UmUlubgght4Hy5mEJy0";
        
        var city= "";
        
        $.getJSON(url, function(_location) {
         city = _location.results[2].address_components[0].long_name ;
       $("#location").html(city); 
        
        });
        
        var pictureUrl;
        var picture = function(cloudiness) {
            if(cloudiness >= 70) {
              pictureUrl = '"cloud.svg"' ;
               
               }
             else if(cloudiness>30 && cloudiness<70) {
             pictureUrl = '"Cloud-Sun.svg"';
             }
        else {
        pictureUrl = '"Sun.svg"';
        }
        return pictureUrl;
        
        };
        

    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat="+ lat+"&lon="+ long +"&APPID=ef3509ee792da09a9c9655ba76a3810a";
        
        

        $.getJSON(weatherUrl, function(weathr) {
             $("#geoloc").html('<h3 id="greeting">Today\'s weather:');
        var minTemp= weathr.main.temp_min.toFixed(2);
        minTemp-=273.15;
        var maxTemp= weathr.main.temp_max.toFixed(2);
        maxTemp-=273.15;
         
            
        $("#mintemp").html("<p>Min Temperature: <br> "+minTemp +"&deg;C</p>");   
        $("#maxtemp").html('<p> Max Temperature: <br>'+maxTemp +'&deg;C</p>');
        var cloudperc= weathr.clouds.all;
        
        $("#clouds").html('<p>Cloudiness: <br>'+cloudperc +'%' +'</p>'); 
        
        var raincondition = weathr.weather[0].description.toUpperCase();   
            
        $("#rain").html('<p>Rain condition:<br><img src="http://openweathermap.org/img/w/' +weathr.weather[0].icon +'.png"><br>' +raincondition +'</p>');   
            
        $("#picturebox").html('<img class="img- responsive center-block wimg" src='+ picture(cloudperc)+ '>');
        
        
        }).fail(function(){
       
        
        $(".weatherBox").append('<div class="alert alert-danger" id="errormsg"><strong>Oh snap!</strong>Allow access to your current location or enter your location manualy!</div>');    
        
        
        });
           $("#searchbtn").click(function(){
               $("#errormsg").hide();
               
               
           var newLocation = $("#newloc").val();
           var cityUrl = "http://api.openweathermap.org/data/2.5/weather?q=" +newLocation +"&APPID=ef3509ee792da09a9c9655ba76a3810a"; 
              $.getJSON(cityUrl, function(newWeather){
           
        $("#geoloc").html('<h3 id="greeting">Today\'s weather in '+ newLocation + ':');
         var minTemp2= newWeather.main.temp_min.toFixed(2);
        minTemp2-=273.15;
        var maxTemp2= newWeather.main.temp_max.toFixed(2);
        maxTemp2-=273.15;          
        $("#mintemp").html("<p>Min Temperature: <br> "+minTemp2 +"&deg;C</p>");   
        $("#maxtemp").html('<p> Max Temperature: <br>'+maxTemp2 +'&deg;C</p>');
        var cloud2 = newWeather.clouds.all;     
        $("#clouds").html('<p>Cloudiness: <br>'+cloud2 +'%' +'</p>'); 
        
        var raincondition = newWeather.weather[0].description.toUpperCase();   
            
        $("#rain").html('<p>Rain condition:<br><img src="http://openweathermap.org/img/w/' +newWeather.weather[0].icon +'.png"><br>' +raincondition +'</p>');   
        //picture(cloud2);   
                  
         $("#picturebox").html('<img class="img- responsive center-block wimg" src='+ picture(cloud2)+ '>');
                  
           });
        
        
        
    }); 
        
    
          
           
       
       }, function(e){
        
        $("#weatherBox").html('<div class="alert alert-danger"><strong>Oh snap!</strong>Allow access to your current location or enter your location manualy!</div>');    
        
        }, {
        enableHighAccuracy: true
        
        });
        
        
    }
    
    
    
});