import { langs } from './language';

export const langMap = ( () => {

    const map = {}
    const list = langs;

    for(let row of list){
        const [lang, ...dialects] = row;
        map[lang] = dialects;
    }

    
    return map;
})();

