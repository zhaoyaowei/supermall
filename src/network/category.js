import { request } from "./request";


// 获取商品分类信息
export function getCategory() {
    return request({
      url: '/category',
    }) 
}

// 获取商品子分类信息
export function getSubcategory(maitKey) {
    return request({
      url: '/subcategory',
      params: {
        maitKey
      }
    }) 
}

// 获取商品分类tab信息
export function getCategoryTabDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}

