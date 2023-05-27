# authentication-express
## Bug 1: IsLoadingAuth
Right now, appContext runs first, then usePersistLogin. However, ProtectedRoute runs before the useeffect in the usePersistLogin can run, causing isLoadingAuth to not have been set to true before protectedRoute ran. Thus, we are always redirected into login route.

For now, this is fixed by setting isLoadingAuth to true.

