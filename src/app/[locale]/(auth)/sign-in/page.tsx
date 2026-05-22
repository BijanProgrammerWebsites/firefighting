import { type ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box, Stack, Text, Title } from "@mantine/core";

import SignInFormComponent from "@/auth/sign-in/components/sign-in-form/sign-in-form.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

export const generateMetadata = generateDynamicMetadata("SignInPage");

export default async function Page(): Promise<ReactNode> {
  const t = await getTranslations("SignInPage");

  return (
    <Box mt="4rem">
      <Stack gap="sm" align="center">
        <Title order={1}>{t("title")}</Title>
        <Text>{t("subtitle")}</Text>
      </Stack>
      <SignInFormComponent />
    </Box>
  );
}
