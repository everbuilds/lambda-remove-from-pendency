var AWS = require("aws-sdk");



exports.handler = async (event) => {
    
    var deleted=false;

    try{
        const userId = JSON.parse(event.body).delete || null;
        if(userId){
            AWS.config.update({ region: "eu-central-1" });
            var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
            var paramsDelete = {
                Key: {
                    "PlayerId": {
                        S: userId
                    }
                },
                TableName: "LobbyRegistration"
            };
        
            await ddb.deleteItem(paramsDelete, function(err, data) { 
                if (err) {
                    console.log("Delete for ", userId, " gone wrong", err);
                }else if(data){
                    deleted = true;
                }
            }).promise();
        }
        
    } catch(e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify({"success":deleted}),
    };
};