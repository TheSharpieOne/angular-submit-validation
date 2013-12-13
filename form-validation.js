app.directive('form', function () {
    return {
        require: 'form',
        restrict: 'E',
        link: function( scope , element , attributes ){
            var $element = $(element);
            $element.on('submit', function(e) {
                $element.find('.ng-pristine').removeClass('ng-pristine').addClass('ng-dirty');
                var form = scope[ attributes.name ];
                angular.forEach( form , function ( formElement , fieldName ) {
                    if ( fieldName[0] === '$' ) return;
                    formElement.$pristine = false;
                    formElement.$dirty = true;
                },this);
                form.$setDirty();
                scope.$apply();
            });
        }
    };
});
