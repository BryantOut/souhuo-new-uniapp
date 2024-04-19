export enum TASK_STATUS {
  '合作中' = 0,
  '待收货' = 1,
  '待提交' = 2,
  '待审核' = 3,
  '待寄回' = 4,
  '待确认' = 5,
  '已完成' = 6,
  '已取消' = 7,
  '已超时' = 8,
  '取消中' = 9,
}

export const TAB_LIST =  ['/pages/Index/index', '/pages/Cooperation/index', '/pages/My/index']

export enum REWARD_TYPE {
  '稿费' = 0,
  '赠品' = 1,
  '稿费+赠品' = 2,
}