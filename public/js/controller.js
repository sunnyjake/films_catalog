angular.module("app",[])

    .controller("MainController",function($scope, $http){
        $scope.filmName;
        $scope.year;

        $scope.writeFilm = function(){
            $http({
                url:"/addFilm",
                data:{
                    name:$scope.filmName,
                    year: $scope.year
                }
            })
            .then(function(response){
                console.log(response);
                console.log(response.config.data);
                angular.element(document.getElementById("filmsContent")).append('<div class="row">\
            <div class="col-md-3 col-sm-3 col-xs-12">' + response.config.data.name + '</div>\
            <div class="col-md-2 col-sm-2 col-xs-12">' + response.config.data.year + '</div>\
        </div>')
            })
            .catch(function(error){
                console.log(error);
            });
        };

        $scope.films = [];
        $scope.getAllFims = function(){
            $http({
                url: "/all"
            })
            .then(function(response){
                // console.log(response);
                for(var i = 0; i < response.data.length; i++){
                    $scope.films.push(response.data[i]);
                }
                console.log($scope.films);
            })
            .catch(function(error){
                console.log(error);
            });
        };
        $scope.getAllFims();
    })