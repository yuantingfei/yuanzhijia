/**
 * Created on 2017/8/16.
 */

/**
 * 字段对应码表
 */
module.exports = {
  reportStatus: {
    "_ALL": null, //全部
    "UNHANDLED": 0, //未处理
    "HANDLED": 1, //已处理
    "NOTIFIED": 2 //已通报
  },
  assetType: {
    "application": 1,
    "security": 2,
    "network": 3,
    "middle": 4,
    "ipc": 5,
    "database": 6,
    "internet": 7
  },
  companies: {
    "application": 1,
    "security": 2,
    "network": 3,
    "middle": 4,
  },
  riskLevel: {
    "NONE": 0,
    "HIGH": 1,
    "MEDIUM": 2,
    "LOW": 3
  },
  menu: {}
};