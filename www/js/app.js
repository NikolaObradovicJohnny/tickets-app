var app = angular.module('TicketsApp', []);

app.controller('MyCtrl', function($scope, $http) {
    var vm = this;

    vm.loginForm = false;
	vm.username = '';
	vm.password = '';
	vm.jeUlogovan = false;
	vm.events = [];
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
		
		if(vm.username === 'pera' && vm.password == '12345') {
			vm.ulogovanKorisnik = {
				username: 'pera',
				password: '12345',
				type: 'user',
				name: 'Petar Petrovic'				
			}
		}
		vm.loginForm = false;
		vm.jeUlogovan = true;
		
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
	
    vm.init();


});
