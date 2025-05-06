"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Gradient,
  Menu as MenuIcon,
  Close as CloseIcon,
  AccountCircle,
} from "@mui/icons-material";
import { useAuth } from "@/app/context/UserContext";
import Swal from 'sweetalert2'
import axios from "axios";
import { HOST } from "@/utils/constants";
import { Loading } from 'notiflix/build/notiflix-loading-aio';



// Animation variants
const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.3,
    },
  },
  exit: { opacity: 0, y: -20 },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const activeLinkVariants = {
  inactive: {
    scale: 1,
    color: "#000000",
  },
  active: {
    scale: 1.05,
    color: "#6366f1",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
};

const activeIndicatorVariants = {
  inactive: {
    width: 0,
    opacity: 0,
  },
  active: {
    width: "100%",
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export default function Header() {

  const { user, logout } = useAuth();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Articles", path: "/articles" },
    ...(user?.isAdmin ? [{ name: "Admin Dashboard", path: "/admin" }] : []),
    { name: "Contact Us", path: "/contact" },
  ].filter(Boolean);
  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "LogOut!"
    }).then( async (result) => {
      if (result.isConfirmed) {

      try{
        Loading.hourglass({
          clickToClose: false,
          svgSize: '50px',
          });
        await axios.get(`${HOST}api/user/logout`).finally(()=>{
          Loading.remove();
        })
        logout();
         Swal.fire({
          title: "Logged Out successfully!",
          icon: "success"
        }).then(()=>{
          router.replace('/login')
        });
      }catch(e){
        Swal.fire({
          title: "Something Went wrong",
          icon: "error"
        });
      }

       
      }
    });
    
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="flex items-center text-2xl font-bold text-gray-900"
            >
              <Gradient sx={{ fontSize: 32, mr: 1, color: "#6366f1" }} />
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                TechSphere
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <Link href={link.path} passHref>
                    <Button
                      component={motion.button}
                      variants={activeLinkVariants}
                      initial="inactive"
                      animate={isActive(link.path) ? "active" : "inactive"}
                      sx={{
                        position: "relative",
                        fontWeight: 600,
                        textTransform: "none",
                        fontSize: "1rem",
                        px: 2,
                        py: 1,
                      }}
                    >
                      {link.name}
                      <motion.span
                        variants={activeIndicatorVariants}
                        style={{
                          position: "absolute",
                          bottom: 4,
                          left: 0,
                          height: 2,
                          backgroundColor: "#6366f1",
                        }}
                      />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </Box>
          )}

          {/* User/Auth Section */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {isMobile && (
              <IconButton
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ color: "text.primary" }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}

            {user ? (
              <>
              <Typography style={{color:"grey"}} fontWeight="bold">
                      {user.username}
                  </Typography>
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ p: 0, ml: 1 }}
                  aria-label="account menu"
                >
                  {user.image ? (
                    <Avatar alt={user.username} src={user.image} />
                  ) : (
                    <AccountCircle sx={{ fontSize: 32 }} />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem disabled>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {user.username}
                    </Typography>
                  </MenuItem>
                  <MenuItem component={Link} href="/profile" onClick={handleMenuClose}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  custom={navLinks.length}
                >
                  <Link href="/login" passHref>
                    <Button
                      variant="text"
                      sx={{
                        fontWeight: 600,
                        borderRadius: "8px",
                        px: 3,
                        textTransform: "none",
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  custom={navLinks.length + 1}
                >
                  <Link href="/register" passHref>
                    <Button
                      variant="contained"
                      sx={{
                        fontWeight: 600,
                        borderRadius: "8px",
                        px: 3,
                        textTransform: "none",
                        background:
                          "linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                          boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
                        },
                      }}
                    >
                      Register
                    </Button>
                  </Link>
                </motion.div>
              </>
            )}
          </Box>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobile && mobileOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  zIndex: 1,
                  padding: "1rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {navLinks.map((link) => (
                    <motion.div key={link.path} variants={mobileItemVariants}>
                      <Link href={link.path} passHref>
                        <Button
                          component={motion.button}
                          variants={activeLinkVariants}
                          initial="inactive"
                          animate={isActive(link.path) ? "active" : "inactive"}
                          fullWidth
                          sx={{
                            position: "relative",
                            justifyContent: "flex-start",
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "1rem",
                            px: 3,
                            py: 1.5,
                          }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.name}
                          <motion.span
                            variants={activeIndicatorVariants}
                            style={{
                              position: "absolute",
                              bottom: 8,
                              left: 16,
                              height: 2,
                              width: "calc(100% - 32px)",
                              backgroundColor: "#6366f1",
                            }}
                          />
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                  {!user && (
                    <>
                      <motion.div variants={mobileItemVariants}>
                        <Link href="/login" passHref>
                          <Button
                            fullWidth
                            sx={{
                              justifyContent: "flex-start",
                              fontWeight: 600,
                              textTransform: "none",
                              fontSize: "1rem",
                              px: 3,
                              py: 1.5,
                            }}
                            onClick={() => setMobileOpen(false)}
                          >
                            Login
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div variants={mobileItemVariants}>
                        <Link href="/register" passHref>
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              justifyContent: "flex-start",
                              fontWeight: 600,
                              textTransform: "none",
                              fontSize: "1rem",
                              px: 3,
                              py: 1.5,
                              background:
                                "linear-gradient(45deg, #6366f1 0%, #8b5cf6 100%)",
                            }}
                            onClick={() => setMobileOpen(false)}
                          >
                            Register
                          </Button>
                        </Link>
                      </motion.div>
                    </>
                  )}
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </Toolbar>
      </Container>
    </AppBar>
  );
}