//Email must be valid (name@example.com)
export const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//Password must be 8 characters min
export const passwordRegex = /.{8,}/;

//Name must contain only alphanumerics and max 25
export const nameRegex = /^\w{4,25}$/;

//File must be an image only
export const isValidImage = (file) => file.type.split('/')[0] === 'image';

//Name must contain only alphanumerics and 67 characters max
export const certificateNameRegex = /^\w{4,67}$/;
