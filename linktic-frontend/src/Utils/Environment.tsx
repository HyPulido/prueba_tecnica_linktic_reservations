export function env(key:string, word?: string) {
    word = word??'default';
    const environment=process.env['REACT_APP_ENVIROMENT'];
    const response=process.env['REACT_APP_'+key+'_'+environment]??word;
    return response;
}

