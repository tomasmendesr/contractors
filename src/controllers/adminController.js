const { profileService } = require('../services/profileService');
const { jobService } = require('../services/jobService');
const { contractService } = require('../services/contractService');

const getBestPaidProfession = async (req, res) => {
    const { start, end } = req.query
    if (!start || !end) res.status(404).send('start and end dates are required').end()
    const profiles = await profileService.findAllContractors()
    const professionProfilesMap = new Map()
    profiles.forEach(profile => {
        const profession = profile.dataValues.profession
        const profileIds = professionProfilesMap[profession]
        if (!profileIds) {
            professionProfilesMap.set(profession, [profile.dataValues.id])
            return
        }
        profileIds.push(profile.dataValues.id)
    })
    const contractorIds = profiles.map(profile => profile.dataValues.id)
    const contracts = await contractService.getContractsForContractors(contractorIds)

    const professionBalances = new Map()
    contracts.forEach(async contract => {
        const jobs = await jobService.findJobsBetweenDates(contract.dataValues.id, start, end)
        const jobsTotalAmount = jobService.getJobsPriceSum(jobs)
        let contractorProfession = [...professionProfilesMap.entries()]
            .filter(({ 1: v }) => v.contains(contract.dataValues.ContractorId))
            .map(([k]) => k);
        const professionBalance = professionBalances.get(contractorProfession) || 0
        professionBalances.set(contractorProfession, professionBalance + jobsTotalAmount)
    })
    
    let bestPaidProfession = ''
    let maxPaid = 0
    professionBalances.forEach((profession, balance) => {
        if (balance > maxPaid) {
            bestPaidProfession = profession
            maxPaid = balance
        }
    })
    res.json({bestProfession: bestPaidProfession})
}

const adminController = {
    getBestPaidProfession,
}

module.exports = {
    adminController,
}