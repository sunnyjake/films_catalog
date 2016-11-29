angular.module("app", [
    // 'ui.bootstrap
])

.factory("modalFactory", function ($uibModal) {
        return {
            open: function (template, controller, resolve) {
                return $uibModal.open({
                    animation: true,
                    templateUrl: template,
                    controller: controller,
                    resolve: resolve
                });
            }
        };
    })
    // .factory("dataGetter", function ($http) {
    //     return {
    //         function () {
    //             var data = [];
    //             $http({
    //                     url: "/all"
    //                 })
    //                 .then(function (response) {
    //                     $scope.films = [];
    //                     console.log(response);
    //                     for (var i = 0; i < response.data.length; i++) {
    //                         data.push(response.data[i]);
    //                     }
    //                 })
    //                 .catch(function (error) {
    //                     console.log(error);
    //                     data = error;
    //                 });
    //             return data;
    //         }
    //     }
    // })
    .controller("MainController", function ($scope, $http) {
        $scope.filmName;
        $scope.year;
        $scope.films = [];
        $scope.tab = 0;

        //get all the films from server
        $scope.getAllFims = function () {
            $http({
                    url: "/all"
                })
                .then(function (response) {
                    $scope.films = [];
                    console.log(response);
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.films.push(response.data[i]);
                    }
                    console.log($scope.films);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        //add film to the database
        $scope.actors = [];
        $scope.image = '';
        var obj = {
            name: $scope.filmName,
            year: $scope.year,
            actors: $scope.actors,
            image: $scope.image
        };
        $scope.writeFilm = function () {
            $http({
                    // url:"/addFilm?name="+$scope.filmName + "&year="+$scope.year
                    url: "/addFilm",
                    method: "post",
                    data: {
                        name: $scope.filmName,
                        year: $scope.year,
                        actors: $scope.actors,
                        image: $scope.image
                    }
                })
                .then(function (response) {
                    console.log(response);
                    console.log(obj);
                    $scope.films.push({
                        name: $scope.filmName,
                        year: $scope.year,
                        actors: $scope.actors.split(','),
                        image: $scope.image
                    });
                    // $scope.getAllFims();

                    // films.push();
                    //         console.log(response.config.data);
                    //         angular.element(document.getElementById("filmsContent")).append('<div class="row">\
                    //     <div class="col-md-3 col-sm-3 col-xs-12">' + response.data.name + '</div>\
                    //     <div class="col-md-2 col-sm-2 col-xs-12">' + response.data.year + '</div>\
                    // </div>')
                })
                .catch(function (error) {
                    console.log(error);
                });
        };


        $scope.getAllFims();
    })
    .directive("fileread", function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    })
    .filter("searchFor", function () {
        return function (arr, searchStr) {
            if (!searchStr) {
                return arr;
            }
            var result = [];
            angular.forEach(arr, function (item) {
                if (item.name.toLowerCase().indexOf(searchStr) !== -1) {
                    result.push(item);
                }
            });
            return result;
        }
    })
    .controller("ModalController", function ($scope, $uibModalInstance, modalFactory) {
        modalFactory.open(
            "modal_instance.html",
            "ModalController"
        );
        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })