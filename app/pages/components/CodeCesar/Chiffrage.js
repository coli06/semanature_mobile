/** Crypte le texte d'entrée avec la méthode du code César
 * Change le 'text' en ASCII et applique le décalage d'une valeure 'shift'
 * @param {*} text string du texte d'entrée
 * @param {*} shift integer du décalage
 * @returns retourne le texte crypté
 */
export default function Cesar(text, shift) {
    const isUpperCase = (charCode) => charCode >= 65 && charCode <= 90;
    const isLowerCase = (charCode) => charCode >= 97 && charCode <= 122;

    const shiftChar = (charCode, base, shift) =>
        String.fromCharCode(((charCode - base + shift) % 26 + 26) % 26 + base);

    let encryptedText = '';

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);

        if (isUpperCase(charCode)) {
            encryptedText += shiftChar(charCode, 65, shift);
        } else if (isLowerCase(charCode)) {
            encryptedText += shiftChar(charCode, 97, shift);
        } else {
            encryptedText += text.charAt(i);
        }
    }

    return encryptedText;
};

