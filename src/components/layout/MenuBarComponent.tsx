"use client";

import { MENUBAR_ITEMS } from "@/consts/menubar";
import { Button, Flex, Text } from "@chakra-ui/react";
import MenuIcon from "@/assets/icon/menu.svg";
import CloseIcon from "@/assets/icon/close.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MenuBarComponentProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export default function MenuBarComponent({
  isMenuOpen,
  setIsMenuOpen,
}: MenuBarComponentProps) {
  const router = useRouter();
  return (
    <>
      <Button
        display={{ base: "flex", md: !isMenuOpen ? "none" : "flex" }}
        cursor={"pointer"}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        position={isMenuOpen ? "absolute" : ""}
        top={22}
        right={22}
        bgColor={"transparent"}
        border={"none"}
      >
        <Image
          src={isMenuOpen ? CloseIcon : MenuIcon}
          alt="menu"
          width={35}
          height={36}
        />
      </Button>
      <Flex
        flexDir={isMenuOpen ? "column" : "row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={isMenuOpen ? "100%" : ""}
        gap={isMenuOpen ? "39px" : "45px"}
        display={{ base: isMenuOpen ? "flex" : "none", md: "flex" }}
        position={"relative"}
      >
        {MENUBAR_ITEMS.map((item) => (
          <Text
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"6px"}
            key={item.label}
            color={"#2E2E3A"}
            fontSize={isMenuOpen ? "30px" : "15px"}
            fontWeight={600}
            lineHeight={"normal"}
            textAlign={"center"}
            cursor={"pointer"}
            onClick={() => {
              if (item.href.includes("http")) {
                window.open(item.href, "_blank");
              } else {
                router.push(item.href);
              }
              setIsMenuOpen(false);
            }}
            _hover={{ color: "#0070ED" }}
            zIndex={3000}
          >
            {item.isNew && (
              <Text
                as="span"
                bgColor={"#FF4B4B"}
                color={"white"}
                fontSize={isMenuOpen ? "14px" : "10px"}
                fontWeight={700}
                px={"6px"}
                py={"2px"}
                borderRadius={"4px"}
                lineHeight={"normal"}
              >
                NEW
              </Text>
            )}
            {item.label}
          </Text>
        ))}
      </Flex>
    </>
  );
}
