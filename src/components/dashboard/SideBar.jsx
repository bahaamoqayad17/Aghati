import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ChartBar as ChartBarIcon } from "../../icons/chart-bar";
import SellIcon from "@mui/icons-material/Sell";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import MessageIcon from "@mui/icons-material/Message";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import NavItem from "./NavItem";
import Image from "next/image";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BentoIcon from "@mui/icons-material/Bento";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import TagIcon from "@mui/icons-material/Tag";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "dashboard",
  },
  {
    href: "/sellers",
    icon: <SellIcon fontSize="small" />,
    title: "sellers",
  },
  {
    href: "/categories",
    icon: <MenuBookIcon fontSize="small" />,
    title: "categories",
    subMenu: [
      {
        href: "/categories/main-categories",
        icon: <BentoIcon fontSize="small" />,
        title: "main_categories",
      },
      {
        href: "/categories/sub-categories",
        icon: <TakeoutDiningIcon fontSize="small" />,
        title: "sub_categories",
      },
    ],
  },

  {
    href: "/deliveries",
    icon: <DeliveryDiningIcon fontSize="small" />,
    title: "deliveries",
  },
  {
    href: "/messages",
    icon: <MessageIcon fontSize="small" />,
    title: "messages",
  },
  {
    href: "/banners",
    icon: <AddPhotoAlternateIcon fontSize="small" />,
    title: "banners",
  },
  {
    href: "/discount-code",
    icon: <IntegrationInstructionsIcon fontSize="small" />,
    title: "discount_code",
  },
  {
    href: "/financials",
    icon: <AssessmentIcon fontSize="small" />,
    title: "financials",
    subMenu: [
      {
        href: "/financials/reports",
        icon: <ReceiptLongIcon fontSize="small" />,
        title: "reports",
      },
    ],
  },
  {
    href: "/social-media",
    icon: <TagIcon fontSize="small" />,
    title: "social_media",
  },
];

export default function Sidebar(props) {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  }, [router.asPath]);

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{ p: 1 }}
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box>
            <NextLink href="/" passHref>
              <img src="/logo.png" width={150} height={150} alt="test" />
            </NextLink>
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <NavItem items={items} />
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
