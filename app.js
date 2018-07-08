const axios = require('axios');

module.exports = {
    sayHello: function() {
        return 'hello';
    },
    addNumbers: function(value1, value2) {
        return value1 + value2;
    },
    checkAnswers: function(){
        return axios.get('http://yesno.wtf/api/')
                    .then(function(resp){
                        return resp.data.answer;
                    }).catch(function(error){
                        return error;
                    });
    }

};