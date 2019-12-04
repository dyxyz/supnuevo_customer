/**
 * httpUtils.js
 */


/**
 * post
 *
 * credentials:'include'
 * credentials 是Request接口的只读属性，用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。
 * include: 不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息.
 * 自动登录 实现
 * 发出请求时存储在本地的 cookies + 保存上一次登录状态（若上一次登录状态为isLoggedIn == true,则默认登录）
 *
 * session丢失(re = 2) -> 重新登录
 * 表示客户端与服务端的一次会话，客户端连上服务端后，服务端都会给其一个session.
 * 对于每一个连接到服务器的用户，若重启服务器（清掉sessionId）,则这些用户发送的请求相当于一个新连接的用户，服务端会为每个用户重新分配一个新的sessionId.
 * 服务端可以通过session持久化解决问题.
 */

export function post(url, params) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:'include',
            body: JSON.stringify(params)
        })
            .then((response) => {
                return response.json()
            })
            .catch((error) => {
                reject(error);
            }).then((responseData) => {
            if (!responseData) {
                reject(new Error('responseData is null'));
                return;
            }
            resolve(responseData);
        }).done();
    })
}
