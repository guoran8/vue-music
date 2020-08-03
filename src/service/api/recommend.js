import request from '@/utils/request';

export function getRecommendList(params){
    return request({
        url: 'personalized',
        params
    })
}

export function getHotList(params) {
    return request({
        url: 'top/playlist',
        params
    })
}
