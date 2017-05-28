'use strict';
angular
    .module('stagiaireApp')
    .service('formateurService', ['$filter', '$http', function ($filter, $http) {
        
        this.getAll = function () {
            return $http.get('/formateur');;
        };

        this.delete = function (cin) {
            return $http.delete('/formateur/' + cin);
        };

        this.add = function (cin, nom, prenom, specialite){
            var data = {'cin': cin, 'nom': nom, 'prenom': prenom, 'specialite': specialite};
            return $http.post('/formateur', data);
        };
        
        this.edit = function (cin, nom, prenom, specialite){
            var data = {'cin': cin, 'nom': nom, 'prenom': prenom, 'specialite': specialite};
            return $http.put('/formateur', data);
        };

        this.findTrip = function (from, to) {
            var trips = this.getAll();
            return $filter('filter')(trips, {from: from, to: to})[0];
            //My version
            //var trip = this.getAll().find(x => x.id == id);
            //return trip;
        };
    }]);