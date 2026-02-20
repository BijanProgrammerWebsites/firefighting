"use client";

import type { ReactNode } from "react";

import { useDirection } from "@mantine/core";

import { Slide, ToastContainer } from "react-toastify";

export default function ToastComponent(): ReactNode {
  const { dir } = useDirection();

  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick={false}
      rtl={dir === "rtl"}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />
  );
}
