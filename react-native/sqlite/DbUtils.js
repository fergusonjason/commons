import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);

open = (dbparams) => {

    return SQLite.openDatabase({ name: dbparams.name, createFromLocation: dbparams.createFromLocation });

}

close = (db) => {

    db.close(() => {
        console.log("Database closed")
    }, (err) => {
        console.warn("Error closing database: Code: " + err.code + ", message: " + err.message + "(" + JSON.stringify(err) + ")");
    });

}

query = async (db, sql, params) => {

    console.log("Entered query: db: " + JSON.stringify(db));

    if (db === undefined) {
        console.log("DB is undefined inside query");
    }

    // figured this out from https://stackoverflow.com/questions/47345000/react-native-handling-async-calls-to-sqllite-db
    // TODO: Fix this so that it just returns an array, not {result: []}
    let queryResult = new Promise((resolve, reject) => {

        db.readTransaction((tx) => {
            console.log("Beginning transaction");

            tx.executeSql(sql, params, (tx, rs) => {
                let length = rs.rows.length;
                let result = [];

                for (i = 0; i < length; i++) {
                    result.push(rs.rows.item(i));
                }

                resolve({ result });
            }, (err) => { 
                console.log("Error occured executing sql: code: " + err.code + ", message: " + err.message + "(" + JSON.stringify(err) + ")");

            });


        });
    });

    return await queryResult;
}


execute = async (db, sql, params) => {

    console.log("Entered execute()");

    let result =  new Promise((resolve, reject) => {
        db.transaction((tx) => {
            console.log("Beginning transaction");
            tx.executeSql(sql, params, (tx, rs) => {

                let hasErrors = false;
                let errorMessage = "";
                let sqliteErrorCode = -1;
                let rowsAffected = rs.rowsAffected;
                
                resolve({hasErrors, errorMessage, sqliteErrorCode, rowsAffected});

            });
        }, (err) => {
            console.log("Error occured in sql: code: " + err.code + ", message: " + err.message);

            // use a regular expression to extract the error message and sqlite error code
            let message = err.message;
            let regex = /^(.*) \(code (\d+)\)$/g;
            let regexResult = regex.exec(message);

            let hasErrors = true;
            let errorMessage = regexResult[1];
            let sqliteErrorCode = new Number(regexResult[2]);
            let rowsAffected = 0;

            resolve({hasErrors, errorMessage, sqliteErrorCode, rowsAffected});
        });
    });


    let queryResult = await result;

    console.log("Exiting execute(), queryResult: " + JSON.stringify(queryResult));
    return queryResult;

}

export { open, close, query, execute };
