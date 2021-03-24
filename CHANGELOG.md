## 0.2.0

Breaking

* `onLiveErrorFeedback` has been simplified to receive a `validate` method and to return an array of validations for each field instead of having to call `setFieldError` and `clearFieldError` manually. The `validate` method has some common used validations for string fields such as `min()`, `max()`, `required()`, `lowercase()` and `uppercase()`.
