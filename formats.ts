type none<Type> = null | undefined;

const messagesTypes = {
    validations: {

    }
}

export function ssre(text: string): string{
	let chars='\\/-^[]()|\'"`+$?¡¿!*.{}<>';

	for(let i=0; i<chars.length; i++){
		text=text.replace(eval('/\\'+chars.charAt(i)+'/gi'), '\\'+chars.charAt(i));
	}

	return text;
}

export function regularExpressionVocalGroup(text: string): string{
	let mal='aáäàâeéèêëiíïîìoóòôöuúûùü', bien='aaaaeeeeiiiioooouuuu', abc='abcdefghijklmnñopqrstuvwxyz';
	let a_group='[aáäàâ]', e_group='[eéèêë]', i_group='[iíïîì]', o_group='[oóòôö]', u_group='[uúûùü]';
	let result='';

	for(let i=0; i<text.length; i++){
		let numero=0, changed=false;
		for(let j=0; j<mal.length; j++){
			if(text.charAt(i)==mal.charAt(j) || text.charAt(i).toUpperCase()==mal.charAt(j).toUpperCase()){
				numero=j;
				changed=true;
				break;
			}
		}

		if(changed==true){
			if(numero<5){
				result=result+'('+a_group+'|'+a_group.toUpperCase()+')';
			}else if(numero<10){
				result=result+'('+e_group+'|'+e_group.toUpperCase()+')';
			}else if(numero<14){
				result=result+'('+i_group+'|'+i_group.toUpperCase()+')';
			}else if(numero<19){
				result=result+'('+o_group+'|'+o_group.toUpperCase()+')';
			}else{
				result=result+'('+u_group+'|'+u_group.toUpperCase()+')';
			}
		}else{
			result=result+text.charAt(i);
		}
	}

	return result;
}

export function regexSearch(text: string): string{
	text=ssre(text);
	text=regularExpressionVocalGroup(text);
	return eval('/'+text+'/i');
}

export function busqueda(busqueda: string, place: string): boolean{
	let regExp=/ /gi;
	busqueda=ssre(busqueda);
	busqueda=regularExpressionVocalGroup(busqueda);
	regExp=eval('/'+busqueda+'/gi');
	return regExp.test(place);
}

export function textToRegExp(text: string): string{
	return regularExpressionVocalGroup(ssre(text));
}

export function extractExt(filename: string): string | null{
    let match: RegExpMatchArray | null= filename.match(/\.\w+$/g);
	return (!match ? null : match[0]) || null;
}

export function spaceXHippen(text: string): string{
	return text.replace(/ +/g, '-');
}

export function cleanSpaces(text:string): string{
    return text.replace(/  +/g, ' ').trim();
}

export function dotToLowBar(text: string): string{
	return text.replace(/\.+/g, '_');
}

export function extractNumberInText(text: string): string{
	return text.replace(/[^0-9]/g, '').toString();
}

export function adaptNumTwo(num: number | string): string{
    if(String(num).length > 1) return String(num);

    return String('0'+num);
}

export function adaptZerosNum(num: number | string, zeros: number): string{
	num=String(num);
	let count=zeros-num.length;

	for(let i=0; i<count; i++){
		num='0'+String(num);
	}
	return num;
}

export function sanitizeString(text: string): string{
	text=text.trim();
	text=text.replace(/\</gi, '&lt;');
	text=text.replace(/\>/gi, '&gt;');
	return text.replace(/\"/gi, '&quot;');
}

export function quitSpace(text: string): string{
	return text.replace(/ /g, '').toLowerCase();
}

export function destilde(text: string): string{
	let a='[áäàâ]', e='[éèêë]', i='[íïîì]', o='[óòôö]', u='[úûùü]';

    text=text.replace(eval('/'+a+'/gi'), 'a');
	text=text.replace(eval('/'+e+'/gi'), 'e');
	text=text.replace(eval('/'+i+'/gi'), 'i');
	text=text.replace(eval('/'+o+'/gi'), 'o');
	text=text.replace(eval('/'+u+'/gi'), 'u');

	return text.replace(/ñ/gi, 'nh');
}

export function firstUpper(name: string): string{
	return name.charAt(0).toUpperCase()+name.slice(1).toLowerCase();
}

export function firstCharName(name: string): string{
    let result: string | string[] = name.split(' ');

	for(let i=0;i<result.length;i++){
		result[i]=result[i].charAt(0).toUpperCase()+result[i].slice(1);
	}

	result=result.join(' ');

	return result;
}

export function entityFormat(text: string){
	text=text.replace(/ {2,}/g, ' ').trim();
	text=text.replace(/\B_/g, '');
	return firstCharName(text.replace(/\B-/g, ''));
}

export function addDots(num: number | string = 0): string | number{
    let additionals = '', match: RegExpMatchArray | null | string;
    num = num.toString();
    num = num.replace(/[^0-9]/g, '');

    additionals = num.replace(/\d{3}/g, '');
    additionals = num.slice(0, additionals.length);

    match = num.slice(additionals.length).match(/\d{3}/g);
    if (!match) return Number(num);
    return (additionals.length > 0 ? additionals + '.' : '') + match.join('.');
}
