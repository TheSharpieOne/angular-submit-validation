const moduleName = 'validation.form';

function form() {
  return {
    require: 'form',
    restrict: 'E',
    link: {
      pre: function (scope, element, attributes, formCtrl) {

        attributes.$set('novalidate', 'novalidate');

        var validateForm = form => {
          angular.forEach(form, (formElement, fieldName) => {
            if (fieldName[0] === '$') {
              return;
            }
            if (!angular.isFunction(formElement.$setTouched)) {
              return validateForm(formElement);
            }

            var needsToValidate = !(formElement.$dirty && formElement.$touched) || formElement.$invalid;

            formElement.$setDirty();
            formElement.$setTouched();

            if (needsToValidate) {
              formElement.$validate();
            }
          });
          form.$setDirty();
          
          if(angular.isFunction(form.$setSubmitted)) {
            form.$setSubmitted();
          }
        };

        element.on('submit', (e) => {
          validateForm(formCtrl);
          scope.$apply();

          if (attributes.ngSubmit && !formCtrl.$submitting && (formCtrl.$valid || attributes.allowInvalidSubmission)) {
            //run ng-submit
            formCtrl.$submitting = scope.$eval(attributes.ngSubmit, {$event: e});

            // ng-submit function should return a promise if it wants to prevent multiple simultaneous submissions of the same form
            if (angular.isObject(formCtrl.$submitting) && angular.isFunction(formCtrl.$submitting.finally)) {
              formCtrl.$submitting.finally(resp => {
                formCtrl.$submitting = false;
                return resp;
              });
            } else {
              formCtrl.$submitting = false;
            }
          } else if (!attributes.ngSubmit && attributes.allowInvalidSubmission) {
            return;
          }

          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        });
      }
    }
  };
}

angular.module(moduleName, [])
  .directive('form', form);

export default moduleName;
