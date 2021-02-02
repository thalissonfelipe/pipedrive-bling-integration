const pipedriveAPIToken = process.env.PIPEDRIVE_API_TOKEN;
const pipedriveCompanyName = process.env.PIPEDRIVE_COMPANY_NAME;

module.exports = {
    PIPEDRIVE_API_URL: `https://${pipedriveCompanyName}.pipedrive.com/api/v1/deals?status=won&api_token=${pipedriveAPIToken}`,
}
