const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;
const url = require('url');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

    .get('/math', function (request, response) {
        handleMath(request, response);
    })

    .get('/', (req, res) => res.render('pages/index'))    
    .listen(PORT, () => console.log(`Listening on ${PORT}`))

    function handleMath(request, response) {
        var requestUrl = url.parse(request.url, true);
        console.log("Query parameters: " + JSON.stringify(requestUrl.query));

        var mathFunction = requestUrl.query.mathFunction;
        var value1 = Number(requestUrl.query.value1);
        var value2 = Number(requestUrl.query.value2);

        calculate(response, mathFunction, value1, value2);
    }

    function calculate(response, mathFunction, value1, value2) {
        mathFunction = mathFunction.toLowerCase();

        var result = 0;
        var mathSymbol = "";
        switch (mathFunction) {
            case "add":
                result = value1 + value2;
                mathSymbol = " + ";
                break;
            case "subtract":
                result = value1 - value2;
                mathSymbol = " - ";
                break;
            case "multiply":
                result = value1 * value2;
                mathSymbol = " * ";
                break;
            case "divide":
                result = value1 / value2;
                mathSymbol = " / ";
                break;
            default:
                result = NaN;
        }

    var params = { mathSymbol: mathSymbol, value1: value1, value2: value2, result: result };

    response.render('pages/result', params);

}
