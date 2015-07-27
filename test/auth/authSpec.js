describe('AuthController', function () {
  var $scope, $rootScope, $location, $window, $httpBackend, createController, auth;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('omnibooks'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    auth = $injector.get('auth');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    // used to create our AuthController for testing
    createController = function () {
      return $controller('AuthController', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        auth: auth
      });
    };

    createController();
  }));

  it('should have a signup method', function() {
    expect($scope.signup).to.be.a('function');
  });


  it('should have a login method', function() {
    expect($scope.login).to.be.a('function');
  });

});
