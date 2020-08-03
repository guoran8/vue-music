import request from '@/utils/request';

export function getSingerList(params){
    return request({
        url: 'artist/list',
        params
    })
}

export function getHotSingerList(params) {
    return request({
        url: 'top/artists',
        params
    })
}