import { request } from '@/api/init.js'
const querystring = require('querystring')

export function apidRunImmediately(params) {
    return request({
        url: '/scheduler',
        method: 'get',
        params: params
    })
}

export function apidCancleRunning(scheduler_id) {
    return new Promise((resolve, reject) => {
        request({
            url: '/scheduler',
            method: 'put',
            data: querystring.stringify({ scheduler_id: scheduler_id })
        }).then((res) => {
            resolve(res)
        }).catch((e) => {
            reject(e)
        })
    })
}

export function apiAddScheduler(form) {
    return new Promise((resolve, reject) => {
        request({
            url: '/scheduler',
            method: 'post',
            data: querystring.stringify(form)
        }).then((res) => {
            resolve(res)
        }).catch((e) => {
            reject(e)
        })
    })
}

export function apiCancelScheduler(project_id) {
    return request({
        url: '/scheduler',
        method: 'delete',
        data: querystring.stringify({
            project_id: project_id
        })
    })
}