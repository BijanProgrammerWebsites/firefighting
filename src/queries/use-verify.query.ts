import { useQuery } from "@tanstack/react-query";

import { verifyApi } from "@/api/auth/verify.api";

import { authKeys } from "@/queries/keys";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useVerifyQuery() {
  return useQuery({
    queryKey: authKeys.verify(),
    queryFn: verifyApi,
    retry: 0,
  });
}
