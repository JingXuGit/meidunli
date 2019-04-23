export default function param(object) {
  /* URLSearchParams 修改axios 传递参数问题 */
  let param = new URLSearchParams();
  for (const key in object) {
    param.append(key + "", object[key] + "");
  }
  /* 返回数据 */
  return param;
}

