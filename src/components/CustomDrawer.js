import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";
import { UserCircleIcon, XIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectDrawerState, setIsDrawerOpen } from "../slices/DrawerSlice";
import DrawerNavItem from "./DrawerNavItem";
import { signIn, signOut, useSession } from "next-auth/react";

const CustomDrawer = () => {
  const isOpen = useSelector(selectDrawerState);
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const anchor = "left";
  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer
          className="relative max-w-3xl md:max-w-6xl"
          anchor={anchor}
          sx={{
            width: 350,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 350,
              boxSizing: "border-box",
            },
          }}
          open={isOpen}
          onClose={() => {
            dispatch(setIsDrawerOpen(false));
          }}
        >
          <div className="h-full relative">
            <div className="pl-10 sticky flex items-center justify-between pr-2 top-0 z-50 bg-amazon_blue-light">
              <p
                onClick={() => {
                  if (!session) {
                    signIn();
                  }
                  return;
                }}
                className="cursor-pointer overflow-ellipsis truncate flex items-center justify-start font-bold text-xl text-white py-3"
              >
                <span className="mr-2">
                  <UserCircleIcon className="h-8" />
                </span>
                Hello,
                <span className="w-32 truncate">
                  {session ? session.user.name : "Sign In"}
                </span>
              </p>
              <div className=" p-1">
                <XIcon
                  onClick={() => {
                    dispatch(setIsDrawerOpen(false));
                  }}
                  className="h-8 p-1 text-white hover:bg-gray-50 hover:rounded-full hover:text-amazon_blue-default cursor-pointer "
                />
              </div>
            </div>
            <div className="">
              <div className="flex pt-6 flex-col">
                <h2 className="pl-6 font-bold text-lg">
                  Digital Content & Devices
                </h2>
                <DrawerNavItem label="Amazon Music" />
                <DrawerNavItem label="Kindle E-readers & Books" />
                <DrawerNavItem label="Appstore for Android" />
                <p className="w-full border-b mt-2"></p>
              </div>

              <div className="flex pt-6 flex-col">
                <h2 className="pl-6 font-bold text-lg">Shop By Department</h2>
                <DrawerNavItem label="Electronics" />
                <DrawerNavItem label="Computers" />
                <DrawerNavItem label="Smart Home" />
                <DrawerNavItem label="Arts & Crafts" />
                <p className="w-full border-b mt-2"></p>
              </div>

              <div className="flex pt-6 flex-col">
                <h2 className="pl-6 font-bold text-lg">Help & Settings</h2>
                <DrawerNavItem label="Your Account" show={false} />
                {session ? (
                  <DrawerNavItem
                    onClick={signOut}
                    label="Sign Out"
                    show={false}
                  />
                ) : (
                  <DrawerNavItem
                    onClick={signIn}
                    label="Sign In"
                    show={false}
                  />
                )}
              </div>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default CustomDrawer;
