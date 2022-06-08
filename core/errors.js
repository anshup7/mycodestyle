const constants = require("./constants");
const exceptionStringsMapper = require("./exceptionStrings");

const commandNotFoundError = new Error(
  JSON.stringify({
    code: constants.NOT_FOUND_ERROR_CODE,
    message: exceptionStringsMapper.COMMAND_NOT_FOUND,
  })
);

const invalidDateError = new Error(JSON.stringify(exceptionStringsMapper.INVALID_DATE));
const noSubscriptionError = new Error(JSON.stringify(exceptionStringsMapper.SUBSCRIPTION_NOT_FOUND));
const topupAddErrorNoSubscriptionError = new Error(JSON.stringify(exceptionStringsMapper.ADD_TOPUP_FAILED_NO_SUBSCRIPTION));
const topupAddErrorDuplicateError = new Error(JSON.stringify(
    exceptionStringsMapper.ADD_TOPUP_FAILED_DUPLICATE_TOPUP
));
const subscriptionAddDuplicateError = new Error(JSON.stringify(
    exceptionStringsMapper.DUPLICATE_SUBSCRIPTION_CATEGORY
));


module.exports = {
    commandNotFoundError,
    invalidDateError,
    topupAddErrorNoSubscriptionError,
    topupAddErrorDuplicateError,
    subscriptionAddDuplicateError,
    noSubscriptionError
};