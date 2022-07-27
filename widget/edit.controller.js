'use strict';
(function () {
    angular
        .module('cybersponse')
        .controller('happinessQuotient100EditCtrl', happinessQuotient100EditCtrl);

    happinessQuotient100EditCtrl.$inject = ['$scope', '$uibModalInstance', 'config', 'appModulesService', 'Entity', '$state', 'FormEntityService'];

    function happinessQuotient100EditCtrl($scope, $uibModalInstance, config, appModulesService, Entity, $state, FormEntityService) {
        
        $scope.cancel = cancel;
        $scope.save = save;
        $scope.config = config;
        $scope.page = $state.params.page;
        $scope.module = '';
	    $scope.loadInputFields = loadInputFields;
        $scope.loadAttributes = loadAttributes;
        $scope.setMinMaxForIntegerField = setMinMaxForIntegerField;
        $scope.config = angular.extend({
            totalCountQuery: undefined,
            progressCountQuery: undefined
        }, config);

        function init() {
          console.log("Edit Page: ", $scope.page);
            // Loads modules present in system
            appModulesService.load(true).then(function (modules) {
                if ($scope.page !== 'dashboard' && $scope.page !== 'reporting') {
                    for (let item in modules) {
                        if (FormEntityService.get().type === modules[item].type) {
                            $scope.modules = [];
                            $scope.modules.push(modules[item]);
                            $scope.config.module = undefined;
                            $scope.loadInputFields();
                            break;
                        }
                    }
                }
                else {
                    $scope.modules = modules;
                }
            });
        }
        init();

      	// Loads Input Fields for integer fields
        function loadInputFields() {
            $scope.config.module = $scope.modules[0].type;
            var entity = new Entity($scope.config.module);
            // Always resets inputFields to [] 
            $scope.config.inputFields = [];
            // Loads all fields of respective module
            entity.loadFields().then(function () {
                for (var key in entity.fields) {
                    // Checks datatype of field and ignores id field to store
                    if (entity.fields[key].name != 'id' && entity.fields[key].type === 'integer')
                        $scope.config.inputFields.push(entity.fields[key]);
                }
            });
        }

        // Loads fields of a module
        function loadAttributes() {
            if ($scope.page === 'dashboard' || $scope.page === 'reporting') {
                if ($scope.config.totalCountQuery !== undefined 
                    || $scope.config.progressCountQuery !== undefined) {
                    delete $scope.config.totalCountQuery.filters;
                    delete $scope.config.progressCountQuery.filters;
                }
                var entity = new Entity($scope.config.module);
                $scope.config.inputFields = [];
                entity.loadFields().then(function () {
                    // Load all fields of a module
                    for (var key in entity.fields) {
                        $scope.config.inputFields.push(entity.fields[key]);
                    }
                    $scope.config.fields = entity.getFormFields();
                });
            }
        }

        function setMinMaxForIntegerField() {
            // Iterates over inputFields variable
            for (var i = 0; i < $scope.config.inputFields.length; i++) {
                // Compares with selected input variable then set its validation values
                if ($scope.config.inputFields[i].name === $scope.config.selectInput) {
                    if ($scope.config.inputFields[i].validation.minlength > 0)
                        $scope.config.minLength = $scope.config.inputFields[i].validation.minlength;
                    else
                        $scope.config.minLength = 0;
                    $scope.config.maxLength = $scope.config.inputFields[i].validation.maxlength;
                    break;
                }
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            if (($scope.page !== 'dashboard' || $scope.page !== 'reporting') && $scope.config.inputFields.length === 0 && ($scope.config.minLength < $scope.config.maxLength)) {
                return;
            }
            if ($scope.editHappinessQuotientForm.$invalid) {
                $scope.editHappinessQuotientForm.$setTouched();
                $scope.editHappinessQuotientForm.$focusOnFirstError();
                return;
            }
            $scope.config.sort = $scope.config.sort || [];
            $uibModalInstance.close($scope.config);
        }
    }
})();
