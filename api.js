class UserListComponent extends HTMLElement {
    connectedCallback() {
      this.getDataFromAPI();
    }
  
    async getDataFromAPI() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        
        const users = await response.json();
        this.displayUserList(users);
      } catch (error) {
        console.error(error);
        this.showError();
      }
    }
  
    displayUserList(users) {
      // Lógica para mostrar la lista de usuarios de manera atractiva (puede ser una lista, tarjetas, etc.)
      const userListContainer = document.createElement('div');
      
      users.forEach((user, index) => {
        const userCard = document.createElement('div');
        // Asignar un color significativo basado en el índice del usuario

  
        userCard.innerHTML = `
		<div class="row">
		  <div class="cell" data-title="Username">
			${user.username}
		  </div>
		  <div class="cell" data-title="Email">
			${user.email}
		  </div>
		  <div class="cell" data-title="Nombre">
			${user.name}
		  </div>
		</div>`;
        userListContainer.appendChild(userCard);
      });
  
      this.appendChild(userListContainer);
    }
 
  
    showError() {
      // Lógica para manejar errores y mostrar mensajes claros al usuario
      const errorContainer = document.createElement('div');
      errorContainer.innerHTML = '<p>Hubo un error en la solicitud de datos.</p>';
      this.appendChild(errorContainer);
    }
  }
  
  customElements.define('user-list-component', UserListComponent);
  
  
  
  var app = angular.module('Cape_cuad_alum', ['ngAnimate', 'ui.bootstrap']);

app.factory("datos", function() {
  return {
    data: {}
  };
});

app.controller('Cape_cont', function ($scope, $uibModal, datos) {

  $scope.animationsEnabled = true;
  $scope.pers = [{"Nombre":"Juan", "Apellido":"Pérez","CI":"12345678","NumTel":"04145555555","Direccion":"Los Godos","Correo":"juan@juan.com","Curso":"Sistemas Web"},
{"Nombre":"Ana", "Apellido":"Gómez","CI":"87654321","NumTel":"0414666666","Direccion":"La Puente","Correo":"ana@ana.com","Curso":"Sistemas Web"}];
  $scope.NuevAlum = {};

  $scope.eliminar = function(linea){
    $scope.pers.splice($scope.pers.indexOf(linea),1);
  };

  $scope.abrir = function () {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'Add_alumn.html',
      controller: 'Cape_cont_modal',
      resolve: {
        NuevAlum: function(){
          return $scope.NuevAlum;
        }
      }

    });
  modalInstance.result.then(function (selectedItem) {
    $scope.pers.push({"Nombre":$scope.NuevAlum.Nombre, "Apellido":$scope.NuevAlum.Apellido,
    "CI":$scope.NuevAlum.CI,"NumTel":$scope.NuevAlum.NumTel,
    "Direccion":$scope.NuevAlum.Direccion,"Correo":$scope.NuevAlum.Correo,"Curso":$scope.NuevAlum.Curso});
      $scope.NuevAlum = {};
  });
  };
});

app.controller('Cape_cont_modal', function ($scope, $uibModalInstance, NuevAlum) {
    $scope.NuevAlum = NuevAlum;
    $scope.ok = function () {
    $uibModalInstance.close(NuevAlum);
  };

  $scope.cancelar = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

  