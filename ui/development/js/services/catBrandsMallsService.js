var catBrandsMallsService = angular.module('catBrandsMallsService', []);

catBrandsMallsService.service('catBrandsMallsService', [function(){

	return {

		checkCat : function(categoryList){
			
			var tempId = new Array();
			var tempName = new Array();
			var selectedCat = categoryList;
			selectedCat.forEach(function(item, index, array){
				if(item.checked){
					tempId.push(item.cid);
					tempName.push(item.cname);
				}
			});
				
			tempName = tempName.toString();
			return {
				"selectedCatId" : tempId, 
				"selectedCatName":tempName
			};
			
		},
		//Merchant Location service.
		checkLocation : function(locationList){
			
			var tempId = new Array();
			var tempName = new Array();
			var selectedLocation = locationList;
			selectedLocation.forEach(function(item, index, array){
				if(item.checked){
					tempId.push(item.locationId);
					tempName.push(item.location);
				}
			});
				
			tempName = tempName.toString();
			return {
				"selectedLocationId" : tempId, 
				"selectedLocationName":tempName
			};
			
		},
		//Merchant Locality Service
		checkLocality : function(localityList){
			
			var tempId = new Array();
			var tempName = new Array();
			var selectedLocality = localityList;
			selectedLocality.forEach(function(item, index, array){
				if(item.checked){
					tempId.push(item.localityId);
					tempName.push(item.locality);
				}
			});
				
			tempName = tempName.toString();
			return {
				"selectedLocalityId" : tempId, 
				"selectedLocalityName":tempName
			};
			
		},
		

		selCheckCat : function(selectedCateogries){
			
			var tempId = new Array();
			var tempName = new Array();
			var selectedCat = selectedCateogries;
			selectedCat.forEach(function(item, index, array){
				if(item.checked){
					tempId = item.cid;
					tempName = item.cname;
					//tempId.push(item.cid);
					//tempName.push(item.cname);
				}
			});
				
			tempName = tempName.toString();
			return {
				"selectedCatId" : tempId, 
				"selectedCatName":tempName
			};
			
		},

		checkBrands : function(selMerchBrands){

			var tempId = new Array();
			var tempName = new Array();
			var selectedBrands = selMerchBrands;
			selectedBrands.forEach(function(item, index, array){
				if(item.checked){
					tempId.push(item.bid);
					tempName.push(item.brandName);
				}
			});
			tempName = tempName.toString();
			
			
			return {
				"selectedBrandId" : tempId, 
				"selectedBrandName":tempName
			};
		},

		checkDeals : function(dealTypeList){

			var tempId = new Array();
			var tempName = new Array();
			var selectedDeals = dealTypeList;
			selectedDeals.forEach(function(item, index, array){
				if(item.checked){
					tempId= item.dtid;
					tempName = item.dealName;
				}
			});
			tempName = tempName.toString();
			
			
			return {
				"selectedDealsId" : tempId, 
				"selectedDealsName":tempName
			};
		},


		selCheckBrands : function(selBrands){
			
			var tempId = new Array();
			var tempName = new Array();
			
			var selectedBrands = selBrands;
			selectedBrands.forEach(function(item, index, array){
				if(item.checked){
					tempId = item.bid;
					tempName = item.brandName;
					//tempId.push(item.bid);
					//tempName.push(item.brandName);
				}
			});
			tempName = tempName.toString();
			
			
			return {
				"selectedBrandId" : tempId, 
				"selectedBrandName":tempName
			};
		},
		
		businessSelCheckBrands : function(selBrands){
			
			var tempId = new Array();
			var tempName = new Array();
			
			var selectedBrands = selBrands;
			selectedBrands.forEach(function(item, index, array){
				if(item.checked){
					tempId.push(item.bid);
					tempName.push(item.brandName);
				}
			});
			tempName = tempName.toString();
			
			
			return {
				"selectedBrandId" : tempId, 
				"selectedBrandName":tempName
			};
		},

		checkMalls : function(mallsList){

			var tempId = new Array();
			var tempName = new Array();
			var selectedMalls = mallsList;
			selectedMalls.forEach(function(item, index, array){
				if(item.checked){
					tempId = item.mallId;
					tempName = item.mallName;					
					//tempId.push(item.mallId);
					//tempName.push(item.mallName);
				}
			});
			tempName = tempName.toString();
			
			
			return {
				"selectedMallsId" : tempId, 
				"selectedMallsName":tempName
			};
		},

		checkBrands : function(storesList){

			var tempId = new Array();
			var tempName = new Array();
			var selectedStores = storesList;
			selectedStores.forEach(function(item, index, array){
				if(item.checked){
					tempId.push(item.bid);
					tempName.push(item.brandName);
				}
			});
			tempName = tempName.toString();
			
			return {
				"selectedBrandId" : tempId, 
				"selectedBrandName":tempName
			};

		}

	}

}]);
