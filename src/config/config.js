const pipedriveAPIToken = process.env.PIPEDRIVE_API_TOKEN;
const pipedriveCompanyName = process.env.PIPEDRIVE_COMPANY_NAME;
const blingAPIKey = process.env.BLING_API_KEY;

module.exports = {
    PIPEDRIVE_API_URL: `https://${pipedriveCompanyName}.pipedrive.com/api/v1/deals?status=won&api_token=${pipedriveAPIToken}`,
    BLING_API_URL: `https://bling.com.br/Api/v2/pedido/json/?apikey=${blingAPIKey}`
}
