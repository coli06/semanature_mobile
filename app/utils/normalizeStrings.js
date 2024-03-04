export default function NormalizeStrings(text) {
	var normalized = '';
	normalized = text.replace(/-/g, '').replace(/\s/g, '').normalize("NFD").replace(/\p{Diacritic}/gu, "").replace("œ", "oe").replace("æ", "ae").toUpperCase();
	return normalized;
};