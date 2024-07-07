// import { PolicyType } from "./../entity/policy/policy.enum";
// import { PlanTypes } from "./../entity/plans/plan.enum";

// enum SubscriptionCode {
//   HIP = "HEALTH-INDIVIDUAL-PLAN",
//   HFP = "HEALTH-FAMILY-PLAN",
//   HEP = "HEALTH-EMPLOYER-PLAN",
//   HGP = "HEALTH-GIFT-PLAN",
//   HBP = "HEALTH-BROKER-PLAN",
//   ABP = "AUTO-BROKER-PLAN",
//   AFP = "AUTO-FAMILY-PLAN",
//   AGP = "AUTO-GIFT-PLAN",
//   AEP = "AUTO-EMPLOYER-PLAN",
//   AIP = "AUTO-INDIVIDUAL-PLAN",
//   LIP = "LIFE-INDIVIDUAL-PLAN",
//   LEP = "LIFE-EMPLOYER-PLAN",
//   LGP = "LIFE-GIFT-PLAN",
//   LFP = "LIFE-FAMILY-PLAN",
//   LBP = "LIFE-BROKER-PLAN",
//   PFP = "PROPERTY-FAMILY-PLAN",
//   PEP = "PROPERTY-EMPLOYER-PLAN",
//   PGP = "PROPERTY-GIFT-PLAN",
//   PIP = "PROPERTY-INDIVIDUAL-PLAN",
//   PBP = "PROPERTY-BROKER-PLAN",

//   SFP = "SALARY-FAMILY-PLAN",
//   SEP = "SALARY-EMPLOYER-PLAN",
//   SGP = "SALARY-GIFT-PLAN",
//   SIP = "SALARY-INDIVIDUAL-PLAN",
//   SBP = "SALARY-BROKER-PLAN",
// }

// const characters =
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// function generateString(length) {
//   let result = " ";
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }

//   return result;
// }

// export default class IdHelper {
//   static generateId = (policy_type: PolicyType, plan_type: PlanTypes) => {
//     let ID: string;
//     const plan = `${policy_type}-${plan_type}-PLAN`;
//     const RANDO = generateString(7);

//     switch (plan) {
//       case "HEALTH-INDIVIDUAL-PLAN":
//         ID = `${SubscriptionCode.HIP}-${RANDO}`;
//         break;

//       case "HEALTH-FAMILY-PLAN":
//         ID = `${SubscriptionCode.HFP}-${RANDO}`;
//         break;

//       case "HEALTH-EMPLOYER-PLAN":
//         ID = `${SubscriptionCode.HEP}-${RANDO}`;
//         break;

//       case "HEALTH-GIFT-PLAN":
//         ID = `${SubscriptionCode.HGP}-${RANDO}`;
//         break;

//       case "HEALTH-BROKER-PLAN":
//         ID = `${SubscriptionCode.HBP}-${RANDO}`;
//         break;

//       case "AUTO-BROKER-PLAN":
//         ID = `${SubscriptionCode.ABP}-${RANDO}`;
//         break;

//       case "AUTO-FAMILY-PLAN":
//         ID = `${SubscriptionCode.AFP}-${RANDO}`;
//         break;

//       case "AUTO-EMPLOYER-PLAN":
//         ID = `${SubscriptionCode.AEP}-${RANDO}`;
//         break;

//       case "AUTO-INDIVIDUAL-PLAN":
//         ID = `${SubscriptionCode.AIP}-${RANDO}`;
//         break;

//       case "AUTO-GIFT-PLAN":
//         ID = `${SubscriptionCode.AGP}-${RANDO}`;
//         break;
//       case "LIFE-GIFT-PLAN":
//         ID = `${SubscriptionCode.LGP}-${RANDO}`;
//         break;

//       case "LIFE-FAMILY-PLAN":
//         ID = `${SubscriptionCode.LFP}-${RANDO}`;
//         break;

//       case "LIFE-EMPLOYER-PLAN":
//         ID = `${SubscriptionCode.LEP}-${RANDO}`;
//         break;

//       case "LIFE-INDIVIDUAL-PLAN":
//         ID = `${SubscriptionCode.LIP}-${RANDO}`;
//         break;

//       case "LIFE-BROKER-PLAN":
//         ID = `${SubscriptionCode.LBP}-${RANDO}`;
//         break;

//       case "PROPERTY-BROKER-PLAN":
//         ID = `${SubscriptionCode.PBP}-${RANDO}`;
//         break;

//       case "PROPERTY-EMPLOYER-PLAN":
//         ID = `${SubscriptionCode.PEP}-${RANDO}`;
//         break;

//       case "PROPERTY-INDIVIDUAL-PLAN":
//         ID = `${SubscriptionCode.PIP}-${RANDO}`;
//         break;

//       case "PROPERTY-FAMILY-PLAN":
//         ID = `${SubscriptionCode.PFP}-${RANDO}`;
//         break;

//       case "PROPERTY-GIFT-PLAN":
//         ID = `${SubscriptionCode.PGP}-${RANDO}`;
//         break;

//       case "SALARY-BROKER-PLAN":
//         ID = `${SubscriptionCode.SBP}-${RANDO}`;
//         break;

//       case "SALARY-EMPLOYER-PLAN":
//         ID = `${SubscriptionCode.SEP}-${RANDO}`;
//         break;

//       case "SALARY-INDIVIDUAL-PLAN":
//         ID = `${SubscriptionCode.SIP}-${RANDO}`;
//         break;

//       case "SALARY-FAMILY-PLAN":
//         ID = `${SubscriptionCode.SFP}-${RANDO}`;
//         break;

//       case "SALARY-GIFT-PLAN":
//         ID = `${SubscriptionCode.SGP}-${RANDO}`;
//         break;
//       default:
//         break;
//     }
//     return ID;
//   };
// }
