'use strict';
angular
    .module('stagiaireApp')
    .controller('FormateurController', ['$scope', 'formateurService', function ($scope, formateurService) {
         formateurService.getAll().then(function(resp){
             $scope.formateurs = resp.data;
        });

        $scope.deleteFormateur = function(cin){
            formateurService.delete(cin).then(function(){
                formateurService.getAll().then(function(resp){
                    $scope.formateurs = resp.data;
                });
            });
        };
        
        $scope.addFormateur = function(cin, nom, prenom, specialite){
            formateurService.add(cin, nom, prenom, specialite).then(function(){
                formateurService.getAll().then(function(resp){
                    $scope.formateurs = resp.data;
                });
            });
            $scope.showFieldToAdd = false;
        };

        $scope.resetFields = function(){
            $scope.cin = undefined;
            $scope.nom = undefined;
            $scope.prenom = undefined;
            $scope.specialite = undefined;
        }
        
        $scope.addFormateurField = function(){
            $scope.showFieldToAdd = true;
            $scope.resetFields();
        };

        $scope.hideFormateurField = function(){
            $scope.showFieldToAdd = false;
            $scope.resetFields();
        };

        $scope.setFieldOnEdition = function(id){
            $scope.fieldOnEdition = id;
        };
        
        $scope.cancelEdition = function(){
            $scope.fieldOnEdition = undefined;
        };

        $scope.editFormateur = function(cin, nom, prenom, specialite){
            formateurService.edit(cin, nom, prenom, specialite).then(function(){
                formateurService.getAll().then(function(resp){
                    $scope.formateurs = resp.data;
                });
            });
            $scope.cancelEdition();
        };
        
    }]);