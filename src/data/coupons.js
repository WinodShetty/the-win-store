/**
 * Coupon Engine Data
 */

export const coupons = [
  {
    code: "WIN30",
    discountType: "flat",
    value: 30,
    appliesTo: "all",
    active: true
  },
  {
    code: "FIRST10",
    discountType: "flat",
    value: 10,
    appliesTo: "bundle",
    active: true
  }
];

export const ACTIVE_COUPON = coupons[0];
