app.factory("productsFactory", function($http){
 
    var factory = {};
 
    // read all products
    factory.readApi = function(apikey){
        return $http({
            method: 'GET',
            url: 'http://localhost/gq/api/showdata?apikey='+apikey
        });
    };
     
  // create product
// factory.createProduct = function(id){
//     return $http({
//         method: 'POST',
//         data: {
//             'name' : $scope.name,
//             'description' : $scope.description,
//             'price' : $scope.price
//         },
//         url: 'http://localhost/api/product/create.php'
//     });
// };

factory.createProduct = function($scope){
    var userData = 'apikey='+$scope.apke+'&company='+$scope.ccompany+'&description='+$scope.cdescription+'&contact='+$scope.ccontact;
    console.log(userData);
    return $http({
         method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: userData,
        url: 'http://localhost/gq/api/createcompany'
    });
};
 
// readOneProduct will be here
     // read one product
factory.readOneProduct = function(id){
    return $http({
        method: 'GET',
        url: 'http://localhost/gq/api/showcompany?apikey=jjwqP6RKsAsvpDjipATd&id=' + id
    });
};
 
// update product
factory.updateProduct = function($scope){
    var userData = 'id='+$scope.id+'&company='+$scope.company+'&description='+$scope.description+'&contact='+$scope.contact;
    console.log(userData);
    return $http({
         method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: userData,
        url: 'http://localhost/gq/api/updatecompany'
    });
};
 
// delete product
factory.deleteProduct = function(id){
    
    var userData = 'id='+id;
    return $http({
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: userData,
        url: 'http://localhost/gq/api/deletecompany'
    });
};
 
// searchProducts will be here
// search all products
factory.searchProducts = function(keywords){
    var userData = 'keyword='+keywords;
    return $http({
        method: 'POST',
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: userData,
        url: 'http://localhost/gq/api/livesearch'
    });
};
    return factory;
});