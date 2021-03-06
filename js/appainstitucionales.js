angular.module('myApp', ['angular-table'])
	.controller("ProdsCtrl", ["$scope", "$http", "$filter", function($scope, $http, $filter) {
	
		var vm = $scope;
		vm.products = [];

		vm.local = "CDR";

		vm.filteredList = vm.products;

		vm.changeStore = function(source, store){
			vm.loadProducts(source);
			vm.local = store;
		}
	
		vm.loadProducts = function(source) {
			var httpRequest = $http({
				method: 'GET',
				url: source,
				data: ''
			}).success(function(data, status) {
				vm.products = data;
				vm.filteredList = data;
				vm.total_ainstitucionales = data.length;
				if (vm.searchText)
					vm.updateFilteredList();
			});
		};
		
		vm.config = {
			itemsPerPage: 20,
			fillLastPage: true,
			maxPages: 10
		};

		vm.updateFilteredList = function() {
			vm.filteredList = $filter("filter")(vm.products, vm.searchText);
		}
		
		vm.loadProducts(sourceUrl);

}]).directive('capitalize', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if (inputValue == undefined) inputValue = '';
          var capitalized = inputValue.toUpperCase();
          if (capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        }
        modelCtrl.$parsers.push(capitalize);
        capitalize(scope[attrs.ngModel]); // capitalize initial value
      }
    };
  });
