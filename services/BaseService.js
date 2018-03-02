import Promise from '../vendor/bluebird.js';

function get(url,data){
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type':'application/json'
      },
      success: resolve,
      fail:reject
    })
  })
}

module.exports = {
  get:get
}