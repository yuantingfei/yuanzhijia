import store from '../store/index.js';
export default {
  // 风险级别
  'asset-risk-filter': function (value) {
    const riskLevel = value&&parseInt(value);
    let level = $i18n.messages[$i18n.locale].levelrisk;
    switch (riskLevel) {
      case 1:
        return level[0];
      case 2:
        return level[1];
      case 3:
        return level[2];
      case 4:
        return level[3];
      case 5:
        return level[4];
      default:
        return riskLevel;
    }
  },
  // 告警级别和日志级别
  'risk-level-filter': function (value) {
    const riskLevel = parseInt(value);
    let level = $i18n.messages[$i18n.locale].level;
    switch (riskLevel) {
      case 1:
        return level[0];
      case 2:
        return level[1];
      case 3:
        return level[2];
      case 4:
        return level[3];
      case 5:
        return level[4];
      default:
        return riskLevel;
    }
  },
  // 漏洞级别
  'vuln-level-filter': function (value) {
    const riskLevel = value&&parseInt(value);
    let level = $i18n.messages[$i18n.locale].vuln;
    switch (riskLevel) {
      case 1:
        return level[0];
      case 2:
        return level[1];
      case 3:
        return level[2];
      case 4:
        return level[3];
      case 5:
        return level[4];
      default:
        return riskLevel;
    }
  },
  // 资产脆弱性级别
  'leak-filter': function (value) {
    const leak = value&&parseInt(value);
    let level = $i18n.messages[$i18n.locale].cuiRuoLevel;
    switch (leak) {
      case 1:
        return level[0];
      case 2:
        return level[1];
      case 3:
        return level[2];
      case 4:
        return level[3];
      case 5:
        return level[4];
      default:
        return leak;
    }
  },
  // css样式过滤
  'level-class-filter': function (value) {
    const leak = value&&parseInt(value);
    switch (leak) {
      case 1:
        return "very-low-level";
      case 2:
        return "low-level";
      case 3:
        return "mid-level";
      case 4:
        return "high-level";
      case 5:
        return "very-high-level";
      default:
        return leak;
    }
  },
  // 资产重要性
  'asset-values-filter': function (value) {
    let important = $i18n.messages[$i18n.locale].important;
    switch (value) {
      case 1:
        return important[0];
      case 2:
        return important[1];
      case 3:
        return important[2];
      case 4:
        return important[3];
      case 5:
        return important[4];
      default:
        return 0;
    }
  },
  // 漏洞依据状态映射
  'vuln_basis_status': function (value) {
    let vulnBasisStatus = $i18n.messages[$i18n.locale].vulnBasisStatus;
    switch (value) {
      case 'unknown':
        return vulnBasisStatus[0];
      case 'not-vulnerable':
        return vulnBasisStatus[1];
      case 'vulnerable':
        return vulnBasisStatus[2];
      case 'vulnerable-version':
        return vulnBasisStatus[3];
      case 'vulnerable-potential':
        return vulnBasisStatus[4];
      default:
        return leak;
    }
  },
  // 攻击者受害者危害程度css
  'dangerlevel_class': function (value) {
    const leak = value&&parseInt(value);
    switch (leak) {
      case 1:
        return "very-low-level";
      // case 2:
      //   return "low-level";
      case 2:
        return "mid-level";
      // case 4:
      //   return "high-level";
      case 3:
        return "very-high-level";
      default:
        return leak;
    }
  },
}