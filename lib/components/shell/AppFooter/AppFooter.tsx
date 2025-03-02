import React, { useState } from "react";
import {
  createStyles,
  Group,
  Footer,
  Text,
  Center,
  Anchor,
} from "@mantine/core";

export default function AppFooter(): JSX.Element {
  return (
    <Footer
      height={60}
      p={8}
      style={{ zIndex: 101, background: "#064e3b", color: "white" }}
    >
      <Group position="center">
        <Center style={{ paddingTop: "9px" }}>
          <span className="text-xl font-bold text-green-300">HerediCheck</span>
          <Text style={{ display: "inline", paddingLeft: "20px" }}>
            Powered by&nbsp;
            <Anchor href="https://meldrx.com" target="_blank" color="cyan">
              MeldRx
            </Anchor>{" "}
            | © 2025
          </Text>
        </Center>
      </Group>
    </Footer>
  );
}
