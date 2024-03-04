/**
 * 
 * @param {string} string 
 */
export default function unOffuscate(string) {
    const move = [1,2,-1,3,-4,5,6,8,1,0,2,4,6,-5,7,3];
    let res = "";
    for (let i = 0; i < string.length; i++) {
        res += String.fromCharCode(string.charCodeAt(i) + move[i%16]);
    }
    return res.slice(4)+res.slice(0,4);
}