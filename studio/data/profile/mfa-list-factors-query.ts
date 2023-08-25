import { AuthMFAListFactorsResponse } from '@supabase/supabase-js'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { auth } from 'lib/gotrue'
import { profileKeys } from './keys'
import { Profile } from './types'

export type ProfileResponse = Profile

export async function getMfaListFactors() {
  const { error, data } = await auth.mfa.listFactors()

  if (error) throw error
  return data
}

type CustomMFAListFactorsData = NonNullable<AuthMFAListFactorsResponse['data']>
type CustomMFAListFactorsError = NonNullable<AuthMFAListFactorsResponse['error']>

export const useMfaListFactorsQuery = <TData = CustomMFAListFactorsData>({
  enabled = true,
  ...options
}: UseQueryOptions<CustomMFAListFactorsData, CustomMFAListFactorsError, TData> = {}) => {
  return useQuery<CustomMFAListFactorsData, CustomMFAListFactorsError, TData>(
    profileKeys.mfaFactors(),
    () => getMfaListFactors(),
    {
      staleTime: 1000 * 60 * 30, // default good for 30 mins
      ...options,
    }
  )
}