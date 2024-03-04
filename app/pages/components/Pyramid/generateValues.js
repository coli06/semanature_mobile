
/**
 * A partir du résultat final calcul les 4 premières valeures du calcul pyramidal
 * 
 * On récupère seulement les deux plus grandes unités du chiffre indiqué afin d'éviter des calculs trop complexes
 * dans le cas de grands nombres (>100)
 * 
 * @param {*} result résultat du calcul pyramidal
 * @returns retourne le tableau des 4 valeurs des cases initiales du calcul pyramidal
 */
export default function generateValues(result) {

    // récupération en int des deux premières unités de la valeure finale
    var firstTwoDigits = parseInt(String(result).substring(0, 2), 10);
    var s = [-1, -1, -1, -1];

    // le while permet d'éviter la génération de nombres négatifs
    while ((s[0] < 0) || (s[1] < 0) || (s[2] < 0) || (s[3] < 0)) {

        // x1 et x2 représentant l'avant dernier étage du calcul
        // On randomise le premier et en déduit le second
        var x1 = Math.floor(Math.random() * (0.65 * firstTwoDigits - 0.35 * firstTwoDigits) + 0.35 * firstTwoDigits);
        var x2 = Math.floor(firstTwoDigits - x1);

        // A partir des valeurs de l'avant dernier étage on déduit/randomise les valeurs de l'étage antérieur
        // On randomise à partir du plus petit en premier pour limiter la génération de nombres négatifs
        if (x1 < x2) {
            var y1 = Math.floor(Math.random() * (0.75 * x1 - 0.55 * x1) + 0.55 * x1);
        }
        else {
            var y1 = Math.floor(Math.random() * (0.75 * x2 - 0.55 * x2) + 0.55 * x2);
        }

        var y2 = x1 - y1;
        var y3 = x2 - y1;


        // même principe pour le premier étage, ces valeurs contenu dans 's' seront le point de départ du jeu pour l'utilisateur
        if (y2 < y3) {
            if (y1 < y2) {
                s[1] = Math.floor(Math.random() * (0.80 * y1 - 0.70 * y1) + 0.70 * y1);
            } else {
                s[1] = Math.floor(Math.random() * (0.80 * y2 - 0.70 * y2) + 0.70 * y2);
            }
            s[0] = y2 - s[1];
            s[2] = y1 - s[1];
            s[3] = y3 - s[2];
        } else {
            if (y3 < y1) {
                s[2] = Math.floor(Math.random() * (0.80 * y3 - 0.70 * y3) + 0.70 * y3);
            } else {
                s[2] = Math.floor(Math.random() * (0.80 * y1 - 0.70 * y1) + 0.70 * y1);
            }
            s[3] = y3 - s[2];
            s[1] = y1 - s[2];
            s[0] = y2 - s[1];
        }

        // On restaure la bonne puissance aux résultats
        const digitCount = result.toString().length;
        s[0] = s[0] * 10 ** (digitCount - 2);
        s[1] = s[1] * 10 ** (digitCount - 2);
        s[2] = s[2] * 10 ** (digitCount - 2);
        s[3] = s[3] * 10 ** (digitCount - 2);

        // Comme on récupère les deux premières unités du nombre, si 'result' ne comporte qu'une unité (0 à 9), 
        // il devient une valeure décimal, il faut donc multiplier le nombre par 10
        for (let i = 0; i < 4; i++) {
            if (Math.trunc(s[i]) == 0) {
                s[i] = s[i] * 10;
            }
        };
    }
    return s;
};