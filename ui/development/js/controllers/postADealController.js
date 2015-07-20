var PostADealController = angular.module("PostADealController", []);

PostADealController.controller("PostADealController", ['$scope', '$ionicModal', 'catBrandsMallsService', '$cordovaCamera', 'catData', 
  'brandsData', '$http', 'domainUrl', '$window', '$cordovaDatePicker', '$cordovaDevice', 'LocalStorageService', 'selectedCatData', '$state', function($scope, $ionicModal, catBrandsMallsService, 
    $cordovaCamera, catData, brandsData, $http, domainUrl, $window, $cordovaDatePicker, $cordovaDevice, LocalStorageService, selectedCatData, $state){




$scope.files = {
  first : ''
};



/*
// See the Configuring section to configure credentials in the SDK
  //AWS.config.credentials = ; 
  AWS.config.update({accessKeyId: 'your access key', secretAccessKey: 'your secret key'});

  // Configure your region
  AWS.config.region = 'us-east-1';
var bucket = new AWS.S3({params: {Bucket: 'madzz-dev-bucket'}});
  
    var fileChooser = document.getElementById('file-chooser');
    
    var button = document.getElementById('upload-button');
    
    button.addEventListener('click', function () {
      var choicefile = document.getElementById('file-chooser').value;
      var ext= choicefile.split('.').pop();
    
      //var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
      //var string_length = 8;
      //var randomstring = '';
      //for (var i=0; i<string_length; i++) {
      //  var rnum = Math.floor(Math.random() * chars.length);
      //  randomstring += chars.substring(rnum,rnum+1);
      //}
      
      var timestamp = new Date().getTime(); 
      var businessid = LocalStorageService.get('mid');
      
      alert(timestamp);
            var file = fileChooser.files[0];
            if (file) {
                
                //Object key will be facebook-USERID#/FILE_NAME
        
        var objKey = businessid + '_' + timestamp + '.' + ext;
                var params = {
                    Key: objKey,
                    ContentType: file.type,
                    Body: file,
                    ACL: 'public-read'
                };
                bucket.putObject(params, function (err, data) {
                    if (err) {
                        
                    } else {
                        listObjs();
                    }
                });
            } else {
               
            }
        }, false);

*/
var options = {
  date: new Date(),
  mode: 'date'
};

 $scope.files = {
      first : ''
    };

$scope.brandList = {};
$scope.viewFromDate = "From Date";
$scope.viewToDate = "To Date";
$scope.chosenImage = "";
$scope.catButton = "Select Deal Categorie(s)";
$scope.brandButton = "Select Deal Related Brands";
$scope.dealButton = "Select Your Deal Type";
$scope.hasSelectedCat = false;
var selectedCat;
var selectedBrands;
var SelFromDate;
var SelToDate;
var numOfDaysValid;

$ionicModal.fromTemplateUrl('templates/catModal.html', function (modal) {
	$scope.catModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$ionicModal.fromTemplateUrl('templates/selectedCatModal.html', function (modal) {
	$scope.selectedCatModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$ionicModal.fromTemplateUrl('templates/brandsModal.html', function (modal) {
	$scope.brandsModal = modal;
},{
	scope: $scope,
	animation: 'slide-in-up',
	backdropClickToClose: false
});

$ionicModal.fromTemplateUrl('templates/dealType.html', function (modal) {
        $scope.dealModal = modal;
  },{
        scope: $scope,
        animation: 'slide-in-up',
        backdropClickToClose: false
  });


$ionicModal.fromTemplateUrl('templates/selectedBrandsModal.html', function (modal) {
  $scope.selectedBrandsModal = modal;
},{
  scope: $scope,
  animation: 'slide-in-up',
  backdropClickToClose: false
});


// Categories Modal Data
$scope.categoryList = catData;

$scope.selectedCateogries = selectedCatData;


$scope.brandList = brandsData;


/*
	Close Cat Modal And Obtain Data
*/

$scope.dealTypeList = [
{"dealName" : "Discount Sale", "dtid": 1},
{"dealName" : "Promotional", "dtid" : 2}
];

$scope.donedeal = function(){
  $scope.dealModal.hide();
  selectedDeals = catBrandsMallsService.checkDeals($scope.dealTypeList);
  
  if(selectedDeals.selectedDealsName.length == 0){
    $scope.dealButton = "Select Your Deal Type";
      selectedDeals.selectedDealsId = [];
  }
  else{
    $scope.dealButton = selectedDeals.selectedDealsName;

  }
}


$scope.showBrandModal = function() {
	
	if($scope.catButton == 'Select Deal Categorie(s)' || $scope.catButton == 'Select Deal Categories') {
		$scope.hasSelectedCat = true;
	} else {
		$scope.hasSelectedCat = false;
		$scope.selectedBrandsModal.show();
	}
}


/*$scope.doneCat = function(){
	
	$scope.catModal.hide();
	
	selectedCat = catBrandsMallsService.checkCat($scope.categoryList);
	
	if(selectedCat.selectedCatId.length == 0){
		$scope.hasSelectedCat = true;
		$scope.catButton = "Select Deal Categories";
    selectedCat.selectedCatId = [];
	}
	else{
		$scope.hasSelectedCat = false;
		$scope.catButton = selectedCat.selectedCatName;


	}
}*/

$scope.selBrands = {};
$scope.doneSelectedCat = function(){
	
	$scope.selectedCatModal.hide();
	
	selectedCat = catBrandsMallsService.selCheckCat($scope.selectedCateogries);
	
	if(selectedCat.selectedCatId.length == 0){
		$scope.hasSelectedCat = true;
		$scope.catButton = "Select Deal Categories";
    selectedCat.selectedCatId = [];
	}
	else{
		$scope.hasSelectedCat = false;
		$scope.catButton = selectedCat.selectedCatName;
		console.log('selected cat name ' + $scope.catButton);
    var selId = selectedCat.selectedCatId;
    var mid = LocalStorageService.get('mid');
    var id = $window.localStorage.deviceUUID;

    $http.get(domainUrl + 'business/' + id + '/' + mid + '/categories/' + selId+ '/selectedBrands').then(function(res) {
      
      var selectedBrands = JSON.parse(JSON.stringify(res));
      $scope.selBrands = selectedBrands.data;
      
    }, function(err) {
      console.log(err);
    }
    )
	}
}

/*$scope.doneBrands = function(){
	$scope.brandsModal.hide();
	selectedBrands = catBrandsMallsService.checkBrands($scope.brandList);
	if(selectedBrands.selectedBrandName.length == 0){
		$scope.brandButton = "Select related brands";
    selectedBrands.selectedBrandId = [];
	}
	else{
		$scope.brandButton = selectedBrands.selectedBrandName;

	}
}*/

$scope.doneSelectedBrand = function() {
  $scope.selectedBrandsModal.hide();
  selectedBrands = catBrandsMallsService.selCheckBrands($scope.selBrands);
  if(selectedBrands.selectedBrandName.length == 0){
    $scope.brandButton = "Select related brands";
    selectedBrands.selectedBrandId = [];
  }
  if(selectedBrands.selectedBrandName == ''){
    $scope.brandButton = "Others";
    selectedBrands.selectedBrandId = '';
  }
  else{
    $scope.brandButton = selectedBrands.selectedBrandName;

  }

}

$scope.goAddPhoto = function(){

   var options = {
    quality : 75,
    destinationType : Camera.DestinationType.DATA_URL,
    sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit : true,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 100,
    targetHeight: 100,
    popoverOptions: CameraPopoverOptions
  };
  $cordovaCamera.getPicture(options).then(function(imageData) {
  $scope.chosenImage = imageData;


  }, function(err) {
    // An erro occurred. Show a message to the user
    alert("Cant Seem To Choose Image");
  });

}

$scope.goTakePhoto = function(){

   var options = {
    quality : 75,
    destinationType : Camera.DestinationType.DATA_URL,
    sourceType : Camera.PictureSourceType.CAMERA,
    allowEdit : true,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 100,
    targetHeight: 100,
    popoverOptions: CameraPopoverOptions
  };
  $cordovaCamera.getPicture(options).then(function(imageData) {
  $scope.chosenImage = imageData;


  }, function(err) {
    // An erro occurred. Show a message to the user
    alert("Cant Seem To Choose Image");
  });

}

$scope.fromDate = function(){
   var options = {date: new Date(), mode: 'date'};
   $cordovaDatePicker.show(options).then(function(date){
     selFromDate = date;
     var tempFromDate = selFromDate.toLocaleString();
     tempFromDate = tempFromDate.toString();
     tempFromDate = tempFromDate.split(",");
     $scope.viewFromDate = tempFromDate[0];

  });
}

$scope.toDate = function(){
   var options = {date: new Date(), mode: 'date'};
   $cordovaDatePicker.show(options).then(function(date){
     selToDate = date;
     var tempToDate = selToDate.toLocaleString();
     tempToDate = tempToDate.toString();
     tempToDate = tempToDate.split(",");
     $scope.viewToDate = tempToDate[0];
  });
}

$scope.valDate = false;

$scope.submitDeal = function(dealForm, validity){

  //numOfDaysValid = Math.floor((selToDate - selFromDate) / (1000*60*60*24));
  
  if(numOfDaysValid < 0){
    $scope.valDate = true;
   } else {
    $scope.valDate = false;

  //selectedCat.selectedCatId = selectedCat.selectedCatId[0];
  var id = window.localStorage.getItem('deviceUUID')

  if(!validity){
    return false;
  }

  else {
    var deal = angular.copy(dealForm);
   
    var dealData = {
      "deviceUUID": id,
      "title": deal.title,
      "businessId": LocalStorageService.get('mid'),
      "description": deal.description,
      "catId": selectedCat.selectedCatId,
      "dealTypeId" : selectedDeals.selectedDealsId,
      "bid" : selectedBrands.selectedBrandId,
      "duration": 1,
      "validFrom": selFromDate,
      "validTo": selToDate
      //"imageUrl": $scope.files.first
    }
    
  }
	/*var x = {
   "deviceUUID": $window.localStorage.getUUID(),
   "businessId": 1,
   "title": "buy 2 get 1",
   "description": "buy 2 get 1",
   "catId": 1,
   "dealTypeId": 12,
   "isRecommended": "0",
   "duration": 21,
   "validFrom": "2014-11-30",
   "validTo": "2014-11-30",
   "dealCode": null,
   "imageUrl": "https://s3.amazonaws.com/madzz/bangalore_central.jpg "
 }*/





 $http.post(domainUrl + 'business/' + id + '/createDeal', dealData).success(function(){
 	dealVld.reset();
	$scope.viewFromDate = "From Date";
	$scope.viewToDate = "To Date";
	$scope.chosenImage = "";
	$scope.catButton = "Select Deal Categorie(s)";
	$scope.brandButton = "Select Deal Related Brands";
	$scope.dealButton = "Select Your Deal Type";
	
 	console.log("done");
$state.go('merch.merchProfile');
  
 }).error(function(status, data, header, config){
  console.log('err');
  console.log(status);
 });

}
}

}]);
