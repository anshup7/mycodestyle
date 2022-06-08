class SubscriptionModels {
    constructor() {
        this.musicSubscriptionCategories = {
            FREE: {
                cost: 0,
                month: 1
            },
            PERSONAL: {
                cost: 100,
                month: 1
            },
            PREMIUM: {
                cost: 250,
                month: 3
            },
            added: false
        };

        this.videoSubscriptionCategories = {
            FREE: {
                cost: 0,
                month: 1
            },
            PERSONAL: {
                cost: 200,
                month: 1
            },
            PREMIUM: {
                cost: 500,
                month: 3
            },
            added: false
        };

        this.podcastSubscriptionCategories = {
            FREE: {
                cost: 0,
                month: 1
            },
            PERSONAL: {
                cost: 100,
                month: 1
            },
            PREMIUM: {
                cost: 300,
                month: 3
            },
            added: false
        };

        this.topupSubscriptionCategories = {
            FOUR_DEVICE: {
                upto: 4, //devices
                cost: 50,
                month: 1
            },
            TEN_DEVICE: {
                upto: 10, //devices
                cost: 100,
                month: 1
            },
            added: false,
            can_add: false // will become true iff any one of subscription category is added
        };
    }
}

module.exports = SubscriptionModels;