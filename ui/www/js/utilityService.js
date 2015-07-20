var UtilityService = angular.module('UtilityService', []);

UtilityService.service('LocalStorageService', ['$window', '$q', function($window, $q) {

        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key) {
                return $window.localStorage[key] || '';
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);

            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }

    }
]);

UtilityService.service('ToastService', ['$window', '$q', function($window, $q){
    return {
        setSuccessLoginMessage: function(platform) {
                var loginMessage = "You have been successfully logged in with " + platform;
                $window.plugins.toast.showLongBottom(loginMessage);
                return;
        },

        showMessage : function(msg){
            $window.plugins.toast.showLongBottom(msg);
        },
        
        showConnMessage : function(msg){
            $window.plugins.toast.showLongCenter(msg);
        },

        showShortMessage : function(msg){
            $window.plugins.toast.showShortBottom(msg)
        }
    }

}]);

UtilityService.service('ShareService', ['ToastService',
    function(ToastService) {

        return {

            shareViaFB: function(shareMessage) {
                window.plugins.socialsharing.shareViaFacebook(
                    shareMessage,
                    null /* img */ ,
                    'http://www.madzz.co.in/' /* url */ ,
                    function(msg) {
                        ToastService.showShortMessage('Thank you for sharing on facebook');
                    },
                    function(msg) {
                        ToastService.showShortMessage('Could not share' + msg);
                    }
                );
            },

            shareViaTwitter: function(shareMessage) {
                window.plugins.socialsharing.shareViaTwitter(
                    shareMessage,
                    null /* img */ ,
                    'http://www.madzz.co.in/' /* url */ ,
                    function(msg) {
                        ToastService.showShortMessage('Thank you for sharing on twitter');
                    },
                    function(msg) {
                        ToastService.showShortMessage('Could not share' + msg);
                    }
                );
            },

            shareViaWhatsApp: function(shareMessage) {
                window.plugins.socialsharing.shareViaWhatsApp(
                    shareMessage,
                    null /* img */ ,
                    'http://www.madzz.co.in/' /* url */ ,
                    function(msg) {
                        ToastService.showShortMessage('Thank you for sharing on whatsapp');
                    },
                    function(msg) {
                        ToastService.showShortMessage('Could not share' + msg);
                    }
                );
            },

            shareViaHangouts: function(shareMessage) {
                window.plugins.socialsharing.shareViaSMS(
                    shareMessage,
                    'http://www.madzz.co.in/' /* url */ ,
                    function(msg) {
                        ToastService.showShortMessage('Thank you for sharing on hangouts');
                    },
                    function(msg) {
                        ToastService.showShortMessage('Could not share' + msg);
                    }
                );
            }
        }
    }
]);

UtilityService.service('SessionStorageService', ['$window', '$q',
    function($window, $q) {

        return {

            set: function(key, value) {
                $window.sessionStorage.setItem(key, value);
            },

            get: function(key) {
                return $window.sessionStorage.getItem(key) || false;
            }
        }
    }
]);

UtilityService.service('ConnectionService', [ function() {
        return {
            connectionStatus: function() {

                /*var networkState = navigator.connection.type;

                if(networkState == "wifi"){

                    return true;
                }

                else if(networkState == "cellular"){
                    return true;
                }

                else if(networkState == "4g"){
                    return true;
                }

                else if(networkState == "3g"){
                    return true;
                }

                else if(networkState == "2g"){
                    return true;
                }

                else if(networkState == "unknown"){
                    return false;
                }

                else if(networkState == "ethernet"){
                    return false;
                }

                else{
                    return false;
                }*/return true;
 


                

            }

        }
    }
])


UtilityService.service('RemoteDataService', ['$http', '$ionicLoading', '$q', '$state', 'domainUrl', '$window',
 'ConnectionService', 'ToastService',
    function($http, $ionicLoading, $q, $state, domainUrl, $window, ConnectionService, ToastService) {

        return {

            fetchData: function(remoteDataPath, cacheValue, hasPagination) {
                if(ConnectionService.connectionStatus()){
                    if(hasPagination == undefined){
                        hasPagination = false;
                    }
                    if(hasPagination){
                        $ionicLoading.hide();
                    }
                    else{
                        $ionicLoading.show({template: '<i class="icon ion-looping"></i>'});
                    }
                    var deferred = $q.defer();
                    var url = domainUrl + remoteDataPath;
                    
                    $http.get(url, {
                        cache: cacheValue || false
                    }).then(
                        function(resp) {
                            $ionicLoading.hide();
                            
                            deferred.resolve(resp.data)
                            
                        },
                        function(err) {
                            $ionicLoading.hide();
                            
                            deferred.reject(err);
                        }
                    )
                    return deferred.promise;
                }
                else{
                    ;
                }
            }
        };

    }
]);

UtilityService.service('ShareService', ['ToastService',
    function(ToastService) {

        return {

            shareViaFB: function(shareMessage) {
                window.plugins.socialsharing.shareViaFacebook(
                    shareMessage,
                    null /* img */ ,
                    'http://www.madzz.co.in/' /* url */ ,
                    function(msg) {
                        ToastService.setCorrectMessage('Facebook');
                    },
                    function(msg) {
                        ToastService.setErrorMessage('Facebook', msg);
                    }
                );
            },

            shareViaTwitter: function(shareMessage) {
                window.plugins.socialsharing.shareViaTwitter(
                    shareMessage,
                    null /* img */ ,
                    'http://www.madzz.co.in/',
                    function(msg) {
                        ToastService.setSuccessMessage('Twitter');
                    },
                    function(msg) {
                        ToastService.setErrorMessage('Twitter', msg);
                    }
                );
            },

            shareViaWhatsApp: function(shareMessage) {
                window.plugins.socialsharing.shareViaWhatsApp(
                    shareMessage,
                    null /* img */ ,
                    'http://www.madzz.co.in/' /* url */ ,
                    function(msg) {
                        ToastService.setSuccessMessage('WhatsApp');
                    },
                    function(msg) {
                        ToastService.setErrorMessage('WhatsApp', msg);
                    }
                );
            },

            shareViaHangouts: function(shareMessage) {
                window.plugins.socialsharing.shareViaSMS(
                    shareMessage,
                    ' ',
                    function(msg) {
                        ToastService.setSuccessMessage('Hangouts');
                    },
                    function(msg) {
                        ToastService.setErrorMessage('Hangouts', msg);
                    }
                );
            }
        }
    }
]);
