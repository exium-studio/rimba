import { Interface__NavItem } from "@/constants/interfaces";
import {
  IconDeviceDesktop,
  IconDeviceDesktopAnalytics,
  IconHeartHandshake,
  IconLanguage,
  IconMap,
  IconMap2,
  IconMapQuestion,
  IconNews,
  IconSchool,
  IconSeedling,
  IconSettings,
  IconShieldHalf,
  IconTrees,
  IconUser,
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
        path: `/about-us`,
        subMenus: [
          {
            list: [
              {
                icon: IconTrees,
                labelKey: "lp_navs.about_us.rimba_corridor_program",
                path: `/about-us/rimba-corridor-program`,
              },
              {
                icon: IconSeedling,
                labelKey: "lp_navs.about_us.activities",
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
                labelKey: "lp_navs.map.interactive_map",
                path: `/gis`, // TODO fill the path
                external: true,
              },
              {
                icon: IconMap,
                labelKey: "lp_navs.map.green_economy",
                path: `gis/hijau`, // TODO fill the path
                external: true,
              },
              {
                icon: IconMap,
                labelKey: "lp_navs.map.impact_analysis",
                path: `gis/dampak`, // TODO fill the path
                external: true,
              },
              {
                icon: IconMap,
                labelKey: "lp_navs.map.land_dashboard",
                path: `gis/lahan`, // TODO fill the path
                external: true,
              },
              {
                icon: IconMap,
                labelKey: "lp_navs.map.printed_map",
                path: `gis/peta-cetak`, // TODO fill the path
                external: true,
              },
              {
                icon: IconMap,
                labelKey: "lp_navs.map.metadata",
                path: `gis/metadata`, // TODO fill the path
                external: true,
              },
              {
                icon: IconMap,
                labelKey: "lp_navs.map.study_method_map",
                path: `gis/peta-kajian`, // TODO fill the path
                external: true,
              },
              {
                icon: IconMap,
                labelKey: "lp_navs.map.cms",
                path: `gis/cms`,
                external: true,
              },
              {
                icon: IconMap,
                labelKey: "lp_navs.map.gis_analysis",
                path: `gisanalysis`
              }
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
                icon: IconSchool,
                labelKey: "lp_navs.related_apps.kmis.index",
                path: `/related-apps/kmis`,
                subMenus: [
                  {
                    list: [
                      {
                        icon: IconSchool,
                        labelKey: "lp_navs.related_apps.kmis.training",
                        path: `/related-apps/kmis?topicType=Pelatihan`,
                      },
                      {
                        icon: IconSchool,
                        labelKey: "lp_navs.related_apps.kmis.knowledge",
                        path: `/related-apps/kmis?topicType=Pengetahuan`,
                      },
                      {
                        icon: IconSchool,
                        labelKey: "lp_navs.related_apps.kmis.all",
                        path: `/related-apps/kmis?topicType=Pelatihan, Pengetahuan`,
                      },
                    ],
                  },
                ],
              },
              {
                icon: IconDeviceDesktopAnalytics,
                labelKey: "lp_navs.related_apps.admin_portal",
                path: process.env.NEXT_PUBLIC_ADMIN_URL as string,
                external: true,
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
