app.controller('gqctrl', function($scope, $mdDialog, $mdToast, productsFactory){
var apikey = localStorage.getItem("apikeygqplus");
var user = localStorage.getItem("username");
$scope.apke = apikey;
$scope.usr = user;
console.log("apikey",apikey);
//pagiantion implementation
$scope.selected = [];
  $scope.options = {
    autoSelect: true,
    boundaryLinks: true,
    largeEditDialog: true,
    pageSelector: true,
    rowSelection: true
  };

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };
  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  }

    // read products
    $scope.readProducts = function(apikey){
 
        // use products factory
        productsFactory.readApi(apikey).then(function successCallback(response){
            $scope.responsedata = response.data;
    $scope.currentPage = 1;
    $scope.step = 6;

    $scope.gotoPage = function() {
      console.log($scope.currentPage);
    };
        }, function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
 
    }
     

      

    // showCreateProductForm will be here
     // show 'create product form' in dialog box
$scope.showCreateProductForm = function(event){
 
    $mdDialog.show({
        controller: DialogController,
        templateUrl: './app/products/create_product.template.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        fullscreen: true // Only for -xs, -sm breakpoints.
    });
}
 
// create new product
$scope.createProduct = function(){
 
    productsFactory.createProduct($scope).then(function successCallback(response){
 
        // tell the user new product was created
        $scope.showToast(response.data);
        
        // refresh the list
        $scope.readProducts($scope.apke);
 
        // close dialog
        $scope.cancel();
 
        // remove form values
        $scope.clearProductForm();
 
    }, function errorCallback(response){
        $scope.showToast("Unable to create record.");
    });
}
 // clear variable / form values
$scope.clearProductForm = function(){
    $scope.id = "";
    $scope.name = "";
    $scope.description = "";
    $scope.price = "";
}
// show toast message
$scope.showToast = function(message){
    $mdToast.show(
        $mdToast.simple()
            .textContent(message)
            .hideDelay(3000)
            .position("top right")
    );
}

// readOneProduct will be here

// retrieve record to fill out the form
$scope.viewdata = function(id){
 
    // get product to be edited
    productsFactory.readOneProduct(id).then(function successCallback(response){
 console.log(response);
        // put the values in form
        $scope.id = response.data[0].id;
        $scope.company = response.data[0].company;
        $scope.contact = response.data[0].contact;
        $scope.description = response.data[0].description;
 
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/products/viewdata.template.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        }).then(
            function(){},
 
            // user clicked 'Cancel'
            function() {
                // clear modal content
                $scope.clearProductForm();
            }
        );
 
    }, function errorCallback(response){
        $scope.showToast("Unable to retrieve record.");
    });
 
}
 
// showUpdateProductForm will be here
// retrieve record to fill out the form
$scope.showUpdateForm = function(id){
 
    // get product to be edited
    productsFactory.readOneProduct(id).then(function successCallback(response){
 
        // put the values in form
        $scope.id = response.data[0].id;
        $scope.company = response.data[0].company;
        $scope.description = response.data[0].description;
        $scope.contact = response.data[0].contact;
 
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './app/products/updatedata.template.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            scope: $scope,
            preserveScope: true,
            fullscreen: true
        }).then(
            function(){},
 
            // user clicked 'Cancel'
            function() {
                // clear modal content
                $scope.clearProductForm();
            }
        );
 
    }, function errorCallback(response){
        $scope.showToast("Unable to retrieve record.");
    });
 
}
 
// updateProduct will be here
// update product record / save changes
$scope.updateProduct = function(){
 
    productsFactory.updateProduct($scope).then(function successCallback(response){
 
        // tell the user product record was updated
        $scope.showToast(response.data);
        console.log(response);
 
        // refresh the product list
        $scope.readProducts($scope.apke);
 
        // close dialog
        $scope.cancel();
 
        // clear modal content
        $scope.clearProductForm();
 
    },
    function errorCallback(response) {
        $scope.showToast("Unable to update record.");
    });
 
}
 
// confirmDeleteProduct will be here
// cofirm product deletion
// cofirm product deletion
$scope.confirmDeleteProduct = function(id){
 
    // set id of record to delete
    $scope.idu = id;
    console.log(id);
 
    //dialog settings
    var confirm = $mdDialog.confirm()
        .title('Are you sure?')
        .textContent('Product will be deleted.')
        .targetEvent(event)
        .ok('Yes')
        .cancel('No');
 
    // show dialog
    $mdDialog.show(confirm).then(
        // 'Yes' button
        function() {
            // if user clicked 'Yes', delete product record
            $scope.deleteProduct($scope.idu);
        },
 
        // 'No' button
        function() {
            // hide dialog
        }
    );
}
// delete product
$scope.confirmDelete = function(idv){
// console.log(idv);
    productsFactory.deleteProduct(idv).then(function successCallback(response){
 
        // tell the user product was deleted
        // $scope.showToast(response.data.message);
        $scope.showToast(response.data);
        console.log(response);
        // refresh the list
        $scope.readProducts($scope.apke);
 
    }, function errorCallback(response){
        $scope.showToast("Unable to delete record.");
    });
 
}
 
// searchProducts will be here
// search products
$scope.searchProducts = function(){
 
    // use products factory
    productsFactory.searchProducts($scope.product_search_keywords).then(function successCallback(response){
        $scope.responsedata = response.data;
        console.log("searched",response);
    }, function errorCallback(response){
        $scope.showToast("Unable to read record.");
    });
}
    // DialogController will be here
// methods for dialog box
function DialogController($scope, $mdDialog) {
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
}


$scope.logout = function(aok){

        userData = 'apikey='+aok;
        console.log(userData);
    $.ajax({
        type: 'POST',
        url: 'http://localhost/gq/api/logout',
        data: userData,
        success:function(response ){
            var vh = JSON.parse(response);
            if(vh.response  == 'logged out' || vh.response  == 'already logged out'){
                alert('logged out.');
                localStorage.removeItem("firstname");
                localStorage.removeItem("lastname");
                localStorage.removeItem("apikeygqplus");
                localStorage.removeItem("username");
                localStorage.removeItem("phone");
                localStorage.removeItem("email");
                window.location.href = "../index.html";
            }
            else{
                alert('Some problem occurred, please try again.');
                window.location.href = "index.html";
            }
        }
    });
}

});