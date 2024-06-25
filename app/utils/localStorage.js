import { getParcoursContents } from "./queries";
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from 'expo-sqlite';

class LocalDatabaseService {
    constructor() {
        this.db = SQLite.openDatabase('localdb');
        this.createTables();
    }

    execSql(query, params = []) {
        return new Promise((resolve, reject) => {
          this.db.transaction(tx => {
            tx.executeSql(
              query,
              params,
              (_, result) => resolve(result),
              (_, error) => reject(error)
            );
          });
        });
    };

    async createTables() {
        try {
            await this.execSql(
                `CREATE TABLE IF NOT EXISTS Parcours (
                    identifiant TEXT PRIMARY KEY,
                    commune TEXT,
                    code_postal TEXT,
                    description TEXT,
                    difficulte TEXT,
                    duree TEXT,
                    etape_max TEXT,
                    image_url TEXT,
                    titre TEXT,
                    score TEXT,
                    score_max TEXT
                )`/*,
                [],
                (tx, results) => { console.log('Parcours table created'); },
                (tx, error) => { console.error('Error creating Parcours table', error.message); }*/
            );
            console.log('Parcours table created');
            await this.execSql(
                `CREATE TABLE IF NOT EXISTS Etapes (
                    identifiant TEXT PRIMARY KEY,
                    parcours_id TEXT,
                    etape_data TEXT,
                    FOREIGN KEY(parcours_id) REFERENCES Parcours(identifiant)
                )`/*,
                [],
                () => { console.log('Etapes table created'); },
                (tx, error) => { console.error('Error creating Etapes table', error.message); }*/
            );
            console.log('Etapes table created');
            await this.execSql(
                `CREATE TABLE IF NOT EXISTS GameHistory (
                    identifiant INTEGER PRIMARY KEY AUTOINCREMENT,
                    parcours_id TEXT,
                    score INTEGER,
                    score_max INTEGER,
                    date TEXT
                )`/*,
                [],
                () => { console.log('GameHistory table created'); },
                (tx, error) => { console.error('Error creating GameHistory table', error.message); }*/
            );
            console.log('GameHistory table created');
        } catch (error) { console.log(error.message); };
    }

    async checkParcours(identifiant) {
        const result = await this.execSql('SELECT * FROM Parcours WHERE identifiant = ?', [identifiant]);
        return result;
    }

    async telechargerParcoursContents(parcours, successCallback, errorCallback, internetErrorCallback) {
        NetInfo.fetch().then((state) => { // Internet connection state
            if (!state.isInternetReachable) {
                internetErrorCallback();
            } else {
                console.log("Internet connection established");
                getParcoursContents(parcours.identifiant).then((result) => { // fetch data from firebase
                    const etapes = result.etapes;
                    console.log("Firebase data fetched");
                    this.db.transaction(tx => { // save it in local storage
                        tx.executeSql(
                            'INSERT OR IGNORE INTO Parcours (identifiant, commune, image_url, code_postal, description, difficulte, duree, etape_max, titre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                            [parcours.identifiant, parcours.commune, parcours.image_url, result.code_postal, parcours.description, parcours.difficulte, parcours.duree, parcours.etape_max, parcours.titre],
                            (tx, results) => { console.log("parcours inséré"); },
                            (tx, error) => { console.log("parcours non inséré"); }
                        );
                        etapes.forEach(async (etape) => {
                            tx.executeSql(
                                'INSERT OR IGNORE INTO Etapes (identifiant, parcours_id, etape_data) VALUES (?, ?, ?)',
                                [etape.id_etape, parcours.identifiant, JSON.stringify(etape)],
                                (tx, results) => {  },
                                (tx, error) => { console.log("étape non insérée"); }
                            );
                        });
                        console.log(etapes.length, "étape(s) insérée(s)");
                    }, false);

                    if (successCallback) successCallback();
                });
            }
        }).catch((error) => {
            errorCallback("Error while retrieving circuit content : " + error.message);
        })
    }
   
    /*async telechargerParcours(id, successCallback, errorCallback) {
        return new Promise(async (resolve, reject) => {
            try {
                const state = await NetInfo.fetch();
                if (!state.isInternetReachable) {
                    errorCallback("Internet indisponible");
                    reject("Internet indisponible");
                    return;
                }

                const parcours = await getParcoursContents(id);
                const etapes = parcours.etapes;
                const general = parcours.general;

                this.db.transaction(tx => {
                    tx.executeSql(
                        'INSERT OR IGNORE INTO Parcours (identifiant, commune, code_postal, description, difficulte, duree, etape_max, titre) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [id, general.commune, general.code_postal, general.description, general.difficulte, general.duree, general.etape_max, general.titre],
                        (tx, results) => {
                            const etapePromises = etapes.map(etape => {
                                return new Promise((etapeResolve, etapeReject) => {
                                    tx.executeSql(
                                        'INSERT OR IGNORE INTO Etapes (identifiant, parcours_id, etape_data) VALUES (?, ?, ?)',
                                        [etape.identifiant, general.identifiant, JSON.stringify(etape)],
                                        (tx, results) => {
                                            if (etape.audio) {
                                                const audioPromises = etape.audio.map(audio => {
                                                    return new Promise((audioResolve, audioReject) => {
                                                        tx.executeSql(
                                                            'INSERT OR IGNORE INTO Audio (etape_id, audio_data) VALUES (?, ?)',
                                                            [etape.identifiant, audio.data],
                                                            () => {
                                                                audioResolve();
                                                            },
                                                            (tx, error) => {
                                                                audioReject("INSERT audio error : " + error.message);
                                                            }
                                                        );
                                                    });
                                                });

                                                Promise.all(audioPromises)
                                                    .then(() => etapeResolve())
                                                    .catch(audioError => etapeReject(audioError));
                                            } else {
                                                etapeResolve();
                                            }
                                        },
                                        (tx, error) => {
                                            etapeReject("INSERT etape error : " + error.message);
                                        }
                                    );
                                });
                            });

                            Promise.all(etapePromises)
                                .then(() => {
                                    if (successCallback) successCallback();
                                    resolve();
                                })
                                .catch(etapeError => {
                                    reject(etapeError);
                                    errorCallback(etapeError);
                                });
                        },
                        (tx, error) => {
                            reject("INSERT OR IGNORE error : " + error.message);
                            errorCallback("INSERT OR IGNORE error : " + error.message);
                        }
                    );
                }, (transactionError) => {
                    reject("Local database transaction error : " + transactionError.message);
                    errorCallback("Local database transaction error : " + transactionError.message);
                });
            } catch (error) {
                reject("Error while retrieving circuit content : " + error.message);
                errorCallback("Error while retrieving circuit content : " + error.message);
            }
        });
    }*/

    saveGameInHistory(parcoursId, score, score_max, errorCallback) {
        this.db.transaction((tx) => {
            tx.executeSql(
                'INSERT OR IGNORE INTO GameHistory (parcours_id, score, score_max, date) VALUES (?, ?, ?, ?)',
                [parcoursId, score, score_max, new Date().toISOString()],
                null,
                (tx, error) => {
                    errorCallback("INSERT error : " + error.message);
                }
            );
        }, (error) => {
            errorCallback("Local database transaction error : " + error.message);
        });
    }

    getParcours(identifiant, successCallback, errorCallback = (errorMessage) => { console.error(errorMessage); }) {
        this.db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Parcours WHERE identifiant = ?',
                [identifiant],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        const parcours = { general: results.rows.item(0) };
                        console.log("parcours chargé");

                        tx.executeSql(
                            'SELECT * FROM Etapes WHERE parcours_id = ?',
                            [parcours.general.identifiant],
                            (tx, etapeResults) => {
                                parcours.etapes = [];
                                for (let j = 0; j < etapeResults.rows.length; j++) {
                                    let etape = etapeResults.rows.item(j);
                                    etape = JSON.parse(etape.etape_data);
                                    parcours.etapes.push(etape);
                                    if (j === etapeResults.rows.length - 1) {
                                        console.log(etapeResults.rows.length, "étapes chargées");
                                        successCallback(parcours);
                                    }
                                }
                            },
                            (tx, error) => {
                                errorCallback("Etapes SELECT error : " + error.message);
                            }
                        );
                    } else {
                        console.log('No ciruit found with this id');
                    }
                },
                (tx, error) => {
                    errorCallback("Parcours SELECT error : " + error.message);
                }
            );
        }, (error) => {
            errorCallback("Local database transaction error : " + error.message);
        });
    }
    
    /*async getParcours (identifiant) {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM Parcours WHERE identifiant = ?',
                    [identifiant],
                    (tx, results) => {
                        if (results.rows.length > 0) {
                            const parcours = results.rows.item(0);
                            tx.executeSql(
                                'SELECT * FROM Etapes WHERE parcours_id = ?',
                                [parcours.identifiant],
                                (tx, etapeResults) => {
                                    parcours.etapes = [];
                                    const etapesPromises = [];
                                    for (let j = 0; j < etapeResults.rows.length; j++) {
                                        const etape = etapeResults.rows.item(j);
                                        etape.data = JSON.parse(etape.etape_data);
                                        etape.audio = [];
                                        const etapePromise = new Promise((etapeResolve, etapeReject) => {
                                            tx.executeSql(
                                                'SELECT * FROM Audio WHERE etape_id = ?',
                                                [etape.identifiant],
                                                (tx, audioResults) => {
                                                    for (let k = 0; k < audioResults.rows.length; k++) {
                                                        etape.audio.push(audioResults.rows.item(k));
                                                    }
                                                    parcours.etapes.push(etape);
                                                    etapeResolve();
                                                },
                                                (tx, error) => {
                                                    console.error("SELECT audio error: ", error);
                                                    etapeReject("SELECT audio error: " + error.message);
                                                }
                                            );
                                        });
                                        etapesPromises.push(etapePromise);
                                    }
                                    Promise.all(etapesPromises)
                                        .then(() => resolve(parcours))
                                        .catch(error => reject(error));
                                },
                                (tx, error) => {
                                    console.error("SELECT etapes error: ", error);
                                    reject("SELECT etapes error: " + error.message);
                                }
                            );
                        } else {
                            console.log('No parcours found with this id');
                            reject("No parcours found with this id");
                        }
                    },
                    (tx, error) => {
                        console.error("SELECT parcours error: ", error);
                        reject("SELECT parcours error: " + error.message);
                    }
                );
            }, (error) => {
                console.error("Transaction error: ", error);
                reject("Local database transaction error: " + error.message);
            });
        });
    };*/

    getScores(identifiant, successCallback, errorCallback) {
        this.db.transaction((tx) => {
            tx.executeSql(
                `SELECT max(score) localScore, max(score_max) localScoreMax FROM GameHistory WHERE parcours_id = ?`,
                [identifiant],
                (tx, results) => {
                    successCallback(results.rows.item(0));
                },
                (tx, errror) => {
                    errorCallback("GameHistory SELECT error : " + errror.message);
                }
            );
        }, (error) => {
            errorCallback("Local database transaction error : " + error.message);
        });
    }

    getAllCommunes(successCallback, errorCallback) {
        this.db.transaction((tx) => {
            tx.executeSql(
                'SELECT DISTINCT commune, code_postal FROM Parcours',
                [],
                (tx, results) => {
                    let communes = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        const entry = results.rows.item(i);
                        communes.push(entry.commune + " (" + entry.code_postal + ")");
                    }
                    successCallback(communes);
                },
                (tx, error) => {
                    errorCallback("SELECT error : " + error.message);
                }
            );
        }, (error) => {
            errorCallback("Local database transaction error : " + error.message);
        });
    }

    /*getAllParcours(successCallback, errorCallback) {
        this.db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Parcours',
                [],
                (tx, results) => {
                    let parcours = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        parcours.push(results.rows.item(i));
                    }
                    successCallback(parcours);
                },
                (tx, error) => {
                    errorCallback("SELECT error : " + error.message);
                }
            );
        }, (error) => {
            errorCallback("Local database transaction error : " + error.message);
        });
    }*/

    async getAllParcours() {
        try {
            try {
                const results = await this.execSql(
                    'SELECT * FROM Parcours',
                    []
                )
                let parcours = [];
                if (results && results.rows) {
                    for (let i = 0; i < results.rows.length; i++) {
                        parcours.push(results.rows.item(i));
                    }
                }
                return parcours;
            } catch (qerror) {
                console.error("SELECT error : " + qerror.message);
            }
        } catch (error) {
            console.error("Local database transaction error : " + error.message);
        }
    }        

    getParcoursFromCommuneLocally(commune, successCallback, errorCallback) {
        this.db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Parcours WHERE commune = ?',
                [commune],
                (tx, results) => {
                    let parcoursList = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        parcoursList.push(results.rows.item(i));
                    }
                    successCallback(parcoursList);
                },
                (tx, error) => {
                    errorCallback("SELECT error : " + error.message);
                }
            );
        }, (error) => {
            errorCallback("Local database transaction error : " + error.message);
        });
    }

	getHistory(successCallback, errorCallback) {
        this.db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM GameHistory',
                [],
                (tx, results) => {
                    let history = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        history.push(results.rows.item(i));
                    }
                    successCallback(history);
                },
                (tx, error) => {
                    errorCallback("SELECT error : " + error.message);
                }
            );
        }, (error) => {
            errorCallback("Local database transaction error : " + error.message);
        });
	}

    deleteParcours(id, successCallback, errorCallback) {
        this.db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM Parcours WHERE identifiant = ?',
                [id],
                (tx, results) => {
                    console.log("Parcours deleted");
                    if (results.rowsAffected === 0) {
                        errorCallback('Parcours not found');
                    }
                    tx.executeSql(
                        `DELETE FROM Etapes WHERE parcours_id = ?`,
                        [id],
                        (tx, result) => {
                            console.log("Etapes deleted");
                            successCallback();
                        },
                        (tx, error) => {
                            errorCallback("Etapes DELETE error : " + error.message);
                        }
                    )
                },
                (tx, error) => {
                    errorCallback("Parcours DELETE error : " + error.message);
                }
            );
        }, (error) => {
            errorCallback("Local database transaction error : " + error.message);
        });
    }
}

const localDatabaseService = new LocalDatabaseService();
export default localDatabaseService;