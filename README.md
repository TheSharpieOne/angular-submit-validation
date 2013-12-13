angular-submit-validation
=======================

Validates the form on form submission.  It will set the classes and properties that would normally be set when a field is validated by angular.

Usage:
------
This directive based on the normal HTML ```<form>``` element. No need to add an attribute, use a special tag or class. Just make sure the directive is loaded and it will attach to all ```<form>```s.

```html
<form name="myForm" ng-submit="myFormHandler" novalidate="novalidate">
    <input ng-model="myVar" required="required">
    <input type="submit" value="Go!">
</form>
```
```novalidate``` will disable the browser’s native validation, you probably don't want the native validation to happen.



Note:
This does NOT prevent the submission of the form if it is invalid!  You should use ```ng-submit``` and provide a handler to check if the form is valid.  This only runs the “standard angular validation” to provide “standard angular form markup” and makes no assumptions after that.
