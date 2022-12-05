const { Op } = require("sequelize")
const { Profile } = require('../model');

// amount can be negative
const updateBalance = async (profileId, amount) => {
    const profile = await Profile.findOne({
        where: {id: profileId}
    })
    profile.balance = profile.balance + amount
    saveProfile(profile)
}

const saveProfile = async (profile) => {
    profile.updatedAt = new Date()
    await profile.save()
}

const profileService = {
    updateBalance,
}

module.exports = {
    profileService,
}