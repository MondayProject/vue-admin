/**
 * 用户类型
 * @param {*} str
 */
export function refUserRoleCode(str = "") {
    switch (str) {
        case 'ADMIN':
            return '個管師'
        case 'USER':
            return '病患'
        default:
            return ' '
    }
}
/**
 * 用户状态
 * @param {*} str
 */
export function userStatus(str = "") {
    switch (str) {
        case "100":
            return '在職'
        case "500":
            return '離職'
        default:
            return ' '
    }
}
/**
 * 文章状态
 * @param {*} str
 */
export function articleStatus(str = "") {
    switch (str) {
        case "100":
            return '已發布'
        case "500":
            return '未發布'
        default:
            return ' '
    }
}
/**
 * 所属平台
 * @param {*} str
 */
export function platType(str = "") {
    switch (str) {
        case "100":
            return '收案中'
        case "200":
            return '已結案'
        default:
            return ' '
    }
}

/**
 * 菜单级别
 * @param {*} str
 */
export function menuLevel(str = "") {
    switch (str) {
        case "100":
            return '男'
        case "200":
            return '女'
        default:
            return ' '
    }
}
