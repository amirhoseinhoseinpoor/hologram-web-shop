export const PHONE_NUMBER_REGEX = /^09\d{9}$/;

// Page the visitor came from before opening a login / sign up form.
export const getLastPage = () => sessionStorage.getItem("lastPage") || "/";
