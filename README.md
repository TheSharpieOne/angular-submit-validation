angular-submit-validation
=======================

Validates the form on form submission.  It will set the classes and properties that would normally be set when a field is validated by angular.

Usage:
------
This directive based on the normal HTML ```<form>``` element. The form needs a `name` attribute. Just make sure the directive is loaded and it will attach to all ```<form>```s.

```html
<form name="myForm" ng-submit="myFormHandler(myVar)" novalidate="novalidate">
    <input ng-model="myVar" required="required">
    <input type="submit" value="Go!">
</form>
```
```novalidate``` will disable the browser’s native validation, you probably don't want the native validation to happen.



Note:
This does prevent the submission of the form if it is invalid!  You can use the `allowInvalidSubmission` attribute to allow the submission of (triggering of `ngSubmit` with invalid values). If `ngSubmit` returns a promise, the form will not be allowed to submit again until the promise is resolved/rejected (works great if you return a call to `$http` for ajax submissions). The `$submitting` proprty on the form (would be `myForm.$submitting` in the example above) will be true while the promise is pending, which is useful for showing a loading indicator.
This will trigger the validation of all of the inputs in all of the [nested] forms (use `ngForm` to nest for browser compatibility).
