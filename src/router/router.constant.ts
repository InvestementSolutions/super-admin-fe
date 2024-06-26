import { RouterType } from "../interface/constants/router/RouterType.type";
import { TYPE_MANAGEMENT } from "../interface/constants/type/Type.const";
import PremiumManagementIndex from "../pages/informationManagement/premiumManagement";
import CRUDPremiumManagement from "../pages/informationManagement/premiumManagement/CRUDPremiumManagement";
import SystemManagementIndex from "../pages/systemManagement";
import jsonToken from "../pages/developer/jsonToken";
import ObjectGroupIndex from "../pages/systemManagement/objectsGroup";
import CRUDObjectGroup from "../pages/systemManagement/objectsGroup/CURDObjectGroup";
import ObjectsManagementIndex from "../pages/systemManagement/objectsManagement";
import CRUDObjectManagement from "../pages/systemManagement/objectsManagement/CRUDObjectManagement";
import RolesManagementIndex from "../pages/systemManagement/rolesManagement";
import CRUDRolesManagement from "../pages/systemManagement/rolesManagement/CURDRoleManagement";
import staffManagement from "../pages/informationManagement/staffManagement";
import clientManagement from "../pages/informationManagement/clientManagement";

const url = "/supper-admin";

export const ROUTER_BASE = {

  systemManagement: {
    path: `${url}/system-management`,
    name: "systemManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "systemManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
    ],
    component: SystemManagementIndex,
  } as RouterType,

  // Roles Management
  roleManagement: {
    path: `${url}/system-management/roles`,
    name: "rolesManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "rolesManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "rolesManagement.breakcrumb",
        path: `${url}/system-management/roles`,
      },
    ],
    component: RolesManagementIndex,
  } as RouterType,

  curdRoleManagement: {
    path: `${url}/system-management/roles/:mode/:id`,
    name: "curdRoleManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "rolesManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "rolesManagement.breakcrumb",
        path: `${url}/system-management/roles`,
      },
    ],
    component: CRUDRolesManagement,
  } as RouterType,

  // Objects Management
  objectManagement: {
    path: `${url}/system-management/objects`,
    name: "objectsManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "objectsManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "objectsManagement.breakcrumb",
        path: `${url}/system-management/objects`,
      },
    ],
    component: ObjectsManagementIndex,
  } as RouterType,
  curdObjectsManagement: {
    path: `${url}/system-management/objects/:mode/:id`,
    name: "curdObjectsManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "objectsManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "objectsManagement.breakcrumb",
        path: `${url}/system-management/objects`,
      }
    ],
    component: CRUDObjectManagement,
  } as RouterType,

  // Objects Group
  objectGroup: {
    path: `${url}/system-management/objects-group`,
    name: "objectGroup",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "objectGroupManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "objectGroupManagement.breakcrumb",
        path: `${url}/system-management/objects-group`,
      },
    ],
    component: ObjectGroupIndex,
  } as RouterType,
  curdObjectGroup: {
    path: `${url}/system-management/objects-group/:mode/:id`,
    name: "curdObjectGroup",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "objectGroupManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "objectGroupManagement.breakcrumb",
        path: `${url}/system-management/objects`,
      }
    ],
    component: CRUDObjectGroup,
  } as RouterType,

  // Objects Group
  jsonTokenManagement: {
    path: `${url}/developer/json-token`,
    name: "objectGroup",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "objectGroupManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "developer.breakcrumb",
        path: `${url}/developer`,
      },
      {
        orderBy: 2,
        name: "developer.jsonToken.breakcrumb",
        path: `${url}/developer/json-token`,
      },
    ],
    component: jsonToken,
  } as RouterType,
  // Service Management
  serviceManagement: {
    path: `${url}/information/premium`,
    name: "serviceManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "premiumManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/information`,
      },
      {
        orderBy: 2,
        name: "premiumManagement.breakcrumb",
        path: `${url}/information/premium`,
      },
    ],
    component: PremiumManagementIndex,
  } as RouterType,

  curdServiceManagement: {
    path: `${url}/information/premium/:mode/:id`,
    name: "curdpremiumManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "premiumManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/system-management`,
      },
      {
        orderBy: 2,
        name: "premiumManagement.breakcrumb",
        path: `${url}/information/premium`,
      }
    ],
    component: CRUDPremiumManagement,
  } as RouterType,

  // Staff Management
  staffManagement: {
    path: `${url}/information/staff-info`,
    name: "staffManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "premiumManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/information`,
      },
      {
        orderBy: 2,
        name: "premiumManagement.breakcrumb",
        path: `${url}/information/staff-info`,
      },
    ],
    component: staffManagement,
  } as RouterType,
  
  // Client Management
  clientManagement: {
    path: `${url}/information/client-info`,
    name: "clientManagement",
    type: TYPE_MANAGEMENT.AUTH_GUARD,
    title: "premiumManagement.title",
    breakcrumb: [
      {
        orderBy: 1,
        name: "systemManagement.breakcrumb",
        path: `${url}/information`,
      },
      {
        orderBy: 2,
        name: "premiumManagement.breakcrumb",
        path: `${url}/information/client-info`,
      },
    ],
    component: clientManagement,
  } as RouterType,
};
