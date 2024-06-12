import { Text, TouchableOpacity, Linking } from 'react-native';

/**
* Cette fonction permet de remplacer dans un texte en entrée les liens 
* de la forme [[lien|alias]] en <a href=lien>alias</a>. 
* 
* @param text le texte brut
* @returns le texte modifié avec les liens transformés
*/
export function parseText(text) {
  const regex = /\[\[([^\|]+)\|([^\]]+)\]\]/g;
  const matches = text.matchAll(regex);
  const parts = [];
  let lastIndex = 0;
  
  if(!matches) {
    return text
  }
  for (const match of matches) {
    const [fullMatch, url, alias] = match;
    parts.push(text.substring(lastIndex, match.index));
    parts.push(
      <TouchableOpacity key={alias + url} onPress={() => Linking.openURL(url)}>
        <Text style={{ fontSize: 10, color: 'blue', textDecorationLine: 'underline', marginLeft: 8, marginBottom: -5 }}>{alias}</Text>
      </TouchableOpacity>
    );
    lastIndex = match.index + fullMatch.length;
  }
  
  parts.push(text.substring(lastIndex));
  return parts
}
