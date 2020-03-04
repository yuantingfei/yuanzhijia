export default {
  'order_status_class': function (value) {
    const status = value && parseInt(value);
    switch (status) {
      case 0:
        return "order_undisposed";
      case 1:
        return "order_pending";
      case 2:
        return "order_disposed";
      default:
        return "";
    }
  },
  'order_priority_class': function (value) {
    const priority = value && parseInt(value);
    switch (priority) {
      case 1:
        return "priority_low";
      case 2:
        return "priority_mid";
      case 3:
        return "priority_high";
      default:
        return "";
    }
  }
}