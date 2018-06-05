var app = angular.module('TicketsApp', []);

app.controller('MyCtrl', function($scope, $http) {
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
