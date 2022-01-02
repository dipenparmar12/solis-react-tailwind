/* eslint-disable no-useless-escape */
const regExp = {
  // @src: https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204
  mobile:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
}

export default regExp
