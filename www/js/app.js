var app = angular.module('TicketsApp', ['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      // .when('/events', {
      //   templateUrl: 'views/events.html',
      //   controller: 'EventsCtrl',
      //   controllerAs: 'predmeti'
      // })
      .when('/rezervacije', {
        templateUrl: 'views/rezervacije.html',
        controller: 'RezervacijeCtrl',
        controllerAs: 'rezervacije'
      })
      // .when('/inbox', {
      //   templateUrl: 'views/inbox.html',
      //   controller: 'InboxCtrl',
      //   controllerAs: 'inbox'
      // })
      // .when('/account', {
      //   templateUrl: 'views/nalog.html',
      //   controller: 'NalogCtrl',
      //   controllerAs: 'nalog'
      // })
      // .when('/events/:id', {
      //   templateUrl: 'views/event-details.html',
      //   controller: 'EventDetailsCtrl',
      // })
      // .when('/admin-events', {
      //   templateUrl: 'views/admin-predmeti.html',
      //   controller: 'AdminPredmetiCtrl',
      //   controllerAs: 'adminPredmeti'
      // })
      // .when('/admin-users', {
      //   templateUrl: 'views/admin-ucenici.html',
      //   controller: 'AdminUceniciCtrl',
      //   controllerAs: 'adminUcenici'
      // })
      // .when('/admin-nastavnici', {
      //   templateUrl: 'views/admin-nastavnici.html',
      //   controller: 'AdminNastavniciCtrl',
      //   controllerAs: 'adminNastavnici'
      // })
      .otherwise({
        redirectTo: '/'
      });
  });

app.controller('MainCtrl', function($scope, $http) {
    var vm = this;

    vm.loginForm = false;
	vm.username = '';
	vm.password = '';
	vm.jeUlogovan = false;
	vm.events = [];
	vm.users = [];
	vm.eventDetailView = false;

    $scope.alerts = [
    ];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    vm.login = function () {
		console.log('login');
		console.log(vm.username);
		console.log(vm.password);
		
		vm.jeUlogovan = vm.isValidUser();
		

		
		vm.loginForm = false;
		
		
    };
	
	vm.isValidUser = function () {
		//read from file

		for(var i in vm.users){
			var user = vm.users[i];
			if(vm.username === user.username ) {
				console.log('naso sam usera');
				if(vm.password === user.password ) {
					vm.ulogovanKorisnik = {
						username: user.username,
						//password: user.password',
						type: user.type,
						name: user.name
					};
					return true;
				}
				else 
				{
					alert("wrong password");
					return false;
				}
			};
		}
		alert("wrong username");
		return false;

	};
/*
    vm.kupi = function(el){
      vm.korpa.push({proizvod: el, kolicina: 1});
      $scope.alerts.push({ type: 'success', msg: 'Proizvod prebacen u korpu' } )
    };
*/

    vm.init = function(){
      var request = {
          method: "GET",
		  url: "./events.json"
      }
      $http(request).then(
          function(response){
            console.log(response);
            var lista = [];
            vm.events = response.data;
            for(var i in vm.events){
              var event = vm.events[i];
			  lista.push(event);
            }
            vm.totalItems = lista.length;
            vm.events = lista;
          }, function(response){
              vm.message = 'error';
          });
    };
	
    vm.getUsers = function(){
		var request = {
          method: "GET",
		  url: "./users.json"
		}
		$http(request).then(
			function(response){
				console.log(response);

				for(var i in response.data){
					var user = response.data[i];
					vm.users.push(user);
				};
			}, 
			function(response){
				vm.message = 'error';
		});
	 };	
	 
    vm.init();
    vm.getUsers();

});


app.controller('RezervacijeCtrl', function($scope, $http) {});