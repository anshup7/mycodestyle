const Models = require("./models");
const constants = require("./constants");
const exceptionStringMapper = require("./exceptionStrings");

class CostCalculator extends Models {
    constructor() {
        super();
    }

    get music() {
        return this.musicSubscriptionCategories;
    }

    get video() {
        return this.videoSubscriptionCategories;
    }

    get podcast() {
        return this.podcastSubscriptionCategories;
    }

    get topup() {
        return this.topupSubscriptionCategories;
    }

    musicCost(plan) {
        const costObj = this.music[plan];
        if(!costObj) {
            throw {
                code: constants.UNAUTHORIZED_ERROR_CODE,
                message: exceptionStringMapper.INVALID_PLAN_MUSIC
            };
        }
        this.music.added = true;
        this.totalRenewCost += costObj.cost;
        this.generateOutputPrintingArray("MUSIC", costObj);
    }

    videoCost(plan) {
        const costObj = this.video[plan];
        if(!costObj) throw {
            code: constants.UNAUTHORIZED_ERROR_CODE,
            message: exceptionStringMapper.INVALID_PLAN_VIDEO
        };
        this.totalRenewCost += costObj.cost;
        this.video.added = true;
        this.generateOutputPrintingArray("VIDEO", costObj);
    }

    podcastCost(plan) {
        const costObj = this.podcast[plan];
        if(!costObj) throw {
            code: constants.UNAUTHORIZED_ERROR_CODE,
            message: exceptionStringMapper.INVALID_PLAN_PODCAST
        };
        this.totalRenewCost += costObj.cost;
        this.podcast.added = true;
        this.generateOutputPrintingArray("PODCAST", costObj);
    }

    topupCost(plan, month) {
        const costObj = this.topup[plan];
        if(!costObj) throw {
            code: constants.UNAUTHORIZED_ERROR_CODE,
            message: exceptionStringMapper.INVALID_PLAN_TOPUP
        };

        this.totalRenewCost += (costObj.cost * month);
        this.topup.added = true;
    }
}

module.exports = CostCalculator;