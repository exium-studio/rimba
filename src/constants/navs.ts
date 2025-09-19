import { Interface__NavItem } from "@/constants/interfaces";
import {
  IconBook2,
  IconBriefcase,
  IconDatabase,
  IconDeviceAnalytics,
  IconDeviceDesktop,
  IconDeviceDesktopAnalytics,
  IconHeartHandshake,
  IconLanguage,
  IconMap,
  IconMap2,
  IconMapQuestion,
  IconNews,
  IconReceipt,
  IconSettings,
  IconShieldHalf,
  IconUser,
  IconWorld,
} from "@tabler/icons-react";

export const PRIVATE_ROUTE_INDEX = "/pvt";

export const LP_NAVS: Interface__NavItem[] = [
  {
    groupLabelKey: "main",
    list: [
      {
        labelKey: "lp_navs.home",
        path: `/`,
      },
      {
        labelKey: "lp_navs.document",
        path: `/document`,
      },
      {
        labelKey: "lp_navs.about_us.index",
        path: `/about_us`,
        subMenus: [
          {
            list: [
              {
                icon: IconWorld,
                labelKey: "lp_navs.about_us.rimba_corridor_program",
                path: `/about-us/rimba-corridor-program`,
              },
              {
                icon: IconBriefcase,
                labelKey: "lp_navs.about_us.activity",
                path: `/about-us/activity`,
              },
              {
                icon: IconNews,
                labelKey: "lp_navs.about_us.news",
                path: `/about-us/news`,
              },
              {
                icon: IconHeartHandshake,
                labelKey: "lp_navs.about_us.partners",
                path: `/about-us/partners`,
              },
            ],
          },
        ],
      },
      {
        labelKey: "lp_navs.map.index",
        path: `/map`,
        subMenus: [
          {
            list: [
              {
                icon: IconMap,
                labelKey: "lp_navs.map.printed_map",
                path: `1`, // TODO fill the path
              },
              {
                icon: IconMap2,
                labelKey: "lp_navs.map.metadata",
                path: `2`, // TODO fill the path
              },
              {
                icon: IconMapQuestion,
                labelKey: "lp_navs.map.study_method_map",
                path: `3`, // TODO fill the path
              },
            ],
          },
        ],
      },
      {
        labelKey: "lp_navs.related_apps.index",
        path: `/related-apps`,
        subMenus: [
          {
            list: [
              {
                icon: IconBook2,
                labelKey: "lp_navs.related_apps.kmis",
                path: `/related-apps/kmis`,
              },
              {
                icon: IconDeviceDesktopAnalytics,
                labelKey: "lp_navs.related_apps.monev",
                path: `/related-apps/monev`,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const NAVS: Interface__NavItem[] = [
  {
    groupLabelKey: "main",
    list: [
      {
        icon: IconDeviceAnalytics,
        labelKey: "navs.dashboard",
        path: `${PRIVATE_ROUTE_INDEX}/dashboard`,
      },
      {
        icon: IconReceipt,
        labelKey: "navs.transaction",
        path: `${PRIVATE_ROUTE_INDEX}/transaction`,
      },
      {
        icon: IconDatabase,
        labelKey: "navs.master_data.index",
        path: `${PRIVATE_ROUTE_INDEX}/master-data`,
        subMenus: [
          {
            list: [
              {
                labelKey: "navs.master_data.user",
                path: `${PRIVATE_ROUTE_INDEX}/master-data/user`,
              },
              {
                labelKey: "navs.master_data.category",
                path: `${PRIVATE_ROUTE_INDEX}/master-data/category`,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const OTHER_NAVS: Interface__NavItem[] = [
  {
    groupLabelKey: "other",
    list: [
      {
        icon: IconSettings,
        labelKey: "navs.settings",
        path: `${PRIVATE_ROUTE_INDEX}/settings`,
        subMenus: [
          {
            groupLabelKey: "settings_navs.main.index",
            list: [
              {
                icon: IconUser,
                labelKey: "my_profile",
                path: `${PRIVATE_ROUTE_INDEX}/settings/profile`,
                backPath: `${PRIVATE_ROUTE_INDEX}/settings`,
              },
              {
                icon: IconDeviceDesktop,
                labelKey: "settings_navs.main.display",
                path: `${PRIVATE_ROUTE_INDEX}/settings/display`,
                backPath: `${PRIVATE_ROUTE_INDEX}/settings`,
              },
              {
                icon: IconLanguage,
                labelKey: "settings_navs.main.regional",
                path: `${PRIVATE_ROUTE_INDEX}/settings/regional`,
                backPath: `${PRIVATE_ROUTE_INDEX}/settings`,
              },
              {
                icon: IconShieldHalf,
                labelKey: "settings_navs.main.permissions",
                path: `${PRIVATE_ROUTE_INDEX}/settings/permissions`,
                backPath: `${PRIVATE_ROUTE_INDEX}/settings`,
              },
            ],
          },
        ],
      },
      {
        icon: IconUser,
        labelKey: "navs.profile",
        path: `${PRIVATE_ROUTE_INDEX}/profile`,
      },
    ],
  },
];

export const MASTER_DATA_NAVS = [];
