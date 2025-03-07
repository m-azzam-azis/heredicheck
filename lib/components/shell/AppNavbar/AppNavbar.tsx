import React from "react";
import Link from "next/link";
import { createStyles, getStylesRef, Navbar, Text } from "@mantine/core";
import {
  IconCalendarEvent,
  IconFlame,
  IconSettings,
  IconId,
  IconVaccine,
  IconUsersGroup,
  IconHeartbeat,
  IconMicroscope,
  IconArchive,
  IconVirus,
  IconPlant,
} from "@tabler/icons-react";
import { Url } from "next/dist/shared/lib/router/router";

// https://ui.mantine.dev/category/navbars

const useStyles = createStyles((theme) => {
  const icon = getStylesRef("icon");
  return {
    menuTitle: {
      margin: "20px 0 4px 6px",
      fontSize: "12px",
      borderBottom: "1px solid #DDDDDD",
      paddingBottom: "5px",
      color: "black",
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `8px 12px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.fn.lighten(
                theme.fn.variant({
                  variant: "filled",
                  color: theme.primaryColor,
                }).background as string,
                0.8
              ),
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        textDecoration: "none",

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
      strokeWidth: 1.5,
      width: 18,
      height: 18,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },

    reportLink: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      padding: `8px 12px`,
      borderRadius: theme.radius.sm,
      fontWeight: 600,
      color: theme.colors.green[6],
      backgroundColor: theme.colors.green[0],
      transition: "all 0.3s ease",

      "&:hover": {
        backgroundColor: theme.colors.green[6],
        color: "white",
        transform: "translateY(-2px)",
        boxShadow: theme.shadows.sm,

        [`& .${icon}`]: {
          color: "white",
        },
      },
    },

    reportIcon: {
      ref: icon,
      color: theme.colors.green[6],
      marginRight: theme.spacing.sm,
      strokeWidth: 1.5,
      width: 18,
      height: 18,
      transition: "all 0.3s ease",
    },
  };
});

export interface AppNavbarProps {
  closeNavbar: () => void;
}

interface IMenuItem {
  href: string;
  display: string;
  icon: React.ReactNode;

  appHref?: string;
}

export default function AppNavbar({
  closeNavbar,
}: AppNavbarProps): JSX.Element {
  const { classes } = useStyles();

  const patientDataPages: IMenuItem[] = [
    {
      display: "Patient Details",
      href: "/patient-sphere/patient/patient-details",
      icon: <IconId className={classes.linkIcon} />,
    },
    {
      display: "Encounters",
      href: "/patient-sphere/patient/encounters",
      icon: <IconCalendarEvent className={classes.linkIcon} />,
    },
    {
      display: "Allergies",
      href: "/patient-sphere/patient/allergies",
      icon: <IconPlant className={classes.linkIcon} />,
    },
    {
      display: "Condition History",
      href: "/patient-sphere/patient/conditions",
      icon: <IconVirus className={classes.linkIcon} />,
    },
    {
      display: "Immunizations",
      href: "/patient-sphere/patient/immunizations",
      icon: <IconVaccine className={classes.linkIcon} />,
    },
    {
      display: "Family History",
      href: "/patient-sphere/patient/family-history",
      icon: <IconUsersGroup className={classes.linkIcon} />,
    },
  ];
  const reportPage: IMenuItem = {
    display: "Generate Report",
    href: "/patient-sphere/patient/report-prediction",
    icon: <IconArchive className={classes.reportIcon} />, // Note: using reportIcon class
  };

  return (
    <div className="z-[1]">
      <Navbar width={{ sm: 250 }} p="xs">
        <Navbar.Section grow>
          {/* Patient Data */}
          <Text className={classes.menuTitle}>Patient Data</Text>
          {patientDataPages.map((item: IMenuItem, idx: number) => {
            return (
              <NavbarLink
                href={item.href}
                key={`AppNavbar_MenuItem_PatientData_${idx}`}
              >
                {item.icon}
                <span>{item.display}</span>
              </NavbarLink>
            );
          })}

          {/* Tools */}
          <Text className={classes.menuTitle}></Text>
          {reportPage && (
            <NavbarLink href={reportPage.href} key="AppNavbar_MenuItem_Report">
              {reportPage.icon}
              <span>{reportPage.display}</span>
            </NavbarLink>
          )}
        </Navbar.Section>
      </Navbar>
    </div>
  );
}

interface NavbarLinkProps {
  href: string;
  appHref?: string;
  children: React.ReactNode;
}

function NavbarLink(props: NavbarLinkProps): JSX.Element {
  const { classes, cx } = useStyles();
  const href: Url = { pathname: props.href };

  // Special styling for Generate Report link
  const isReportLink = props.href.includes("report-prediction");
  const linkClass = isReportLink ? classes.reportLink : classes.link;

  if (props.appHref) {
    href.query = { app: props.appHref };
  }

  return (
    <Link href={href} className={cx(linkClass)}>
      {props.children}
    </Link>
  );
}
