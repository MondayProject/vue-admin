var filterData = function (obj = {}) {
    obj.respCode = obj.respCode || "000000"
    obj.respMsg = obj.respMsg || "查詢成功"
    return obj
}
module.exports = filterData
