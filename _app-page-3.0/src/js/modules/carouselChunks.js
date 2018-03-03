export default () =>{

    return import('./carousels' /* webpackChunkName: 'carousels' */)
    .then( res  => {
        res.default.screenshots()
        res.default.powerUpsCarousels()
    })
    .catch( error => console.log(error))

}