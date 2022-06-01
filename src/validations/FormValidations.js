//Email must be valid (name@example.com)
export const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//Password must be 8 characters min
export const passwordRegex = /.{8,}/;

//Name must contain only alphanumerics
export const nameRegex = /\w{4,}/;

//File must be an image only
export const isValidImage = (file) => file.type.split('/')[0] === 'image';
