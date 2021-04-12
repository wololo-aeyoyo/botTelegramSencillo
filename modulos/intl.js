function patrificarDolares(dolares) {
    const _dolares = parseFloat(dolares.toString());
    const patria = new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' })
        .format(_dolares);
    return patria;
}

module.exports = {
    patrificarDolares
};