/**
 * 正则表达式用于匹配同时包含数字和字母的字符串
 *
 * ^ 表示匹配字符串的开始位置
 * (?![0-9]+$) 表示后面不能全部是数字
 * (?![a-zA-Z]+$) 表示后面不能全部是字母
 * [0-9A-Za-z]{6,12} 表示匹配长度为6到12的数字和字母组合
 * $ 表示匹配字符串的结束位置
 */
export const regExpNumWord: RegExp;
