class Currency < ApplicationRecord
    COINMARKETCAP_API_KEY = ENV['coinmarketcap_api_key']
    def current_price
        url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug='
        request = HTTParty.get(url + self.slug, :headers => {"X-CMC_PRO_API_KEY" => COINMARKETCAP_API_KEY})
        response = JSON.parse(request.body)["data"]["1"]["quote"]["USD"]["price"]
    end
end
