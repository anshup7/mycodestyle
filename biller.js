const moment = require("moment");
const CostCalculator = require("./core/costCalculator");
const constants = require("./core/constants");
const exceptionStringsMapper = require("./core/exceptionStrings");

class Biller extends CostCalculator {
    constructor(data) {
        super();
        this.input = data;
        this.subscriptionStartDate = "";
        this.totalRenewCost = 0;
        this.outputPrintingArray = []; //contains printing references in the order they were received
    }

    generateOutputPrintingArray(category, plan) {
        const renewDate = moment(this.subscriptionStartDate, constants.DATE_FORMAT)
        .add(plan.month, "month")
        .subtract(constants.DAYS_BEFORE_RENEWAL, "days")
        .format(constants.DATE_FORMAT);
        this.outputPrintingArray.push(`RENEWAL_REMINDER ${category} ${renewDate}`);
    }

    processSubscriptionStart(command) {
        this.subscriptionStartDate = moment(
        command[constants.SUBSCRIPTION_START_DATE_INDEX],
            constants.DATE_FORMAT
        );
        if(!this.subscriptionStartDate.isValid()) {
            throw exceptionStringsMapper.INVALID_DATE;
        }     
    }

    processAddSubscription(command) {
         const subscriptionCategory = command[constants.SUBSCRIPTION_CATEGORY_INDEX]
        .toLowerCase();
        if(this[subscriptionCategory].added) {
            throw exceptionStringsMapper.DUPLICATE_SUBSCRIPTION_CATEGORY;
        }
        this[`${subscriptionCategory}Cost`](command[constants.PLAN_NAME_INDEX]);
        this.topup.can_add = true;
    }

    processAddTopup(command) {
        if (!this.topup.can_add) {
            throw exceptionStringsMapper.ADD_TOPUP_FAILED_NO_SUBSCRIPTION;
        };
        if(this.topup.added) {
            throw exceptionStringsMapper.ADD_TOPUP_FAILED_DUPLICATE_TOPUP;
        }
        this.topupCost(
            command[constants.SUBSCRIPTION_CATEGORY_INDEX], 
            command[constants.PLAN_NAME_INDEX]
        );
    }

    processPrintRenewalDetails() {
         if(this.outputPrintingArray.length <= 0) {
            throw exceptionStringsMapper.SUBSCRIPTION_NOT_FOUND;
        }
        this.outputPrintingArray.push(`RENEWAL_AMOUNT ${this.totalRenewCost}`);
        for (let print of this.outputPrintingArray) {
            console.log(print);
        }
    }

    processCommand(command) { // command is typeof array containg splitted input line
            switch(command[constants.COMMAND_INDEX]) {
                case "START_SUBSCRIPTION": {
                    this.processSubscriptionStart(command);       
                    break;
                }
                case "ADD_SUBSCRIPTION": {
                    this.processAddSubscription(command);
                    break;
                } 
                case "ADD_TOPUP": {
                    this.processAddTopup(command);
                    break;
                }

                case "PRINT_RENEWAL_DETAILS": {
                    this.processPrintRenewalDetails();
                    break;
                }

                default: {
                    console.log(command);
                    throw {
                        code: constants.NOT_FOUND_ERROR_CODE,
                        message: exceptionStringsMapper.COMMAND_NOT_FOUND
                    };
                }
            }
    }

    main() {
        try {
            for(let command of this.input) {
                this.processCommand(command, command.length);
            }
        } catch(error) {
            throw new Error(JSON.stringify(error));
        }
    }
}

module.exports = Biller;