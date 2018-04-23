
var request = require("request");

// request({
//     uri: "https://bluestacks.wufoo.com/api/v3/forms/ryy8lz81az6nqm/fields.json",
//     method: "GET",
//     auth: {
//         'username': 'UANM-158V-0AI6-ET37',
//         'password': 'chubawip',
//         'sendImmediately': false
//     }
// }, function (error, response, body) {
//     console.log(JSON.stringify(JSON.parse(body), null, 2))
// });


request({
    uri: "https://bluestacks.wufoo.com/api/v3/forms/ryy8lz81az6nqm/entries.json",
    method: "POST",
    auth: {
        'username': 'UANM-158V-0AI6-ET37',
        'password': 'chubawip',
        'sendImmediately': false
    },
    form: {
        'Field9': 'thomas',
        'Field11': 'thom@fuerzastudio.com.br'
    }
}, function (error, response, body) {
    console.log(body)
});

