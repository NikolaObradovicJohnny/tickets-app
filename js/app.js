var app = angular.module('TicketsApp', []);

app.controller('MyCtrl', function($scope, $http) {
    var vm = this;

    vm.loginForm = false;

    $scope.alerts = [
    ];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    vm.login = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'myModalContent.html',
        controller: function($uibModalInstance, parent){
            var $ctrl = this;

            $ctrl.stanje = 'Login';

            $ctrl.username = parent.username;

            $ctrl.register = function(){
              $uibModalInstance.close($ctrl.username);
            }

            $ctrl.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
        },
        controllerAs: '$ctrl',
        resolve: {
          parent: function () {
            return vm;
          }
        }
      });

      modalInstance.result.then(function (username) {
        console.log(username);
      }, function () {
        console.log('modal-component dismissed at: ' + new Date());
      });
    };

    vm.editProizvoda = function(el){
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: 'editMovie.html',
        controller: function($uibModalInstance, movie){
            var $ctrl = this;

            $ctrl.title = movie.title;

            $ctrl.save = function(){
              $uibModalInstance.close($ctrl.title);
            }

            $ctrl.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
        },
        controllerAs: '$ctrl',
        resolve: {
          movie: function () {
            return el;
          }
        }
      });

      modalInstance.result.then(function (title) {
        el.title = title;
      }, function () {
        console.log('modal-component dismissed at: ' + new Date());
      });
    }

    vm.home = function(){
      vm.kategorija = null;
      vm.proizvod = null;
      vm.proizvodi = vm.svi_proizvodi;
      vm.totalItems = vm.proizvodi.length;
    }
    vm.filterKategorije = function(kategorija){
      vm.kategorija = kategorija;
      vm.proizvod = null;
      vm.proizvodi = vm.kategorijeProizvoda[kategorija];
      vm.totalItems = vm.proizvodi.length;
    }
    vm.selektujProizvod = function(el){
      vm.kategorija = el.kategorija;
      vm.proizvod = el;
    }

    vm.init = function(){
      var req = {
          method: "GET",
          //url: "http://88.99.171.79:8080/filmovi?search="+vm.searchText
          url: "./k2_proizvodi.json"
      }
      $http(req).then(
          function(resp){
            console.log(resp);
            var lista = [];
            vm.svi_proizvodi = resp.data;
            vm.kategorijeProizvoda = {};
            vm.listaKategorija = [];
            for(var i in vm.svi_proizvodi){
              var proizvod = vm.svi_proizvodi[i];
              if(!(proizvod.kategorija in vm.kategorijeProizvoda)){
                vm.listaKategorija.push(proizvod.kategorija);
                vm.kategorijeProizvoda[proizvod.kategorija] = [proizvod];
              }else{
                vm.kategorijeProizvoda[proizvod.kategorija].push(proizvod);
              }
              if(proizvod.naziv.toLowerCase().indexOf(vm.searchText.toLowerCase())!=-1){
                lista.push(proizvod);
              }
            }
            vm.totalItems = lista.length;
            vm.proizvodi = lista;
          }, function(resp){
              vm.message = 'error';
          });
    };

    vm.kupi = function(el){
      vm.korpa.push({proizvod: el, kolicina: 1});
      $scope.alerts.push({ type: 'success', msg: 'Proizvod prebacen u korpu' } )
    };

    vm.init();


});
