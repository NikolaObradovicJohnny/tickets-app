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
      .when('/admin', {
        templateUrl: 'views/admin.html'
      })
      .when('/rezervacije', {
        templateUrl: 'views/rezervacije.html'
      })
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
    vm.sliderInvisible = false;

    $scope.alerts = [
    ];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    // vm.logout = function () {
    //   vm.jeUlogovan=false;
    //   vm.username = '';
    //   vm.password = '';
    // }

    vm.login = function () {
		
		vm.jeUlogovan = vm.isValidUser();
		

		vm.username = '';
    vm.password = '';
		vm.loginForm = false;
		
		
    };
	
	vm.isValidUser = function () {
		//read from file

		for(var i in vm.users){
			var user = vm.users[i];
			if(vm.username === user.username ) {
				if(vm.password === user.password ) {
					vm.ulogovanKorisnik = {
						username: user.username,
						//password: user.password',
						type: user.type,
						name: user.name,
            img: user.img,
            rezervacije: user.rezervacije
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


    // buy ticket
    vm.buyTicket = function(selectedOption, brojKomada) {
      let karta = {
        type: selectedOption.type,
        price: selectedOption.price,
        count: brojKomada,
        totalPrice: selectedOption.price * brojKomada,
        event: vm.event
      };
      selectedOption.inStock =- selectedOption.brojKomada; 
      vm.ulogovanKorisnik.rezervacije.push(karta);

      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);     
    };

    vm.rezervacijaZaBrisanje = false;
    vm.deleteReservation = function() {
      if (vm.rezervacijaZaBrisanje) {
        vm.ulogovanKorisnik.rezervacije.splice(vm.ulogovanKorisnik.rezervacije.indexOf(vm.rezervacijaZaBrisanje),1);
        vm.rezervacijaZaBrisanje = false;
      }
    }

});


// app.controller('RezervacijeCtrl', function($scope, $http) {});
// Google Maps
app.directive("myMaps", function(){
  return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,
    link: function(scope, element, attrs) {
      var myLatLng = new google.maps.LatLng(attrs.lat, attrs.lng);
      var mapOptions = {
        center: myLatLng,
        zoom: 5,
        mapTypeId: 'hybrid'
      };
      var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Location'
      });
      marker.setMap(map);
    }
  }
});
// Key Enter
app.directive('keyEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.keyEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });