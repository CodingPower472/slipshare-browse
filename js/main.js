function slips(FB_SLIPS_URL, $firebaseArray) {
  var ref = new Firebase(FB_SLIPS_URL);
  return $firebaseArray(ref);
}

function MainController($scope, slips) {

  $scope.inputRow = {};

  $scope.slipcategories = [
    {
      boatlength: 22,
      maxdraft: 14,
      maxlength: 26
    },
    {
      boatlength: 28,
      maxdraft: 194,
      maxlength: 132
    }
  ];

  $scope.editedslipcategories = $.extend(true, {}, $scope.slipcategories);

  $scope.fields = [
    {
      name: "Boat Length",
      val: "boatlength",
      changable: false,
      unit: 'ft'
    },
    {
      name: "Max Draft",
      val: "maxdraft",
      unit: 'ft'
    },
    {
      name: "Max Length",
      val: "maxlength",
      unit: 'ft'
    }
  ];

  $scope.reset = function () {

    $scope.editedslipcategories = $scope.slipcategories;

  };

  angular.forEach($scope.fields, function (field) {

    if (field.changable === undefined) {

      field.changable = true;

    }

  });

  $scope.submit = function () {

    var len = 0;

    angular.forEach($scope.editedslipcategories, function (slipcategory) {

      if (slipcategory.checked) {

        delete slipcategory.checked;

        slips.$add(slipcategory);

      }

    });

  };

  $scope.setField = function (field) {

    $scope.applied = true;

    var fieldVal = field.val;
    var inputRowVal = $scope.inputRow[fieldVal];

    field.applied = true;

    if (inputRowVal === null) {

      field.applied = false;
      $scope.applied = false;

    }

    angular.forEach($scope.editedslipcategories, function (slipcategory) {

      slipcategory[fieldVal] = inputRowVal;

    });

  }

}

angular.module('slipshareV2', ['firebase'])

  .controller('MainController', MainController)

  .constant('FB_SLIPS_URL', 'https://slipshareapp.firebaseio.com/slips')

  .factory('slips', slips);