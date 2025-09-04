import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { DatabaseAdapter, LocalStorageAdapter, UserData } from "../services/StorageAdapterService";

export const useData = () => {
  const user = useAuth();
  const [data, setData] = useState<UserData | null>(null);
  const [adapter, setAdapter] = useState<
    DatabaseAdapter | LocalStorageAdapter | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const dbAdapter = new DatabaseAdapter();
        const userData = await dbAdapter.getData(user.uid);
        setData(userData);
        setAdapter(dbAdapter);
      } else {
        const lsAdapter = new LocalStorageAdapter();
        const userData = lsAdapter.getData();
        setData(userData);
        setAdapter(lsAdapter);
      }
    };

    fetchData();
  }, [user]);

  return { data, adapter, user };
};
