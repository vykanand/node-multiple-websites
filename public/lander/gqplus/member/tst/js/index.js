'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

angular.module('demo', ['ng', 'ngMaterial', 'mdCollectionPagination']).controller('DemoController', function () {
  function DemoController() {
    _classCallCheck(this, DemoController);

    /* Generate 1000 random names. */
    this.users = new Array(1000).fill(null).map(function () {
      return chance.name();
    });
    this.filteredUsers = this.users;
    console.log("filtered",this.filteredUsers);
    this.searchString = '';
  }

  DemoController.prototype.search = function search() {
    var nameRegexp = new RegExp(this.searchString, 'i');
    this.filteredUsers = this.users.filter(function (user) {
      return user.match(nameRegexp);
    });
  };

  return DemoController;
}());