// Initialize app
var myApp = new Framework7();
//var myApp = new Framework7 ({
 //           material: true
 //        });
   

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});



// Handle Cordova Device Ready Event


var empno = '';
var uuidglobe = '';
var locationlat = '';
var locationlon = '';
var locationerror = '';
var locationtime = '';
var globepage='';

document.addEventListener("deviceready", onDeviceReady, false);

//document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture); 

function onDeviceReady() {
   
   var uuid = device.uuid;
	var uuid2 = device.uuid;
	uuidglobe = uuid;

	AndroidFullScreen.immersiveMode(successFunction, errorFunction);


	function successFunction()
	{
		
	}

	function errorFunction(error)
	{
		
	}
	
	//watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError);//getCurrentPosition //watchPosition //not required at the app load 
	
	setglobalempno(uuid2);
	getempname(uuid);
	
	//setupPush();
		
				
    
}


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('viewdetail_universal', function (page) {
    // Do something here for "about" page

})


    


// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

	 if (page.name === 'viewdetail_universal') {
        // We need to get count GET parameter from URL (about.html?count=10)
        var viewname = page.query.viewname;
		var empnotemp=empno;
		var postval0 = page.query.val0;
        // Now we can generate some dummy list
		
		 var url = "http://124.43.160.52/npsales/phonegap-app/viewdetail_universal.php";
        $.getJSON(url,{viewname:viewname,empno:empnotemp,postval0:postval0}, function(result) {
            console.log(result);
             var display = result;
				// And insert generated list to page content
        $$(page.container).find('.page-content').append(display);
		$$(page.container).find('.gradientnavbar').height("5%");
				
				 });
       
        getLocationUpdate();//only when geo location info is required on this page
    }
	
	if (page.name === 'gatherdata_universal') {
		var viewname = page.query.viewname;
		var empnotemp=empno;
		var postval0 = page.query.val0;
		var morevar='';
		
		//if want geo location info
		//if(viewname === "sitecleaningimage") getLocationUpdate();//only when geo location info is required on this page
		//if(viewname.substring(0, 14) === "markattendance") getLocationUpdate();//only when geo location info is required on this page
		
		if(viewname.substring(0, 14) === "markattendance") {
			getLocationUpdate_v2();//only when geo location info is required on this page
			
		}
		
		
	    // more variable to post
       // if(viewname === "sitecleaningimage") morevar=locationlon+"xxx"+locationlat+"xxx"+locationerror;
		
        
		//alert("test123");
		//return event
		if(viewname.substring(0, 14) === "markattendance" ) {
		
			
			for(var dd=0;dd<100;dd++) {
			
			if(locationlat!='') break;			
				
			setTimeout(function() {	}, 1000);
			}
			
		}
		
	
		if(viewname.substring(0, 14) === "markattendance" ) {
		
		if(locationlat=='') {
			
			alert("Error !!! \n\nPlease Check GPS in the Phone is Enabled.\n\nIf GPS is already enabled, Remove App History and Restart the App.")
			return;
		}
			
			
		}
		
		if(viewname.substring(0, 14) === "markattendance") morevar=locationlon+"xxx"+locationlat+"xxx"+locationerror;
		
		
		
		var url = "http://124.43.160.52/npsales/phonegap-app/gatherdata_universal.php";
        $.getJSON(url,{viewname:viewname,empno:empnotemp,morevar:morevar,postval0:postval0}, function(result) {
            console.log(result);
             var display = result;
				// And insert generated list to page content
        $$(page.container).find('.page-content').append(display);
				
				 });
				 
		
		
		
	
    }
	
	if (page.name === 'index') { // added other wise double back wont load the home page
        
	if(uuidglobe!='')
	getempname(uuidglobe);
    }
	
	
    
	
	if (page.name === 'dummy') {
       
	navigator.geolocation.clearWatch(watchID);
		
    }


})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="home"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})



// swipe back event
$$(document).on('pageAfterBack', function (e) { 
 
	//stop geo location update
	//navigator.geolocation.clearWatch(watchID);//skipped this to avoid error msg in going to the page repeattedly
	//delete geo values
	
	locationtimenow=Date.now();	
	if(locationtimenow-locationtime < 30000) {
	
	} else {
	locationlat = '';
    locationlon = '';
    locationerror = '';	
	}
 
 });
/////////////////////////////////////////////////////////////////////////////////////////////

//opening pages on browser
function openurl(page){

//top.window.location.href= page;

		//var page='new_viewsite.php?modalwin=modal_win_site_detail.php?siteid=';
		var uuid = uuidglobe;
        var ref = window.open('http://124.43.160.52/npsales/login-execapp.php?uuid='+uuid+'&page='+page, '_system', 'location=no'); 

}

// opening pages on app itself
function openurl2old(page){

//top.window.location.href= page;

		//var page='new_viewsite.php?modalwin=modal_win_site_detail.php?siteid=';
		var uuid = uuidglobe;
        var ref = window.open('http://124.43.160.52/npsales/login-execapp.php?uuid='+uuid+'&page='+page, '_blank', 'hidenavigationbuttons=yes,hideurlbar=yes,zoom=no');//location=yes,zoom=no,hardwareback=no,footer=yes,hidenavigationbuttons=yes,hideurlbar=yes 

}


// opening pages on app itself
function openurl2(page){

//top.window.location.href= page;

		//var page='new_viewsite.php?modalwin=modal_win_site_detail.php?siteid=';
		var uuid = uuidglobe;
        var ref = cordova.InAppBrowser.open('http://124.43.160.52/npsales/login-execapp.php?uuid='+uuid+'&page='+page, '_blank', 'location=no,zoom=no,hardwareback=no');//location=yes,zoom=no,hardwareback=no,footer=yes,hidenavigationbuttons=yes,hideurlbar=yes 

		
		ref.addEventListener('loadstart', function(e) {
		  var url = e.url;
		
		  var extension = url.substr(url.length - 11);
		 
		  if (extension == 'openurl2mod') {
			var args = url.substr(0,url.length - 11).replace("http://124.43.160.52/npsales/", "").replace(/&/g, "xxx");
			
			ref.close(); // close window or you get exception
			document.addEventListener('deviceready', function () {
			  setTimeout(function() {
				openurl2mod(args); // call the function which will download the file 1s after the window is closed, just in case..
			  }, 10);
			});
		  }
		});
		
		/* //close the inapp window with the call from the web page//set window.shouldClose=true; at the web page	
		ref.addEventListener( "loadstop", function(){
			   var loop = window.setInterval(function(){
				   ref.executeScript({
						   code: "window.shouldClose"
					   },
					   function(values){
						   if(values[0]){
							 ref.close();
							 window.clearInterval(loop);
						   }
					   }
				   );
			   },100);
		   }); */
	
		
}


// opening pages on app itself
function openurl2mod(page){


var target = "_system";
var options = "location=yes,hidden=no,enableViewportScale=yes,toolbar=no,hardwareback=yes";



		var uuid = uuidglobe;
        var ref = cordova.InAppBrowser.open('http://124.43.160.52/npsales/login-execapp.php?uuid='+uuid+'&page='+page, target, options);//location=yes,zoom=no,hardwareback=no,footer=yes,hidenavigationbuttons=yes,hideurlbar=yes 

		
		
}

function openurl2mod2(page){


var target = "_system";
var options = "location=yes,hidden=no,enableViewportScale=yes,toolbar=no,hardwareback=yes";



		var uuid = uuidglobe;
        var ref = cordova.InAppBrowser.open(page, target, options);//location=yes,zoom=no,hardwareback=no,footer=yes,hidenavigationbuttons=yes,hideurlbar=yes 

		
		
}



// opening pages on app itself
function openurl2gps(page,latlong){

			
			
		var uuid = uuidglobe;
        var ref = cordova.InAppBrowser.open('http://124.43.160.52/npsales/login-execapp.php?uuid='+uuid+'&page='+page+'&latlong='+latlong, '_blank', 'location=no,zoom=no,hardwareback=no');//location=yes,zoom=no,hardwareback=no,footer=yes,hidenavigationbuttons=yes,hideurlbar=yes 

		/* //close the inapp window with the call from the web page//set window.shouldClose=true; at the web page	
		ref.addEventListener( "loadstop", function(){
			   var loop = window.setInterval(function(){
				   ref.executeScript({
						   code: "window.shouldClose"
					   },
					   function(values){
						   if(values[0]){
							 ref.close();
							 window.clearInterval(loop);
						   }
					   }
				   );
			   },100);
		   }); */
		
		
}

function openurlgooglemap(page){

//top.window.location.href= page;

		//var page='new_viewsite.php?modalwin=modal_win_site_detail.php?siteid=';
		var uuid = uuidglobe;
        var ref = window.open(page, '_system', 'location=no'); 

}

///////////////////////location on google map
function getLocationUpdatemapandopenurl(page,itag){
	
	globepage=page;
	
	if(navigator.geolocation){
               // timeout at 60000 milliseconds (60 seconds)
               var options = {enableHighAccuracy: true,  maximumAge: 30000,  timeout: 27000};
               
			   if(document.getElementById('para1'+itag)) document.getElementById('para1'+itag).style.display='none';
			   if(document.getElementById('para2'+itag)) document.getElementById('para2'+itag).style.display='table-cell';
			   
               watchID = navigator.geolocation.watchPosition(function(position){
				showLocationmapandopenurl(position,itag);
				}, errorHandlermapandopenurl, options);
			
			
			
            }
            
            else{
               alert("Sorry, browser does not support geolocation!");
            }
         }

 function showLocationmapandopenurl(position,itag) {
            //var latitude = position.coords.latitude;
            //var longitude = position.coords.longitude;
			var locationlatold=locationlat;
			var locationlonold=locationlon;
			locationlat= position.coords.latitude;
			locationlon= position.coords.longitude;	
			locationerror= position.coords.accuracy;
				
			//Google Maps
			/* if(document.getElementById('index'))
			document.getElementById('index').innerHTML="<div id=\"map-canvas\" style=\"width:100%;height:300px; \" >Map is Loading...</div>";
		 */
			/* if(document.getElementById('map-canvas') && locationerror > 10) {
				alert("Latitude : " + locationlat + " Longitude: " + locationlon + " locationerror: " + locationerror);
			var myLatlng = new google.maps.LatLng(locationlat,locationlon);
			var mapOptions = {zoom: 15,center: myLatlng}
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			var marker = new google.maps.Marker({position: myLatlng,map: map});
			} else  {			
			alert("Latitude : " + locationlat + " Longitude: " + locationlon + " locationerror: " + locationerror);
			openurl2(globepage);

			
			} */
			
			if(document.getElementById('jasonhiddenvariable0')) var jasonhiddenvariable0 = document.getElementById('jasonhiddenvariable0').innerHTML;
			else var jasonhiddenvariable0=500;
			
			
			if(+locationerror > +jasonhiddenvariable0) {
				alert("Your location info is not accurate.You will be directed to Google MAP.Please tune the location and Try Again.\n\n" +"Latitude : " + locationlat + " Longitude: " + locationlon + " locationerror: " + locationerror );
				navigator.geolocation.clearWatch(watchID);
				openurlgooglemap("https://maps.google.com/?q="+locationlat+","+locationlon+"");
			} else  {			
			//alert("Latitude : " + locationlat + " Longitude: " + locationlon + " locationerror: " + locationerror);
			if(document.getElementById('para1'+itag)) document.getElementById('para1'+itag).style.display='table-cell';
			if(document.getElementById('para2'+itag)) document.getElementById('para2'+itag).style.display='none';
			
			var latlong="@" + locationlat + "@" + locationlon + "@" + locationerror;
			navigator.geolocation.clearWatch(watchID);
			openurl2gps(globepage,latlong);

			
			}
//           
         }
         
function errorHandlermapandopenurl(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }
         		 
///////location new version


function getLocationUpdate_v2() {
	
	
	
	if(navigator.geolocation){
               // timeout at 60000 milliseconds (60 seconds)
               var options = {enableHighAccuracy: true,  maximumAge: 30000,  timeout: 27000};
             
               watchID = navigator.geolocation.watchPosition(function(position){
				getLocationUpdate_v2_success(position);
				}, getLocationUpdate_v2_error, options);
			
			
			
            }
            
            else{
               alert("Sorry, browser does not support geolocation!");
            }
         }

 function getLocationUpdate_v2_success(position) {
            //var latitude = position.coords.latitude;
            //var longitude = position.coords.longitude;
			var locationlatold=locationlat;
			var locationlonold=locationlon;
			
			locationerror= position.coords.accuracy;
				
			
			
			if(document.getElementById('jasonhiddenvariable0')) var jasonhiddenvariable0 = document.getElementById('jasonhiddenvariable0').innerHTML;
			else var jasonhiddenvariable0=500;
			
			
			if(+locationerror > +jasonhiddenvariable0) {
				locationlat2= position.coords.latitude;
				locationlon2= position.coords.longitude;	
			
				alert("Your location info is not accurate.You will be directed to Google MAP.Please tune the location and Try Again.\n\n" +"Latitude : " + locationlat2 + " Longitude: " + locationlon2 + " locationerror: " + locationerror );
				navigator.geolocation.clearWatch(watchID);
				openurlgooglemap("https://maps.google.com/?q="+locationlat2+","+locationlon2+"");
			} else  {			
			
			locationlat= position.coords.latitude;
			locationlon= position.coords.longitude;	
			navigator.geolocation.clearWatch(watchID);
			
			}
//           
         }
         
function getLocationUpdate_v2_error(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }
  

// opening pages on app itself//have back button function normal and reload the page on window close
function openurl3(page){

//top.window.location.href= page;

		//var page='new_viewsite.php?modalwin=modal_win_site_detail.php?siteid=';
		var uuid = uuidglobe;
        var ref = cordova.InAppBrowser.open('http://124.43.160.52/npsales/login-execapp.php?uuid='+uuid+'&page='+page, '_blank', 'location=no,zoom=no,hardwareback=yes');//location=yes,zoom=no,hardwareback=no,footer=yes,hidenavigationbuttons=yes,hideurlbar=yes 

		//close the inapp window with the call from the web page//set window.shouldClose=true; at the web page	
		ref.addEventListener( "loadstop", function(){
			   var loop = window.setInterval(function(){
				   ref.executeScript({
						   code: "window.shouldClose"
					   },
					   function(values){
						   if(values[0]){
							 //ref.close();
							 ref = cordova.InAppBrowser.open('http://124.43.160.52/npsales/login-execapp.php?uuid='+uuid+'&page='+page, '_blank', 'location=no,zoom=no,hardwareback=yes');//location=yes,zoom=no,hardwareback=no,footer=yes,hidenavigationbuttons=yes,hideurlbar=yes 
							
							 window.clearInterval(loop);
						   }
					   }
				   );
			   },100);
		   });
		
		//ref.close();
}


function onSuccess(position) {
		locationlat= position.coords.latitude;
		locationlon= position.coords.longitude;	
		locationerror= position.coords.accuracy;	
		
     /*  var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                           '<hr />'      + element.innerHTML;  */ 
    }
	
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


	
function getempname(uuid) {	
		
        var url = "http://124.43.160.52/npsales/phonegap-app/json.php";
        $.getJSON(url,{uuid:uuid}, function(result) {
            console.log(result);
            var display = result;
			
		
			if(display=="newuuid"){
				document.getElementById("index").innerHTML = display;	
				//window.location.href= "login.html";
				
			} else {
				//window.location.href= "home.html";
				//document.getElementById("pendingcount").innerHTML = display;
				//alert(display);
				document.getElementById("index").innerHTML = display;
				setoverlaydiv(uuid);
				// document.getElementById("toolbardiv").innerHTML ="<a href=\"#\" onclick=\"openurl('main.php')\" class=\"link\"><i class = \"icon icon-form-url\"></i>System Home</a>";
			}
        });
    }
	
function setglobalempno(uuid2) {	
		
        var url = "http://124.43.160.52/npsales/phonegap-app/json.php";
        $.getJSON(url,{uuid2:uuid2}, function(result) {
            console.log(result);
                empno= result;
        });
    }

function setoverlaydiv(uuidoverlaydiv) {	
		
        var url = "http://124.43.160.52/npsales/phonegap-app/json.php";
        $.getJSON(url,{uuidoverlaydiv:uuidoverlaydiv}, function(result) {
            console.log(result);
                document.getElementById("overlaydiv").innerHTML = result;
        });
    }


//call from login page 	
function firstlogin() {
            var idlogin = $("#idlogin").val();
            var username = $("#username").val();
            var password2 = $("#password").val();
			var empnotemp = '';
			var uuid = uuidglobe;
			

			var dataString = "idlogin=" + idlogin + "&username=" + username + "&password=" + password2 + "&empno=" + empnotemp + "&uuid=" + uuid + "&updateloginuuid=";
            
			$.ajax({
                type: "POST",
                url: "http://124.43.160.52/npsales/phonegap-app/update.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function() {
                    $("#update").val('Connecting...');
                },
                success: function(data) {
                   
                        alert(data);
                        $("#update").val("Update");
						if (data.trim().substr(0, 11)=="Successfull") window.location.href="index.html";
                    
                }
            }); 

        }
		
//get watch position update when on demand		
function getLocationUpdate(){
	
	
	if(navigator.geolocation){
               // timeout at 60000 milliseconds (60 seconds)
               var options = {timeout:20000};//,maximumAge:10000,enableHighAccuracy:true
               //alert("test");
               watchID = navigator.geolocation.watchPosition(showLocation, errorHandler, options);
			
			//alert("test");
            }
            
            else{
               alert("Sorry, browser does not support geolocation!");
            }
         }

function showLocation(position) {
	//alert("testerror");
            //var latitude = position.coords.latitude;
            //var longitude = position.coords.longitude;
			locationlat= position.coords.latitude;
			locationlon= position.coords.longitude;	
			locationerror= position.coords.accuracy;
			locationtime=Date.now();	
			
            //alert("Latitude : " + locationlat + " Longitude: " + locationlon);
         }
         
function errorHandler(err) {
	
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }
         		 
////////////////


// camera take picture
function cameraTakePicture(imagecaption,thisid,sourceType) { 
	var imagecaption=imagecaption;//value passing from onclick button event
	var thisid=thisid;
	//alert(thisid));
	
	if(sourceType=="PHOTOLIBRARY") {
   navigator.camera.getPicture(onSuccess, onFail, {  
      quality: 75,
	  targetWidth: 712,
      targetHeight: 712,	  
      destinationType: Camera.DestinationType.FILE_URI,
	  sourceType : Camera.PictureSourceType.PHOTOLIBRARY ,
	  //sourceType: Camera.PictureSource.CAMERA, 
	  //popoverOptions : popover
   });  // if need to view the image data DATA_URL//FILE_URI
	} else {
	navigator.camera.getPicture(onSuccess, onFail, {  
      quality: 75,
	  targetWidth: 712,
      targetHeight: 712,	  
      destinationType: Camera.DestinationType.FILE_URI,
	  //sourceType : Camera.PictureSourceType.PHOTOLIBRARY ,
	  //sourceType: Camera.PictureSource.CAMERA, 
	  //popoverOptions : popover
   });  // if need to view the image data DATA_URL//FILE_URI	
		
		
	}
	
   function onSuccess(imageData) { 
      //load image to html img //not used as image load to canvas
	  /* var image = document.getElementById('myImage'); 
      image.src = imageData;//"data:image/jpeg;base64," +
	  image.style.display = "block"; */
	 
	//watermark
	var watermark;
	var canvasDom;
	var canvas;
	canvasDom = $("#myCanvas")[0];
    canvas = canvasDom.getContext("2d");
    //Create a watermark image object
    /* watermark = new Image();
    watermark.src = "icon.png";
	 */ //if logo to be inserted
	
	//canvas load is not required
	  /* var img = new Image();
        img.src=imageData;
        img.onload = function(e) {
            canvas.drawImage(img, 0, 0);
            //canvas.drawImage(watermark, 0, canvasDom.height - watermark.height);//to add logo
			canvas.fillStyle = '#fff';
			canvas.fillRect(0, 0, 100, 30);
			canvas.fillStyle = "black";
			canvas.font = "12px Calibri";
			canvas.fillText("My TEXT!", 5, 15);
        } */
	  
	  
	 // var dataURL = canvas.toDataURL(); 
	 // alert(imageData);
	 	  
	  //upload file
	  uploadFile(imageData,imagecaption,thisid,sourceType);
	  
	  
   }  
   
   function onFail(message) { 
      alert('Failed because: ' + message); 
   } 
   
    
}	

// file transfer
function uploadFile(imageData,imagecaption,thisid,sourceType) {
   var fileURL = imageData;
   var imagecaption=imagecaption;//value passing from onclick button event
   var siteid=document.getElementById("siteid").value;//document.getElementById("siteid").value;
   var morevar=locationlat+"xxx"+locationlon+"xxx"+locationerror+"xxx"+empno+"xxx"+siteid+"xxx"+imagecaption+"xxx"+sourceType;
   
	if(document.getElementById('id_of_element'))
	{
		alert('element exists!');
	}
   
   var uri = encodeURI("http://124.43.160.52/npsales/phonegap-app/fileupload.php?val0="+morevar);
   var options = new FileUploadOptions();
   options.chunkedMode = false,
   options.fileKey = "file";
   options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);//alert(options.fileName);
   options.mimeType = "image/jpg";
   
   var headers = {'headerParam':'headerValue'};
   options.headers = headers;
   var ft = new FileTransfer();
   ft.upload(fileURL, uri, onSuccessfileupload, onErrorfileupload, options);

   function onSuccessfileupload(r) {
	   alert(r.response);
		
		var str = r.response;
		var n = str.search("Successfull");
		
		if(n>0) {
		document.getElementById(thisid).classList.remove('color-red');
		document.getElementById(thisid).classList.add('color-green');
		}
      /* console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent); */
   }

   function onErrorfileupload(error) {
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
   }
	
}



//call from gather data universal to update form data to the tabels when onchange	
function updatetabelonchange(textcaption,thisid,thisvalue,saveto,type,barcodescan,multipleyes) {
	//$("#update").prop('disabled', true);
            var textcaption = textcaption;
            var thisid = thisid;
            var thisvalue = thisvalue;
			var username = empno;
			var saveto = saveto;
			var type = type;
			var siteid=document.getElementById("siteid").value;
			if(document.getElementById("siteid")) {
			var siteid=document.getElementById("siteid").value;
			}
			var morevar=locationlat+"xxx"+locationlon+"xxx"+locationerror;
			
			if(multipleyes=="multipleyes" && thisvalue!="") {
				var valuesa = "#"+$('#'+barcodescan).val()+"#";
				var values=valuesa.toString();
				thisvalue=values.replace(/,/g, "#");
				
			}
			
			thisvalue=thisvalue.replace(/&/g,"#and#"); 

			var dataString = "&username=" + username + "&textcaption=" + textcaption + "&thisvalue=" + thisvalue + "&thisid=" + thisid + "&siteid=" + siteid +  "&saveto=" + saveto +  "&type=" + type +  "&morevar=" + morevar + "&updatetabelonchange=";
            
			$.ajax({
                type: "POST",
                url: "http://124.43.160.52/npsales/phonegap-app/update.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function() {
                    $("#update").val('Connecting...');
                },
                success: function(data) {
                   
						var res = data.trim().substr(0, 12);
						var res2 = data.trim().substr(0, 100);
						var res3 = data.trim().substr(0, 14);
						var res4 = data.trim().substr(0, 8);
						
						
						if(res4=="Error!!!") alert(res2);
                        
                        $("#update").val("Submit");
						//$("#update").prop('disabled', false);
						
						if (res3=="Successfull!!!") {
							document.getElementById(thisid).classList.remove('bg-red');
							document.getElementById(thisid).classList.add('bg-green');
						

							//hide unhide items
							var hideitem = data.trim().substr(14, 500);
							var hideitemarray=hideitem.split("xxx");
							
							var hideitemarrayunhide=hideitemarray[0].split("###");
							var hideitemarrayhide=hideitemarray[1].split("###");
							
							for(var i2=0;i2<hideitemarrayhide.length;i2++) {
							tempval=hideitemarrayhide[i2];
							if(document.getElementById(tempval))	
							document.getElementById(tempval).style.display="none";
							}
							
							for(var i2=0;i2<hideitemarrayunhide.length;i2++) {
							tempval=hideitemarrayunhide[i2];
							if(document.getElementById(tempval))							
							document.getElementById(tempval).style.display="block";
							}
							//
							
							
							//dynamic dropdown creation
							var dynamicdropdown=hideitemarray[2].split("YYY");
														
							tempvalid=dynamicdropdown[0];
							
							if(tempvalid!="") {
								var select123=document.getElementById(tempvalid);
							
								while (select123.firstChild) {
									select123.removeChild(select123.firstChild);
								}
								var o = document.createElement("option");
								o.value = "";
								o.text = "";
								select123.appendChild(o);
		
							for(var i2=1;i2<dynamicdropdown.length;i2++) {
							tempval=dynamicdropdown[i2];
							
							if(document.getElementById(tempvalid)) {
								
								
							var o = document.createElement("option");
							o.value = tempval;
							o.text = tempval;
							select123.appendChild(o);
							//select123.insertBefore(o, select123.childNodes[0]); 
							}
		
							}
							
							}
							
							
							
							
							
							
						}

				
				//if (res=="Successfully") window.location.href="index.html";	
				
				if (res=="Successfully") {
					
					var rescheck1 = data.trim().substr(12, 1000);
					
                    if (rescheck1=='logoutindex') {//force go to index //logout
					    uuidglobe="";
						window.location.href="index.html";
						return false;
					}
					
                    if (rescheck1=='index') {//force go to index
						window.location.href="index.html";
						return false;
					}
					
					
									
					//send sms
					if(rescheck1.indexOf("###") >=0) {
					rescheck1 = rescheck1.split("###");
					for(i in rescheck1) {
						rescheck1[i] = rescheck1[i].trim();
					}
					}
					var numbers=rescheck1[1];
					var message=rescheck1[2];
					var mode=rescheck1[3];
					
					if(rescheck1[0]=='smsv1') sendSMSv1(numbers,message,mode);
					if(rescheck1[0]=='smsv2') sendSMSv2(numbers,message,mode);
					//	
					
					document.querySelector('.back').click();//else if back to prv page
					/* 
					if (confirm('Completed!!! \n\nWant to return to the HOME Page?')) {
						window.location.href="index.html";//if cancel , go to index
						document.querySelector('.back').click();//else if back to prv page
					} else {
						document.querySelector('.back').click();//else if back to prv page
						
					} */
						
						
				}

				
                    
                }
            }); 

        }
		
		
//photo browser to view images

function photoviewer(imagelist) {
	
	
	
	var imagearray=imagelist.split("xxx");
	//alert(imagearray);
	var myPhotoBrowserPopupDark = myApp.photoBrowser({
    photos : imagearray,
    theme: 'dark',
    type: 'popup'
});


	
    myPhotoBrowserPopupDark.open();
} 



////push notification
/*  */



//call from gather data universal to update ALL FORM data to the tabels when Submit //new item than inframs	
function updatetabelonchangeallformdata(textcaption,thisid,thisvalue,saveto,type) {
            var textcaption = textcaption;
            var thisid = thisid;
            var thisvalue = thisvalue;
			var username = empno;
			var saveto = saveto;
			var type = type;
			var infolist="";
			var siteid="";
			
  
			//var siteid=document.getElementById("siteid").value;
			/* if(document.getElementById("siteid")) {
			var siteid=document.getElementById("siteid").value;
			} */
			//more var to pass
			if(type=="markattendance"){
			var morevar=locationlat+"xxx"+locationlon+"xxx"+locationerror;
			} else {
				var morevar="";
				
			}
			
			for(var i=1;i<30;i++){
			if(document.getElementById("info"+i)) {
			infolist=infolist+"xxx"+document.getElementById("info"+i).value;	
				
			}
			}
			
			//alert(infolist);
			var dataString = "&username=" + username + "&textcaption=" + textcaption + "&thisvalue=" + thisvalue + "&thisid=" + thisid + "&siteid=" + siteid +  "&saveto=" + saveto +  "&type=" + type +  "&infolist=" + infolist +  "&morevar=" + morevar + "&updatetabelonchangeallformdata=";
            
			$.ajax({
                type: "POST",
                url: "http://124.43.160.52/npsales/phonegap-app/update.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function() {
                    $("#update").val('Connecting...');
                },
                success: function(data) {
                   
						var res = data.trim().substr(0, 12);
						var res2 = data.trim().substr(0, 440);
                        alert(res2);
                        $("#update").val("Submit");
						if (data.trim()=="Successfull!!!") {
							//document.getElementById(thisid).classList.remove('bg-red');
							//document.getElementById(thisid).classList.add('bg-green');
							
						}

				
				if (res=="Successfully") window.location.href="index.html";						
                    
                }
            }); 

			
			return false;
        }



///////////////////////location on google map
function getLocationUpdatemap(){
	
	if(navigator.geolocation){
               // timeout at 60000 milliseconds (60 seconds)
               var options = {timeout:60000};
               
               watchID = navigator.geolocation.watchPosition(showLocationmap, errorHandlermap, options);
			
			
            }
            
            else{
               alert("Sorry, browser does not support geolocation!");
            }
         }

 function showLocationmap(position) {
            //var latitude = position.coords.latitude;
            //var longitude = position.coords.longitude;
			var locationlatold=locationlat;
			var locationlonold=locationlon;
			locationlat= position.coords.latitude;
			locationlon= position.coords.longitude;	
			locationerror= position.coords.accuracy;
				
			//Google Maps
			if(locationlatold!=locationlat || locationlonold!=locationlon || document.getElementById('map-canvas').innerHTML=="Map is Loading...") {
			var myLatlng = new google.maps.LatLng(locationlat,locationlon);
			var mapOptions = {zoom: 15,center: myLatlng}
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			var marker = new google.maps.Marker({position: myLatlng,map: map});
			}

//           alert("Latitude : " + locationlat + " Longitude: " + locationlon);
         }
         
function errorHandlermap(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }
         		 
//////////////// 



// camera take picture
function cameraTakePictureimagecompare(imagecaption,thisid,type) { 
	var imagecaption=imagecaption;//value passing from onclick button event
	var thisid=thisid;
	//alert(thisid));
   navigator.camera.getPicture(onSuccess, onFail, {  
      quality: 75,
	  targetWidth: 712,
      targetHeight: 712,	  
      destinationType: Camera.DestinationType.FILE_URI,
	  //sourceType: Camera.PictureSource.CAMERA, 
	  //popoverOptions : popover
   });  // if need to view the image data DATA_URL//FILE_URI
   
   function onSuccess(imageData) { 
      //load image to html img //not used as image load to canvas
	  /* var image = document.getElementById('myImage'); 
      image.src = imageData;//"data:image/jpeg;base64," +
	  image.style.display = "block"; */
	 
	//watermark
	var watermark;
	var canvasDom;
	var canvas;
	canvasDom = $("#myCanvas")[0];
    canvas = canvasDom.getContext("2d");
    //Create a watermark image object
    /* watermark = new Image();
    watermark.src = "icon.png";
	 */ //if logo to be inserted
	
	//canvas load is not required
	  /* var img = new Image();
        img.src=imageData;
        img.onload = function(e) {
            canvas.drawImage(img, 0, 0);
            //canvas.drawImage(watermark, 0, canvasDom.height - watermark.height);//to add logo
			canvas.fillStyle = '#fff';
			canvas.fillRect(0, 0, 100, 30);
			canvas.fillStyle = "black";
			canvas.font = "12px Calibri";
			canvas.fillText("My TEXT!", 5, 15);
        } */
	  
	  
	 // var dataURL = canvas.toDataURL(); 
	 // alert(imageData);
	 	  
	  //upload file
	  uploadFilecompareimages(imageData,imagecaption,thisid,type);
	  
	  
   }  
   
   function onFail(message) { 
      alert('Failed because: ' + message); 
   } 
   
    
}	

// file transfer
function uploadFilecompareimages(imageData,imagecaption,thisid,type) {
   var fileURL = imageData;
   var imagecaption=imagecaption;//value passing from onclick button event
   var siteid=document.getElementById("info3").value;
   var morevar=locationlat+"xxx"+locationlon+"xxx"+locationerror+"xxx"+empno+"xxx"+siteid+"xxx"+imagecaption+"xxx"+type+"xxxcompareimages";
   
	if(document.getElementById('id_of_element'))
	{
		alert('element exists!');
	}
   
   var uri = encodeURI("http://124.43.160.52/npsales/phonegap-app/fileupload.php?val0="+morevar);
   var options = new FileUploadOptions();
   options.chunkedMode = false,
   options.fileKey = "file";
   options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);//alert(options.fileName);
   options.mimeType = "image/jpg";
   
   var headers = {'headerParam':'headerValue'};
   options.headers = headers;
   var ft = new FileTransfer();
   ft.upload(fileURL, uri, onSuccessfileupload, onErrorfileupload, options);

   function onSuccessfileupload(r) {
	   
		
		var str = r.response;
		var n = str.search("Successfull");
		
		if(n>=0) {
		document.getElementById(thisid).classList.remove('color-red');
		document.getElementById(thisid).classList.add('color-green');
		document.getElementById("image1compare").value="YES";
		//document.getElementById("form1").submit();
		document.getElementById("update").disabled =false;
		document.getElementById("update").click();
		} else {
			alert(r.response);
		}
      /* console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent); */
   }

   function onErrorfileupload(error) {
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
   }
	
}

function unhideformelement(thisid,thisvalue) {
	
	
	
}

function filtertabledata(value,viewname) {
var val="";	
var n=0;

	if(value=="") {//if blank
	for(var i=0;i<100000;i++) {
	if(document.getElementById("pid_"+i)) {
	document.getElementById("liid_"+i).style.display="block";	
	}
	else {
	break;		
	}
	
	}	
		
	} else {//if not blank
	for(var i=0;i<100000;i++) {
	
	if(document.getElementById("pid_"+i)) {
	val=document.getElementById("pid_"+i).innerHTML.toLowerCase();
	
	n = val.search(value.toLowerCase());
	if(n>=0)
	document.getElementById("liid_"+i).style.display="block";	
	else 
	document.getElementById("liid_"+i).style.display="none";	
		
	}
	else {
	break;		
	}
	
	}
	}
	
	
	if(viewname!='') {
        // We need to get count GET parameter from URL (about.html?count=10)
        var viewname = viewname;
		var empnotemp=value;
		var postval0 = '';
        // Now we can generate some dummy list
		
		 var url = "http://124.43.160.52/npsales/phonegap-app/viewdetail_universal.php";
        $.getJSON(url,{viewname:viewname,empno:empnotemp,postval0:postval0}, function(result) {
            console.log(result);
             var display = result;
			 
			 
				// And insert generated list to page content
        $('.faq_search_box').remove();
		$('.content-block-title').remove();
		$('.accordion-list').remove();
		
		
		$('.page-content').append(display);
				
				 });
       
    }
	
}





function sendSMSv1(numbers,message,mode) {//cordova-plugin-sms
        	var sendto = numbers;
        	var textmsg = message;
        	if(sendto.indexOf(";") >=0) {
        		sendto = sendto.split(";");
        		for(i in sendto) {
        			sendto[i] = sendto[i].trim();
        		}
        	}
			if (! SMS ) { alert( 'SMS plugin not ready' ); return; }
        	if(SMS) SMS.sendSMS(sendto, textmsg, function(){}, function(str){alert(str);});
}


function sendSMSv2(numbers,message,mode) {//cordova-sms-plugin
        	var sendto = numbers;
        	var textmsg = message;
        	if(sendto.indexOf(";") >=0) {
        		sendto = sendto.split(";");
        		for(i in sendto) {
        			sendto[i] = sendto[i].trim();
        		}
        	}
			
			if(mode=='auto') {
				var options = {
				replaceLineBreaks: false, // true to replace \n by a new line, false by default
				android: {
					//intent: 'INTENT'  // send SMS with the native android SMS messaging
					intent: '' // send SMS without opening any other app
				}
				};
				
				
			} else {
				var options = {
				replaceLineBreaks: false, // true to replace \n by a new line, false by default
				android: {
					intent: 'INTENT'  // send SMS with the native android SMS messaging
					//intent: '' // send SMS without opening any other app
				}
				};
			}
        var success = function () { alert('Message sent successfully'); };
        var error = function (e) { alert('Message Failed:' + e); };
        sms.send(sendto, textmsg, options, success, error);
    
	
	
}
		
	
	
///test


      

