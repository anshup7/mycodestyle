const assert = require("assert");
const Biller = require("./biller");
const errors = require("./core/errors");
const validCommands = [
  "START_SUBSCRIPTION",
  "ADD_SUBSCRIPTION",
  "ADD_TOPUP",
  "PRINT_RENEWAL_DETAILS",
];

describe(`Command not found`, function () {
  it(`should throw when command is not one of ${validCommands.join(",")}`, function () {
    assert.throws(
      () => new Biller([["abc", "2022"]]).main(),
      errors.commandNotFoundError
    );
  });
});

describe(`Invalid Date`, function () {
  it(`should throw when date format is not of format DD-MM-YYYY or simply invalid`, function () {
    assert.throws(
      () => new Biller([["START_SUBSCRIPTION", "2022"]]).main(),
      errors.invalidDateError
    );
  });
});

describe(`Print Renewal`, function () {
  it(`should throw when printing without adding Subscription`, function () {
    assert.throws(
      () => new Biller([["START_SUBSCRIPTION", "23-03-2022"], ["PRINT_RENEWAL_DETAILS"]]).main(),
      errors.noSubscriptionError
    );
  });
});

describe(`Add Topup`, function () {
  it(`should throw when topup is being added without adding subscriptions`, function () {
    assert.throws(
      () => new Biller([["START_SUBSCRIPTION", "23-03-2022"], ["ADD_TOPUP", "FOUR_DEVICE", "4"]]).main(),
      errors.topupAddErrorNoSubscriptionError
    );
  });
  it(`should throw when duplicate topup is being added`, function () {
    assert.throws(
      () => new Biller([
          ["START_SUBSCRIPTION", "23-03-2022"], 
          ["ADD_SUBSCRIPTION", "MUSIC", "FREE"],
          ["ADD_TOPUP", "FOUR_DEVICE", "4"],
          ["ADD_TOPUP", "FOUR_DEVICE", "4"]
    ]).main(),
      errors.topupAddErrorDuplicateError
    );
  });
});

describe(`Add Subscription`, function () {
  it(`should throw when duplicate subscriptions are being added`, function () {
    assert.throws(
      () => new Biller([
          ["START_SUBSCRIPTION", "23-03-2022"], 
          ["ADD_SUBSCRIPTION", "MUSIC", "FREE"],
          ["ADD_SUBSCRIPTION", "MUSIC", "FREE"],
          ["ADD_TOPUP", "FOUR_DEVICE", "4"]
    ]).main(),
      errors.subscriptionAddDuplicateError
    );
  });
});