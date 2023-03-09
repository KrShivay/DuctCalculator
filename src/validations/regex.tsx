export const phoneRegex = new RegExp(/^[6-9]\d{9}$/);
export const otpRegex = new RegExp(/^\d{4}$/);
export const nameRegex = new RegExp(/^[a-zA-Z\s ()_,.\/-]*$/);
export const percentRegex = new RegExp(
  /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/g,
);
export const urlRegexs = new RegExp(
  '^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$',
  'i',
); // validate fragment locator
export const urlRegex = new RegExp(
  '^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$',
);
export const emailRegEx = new RegExp(
  /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/,
);
