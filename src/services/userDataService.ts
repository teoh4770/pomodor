import { LocalStorageAdapter, DatabaseAdapter, UserData } from "@/services/StorageAdapterService.ts";
import { useAuth } from "@/hooks/useAuth.tsx";

const useUserData = () => {
  const user = useAuth();
  const adapter = user ? new DatabaseAdapter() : new LocalStorageAdapter();

  const getData = async () => {
    if (!user && !adapter instanceof LocalStorageAdapter) return null;
    return adapter.getData(user?.uid);
  };

  const setData = async (data: UserData) => {
    return adapter.setData(data, user?.uid);
  };

  return { getData, setData };
};